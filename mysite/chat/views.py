from django.http import HttpResponse
from django.shortcuts import render



# def room(request):
#     return HttpResponse("Hello, world. You're at the polls index.")

def index(request):
    return render(request, "chat/index.html")


def room(request, room_name):
    return render(request, "chat/room.html", {"room_name": room_name})