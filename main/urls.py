from django.urls import path
from main.views import Home, Complete, Clear, Delete, Recovery, Update

app_name = 'main'

urlpatterns = [
    path('', Home.as_view(), name="home"),
    path('clear/', Clear.as_view(), name="clear-task"),
    path('delete/<int:pk>', Delete.as_view(), name="delete-task"),
    path('complete/<int:pk>', Complete.as_view(), name="complete-task"),
    path('recovery/<int:pk>', Recovery.as_view(), name="recovery-task"),
    path('update/<int:pk>', Update.as_view(), name="update-task"),
]
