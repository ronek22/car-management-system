from django.urls import path

from management.views import OfferListView, OfferCreateView

urlpatterns = [
    path('', OfferListView.as_view(), name='offer-list'),
    path('create', OfferCreateView.as_view(), name='offer-create'),
]