from django.urls import path
from .views import register, user_login,play,user_logout, update_action , checkOpp
urlpatterns = [
    path('register/', register, name='register'),
    path('login/', user_login, name='login'),
    path('play/', play, name='play'),
    path('logout/',user_logout,name='logout'),
    path('update_action/', update_action, name='update_action'),
    path('checkOpp/', checkOpp, name='checkOpp'),
]
