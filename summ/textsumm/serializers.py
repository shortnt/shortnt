from rest_framework import serializers
from textsumm.models import QuickSummary

class QuickSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuickSummary
        fields = ('Id',
                  'Input',
                  'Output')