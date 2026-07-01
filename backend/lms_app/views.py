from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import *   
from .Serializer import *
from rest_framework.response import Response

# Create your views here.

class CoursesViewSet(viewsets.ModelViewSet):
    queryset = Courses.objects.all()
    serializer_class = CoursesSerializer
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        queryset = Courses.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

class UserViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]
    
    
    def list(self, request):
        queryset = Users.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)   
     
class RolesViewSet(viewsets.ModelViewSet):
    queryset = Roles.objects.all()
    serializer_class = RolesSerializer
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        queryset = Roles.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)    

class GendersViewSet(viewsets.ModelViewSet):
    queryset = Genders.objects.all()
    serializer_class = GendersSerializer
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        queryset = Genders.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)    

class ProgrammesViewSet(viewsets.ModelViewSet):
    queryset = Programmes.objects.all()
    serializer_class = ProgrammesSerializer
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        queryset = Programmes.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)            

