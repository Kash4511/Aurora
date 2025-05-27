from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.utils import timezone
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
    image = models.ImageField(upload_to=f'aurora/products/{timezone.now().strftime("%Y/%m/%d")}/', null=True, blank=True)

    def __str__(self):
        return self.item_name
