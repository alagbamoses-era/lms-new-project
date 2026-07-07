from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.auth.models import Group


# Create your models here.

class UserManager(BaseUserManager):

    def create_user(self, email, username=None, password=None, **kwargs):
        if not email:
            raise TypeError("Users must have an email.")

        user = self.model(
            email=self.normalize_email(email),
            username=username
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, username=None, password=None):
        user = self.create_user(
            email=email,
            username=username,
            password=password
        )

        user.is_superuser = True
        user.is_staff = True
        user.is_active = True
        user.save(using=self._db)

        return user

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(db_index=True, max_length=255, unique=True)
    email = models.EmailField(db_index=True, unique=True,  null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'

    objects = UserManager()

    def __str__(self):
        return f"{self.email}"


class Roles(models.Model):
    role = models.CharField(max_length=100)
    description = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.TimeField(auto_now_add=True)
    modified_at = models.TimeField(auto_now_add=True)

    def __str__(self):
        return self.role

class Genders(models.Model):
    gender = models.CharField(max_length=50)
    description = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.TimeField(auto_now_add=True)
    modified_at = models.TimeField(auto_now_add=True)

    def __str__(self):
        return self.gender

class Programmes(models.Model):
    programme = models.CharField(max_length=100)
    description = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)   
    created_at = models.TimeField(auto_now_add=True)
    modified_at = models.TimeField(auto_now_add=True)

    def __str__(self):
        return self.programme


class Courses(models.Model):
    course = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.TimeField(auto_now_add=True)
    modified_at = models.TimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)


    def __str__(self):
        return self.course
