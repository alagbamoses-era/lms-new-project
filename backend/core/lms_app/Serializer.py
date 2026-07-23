from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from core.lms_app.models import *
from .models import *
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password



User = get_user_model()

class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = '__all__'  
        read_only_fields = ['is_active', 'created', 'updated']

class GendersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genders
        fields = '__all__'  
        read_only_fields = ['is_active', 'created', 'updated']
class ProgrammesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Programmes
        fields = '__all__'  
        read_only_fields = ['is_active', 'created', 'updated']


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    role = RolesSerializer(read_only = True)
    gender = GendersSerializer(read_only = True)
    programme = ProgrammesSerializer(read_only = True) 

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





class LoginSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        data["user"] = {
            "id": self.user.id,
            "username": self.user.username,
            "email": self.user.email,
            "role": RolesSerializer(self.user.role).data if self.user.role else None,
            "gender": GendersSerializer(self.user.gender).data if self.user.gender else None,
            "programme": ProgrammesSerializer(self.user.programme).data if self.user.programme else None,
        }

        return data



    
class ContactSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contact
        fields = "__all__"




class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        validators=[validate_password]
    )

    class Meta:
        model = User
        fields = (
            "username",
            "email",
            "password",
        )

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)