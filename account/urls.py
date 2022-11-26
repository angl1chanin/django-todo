from django.urls import path
from . import views

app_name = 'account'

urlpatterns = [
    path('login/', views.index, name="login"),
    path('logout/', views.logout_view, name="logout"),
]
