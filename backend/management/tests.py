from django.test import TestCase

# Create your tests here.
from management.models import Make, Car


class CarTestCase(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.make = Make.objects.create(name="AUDI")
        cls.car = Car.objects.create(make=cls.make, model="A4", year="2010")

    def test_creating_car(self):
        self.assertEqual(str(self.car), "2010 AUDI A4")