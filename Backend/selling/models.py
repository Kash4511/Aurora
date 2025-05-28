from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.utils import timezone
from django.conf import settings
import cloudinary.uploader
import logging
import os

logger = logging.getLogger(__name__)

# Create your models here.
class Product(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    item_name = models.CharField(max_length=255)
    item_price = models.DecimalField(max_digits=10, decimal_places=2)
    item_description = models.TextField()
    country = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    phone_number = PhoneNumberField(region=None, null=True, blank=True)
    social_ID = models.CharField(max_length=100, null=True, blank=True)
    image = models.ImageField(
        upload_to='product_images/',
        null=True,
        blank=True,
        help_text="Upload an image for your product"
    )

    def __str__(self):
        return self.item_name

    def save(self, *args, **kwargs):
        if self.image and not self.pk:  # Only on creation
            try:
                logger.info(f"Attempting to upload image to Cloudinary: {self.image}")
                # Upload to Cloudinary with proper folder structure
                result = cloudinary.uploader.upload(
                    self.image,
                    folder="product_images",
                    resource_type="image",
                    use_filename=True,
                    unique_filename=True
                )
                logger.info(f"Cloudinary upload result: {result}")
                # Store just the public_id
                self.image = result['public_id']
                logger.info(f"Stored public_id: {self.image}")
            except Exception as e:
                logger.error(f"Error uploading image to Cloudinary: {str(e)}")
                raise
        super().save(*args, **kwargs)

    def get_image_url(self):
        if not self.image:
            logger.debug("No image found")
            return None
            
        try:
            # Get cloud name from settings or environment
            cloud_name = getattr(settings, 'CLOUDINARY_STORAGE', {}).get('CLOUD_NAME') or os.getenv('CLOUDINARY_CLOUD_NAME')
            if not cloud_name:
                logger.error("Cloudinary cloud name not found in settings or environment")
                raise ValueError("Cloudinary cloud name not found in settings or environment")
                
            # If it's already a full URL, return it
            if isinstance(self.image, str) and self.image.startswith('http'):
                logger.debug(f"Returning existing URL: {self.image}")
                return self.image
                
            # Construct the URL with the public_id
            url = f'https://res.cloudinary.com/{cloud_name}/image/upload/{self.image}'
            logger.debug(f"Constructed Cloudinary URL: {url}")
            return url
                
        except Exception as e:
            logger.error(f"Error generating image URL: {str(e)}")
            return None
