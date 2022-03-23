from rest_framework import serializers
from textsumm.models import AudioSummary,QuickSummary,SocialUserDetails,ManualUserDetails,FolderDetails,FileDetails

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

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialUserDetails
        fields = ('uid','username','email','image')


class ManualUserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ManualUserDetails
        fields = ('mid','username','email','password','image')



class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = FolderDetails
        fields = ('folder_id','folder_title','uid','no_of_files','date_of_folder')


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileDetails
        fields = ('file_id','file_title','date_of_file','folder_id','input_text_or_audio','uploaded_filepath','input_text','output_text')