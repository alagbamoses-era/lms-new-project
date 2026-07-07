from rest_framework.routers import DefaultRouter
from core.lms_app.views import (
    UserViewSet,
    CoursesViewSet,
    RolesViewSet,
    GendersViewSet,
    ProgrammesViewSet,
)

router = DefaultRouter()

router.register(r'users', UserViewSet, basename='users')
router.register(r'courses', CoursesViewSet, basename='courses')
router.register(r'roles', RolesViewSet, basename='roles')
router.register(r'genders', GendersViewSet, basename='genders')
router.register(r'programmes', ProgrammesViewSet, basename='programmes')

urlpatterns = router.urls