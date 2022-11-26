from django import forms
from django.forms import ModelForm

from .models import *


class TaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ('title', 'description')
        widgets = {
            'title': forms.TextInput(
                attrs={
                    'class': 'form-create__title',
                    'maxlength': 36
                }
            ),
            'description': forms.Textarea(
                attrs={
                    'class': 'form-create__description',
                    'maxlength': 200
                }
            )
        }
