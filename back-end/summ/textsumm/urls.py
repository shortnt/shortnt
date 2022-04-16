
from django.urls import re_path
#from django.conf.urls import url
from textsumm import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    re_path(r'^quicksummary/$',views.quickSummaryApi),
    re_path(r'^quicksummary/SaveFile$',views.SaveFile),
    re_path(r'^quicksummary/([0-9]+)$',views.quickSummaryApi),

    re_path(r'^socialuser/$',views.userDetailsApi),
    re_path(r'^socialuser/([0-9]+)$',views.userDetailsApi),
    re_path(r'^socialuser/([A-Z a-z 0-9 . @ ""]+)$',views.userDetailsApi),

    re_path(r'^manualuser/$',views.manualDetailsApi),
    re_path(r'^manualuser/([0-9]+)$',views.manualDetailsApi),
    re_path(r'^manualuser/([A-Z a-z 0-9 . @ ""]+)$',views.manualDetailsApi),
    re_path(r'^loginuser/$',views.loginCred),

    re_path(r'^folders/$',views.createFolder),
    re_path(r'^folders/([0-9]+)$',views.createFolder),

    re_path(r'files/$',views.createFile),
    re_path(r'files/([0-9]+)$',views.createFile),
    re_path(r'files/([A-Z a-z 0-9]+)$',views.createFile),

    re_path(r'^Employee/SaveFile$', views.SaveFile),
    re_path(r'^getaudio/$', views.GetAudio),
    re_path(r'^audiosummary/$',views.audioSummaryApi),
    re_path(r'^audiosummary/([0-9]+)$',views.audioSummaryApi),

    re_path(r'^youtubeUrl/$',views.youtubeUrlApi),
    re_path(r'^youtubeUrl/([0-9]+)$',views.youtubeUrlApi), 

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)