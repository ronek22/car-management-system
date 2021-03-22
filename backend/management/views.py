from django.shortcuts import render

# Create your views here.
from rest_framework import generics

from management.models import Offer
from management.serializers import OfferSerializer


# class OfferViewSet(viewsets.ModelViewSet):
#     """
#     retrieve:
#     Return the given offer.
#
#     list:
#     Return a list of all existing offers
#
#     create:
#     Create a new offer instance
#     """
#
#     queryset = Offer.objects.all()
#     serializer_class = OfferDetailSerializer
#     # detail_serializer_class = OfferDetailSerializer
#     ordering_fields = '__all__'
#
#     # def get_serializer_class(self):
#     #     """
#     #     Determines which serializer to user `list` or `detail`
#     #     """
#     #     if self.action == 'retrieve':
#     #         if hasattr(self, 'detail_serializer_class'):
#     #             return self.detail_serializer_class
#     #     return super().get_serializer_class()
#
#     def create(self, request):
#         """
#         to parse the incoming request and create a new offer or update existing
#         """
#
#         car = request.data.pop('car')
#         make = car.pop('make')
#         employee = request.data.pop('employee')
#         broker = request.data.pop('broker')
#         customer = request.data.pop('customer')
#         make = Make.objects.create_or_update(**make)
#         car = Car.objects.create(**car, make=make)
#         customer = Customer.objects.create(**customer)
#         employee = Employee.objects.create(**employee)
#         broker = Broker.objects.create(**broker)
#         offer = Offer.objects.create(**request.data,
#                                      car=car,
#                                      customer=customer,
#                                      employee=employee,
#                                      broker=broker)
#
#         return Response(status=status.HTTP_201_CREATED)


class OfferListView(generics.ListAPIView):
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer


class OfferCreateView(generics.CreateAPIView):
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer
