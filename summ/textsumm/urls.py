
from django.urls import re_path
from textsumm import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    re_path(r'^quicksummary/$',views.quickSummaryApi),
    re_path(r'^quicksummary/([0-9]+)$',views.quickSummaryApi),
    re_path(r'^socialuser/$',views.userDetailsApi),
    re_path(r'^socialuser/([0-9]+)$',views.userDetailsApi),
    re_path(r'^manualuser/$',views.manualDetailsApi),
    re_path(r'^manualuser/([0-9]+)$',views.manualDetailsApi),
    re_path(r'^loginuser/$',views.loginCred),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
