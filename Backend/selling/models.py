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
        upload_to=f'aurora/products/{timezone.now().strftime("%Y/%m/%d")}/',
        null=True,
        blank=True,
        help_text="Upload an image for your product"
    )

    def __str__(self):
        return self.item_name

    def save(self, *args, **kwargs):
        if self.image and not self.pk:  # Only on creation
            try:
                # Upload to Cloudinary
                result = cloudinary.uploader.upload(
                    self.image,
                    folder="aurora/products",
                    resource_type="image"
                )
                # Store the secure URL
                self.image = result['secure_url']
            except Exception as e:
                logger.error(f"Error uploading image to Cloudinary: {str(e)}")
                raise
        super().save(*args, **kwargs)

    def get_image_url(self):
        if not self.image:
            return None
            
        # If it's already a Cloudinary URL, return it as is
        if 'cloudinary.com' in str(self.image):
            return str(self.image)
            
        # If it's a local file path, construct the Cloudinary URL
        try:
            cloud_name = settings.CLOUDINARY_STORAGE['CLOUD_NAME']
        except (KeyError, AttributeError):
            cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME')
            
        if not cloud_name:
            logger.error("Cloudinary cloud name not found in settings or environment")
            return None
            
        # Get just the filename without any path
        filename = os.path.basename(str(self.image))
        return f"https://res.cloudinary.com/{cloud_name}/image/upload/product_images/{filename}"
