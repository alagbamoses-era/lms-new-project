from django.db import models


# Create your models here.

class Users(models.Model):

    First_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    role = models.CharField(max_length=50)
    gender = models.CharField(max_length=50)
    programme = models.CharField(max_length=100)
    created_at = models.TimeField(auto_now_add=True)
    modified_at = models.TimeField(auto_now_add=True)

    def __str__(self):
        return self.First_name
    

class Courses(models.Model):

    name = models.CharField(max_length=100)
    cerification = models.CharField(max_length=100)
    level = models.CharField(max_length=50)
    duration = models.IntegerField(null=True)
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    created_at = models.TimeField(auto_now_add=True)
    modified_at = models.TimeField(auto_now_add=True)


    def __str__(self):
        return self.name
