from django.conf.urls import url
from . import views
from django.contrib.auth.views import login, logout

urlpatterns = [
    url(r'^create$', views.create_task, name='create_new_task'),
    url(r'^get$', views.get_tasks, name='get_tasks'),
    url(r'^delete$', views.delete_tasks, name='delete_tasks'),
    url(r'^star$', views.star_tasks, name='star_tasks')


]
