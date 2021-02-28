from django.shortcuts import render

# Create your views here.
from rest_framework import generics

from management.models import Offer
from management.serializers import OfferSerializer


class OfferListView(generics.ListAPIView):
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer


class OfferCreateView(generics.CreateAPIView):
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer

