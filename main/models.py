from django.db import models
from django.urls import reverse_lazy
from django.contrib.auth.models import User


# Create your models here.

class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=150)
    description = models.TextField(null=True, blank=True)
    complete = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["date"]

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        kwargs = {
            'pk': self.pk,
        }

        return reverse_lazy('update-task', kwargs=kwargs)
