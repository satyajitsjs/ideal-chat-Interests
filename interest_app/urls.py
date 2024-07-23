from django.urls import path
from .views import *

urlpatterns = [
    path('register/', user_register, name='user-register'),
    path('login/', user_login, name='user-login'),
    path('users/', user_list, name='user-list'),
    path('own-details/', own_details, name='own-details'),
    path('interests/', interest_list, name='interest-list'),
    path('interests/create/', interest_create, name='interest-create'),
    path('interests/<int:pk>/update/', interest_update, name='interest-update'),
    path('chat-messages/', chat_message_list, name='chat-message-list'),
    path('chat-messages/create/', chat_message_create, name='chat-message-create'),
]