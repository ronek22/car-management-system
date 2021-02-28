from django.contrib import admin

# Register your models here.
from management.models import Make, Car, Customer, Offer

admin.site.register(Make)
admin.site.register(Car)
admin.site.register(Customer)
admin.site.register(Offer)
