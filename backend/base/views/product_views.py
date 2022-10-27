
from django.shortcuts import render


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response


# for model

from base.models import Product
from base.serializers import ProductSerializer


# for passing the status code
from rest_framework import status


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    # converting json serializer to json
    serializers = ProductSerializer(products, many=True)
    return Response(serializers.data)


@api_view(['GET'])
def getProduct(request, pk):

    product = Product.objects.get(_id=pk)
    serializers = ProductSerializer(product, many=False)
    return Response(serializers.data)
