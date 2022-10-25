from itertools import product
from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response


# from .products import products
from .models import Product
from .seralizers import ProductSerializer
# Create your views here.


def hello(request):
    test = ['hf', 'jghjgh']
    return JsonResponse(test, safe=False)


@api_view(['GET'])
def getRoutes(request):
    routes = ['/api/products/', '/api/products/create',
              '/api/products/upload/', '/api/products/<id>/reviews/', '/api/products/top/', '/api/products/<id>/', '/api/products/delete/<id>/', '/api/products/<update>/<id>/']
    return Response(routes)


@api_view(['GET'])
def getProducts(request):

    products = Product.objects.all()
    print(products)
    # converting json serializer to json
    serializers = ProductSerializer(products, many=True)
    print(serializers)

    return Response(serializers.data)


@api_view(['GET'])
def getProduct(request, pk):

    product = Product.objects.get(_id=pk)
    serializers = ProductSerializer(product, many=False)
    return Response(serializers.data)
