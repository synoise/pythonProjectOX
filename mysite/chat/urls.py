# chat/urls.py
from django.urls import path

from . import views

urlpatterns = [
    # path("chat", views.index, name="index"),
    # path("<str:room_name>/", views.room, name="room"),
    # path("chat/", views.room, name="room"),
    path('', views.index, name='indexChat'),
    path("<str:room_name>/", views.room, name="room"),
]