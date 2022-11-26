from django.contrib import admin

# Register your models here.

from main.models import Task


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('pk', 'title', 'complete', 'user', 'date')
    search_fields = ('title', 'content', 'user')
    # readonly_fields = ('user',)
