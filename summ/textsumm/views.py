from django.shortcuts import render
import requests
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from textsumm.models import QuickSummary
from textsumm.serializers import QuickSerializer

# from django.core.files.storage import default_storage

API_URL = "https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6"
# API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
headers = {"Authorization": "Bearer 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"}


def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()


# Create your views here.
@csrf_exempt
def quickSummaryApi(request,id=0):
    if request.method=='GET':
        departments = QuickSummary.objects.all()
        departments_serializer = QuickSerializer(departments, many=True)
        return JsonResponse(departments_serializer.data, safe=False)

    elif request.method=='POST':
        department_data=JSONParser().parse(request)
        u_input=department_data['Input']
        minL=50
        maxL=1000
        output1 = query({
            "inputs":u_input,
            # "parameters":{"min_length":minL,"max_length":maxL},
        })
        print("test")
        print(output1[0]['summary_text'])
        department_data['Output']=output1[0]['summary_text']
        department_serializer = QuickSerializer(data=department_data)
        print("testong")
        #NLP model

        # x={'output':output1}

        # print(output1)

        if department_serializer.is_valid():
            # department_serializer.data['Output']=output1
            # print(department_serializer)
            department_serializer.save()
            return JsonResponse("Add Successfully!!", safe=False)
        return JsonResponse("Failed to Add.",safe=False)
    
    elif request.method=='PUT':
        department_data = JSONParser().parse(request)
        department=QuickSummary.objects.get(DepartmentId=department_data['DepartmentId'])
        department_serializer=QuickSerializer(department,data=department_data)
        if department_serializer.is_valid():
            department_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method=='DELETE':
        department=QuickSummary.objects.get(DepartmentId=id)
        department.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)
