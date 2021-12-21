from django.shortcuts import render

import requests
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from textsumm.models import QuickSummary
from textsumm.serializers import QuickSerializer

from textsumm.models import SocialUserDetails
from textsumm.serializers import UserDetailSerializer

from textsumm.models import ManualUserDetails
from textsumm.serializers import ManualUserDetailSerializer

from passlib.hash import pbkdf2_sha256

# Create your views here.

API_URL = "https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6"
# API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
headers = {"Authorization": "Bearer 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"}


def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

def verify_password(password,encryptpass):
        return pbkdf2_sha256.verify(password,encryptpass)



# Create your views here.
@csrf_exempt
def quickSummaryApi(request,id=None):
    if request.method=='GET':
        if id:
            departments = QuickSummary.objects.get(Id=id)
            departments_serializer = QuickSerializer(departments)
            return JsonResponse(departments_serializer.data, safe=False)

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



@csrf_exempt
def userDetailsApi(request,id=None):
    if request.method == 'GET':
        if id:
            departments = SocialUserDetails.objects.get(uid=id)
            departments_serializer = UserDetailSerializer(departments)
            return JsonResponse(departments_serializer.data, safe=False)

        departments = SocialUserDetails.objects.all()
        departments_serializer = UserDetailSerializer(departments, many=True)
        return JsonResponse(departments_serializer.data, safe=False)
    
    elif request.method == 'POST':
        department_data=JSONParser().parse(request)
        department_serializer = UserDetailSerializer(data=department_data)
        departments = SocialUserDetails.objects.filter(email=department_data['email']).exists()

        if department_serializer.is_valid() and not departments:
            department_serializer.save()
            return JsonResponse("Add Successfully!!", safe=False)
        return JsonResponse(department_data['email'],safe=False)
    
    elif request.method == 'PUT':
        department_data = JSONParser().parse(request)
        department=SocialUserDetails.objects.get(uid=department_data['uid'])
        department_serializer=UserDetailSerializer(department,data=department_data)
        if department_serializer.is_valid():
            department_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)
    
    elif request.method == 'DELETE':
        department=SocialUserDetails.objects.get(uid=id)
        department.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)



@csrf_exempt
def manualDetailsApi(request,id=None):
    if request.method == 'GET':
        if id:
            departments = ManualUserDetails.objects.get(mid=id)
            departments_serializer = ManualUserDetailSerializer(departments)
            return JsonResponse(departments_serializer.data, safe=False)

        departments = ManualUserDetails.objects.all()
        departments_serializer = ManualUserDetailSerializer(departments, many=True)
        return JsonResponse(departments_serializer.data, safe=False)
    
    elif request.method == 'POST':
        department_data=JSONParser().parse(request)
        
        departments = ManualUserDetails.objects.filter(email=department_data['email']).exists()
        if departments:
            return JsonResponse("Email Already Exists",safe=False)

        # Encrypting
        encrypt_password = pbkdf2_sha256.encrypt(department_data['password'],rounds=12000,salt_size=32)
        department_data['password'] = encrypt_password
        department_serializer = ManualUserDetailSerializer(data=department_data)
        if department_serializer.is_valid() and not departments:
            department_serializer.save()
            return JsonResponse(department_data['email'], safe=False)
        return JsonResponse("Failed",safe=False)
    
    elif request.method == 'PUT':
        department_data = JSONParser().parse(request)
        department=ManualUserDetails.objects.get(uid=department_data['mid'])
        department_serializer=ManualUserDetailSerializer(department,data=department_data)
        if department_serializer.is_valid():
            department_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)
    
    elif request.method == 'DELETE':
        department=ManualUserDetails.objects.get(mid=id)
        department.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)



@csrf_exempt
def loginCred(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        isEmailExists = ManualUserDetails.objects.filter(email=data['email']).exists()
        if(isEmailExists):
            obj = ManualUserDetails.objects.get(email=data['email'])
            if verify_password(data['password'],obj.password):
                return JsonResponse(data['email'],safe=False)
            return JsonResponse("Failed",safe=False)
        return JsonResponse("Failed",safe=False)
