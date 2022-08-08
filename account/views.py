from django.contrib import messages
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.shortcuts import render, redirect


# Create your views here.


def index(request):
    if request.user.is_authenticated:
        return redirect('main:home')
    elif request.method == "POST":
        if "password2" in request.POST:
            form = UserCreationForm(request.POST)
            if form.is_valid():
                form.save()
                username = form.cleaned_data.get('username')
                raw_password = form.cleaned_data.get('password1')
                user = authenticate(username=username, password=raw_password)
                login(request, user)
                return redirect('main:home')
            else:
                messages.error(request, "Weak password")

        elif "password" in request.POST:
            form = AuthenticationForm(request, data=request.POST)
            if form.is_valid():
                username = form.cleaned_data.get('username')
                password = form.cleaned_data.get('password')
                user = authenticate(username=username, password=password)
                if user is not None:
                    login(request, user)
                    return redirect('main:home')
                else:
                    messages.error(request, "User not found")
            else:
                messages.error(request, "Incorrect data")

    return render(request, 'account/login.html')


def logout_view(request):
    logout(request)
    return redirect('login')
