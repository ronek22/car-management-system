from rest_framework import serializers

from management.models import Make, Car, Customer, Offer


class MakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Make
        fields = '__all__'


class CarSerializer(serializers.ModelSerializer):
    make = MakeSerializer(many=False)

    class Meta:
        model = Car
        fields = '__all__'


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class OfferSerializer(serializers.ModelSerializer):
    car = CarSerializer(many=False)
    customer = CustomerSerializer(many=False)

    class Meta:
        model = Offer
        fields = '__all__'
