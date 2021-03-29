from rest_framework import serializers

from management.models import Make, Car, Customer, Offer, Broker, Employee


class MakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Make
        fields = ('id', 'name',)
        read_only_fields = ['id']
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
        read_only_fields = ['id']

    def create(self, validated_data):
        make_data = validated_data.pop('make')
        make, created = Make.objects.get_or_create(**make_data)
        car = Car.objects.create(**validated_data, make=make)
        return car

    def update(self, instance, validated_data):
        make_data = validated_data.pop('make')
        make, created = Make.objects.get_or_create(**make_data)
        instance.make = make
        instance.model = validated_data['model']
        instance.year = validated_data['year']
        instance.save()
        return instance



class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('id','first_name', 'last_name', 'phone', 'email')
        read_only_fields = ['id']


class BrokerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Broker
        fields = ('id', 'name',)
        read_only_fields = ['id']


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('id', 'first_name', 'last_name')
        read_only_fields = ['id']


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
        read_only_fields = ['id']

    def to_internal_value(self, data):
        if data.get('over_fracht') == '':
            data['over_fracht'] = 0
        if data.get('over_odprawa') == '':
            data['over_odprawa'] = 0
        if data.get('over_transport_to_pl') == '':
            data['over_transport_to_pl'] = 0
        if data.get('over_hst') == '':
            data['over_hst'] = 0

        return super(OfferSerializer, self).to_internal_value(data)

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

    def update(self, instance, validated_data):
        not_fk = ('vin', 'pay_for_transport', 'ship_documents_to_agency',
                  'over_fracht', 'over_odprawa', 'over_transport_to_pl', 'over_hst')

        car_data = validated_data.pop('car', None)
        if car_data:
            make_data = car_data.pop('make')
            make = Make.objects.get(**make_data)
            car = Car.objects.get(**car_data, make=make)
            if car: instance.car = car

        customer_data = validated_data.pop('customer', None)
        if customer_data:
            customer = Customer.objects.get(**customer_data)
            if customer: instance.customer = customer

        broker_data = validated_data.pop('broker', None)
        if broker_data:
            broker = Broker.objects.get(**broker_data)
            if broker: instance.broker = broker

        employee_data = validated_data.pop('employee', None)
        if employee_data:
            employee = Employee.objects.get(**employee_data)
            if employee: instance.employee = employee

        for key in not_fk:
            setattr(instance, key, validated_data.pop(key, getattr(instance, key, None)))

        instance.save()
        return instance


