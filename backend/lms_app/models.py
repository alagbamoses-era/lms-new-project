from django.db import models


# Create your models here.

class Users(models.Model):
    name = models.CharField(max_length=100)
    programme = models.CharField(max_length=100)
    created_at = models.TimeField(auto_now_add=True)
    modified_at = models.TimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Roles(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    created_at = models.TimeField(auto_now_add=True)
    modified_at = models.TimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Genders(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    created_at = models.TimeField(auto_now_add=True)
    modified_at = models.TimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Programmes(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    created_at = models.TimeField(auto_now_add=True)
    modified_at = models.TimeField(auto_now_add=True)

    def __str__(self):
        return self.name

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
