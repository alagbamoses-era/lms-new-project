from rest_framework import serializers
from .models import *


class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'
class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = '__all__'  
class GendersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genders
        fields = '__all__'  
class ProgrammesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Programmes
        fields = '__all__'  

