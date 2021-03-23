from django.shortcuts import render

# Create your views here.
from rest_framework import generics, viewsets
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


class OfferViewSet(viewsets.ModelViewSet):
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



