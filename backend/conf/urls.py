"""conf URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework.routers import DefaultRouter
from rest_framework.schemas import get_schema_view
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from management.urls import router as management_router

router = DefaultRouter()
router.registry.extend(management_router.registry)


schema_view = get_schema_view(
    title="Car Management API",
    description="An API to create offers, client, cars, employees",
)

rest_api_routes = [
    path("", include(router.urls)),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh", TokenRefreshView.as_view(), name="token_refresh"),
]

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(rest_api_routes)),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("schema/", schema_view),
    path("docs/", include_docs_urls(title="Car Management API")),
]
