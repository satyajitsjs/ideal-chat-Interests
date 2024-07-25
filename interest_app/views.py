from django.shortcuts import render
from rest_framework.decorators import api_view , permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from .serializers import *
from .models import *
from django.db.models import Q

@api_view(['POST'])
def user_register(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def user_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        user_serializer = UserSerializer(user)
        return Response({
            'token': token.key,
            'user': user_serializer.data
        }, status=status.HTTP_200_OK)

    return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_list(request):
    current_user = request.user
    sent_requests = Interest.objects.filter(sender=current_user).values_list('recipient', flat=True)
    if current_user.is_superuser or current_user.is_staff:
        users = User.objects.exclude(id__in=sent_requests).exclude(is_superuser=True)
    else:
        users = User.objects.exclude(id=current_user.id).exclude(id__in=sent_requests).exclude(is_superuser=True)

    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_details(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def interest_create(request):
    data = request.data.copy()
    data['sender'] = request.user.id

    serializer = InterestSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def interest_list(request):
    user = request.user
    interests = Interest.objects.filter(
        Q(sender=user) | Q(recipient=user)
    )
    serializer = InterestSerializer(interests, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def interest_update(request, pk):
    try:
        interest = Interest.objects.get(pk=pk)
    except Interest.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    print(request.data)

    serializer = InterestSerializer(interest, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def interest_delete(request, pk):
    try:
        interest = Interest.objects.get(pk=pk, sender=request.user)
    except Interest.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    interest.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

def get_friends(user):
    accepted_interests = Interest.objects.filter(
        (models.Q(sender=user) | models.Q(recipient=user)) & models.Q(accepted=True)
    )

    friends = set()
    for interest in accepted_interests:
        if interest.sender == user:
            friends.add(interest.recipient)
        else:
            friends.add(interest.sender)

    return friends


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def friend_list_view(request):
    user = request.user
    friends = get_friends(user)
    serializer = UserSerializer(friends, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def chat_message_list(request, room_name):
    user = request.user
    chat_messages = ChatMessage.objects.filter(
        Q(room_name=room_name) & (Q(sender=user) | Q(recipient=user))
    ).order_by('created_at')
    serializer = ChatMessageSerializer(chat_messages, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def chat_message_create(request):
    serializer = ChatMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def fetch_old_messages(request, friend_username):
    user = request.user
    messages = ChatMessage.objects.filter(
        sender__username=user.username, recipient__username=friend_username
    ) | ChatMessage.objects.filter(
        sender__username=friend_username, recipient__username=user.username
    )
    serializer = ChatMessageSerializer(messages, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def sent_interests_list(request):
    user = request.user
    sent_interests = Interest.objects.filter(sender=user)
    serializer = InterestSerializer(sent_interests, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def received_interests_list(request):
    user = request.user
    received_interests = Interest.objects.filter(recipient=user)
    serializer = InterestSerializer(received_interests, many=True)
    return Response(serializer.data)