from django.db import models
import random
import string
from django.contrib.auth.models import User
def Generate_unique_code():
    length = 6
    while True:
        code =''.join(random.choice(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() ==0:
            break
    return code

class Room (models.Model):
    host = models.CharField(max_length=100, default="", unique=True)
    code = models.CharField(max_length =8, unique = True)
    guest_can_pause = models.BooleanField(null=False, default =False)
    vote_to_skip = models.IntegerField(null=False, default =1)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='todos')

    def __str__(self):
        return self.title



    

    def __self__(self):
        return self.title