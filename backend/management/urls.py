from rest_framework.routers import DefaultRouter

from management import views

app_name = "management"
router = DefaultRouter()

router.register(r"customers", views.CustomerViewSet)
router.register(r"employees", views.EmployeeViewSet)
router.register(r"brokers", views.BrokerViewSet)
router.register(r"makes", views.MakeViewSet)
router.register(r"cars", views.CarViewSet)
router.register(r"offers", views.OfferViewSet)
