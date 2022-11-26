from django.shortcuts import HttpResponse
from main.models import Task


class IsOwnerMixin:
    def __init__(self, instance: Task = None, request=None):
        self.instance = instance
        self.request = request

    def owner(self):
        if self.instance is None or self.request is None:
            raise AttributeError('Object instance or request is none')

        if not self.request.user.is_authenticated:
            return HttpResponse("<h1 style=\"text-align: center;\">403 Forbidden</h1>", status=403)

        if self.instance.user != self.request.user:
            return HttpResponse("<h1 style=\"text-align: center;\">401 Unauthorized</h1>", status=401)

        return True

