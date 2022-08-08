from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.index, name="login"),
    path('logout/', views.logout_view, name="logout"),
]
