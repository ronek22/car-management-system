from django.db.models import F
from django.shortcuts import render

# Create your views here.
from rest_framework import generics, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from conf.core import MyPagination, LimitPagination
from management.models import Customer, Offer, Employee, Broker, Car, Make
from management.serializers import OfferSerializer, CustomerSerializer, EmployeeSerializer, BrokerSerializer, \
    CarSerializer, MakeSerializer


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class BrokerViewSet(viewsets.ModelViewSet):
    queryset = Broker.objects.all()
    serializer_class = BrokerSerializer


class MakeViewSet(viewsets.ModelViewSet):
    queryset = Make.objects.all()
    serializer_class = MakeSerializer


class CarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer

    @action(detail=False, methods=['get'], url_path='all_models')
    def all_models(self, request):
        cars = Car.objects.values('model', brand=F('make__name')).distinct().order_by()
        return Response(cars, 200)



class OfferViewSet(viewsets.ModelViewSet):
    pagination_class = MyPagination
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer


# class OfferListView(generics.ListAPIView):
#     queryset = Offer.objects.all()
#     serializer_class = OfferSerializer
#
#
# class OfferCreateView(generics.CreateAPIView):
#     queryset = Offer.objects.all()
#     serializer_class = OfferSerializer



