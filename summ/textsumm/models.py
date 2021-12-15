from django.db import models

class QuickSummary(models.Model):
    Id = models.AutoField(primary_key=True)
    Input = models.CharField(max_length=1000000)
    Output = models.CharField(max_length=1000000)
# Create your models here.
