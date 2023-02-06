"""
ASGI config for mysite project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os

from django.urls import re_path
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings')

import json

# import mysite.neurals.neurals as xxx

from channels.generic.websocket import WebsocketConsumer

# nn = mysite.neurals
# print(nn.neurals.bb())
def addMove(area: list, gamer: bool, award: int):
    for i in range(len(area)):
        if not (area[i]):

            area[i] = 1
            break
    return [area, i, gamer]


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        award = text_data_json["award"]
        gamer = text_data_json["gamer"]
        message = text_data_json["message"]
        winner = text_data_json["winner"]
        print("winner", winner, "| gamer", gamer, "| award", award)
        # print("message", message)
        if not(winner):
            self.send(text_data=json.dumps({"message": addMove(message, gamer, award)}))


# from mysite.chat import consumers

websocket_urlpatterns = [
    re_path("ws/chat/array", ChatConsumer.as_asgi()),
]


application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": AllowedHostsOriginValidator(
            AuthMiddlewareStack(URLRouter(websocket_urlpatterns))
        )
        # Just HTTP for now. (We can add other protocols later.)
    }
)

