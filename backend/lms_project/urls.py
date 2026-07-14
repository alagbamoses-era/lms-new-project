from django.contrib import admin
from django.urls import path, include
from core.lms_app.views import home, LoginView, RegisterView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),

    path("", home, name="home"),

    path(
        "api/auth/login/",
        LoginView.as_view(),
        name="login",
    ),

    path("api/auth/register/", RegisterView.as_view(), name="register"),

    path(
        "api/auth/refresh/",
        TokenRefreshView.as_view(),
        name="refresh",
    ),

    path(
        "api/",
        include(("core.routers", "core"), namespace="core-api"),
    ),
]