
from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response


# for model
from django.contrib.auth.models import User
from base.models import Product
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken


# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# for hashing the password
from django.contrib.auth.hashers import make_password

# for passing the status code
from rest_framework import status


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# def hello(request):
#     test = ['hf', 'jghjgh']
#     return JsonResponse(test, safe=False)


@api_view(['GET'])
def getRoutes(request):
    routes = ['/api/products/', '/api/products/create',
              '/api/products/upload/', '/api/products/<id>/reviews/', '/api/products/top/', '/api/products/<id>/', '/api/products/delete/<id>/', '/api/products/<update>/<id>/']
    return Response(routes)


@api_view(['POST'])
def registerUser(request):
    data = request.data

    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        # converting json serializer to json
        serializers = UserSerializerWithToken(user, many=False)
        return Response(serializers.data)

    except:
        message = {'detail': 'User with this email already exits'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user

    # converting json serializer to json
    serializers = UserSerializer(user, many=False)

    return Response(serializers.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    # converting json serializer to json
    serializers = UserSerializer(users, many=True)
    return Response(serializers.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    # converting json serializer to json
    serializers = UserSerializerWithToken(user, many=False)

    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    return Response(serializers.data)
