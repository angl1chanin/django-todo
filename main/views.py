from django.shortcuts import render, redirect, HttpResponse, get_object_or_404
from django.views.generic import ListView, UpdateView
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.http import HttpResponseRedirect
from django.urls import reverse_lazy

from main.models import Task
from main.forms import TaskForm
from main.decorators import is_owner


class Home(ListView, LoginRequiredMixin):
    model = Task
    template_name = 'main/index.html'
    context_object_name = 'tasks'
    paginate_by = 10

    def post(self, request, **kwargs):
        form = TaskForm(self.request.POST)
        if form.is_valid():
            task = form.save(commit=False)
            task.user = request.user
            task.save()
            return HttpResponseRedirect(request.META.get('HTTP_REFERER'))
        return HttpResponse("Incorrect form")

    def get_queryset(self):
        return self.model.objects.filter(user=self.request.user, complete=False).order_by('-date')

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data()
        context.update(dict(
            task_form=TaskForm(),
            completed_tasks=self.model.objects.filter(user=self.request.user, complete=True),
            task_quantity=self.model.objects.filter(complete=False).count()
        ))

        return context


class Clear(Home):
    def get(self, request, *args, **kwargs):
        self.model.objects.filter(user=request.user, complete=True).delete()

        return redirect('main:home')


class Delete(Home):
    @is_owner
    def get(self, request, *args, **kwargs):
        instance = get_object_or_404(self.model, pk=self.kwargs.get('pk'))
        instance.delete()

        return HttpResponseRedirect(request.META.get('HTTP_REFERER'))


class Complete(Home):
    @is_owner
    def get(self, request, *args, **kwargs):
        instance = get_object_or_404(self.model, pk=self.kwargs.get('pk'))
        instance.complete = True
        instance.save()

        return HttpResponseRedirect(request.META.get('HTTP_REFERER'))


class Recovery(Home):
    @is_owner
    def get(self, request, *args, **kwargs):
        instance = get_object_or_404(self.model, pk=self.kwargs.get('pk'))
        instance.complete = False
        instance.save()

        return HttpResponseRedirect(request.META.get('HTTP_REFERER'))


class Update(UpdateView, LoginRequiredMixin):
    model = Task
    form_class = TaskForm
    template_name = 'main/update.html'
    success_url = reverse_lazy('main:home')

    @is_owner
    def get(self, request, *args, **kwargs):
        super(Update, self).get(request)
        return super().get(request, *args, **kwargs)
