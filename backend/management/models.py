from django.db import models


class Make(models.Model):
    name = models.CharField(max_length=60, unique=True)

    class Meta:
        db_table = "makes"

    def __str__(self):
        return self.name


class Car(models.Model):
    make = models.ForeignKey(Make, on_delete=models.CASCADE)
    model = models.CharField(max_length=100)
    year = models.CharField(max_length=4)

    class Meta:
        db_table = "cars"
        unique_together = ('make', 'model', 'year')

    def __str__(self):
        return f"{self.year} {self.make} {self.model}"


class Customer(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=40)
    phone = models.CharField(max_length=12)
    email = models.EmailField()


class Broker(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Employee(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=40)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Offer(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    vin = models.CharField(max_length=17)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    pay_for_transport = models.DateField(null=True, blank=True)
    ship_documents_to_agency = models.DateField(null=True, blank=True)
    additional_data = models.CharField(max_length=200, null=True, blank=True)
    broker = models.ForeignKey(Broker, on_delete=models.CASCADE)
    over_fracht = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    over_odprawa = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    over_transport_to_pl = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    over_hst = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)



