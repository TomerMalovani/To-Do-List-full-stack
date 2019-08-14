from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse
from django.forms.models import model_to_dict
from django.http import JsonResponse
from django.core import serializers

from .models import Tasks
import json


@require_http_methods(['GET'])
def get_tasks(request):
    try:
        data = list(Tasks.objects.values().order_by('-star'))
        return JsonResponse({"all": data})
    except:
        raise Exception


@require_http_methods(['POST'])
def create_task(request):
    try:
        data = json.loads(request.body)
        new_task = Tasks(
            task=data["task"],
            star=data["star"],
            user_id=data["user_id"])
        new_task.save()
        return JsonResponse(model_to_dict(new_task), status=201)
    except Exception as ex:
        print("opps")
        return JsonResponse({"error", ex}, status=500)


@require_http_methods(['DELETE'])
def delete_tasks(request):
    try:
        data = json.loads(request.body)
        Tasks.objects.filter(id=data["id"]).delete()
        return JsonResponse(data)
    except:
        raise Exception


@require_http_methods(['PUT'])
def star_tasks(request):
    try:
        data = json.loads(request.body)
        task_to_change = Tasks.objects.get(id=data["id"])
        if task_to_change.star == True:
            task_to_change.star = False
        else:
            task_to_change.star = True
        task_to_change.save()

        data = list(Tasks.objects.values().order_by('-star'))
        return JsonResponse({"all": data})
    except:
        raise Exception
