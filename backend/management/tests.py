from django.test import TestCase

# Create your tests here.
from management.models import Make, Car, Customer


class CarTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.make = Make.objects.create(name="AUDI")
        cls.car = Car.objects.create(make=cls.make, model="A4", year="2010")

    def test_creating_car(self):
        self.assertEqual(str(self.car), "2010 AUDI A4")

    def test_creating_customer(self):
        customer = Customer.objects.create(
            first_name="Jan",
            last_name="Kowalski",
            phone="505333120",
            email="admin@admin.com",
        )

        self.assertEqual(customer.first_name, "Jan")
