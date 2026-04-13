from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
	email = models.EmailField(unique=True)

class Team(models.Model):
	name = models.CharField(max_length=100, unique=True)
	def __str__(self):
		return self.name

class Activity(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	activity_type = models.CharField(max_length=100)
	duration = models.IntegerField()
	team = models.ForeignKey(Team, on_delete=models.CASCADE)
	def __str__(self):
		return f"{self.user.username} - {self.activity_type}"

class Leaderboard(models.Model):
	team = models.ForeignKey(Team, on_delete=models.CASCADE)
	points = models.IntegerField()
	def __str__(self):
		return f"{self.team.name}: {self.points}"

class Workout(models.Model):
	name = models.CharField(max_length=100)
	description = models.TextField()
	def __str__(self):
		return self.name
