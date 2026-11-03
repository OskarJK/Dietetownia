from django.urls import path
from .views import HomepageAPIView

urlpatterns = [
    path('homepage/', HomepageAPIView.as_view(), name='homepage'),
]