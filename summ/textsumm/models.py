from django.db import models

from passlib.hash import pbkdf2_sha256

class QuickSummary(models.Model):
    Id = models.AutoField(primary_key=True)
    Input = models.CharField(max_length=1000000)
    Output = models.CharField(max_length=1000000,default="null")


class SocialUserDetails(models.Model):
    uid = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    image = models.CharField(max_length=1000)


class ManualUserDetails(models.Model):
    mid = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=1000)
    image = models.CharField(max_length=1000,default="null")
