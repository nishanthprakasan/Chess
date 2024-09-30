from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/play/<int:room_id>/', consumers.ChessConsumer.as_asgi()),
] 
