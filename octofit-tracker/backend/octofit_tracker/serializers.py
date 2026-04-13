from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['id', 'username', 'email', 'first_name', 'last_name']

class TeamSerializer(serializers.ModelSerializer):
	class Meta:
		model = Team
		fields = ['id', 'name']

class ActivitySerializer(serializers.ModelSerializer):
	user = serializers.StringRelatedField()
	team = serializers.StringRelatedField()
	class Meta:
		model = Activity
		fields = ['id', 'user', 'activity_type', 'duration', 'team']

class LeaderboardSerializer(serializers.ModelSerializer):
	team = serializers.StringRelatedField()
	class Meta:
		model = Leaderboard
		fields = ['id', 'team', 'points']

class WorkoutSerializer(serializers.ModelSerializer):
	class Meta:
		model = Workout
		fields = ['id', 'name', 'description']
