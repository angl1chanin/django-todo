from django.shortcuts import HttpResponse

from main.models import Task


def is_owner(func):

    def wrapper(self, request, *args, **kwargs):
        instance = self.model.objects.get(pk=kwargs.get('pk'))

        if not request.user.is_authenticated:
            return HttpResponse("<h1 style=\"text-align: center;\">403 Forbidden</h1>", status=403)

        if instance is not None and request.user == instance.user:
            return func(self, request, *args, **kwargs)

        return HttpResponse("<h1 style=\"text-align: center;\">401 Unauthorized</h1>", status=401)

    return wrapper
