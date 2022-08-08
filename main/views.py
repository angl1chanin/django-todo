from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm

from .models import *
from .forms import *


# Create your views here.

@login_required
def index(request):
    tasks = Task.objects.filter(user=request.user, complete=False)
    completed_tasks = Task.objects.filter(complete=True)

    if request.method == "POST":
        # Creating task
        if "title" in request.POST:
            form = TaskForm(request.POST)
            if form.is_valid():
                task = form.save(commit=False)
                task.user = request.user
                task.save()
            return redirect('main:home')

        # Set task as a complete
        elif "complete" in request.POST:
            task_id = request.POST.get('task-id')
            task = Task.objects.filter(id=task_id).update(complete=True)

        # Remove task
        elif "remove-task" in request.POST:
            task_id = request.POST.get('remove-task')
            task = Task.objects.get(id=task_id).delete()

    context = {
        'tasks': tasks,
        'completed_tasks': completed_tasks
    }

    return render(request, "main/index.html", context)


@login_required
def update(request, pk):
    task = Task.objects.get(id=pk)
    form = TaskForm(instance=task)

    if request.method == "POST":
        form = TaskForm(request.POST, instance=task)
        if form.is_valid():
            form.save()
        return redirect('main:home')

    context = {
        'form': form
    }

    return render(request, "main/update.html", context)
