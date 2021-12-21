from rest_framework import serializers
from textsumm.models import QuickSummary,SocialUserDetails,ManualUserDetails

class QuickSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuickSummary
        fields = ('Id','Input','Output')


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialUserDetails
        fields = ('uid','username','email','image')


class ManualUserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ManualUserDetails
        fields = ('mid','username','email','password','image')
