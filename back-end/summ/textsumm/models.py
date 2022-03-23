from django.db import models

from passlib.hash import pbkdf2_sha256

class QuickSummary(models.Model):
    Id = models.AutoField(primary_key=True)
    Input = models.CharField(max_length=1000000)
    Output = models.CharField(max_length=1000000,default="null")


class AudioSummary(models.Model):
    aid = models.AutoField(primary_key=True)
    AudioFileName = models.CharField(max_length=100,default="null")
    AudioText = models.CharField(max_length=1000000,default="null")
    AudioSummary = models.CharField(max_length=1000000,default="null")

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
    

class FolderDetails(models.Model):
    folder_id = models.AutoField(primary_key=True)
    folder_title= models.CharField(max_length=100)
    uid= models.CharField(max_length=100)
    no_of_files= models.CharField(max_length=100,default="null")
    date_of_folder=models.DateTimeField(auto_now=True)

class FileDetails(models.Model):
    file_id= models.AutoField(primary_key=True)
    file_title=models.CharField(max_length=100)
    date_of_file=models.DateTimeField(auto_now=True)
    folder_id= models.CharField(max_length=100)
    input_text_or_audio=models.CharField(max_length=100,default="null")
    uploaded_filepath=models.CharField(max_length=100,default="null")
    input_text=models.CharField(max_length=1000000)
    output_text=models.CharField(max_length=1000000,default="null")
