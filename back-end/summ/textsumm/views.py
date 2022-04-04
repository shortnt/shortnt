from django.shortcuts import render

import requests
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.core.files.storage import default_storage
from textsumm.models import QuickSummary
from textsumm.models import AudioSummary
from textsumm.serializers import QuickSerializer
from textsumm.serializers import AudioSerializer

from textsumm.models import SocialUserDetails
from textsumm.serializers import UserDetailSerializer

from textsumm.models import ManualUserDetails
from textsumm.serializers import ManualUserDetailSerializer

from textsumm.models import FolderDetails
from textsumm.serializers import FolderSerializer

from textsumm.models import FileDetails
from textsumm.serializers import FileSerializer

#import for sp-text
import speech_recognition as sr
import os 
from os import path

from pydub import AudioSegment
from pydub.silence import split_on_silence

from passlib.hash import pbkdf2_sha256
from gtts import gTTS


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
        print("quick summary",len(u_input))
        minL=50
        maxL=1000
        if(len(u_input)>1000):
           output1 = query({
           "inputs":u_input,
           # "parameters":{"min_length":minL,"max_length":maxL},
           })
           print(output1[0]['summary_text'])
           department_data['Output']=output1[0]['summary_text']
           department_serializer = QuickSerializer(data=department_data) 

        else:
            department_data['Output']=u_input
            department_serializer = QuickSerializer(data=department_data) 
        
        # output1 = query({
        #     "inputs":u_input,
        #     # "parameters":{"min_length":minL,"max_length":maxL},
        # })
        # print("test")
        # print(output1[0]['summary_text'])
        # department_data['Output']=output1[0]['summary_text']
        # department_serializer = QuickSerializer(data=department_data)
        # print("testong")
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




#Audio summary API

@csrf_exempt
def audioSummaryApi(request,id=None):
    if request.method=='GET':
        if id:
            departments = AudioSummary.objects.get(aid=id)
            departments_serializer = AudioSerializer(departments)
            return JsonResponse(departments_serializer.data, safe=False)

        departments = AudioSummary.objects.all()
        departments_serializer = AudioSerializer(departments, many=True)
        return JsonResponse(departments_serializer.data, safe=False)

    elif request.method=='POST':
        employee_data=JSONParser().parse(request)

        filename=employee_data['AudioFileName']

        dst = 'test.wav'   

        file='./media/'+ filename
        print(file)

                   
        if(file[len(file)-3:len(file)]!="wav"):    
            AudioSegment.from_file(file).export(dst, format="wav")
            filename = dst
        else:
            filename = file
        r = sr.Recognizer()
        with sr.AudioFile(filename) as source:
            # listen for the data (load audio to memory)
            audio_data = r.record(source)
            # recognize (convert from speech to text)
            text = r.recognize_google(audio_data)
            print(text) 
            
        employee_data['AudioText'] = text

        audiosumm = query({
            "inputs":text,
        })
        employee_data['AudioSummary']=audiosumm[0]['summary_text']
        #converting text to speech
        # The text that you want to convert to audio
        mytext = audiosumm[0]['summary_text']
        # Language in which you want to convert
        language = 'en'
            # Passing the text and language to the engine, 
            # here we have marked slow=False. Which tells 
            # the module that the converted audio should 
            # have a high speed
        myobj = gTTS(text=mytext, lang=language, slow=False)
            # Saving the converted audio in a mp3 file named
            # saved 
        myobj.save("./media/saved1.mp3")
        print("it is my objjjjj")
        print(myobj)
        employee_serializer = AudioSerializer(data=employee_data)
        if employee_serializer.is_valid():
            employee_serializer.save()
            return JsonResponse("Added Successfully!!" , safe=False)
        return JsonResponse("Failed to Add.",safe=False)
    
    elif request.method=='PUT':
        department_data = JSONParser().parse(request)
        department=AudioSummary.objects.get(aid=department_data['id'])
        department_serializer=AudioSerializer(department,data=department_data)
        if department_serializer.is_valid():
            department_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method=='DELETE':
        department=AudioSummary.objects.get(aid=id)
        department.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)




@csrf_exempt
def userDetailsApi(request,id=None):
    if request.method == 'GET':
        if id:
            departments = SocialUserDetails.objects.get(email=id)
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



@csrf_exempt
def createFolder(request,id=None):
    if request.method == 'GET':
        if id:
            departments = FolderDetails.objects.filter(uid=id)
            departments_serializer = FolderSerializer(departments,many=True)
            return JsonResponse(departments_serializer.data, safe=False)

        departments = FolderDetails.objects.all()
        departments_serializer = FolderSerializer(departments, many=True)
        return JsonResponse(departments_serializer.data, safe=False)

    elif request.method == 'POST':
        department_data=JSONParser().parse(request)
        department_serializer = FolderSerializer(data=department_data)

        if department_serializer.is_valid():
            department_serializer.save()
            return JsonResponse("Add Successfully!!", safe=False)
        return JsonResponse("Failed",safe=False)

    elif request.method == 'PUT':
        department_data = JSONParser().parse(request)
        department=FolderDetails.objects.get(folder_id=department_data['folder_id'])
        department_serializer=FolderSerializer(department,data=department_data)
        if department_serializer.is_valid():
            department_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)
    
    elif request.method == 'DELETE':
        department=FolderDetails.objects.get(folder_id=id)
        department.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)




@csrf_exempt
def createFile(request,id=None):
    if request.method == 'GET':
        if id is not None:
            # id = id.encode('ascii', 'ignore')

            if id.isdigit():
                departments = FileDetails.objects.filter(file_id=id)
                departments_serializer = FileSerializer(departments,many=True)
                return JsonResponse(departments_serializer.data, safe=False)
            else:
                departments = FileDetails.objects.filter(folder_id=id)
                departments_serializer = FileSerializer(departments,many=True)
                return JsonResponse(departments_serializer.data, safe=False)


        departments = FileDetails.objects.all()
        departments_serializer = FileSerializer(departments, many=True)
        return JsonResponse(departments_serializer.data, safe=False)

    elif request.method == 'POST':
        department_data=JSONParser().parse(request)
        print("create post")
        print(department_data['input_text_or_audio'])
        if department_data['input_text_or_audio']=="Text":
            
            u_input=department_data['input_text']
            if(len(u_input)>800):
                output1 = query({
                "inputs":u_input,
                # "parameters":{"min_length":minL,"max_length":maxL},
                })
                print(output1[0]['summary_text'])
                department_data['output_text']=output1[0]['summary_text']
                # department_serializer = QuickSerializer(data=department_data) 

            else:
                department_data['output_text']=u_input
                # department_serializer = QuickSerializer(data=department_data) 
            # minL=50
            # maxL=1000
            # print(len(u_input))
            # output1 = query({
            #     "inputs":u_input,
            #     # "parameters":{"min_length":minL,"max_length":maxL},
            # })
            # print("test")
            # print(output1[0]['summary_text'])
            # department_data['output_text']=output1[0]['summary_text']
        
        else:
            
            filename=department_data['uploaded_filepath']

            dst = 'test.wav'   

            file='./media/'+ filename
            print(file)

                        
            if(file[len(file)-3:len(file)]!="wav"):    
                AudioSegment.from_file(file).export(dst, format="wav")
                filename = dst
            else:
                filename = file
            r = sr.Recognizer()
            with sr.AudioFile(filename) as source:
                # listen for the data (load audio to memory)
                audio_data = r.record(source)
                # recognize (convert from speech to text)
                text = r.recognize_google(audio_data)
                print(text) 
                
            department_data['input_text'] = text

            audiosumm = query({
                "inputs":text,
            })
            department_data['output_text']=audiosumm[0]['summary_text']
            #converting text to speech
            # The text that you want to convert to audio
            mytext = audiosumm[0]['summary_text']
            # Language in which you want to convert
            language = 'en'
                # Passing the text and language to the engine, 
                # here we have marked slow=False. Which tells 
                # the module that the converted audio should 
                # have a high speed
            myobj = gTTS(text=mytext, lang=language, slow=False)
                # Saving the converted audio in a mp3 file named
                # saved 
            myobj.save("./media/saved1.mp3")
        

        department_serializer = FileSerializer(data=department_data)
        print(department_serializer.is_valid())
        if department_serializer.is_valid():
            department_serializer.save()
            return JsonResponse("Add Successfully!!", safe=False)
        return JsonResponse("Failed to Add.",safe=False)

    elif request.method == 'PUT':
        department_data = JSONParser().parse(request)
        department=FileDetails.objects.get(file_id=department_data['file_id'])
        department_serializer=FileSerializer(department,data=department_data)
        if department_serializer.is_valid():
            department_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)
    
    elif request.method == 'DELETE':
        department=FileDetails.objects.get(file_id=id)
        department.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)


@csrf_exempt
def GetAudio(request):
    if request.method == 'GET':
        if id is not None:
            # id = id.encode('ascii', 'ignore')

            if id.isdigit():
                departments = FileDetails.objects.filter(file_id=id)
                departments_serializer = FileSerializer(departments,many=True)
                return JsonResponse(departments_serializer.data, safe=False)
            else:
                departments = FileDetails.objects.filter(folder_id=id)
                departments_serializer = FileSerializer(departments,many=True)
                return JsonResponse(departments_serializer.data, safe=False)


        departments = FileDetails.objects.all()
        departments_serializer = FileSerializer(departments, many=True)
        return JsonResponse(departments_serializer.data, safe=False)

    elif request.method == 'POST':
        department_data=JSONParser().parse(request)
        print('audio')
        print(department_data["audio_text"])

        #converting text to speech
        # The text that you want to convert to audio
        mytext = department_data["audio_text"]
        # Language in which you want to convert
        language = 'en'
            # Passing the text and language to the engine, 
            # here we have marked slow=False. Which tells 
            # the module that the converted audio should 
            # have a high speed
        myobj = gTTS(text=mytext, lang=language, slow=False)
            # Saving the converted audio in a mp3 file named
            # saved 
        myobj.save("./media/textaudio.mp3")
        

        # department_serializer = FileSerializer(data=department_data)
        # print(department_serializer.is_valid())
        # if department_serializer.is_valid():
        #     department_serializer.save()
        #     return JsonResponse("Add Successfully!!", safe=False)
        return JsonResponse("Failed to Add.",safe=False)

    elif request.method == 'PUT':
        department_data = JSONParser().parse(request)
        department=FileDetails.objects.get(file_id=department_data['file_id'])
        department_serializer=FileSerializer(department,data=department_data)
        if department_serializer.is_valid():
            department_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)
    
    elif request.method == 'DELETE':
        department=FileDetails.objects.get(file_id=id)
        department.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)


# @csrf_exempt
# def createFile(request,id=None):
#     if request.method == 'GET':
#         if id:
#             departments = FileDetails.objects.filter(file_id=id)
#             departments_serializer = FileSerializer(departments,many=True)
#             return JsonResponse(departments_serializer.data, safe=False)

#         departments = FileDetails.objects.all()
#         departments_serializer = FileSerializer(departments, many=True)
#         return JsonResponse(departments_serializer.data, safe=False)

#     elif request.method == 'POST':
#         department_data=JSONParser().parse(request)
#         u_input=department_data['input_text']
#         minL=50
#         maxL=1000
#         output1 = query({
#             "inputs":u_input,
#             # "parameters":{"min_length":minL,"max_length":maxL},
#         })
#         print("test")
#         print(output1[0]['summary_text'])
#         department_data['output_text']=output1[0]['summary_text']
#         department_serializer = FileSerializer(data=department_data)
#         print("testong")
#         #NLP model

#         # x={'output':output1}

#         # print(output1)
#         print(department_serializer.is_valid())
#         if department_serializer.is_valid():
#             # department_serializer.data['Output']=output1
#             # print(department_serializer)
#             department_serializer.save()
#             return JsonResponse("Add Successfully!!", safe=False)
#         return JsonResponse("Failed to Add.",safe=False)

#     elif request.method == 'PUT':
#         department_data = JSONParser().parse(request)
#         department=FileDetails.objects.get(file_id=department_data['file_id'])
#         department_serializer=FileSerializer(department,data=department_data)
#         if department_serializer.is_valid():
#             department_serializer.save()
#             return JsonResponse("Updated Successfully!!", safe=False)
#         return JsonResponse("Failed to Update.", safe=False)
    
#     elif request.method == 'DELETE':
#         department=FileDetails.objects.get(file_id=id)
#         department.delete()
#         return JsonResponse("Deleted Succeffully!!", safe=False)




@csrf_exempt
def SaveFile(request):
    file=request.FILES['myFile']
    file_name = default_storage.save(file.name,file)

    return JsonResponse(file_name,safe=False)