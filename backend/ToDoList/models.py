
from django.db import models


class Tasks(models.Model):
    task = models.CharField(max_length=200, null=False)
    star = models.BooleanField(default=False)
    user_id = models.IntegerField()
