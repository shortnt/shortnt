from django.shortcuts import render
import requests
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from textsumm.models import QuickSummary
from textsumm.serializers import QuickSerializer

# from django.core.files.storage import default_storage

API_URL = "https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6"
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
        # u_input=department_data['summ']

        # minL=500
        # maxL=1000
        # output1 = query({
        #     "inputs":u_input,
        #     "parameters":{"min_length":minL,"max_length":maxL},
        # })
        # print("test")
        # department_data['output']=output1[0]['summary_text']
        # print(department_data['output'])
        # print(department_data)

        department_serializer = QuickSerializer(data=department_data)
        # print(type(u_input))
        #NLP model

        # x={'output':output1}

        # print(output1)
        print(department_serializer)

        if department_serializer.is_valid():
            # department_serializer.data['output']=output1
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

# @csrf_exempt
# def employeeApi(request,id=0):
#     if request.method=='GET':
#         employees = Employees.objects.all()
#         employees_serializer = EmployeeSerializer(employees, many=True)
#         return JsonResponse(employees_serializer.data, safe=False)

#     elif request.method=='POST':
#         employee_data=JSONParser().parse(request)
#         employee_serializer = EmployeeSerializer(data=employee_data)
#         if employee_serializer.is_valid():
#             employee_serializer.save()
#             return JsonResponse("Added Successfully!!" , safe=False)
#         return JsonResponse("Failed to Add.",safe=False)
    
#     elif request.method=='PUT':
#         employee_data = JSONParser().parse(request)
#         employee=Employees.objects.get(EmployeeId=employee_data['EmployeeId'])
#         employee_serializer=EmployeeSerializer(employee,data=employee_data)
#         if employee_serializer.is_valid():
#             employee_serializer.save()
#             return JsonResponse("Updated Successfully!!", safe=False)
#         return JsonResponse("Failed to Update.", safe=False)

#     elif request.method=='DELETE':
#         employee=Employees.objects.get(EmployeeId=id)
#         employee.delete()
#         return JsonResponse("Deleted Succeffully!!", safe=False)


# @csrf_exempt
# def SaveFile(request):
#     file=request.FILES['myFile']
#     file_name = default_storage.save(file.name,file)

#     return JsonResponse(file_name,safe=False)