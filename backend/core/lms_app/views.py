from django.http import HttpResponse

from rest_framework import filters, generics, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated

from rest_framework_simplejwt.views import TokenObtainPairView

from .models import (
    User,
    Roles,
    Genders,
    Programmes,
    Courses,
    Contact,
)

from .Serializer import (
    UserSerializer,
    RolesSerializer,
    GendersSerializer,
    ProgrammesSerializer,
    CoursesSerializer,
    ContactSerializer,
    LoginSerializer,
    RegisterSerializer,
)


def home(request):
    return HttpResponse("Welcome to the LMS API")



class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]



class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.select_related(
        "role",
        "gender",
        "programme",
    )

    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [filters.OrderingFilter]

    ordering_fields = [
        "username",
        "email",
        "created_at",
        "modified_at",
    ]

    ordering = ["-modified_at"]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return self.queryset

        return self.queryset.filter(pk=self.request.user.pk)



class CoursesViewSet(viewsets.ModelViewSet):
    queryset = Courses.objects.select_related("user")
    serializer_class = CoursesSerializer
    permission_classes = [AllowAny]



class RolesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Roles.objects.all()
    serializer_class = RolesSerializer
    permission_classes = [AllowAny]



class GendersViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Genders.objects.all()
    serializer_class = GendersSerializer
    permission_classes = [AllowAny]



class ProgrammesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Programmes.objects.all()
    serializer_class = ProgrammesSerializer
    permission_classes = [AllowAny]



class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [AllowAny]