
from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response


# for model
from django.contrib.auth.models import User
from .models import Product
from .serializers import ProductSerializer, UserSerializer, UserSerializerWithToken


# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# for hashing the password
from django.contrib.auth.hashers import make_password

# for passing the status code
from rest_framework import status
