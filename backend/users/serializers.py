from rest_framework import serializers
from .models import User
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import get_user_model, authenticate

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ('id', 'email', 'password')

    def create(self, validated_data):
        email = validated_data['email']
        password = validated_data['password']
        username = email.replace('@', '_').replace('.', '_')
        user = User.objects.create_user(
            email=email,
            username=username,
            password=password
        )
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_premium')


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        username = email.replace('@', '_').replace('.', '_')
        user = authenticate(username=username, password=password)
        if not user:
            raise serializers.ValidationError("Invalid email or password")
        data['user'] = user
        return data
