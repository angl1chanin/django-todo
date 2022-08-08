from django.urls import path
from . import views

app_name = 'main'

urlpatterns = [
    path('', views.index, name="home"),
    path('update/<str:pk>/', views.update, name="update-task"),
]
