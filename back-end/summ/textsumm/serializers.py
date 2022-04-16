from rest_framework import serializers
from textsumm.models import AudioSummary,QuickSummary,UrlSummary,SocialUserDetails,ManualUserDetails,FolderDetails,FileDetails

class QuickSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuickSummary
        fields = ('Id','Input','Output')

class AudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = AudioSummary
        fields = ('AudioFileName',
                  'AudioText',
                  'AudioSummary')

class UrlSerializer(serializers.ModelSerializer):
    class Meta:
        model = UrlSummary
        fields = ('urlid',
                  'urlAddress',
                  'urlTranscript',
                  'urlSummary')

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialUserDetails
        fields = ('uid','username','password','email','image')


class ManualUserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ManualUserDetails
        fields = ('uid','username','email','password','image')



class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = FolderDetails
        fields = ('folder_id','folder_title','uid','no_of_files','date_of_folder')


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileDetails
        fields = ('file_id','file_title','date_of_file','folder_id','input_text_or_audio','uploaded_filepath','url_link','input_text','output_text')