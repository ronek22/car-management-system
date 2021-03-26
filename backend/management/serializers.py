from rest_framework import serializers

from management.models import Make, Car, Customer, Offer, Broker, Employee


class MakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Make
        fields = ('name',)
        extra_kwargs = {
            'name': {
                'validators': [],
            }
        }


class CarSerializer(serializers.ModelSerializer):
    make = MakeSerializer(many=False)

    class Meta:
        model = Car
        fields = ('id', 'make', 'model', 'year')

    def create(self, validated_data):
        make_data = validated_data.pop('make')
        make, created = Make.objects.get_or_create(**make_data)
        print(f"Created: {created}")
        car = Car.objects.create(**validated_data, make=make)
        return car


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('first_name', 'last_name', 'phone', 'email')


class BrokerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Broker
        fields = ('name',)


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('first_name', 'last_name')


class OfferListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = ('vin', 'pay_for_transport', 'ship_documents_to_agency',
                  'over_fracht', 'over_odprawa', 'over_transport_to_pl', 'over_hst')


class OfferSerializer(serializers.ModelSerializer):
    car = CarSerializer(many=False)
    customer = CustomerSerializer(many=False)
    broker = BrokerSerializer(many=False)
    employee = EmployeeSerializer(many=False)

    class Meta:
        model = Offer
        fields = '__all__'

    def create(self, validated_data):
        car_data = validated_data.pop('car', None)
        make_data = car_data.pop('make')
        make, _ = Make.objects.get_or_create(**make_data)
        car = Car.objects.create(**car_data, make=make)
        customer_data = validated_data.pop('customer', None)
        customer, _ = Customer.objects.get_or_create(**customer_data)
        broker_data = validated_data.pop('broker', None)
        broker, _ = Broker.objects.get_or_create(**broker_data)
        employee_data = validated_data.pop('employee', None)
        employee, _ = Employee.objects.get_or_create(**employee_data)

        offer = Offer.objects.create(car=car, customer=customer,
                                     broker=broker, employee=employee, **validated_data)

        return offer
