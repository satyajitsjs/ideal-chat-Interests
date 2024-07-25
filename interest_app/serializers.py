from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Interest, ChatMessage


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class InterestSerializer(serializers.ModelSerializer):
    sender = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)
    recipient = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Interest
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['sender'] = UserSerializer(instance.sender).data
        representation['recipient'] = UserSerializer(instance.recipient).data
        return representation

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = '__all__'
