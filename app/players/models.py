from django.db import models
from django.contrib.auth.models import User

class Player(models.Model):
	user = models.OneToOneField(User)
	displayName = models.CharField(max_length=100)
	