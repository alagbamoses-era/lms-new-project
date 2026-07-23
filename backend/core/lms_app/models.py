from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


from django.contrib.auth.password_validation import validate_password

class UserManager(BaseUserManager):

    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError("Email address is required.")

        if not username:
            raise ValueError("Username is required.")

        email = self.normalize_email(email)

        validate_password(password)

        user = self.model(
            email=email,
            username=username,
            **extra_fields
        )

        user.set_password(password)
       

    def create_superuser(self, email, username, password=None, **extra_fields):

        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")

        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(
            email=email,
            username=username,
            password=password,
            **extra_fields
        )
    
class Roles(models.Model):
    role = models.CharField(max_length=100)

    class Meta:
        ordering = ["role"]

    def __str__(self):
        return self.role
    


class Genders(models.Model):
    gender = models.CharField(max_length=50)

    class Meta:
        ordering = ["gender"]

    def __str__(self):
        return self.gender


class Programmes(models.Model):
    programme = models.CharField(max_length=100)

    class Meta:
        ordering = ["programme"]

    def __str__(self):
        return self.programme


class User(AbstractBaseUser, PermissionsMixin):

    username = models.CharField(
        max_length=150,
        unique=True,
        db_index=True,
    )

    email = models.EmailField(
        unique=True,
        db_index=True,
    )

    role = models.ForeignKey(
        Roles,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="users",
    )

    gender = models.ForeignKey(
        Genders,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="users",
    )

    programme = models.ForeignKey(
        Programmes,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="users",
    )

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = UserManager()

    class Meta:
        ordering = ["username"]
        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(self):
        return f"{self.username} ({self.email})"
    
  

class Courses(models.Model):

    title = models.CharField(
        max_length=200,
        db_index=True,
    )

    category = models.CharField(max_length=100)

    description = models.TextField()

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="courses",
    )

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["title"]

    def __str__(self):
        return self.title
    

class Contact(models.Model):

    name = models.CharField(max_length=100)

    email = models.EmailField()

    subject = models.CharField(max_length=200)

    message = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.subject} - {self.name}"