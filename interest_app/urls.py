from django.urls import path
from .views import *

urlpatterns = [
    path('register/', user_register, name='user-register'),
    path('login/', user_login, name='user-login'),
    path('users/', user_list, name='user-list'),
    path('user-details/', user_details, name='user-details'),

    path('interests/', interest_list, name='interest-list'),
    path('interests/create/', interest_create, name='interest-create'),
    path('interests/<int:pk>/update/', interest_update, name='interest-update'),
    path('interests/sent/', sent_interests_list, name='sent_interests_list'),
    path('interests/received/', received_interests_list, name='received_interests_list'),
    path('interests/<int:pk>/', interest_delete, name='interest-delete'),
    path('interests/<int:pk>/reject/', reject_interest, name='interest-reject'),  # New URL pattern

    path('friends/', friend_list_view, name='friend-list'),

    path('chat-messages/<str:room_name>/', chat_message_list, name='chat-message-list'),
    path('chat-messages/', chat_message_create, name='chat-message-create'),

    path('messages/<str:friend_username>/', fetch_old_messages, name='fetch_old_messages'),
]
