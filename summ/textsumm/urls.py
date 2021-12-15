
from django.urls import re_path
from textsumm import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    re_path(r'^quicksummary/$',views.quickSummaryApi),
    re_path(r'^quicksummary/([0-9]+)$',views.quickSummaryApi),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)