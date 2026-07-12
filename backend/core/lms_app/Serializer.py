from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from core.lms_app.models import *
from .models import *
from django.contrib.auth import get_user_model
from .models import Contact

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "password",
            "role",
            "gender",
            "programme",
        )

    def create(self, validated_data):
        password = validated_data.pop("password")

        user = User(**validated_data)
        user.set_password(password)
        user.save()

        return user


class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = '__all__'
        read_only_field = ['is_active', 'created', 'updated']

class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = '__all__'  
        read_only_field = ['is_active', 'created', 'updated']

class GendersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genders
        fields = '__all__'  
        read_only_field = ['is_active', 'created', 'updated']
class ProgrammesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Programmes
        fields = '__all__'  
        read_only_field = ['is_active', 'created', 'updated']


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class LoginSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        data["user"] = {
            "id": self.user.id,
            "username": self.user.username,
            "email": self.user.email,
        }

        return data
    
class ContactSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contact
        fields = "__all__"
