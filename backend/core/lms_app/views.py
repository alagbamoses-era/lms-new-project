from django.shortcuts import render
from rest_framework import viewsets, filters, permissions, status
from .models import *   
from .Serializer import *
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse
from rest_framework_simplejwt.views import TokenObtainPairView
from .Serializer import LoginSerializer
from .models import Contact
from .Serializer import ContactSerializer
from rest_framework.permissions import AllowAny



# Create your views here.

def home(request):
    return HttpResponse("Welcome to the LMS API")

class UserViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'post']
    queryset = User.objects.select_related('role', 'gender', 'programme')
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['updated']
    ordering = ['-updated']

    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]

        obj = User.objects.get(lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj


class CoursesViewSet(viewsets.ModelViewSet):
    queryset = Courses.objects.all()
    serializer_class = CoursesSerializer
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        queryset = Courses.objects.all()
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



class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer


class ContactViewSet(viewsets.ModelViewSet):

    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
