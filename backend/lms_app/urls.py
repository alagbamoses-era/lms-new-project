from django.contrib import admin
from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('courses', CoursesViewSet, basename='courses')
router.register('users', UserViewSet, basename='users')
router.register('roles', RolesViewSet, basename='roles')
router.register('genders', GendersViewSet, basename='genders')
router.register('programmes', ProgrammesViewSet, basename='programmes') 



urlpatterns = router.urls