from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import DietitianProfile, Service, Stat, Assurance, AboutPoint
from .serializers import (
    DietitianProfileSerializer, ServiceSerializer,
    StatSerializer, AssuranceSerializer, AboutPointSerializer,
)


class HomepageAPIView(APIView):
    """
    Zbiorczy endpoint ze wszystkimi danymi potrzebnymi do zbudowania strony głównej.
    """

    def get(self, request):
        profile = DietitianProfile.objects.first()

        data = {
            'profile': DietitianProfileSerializer(profile, context={'request': request}).data if profile else None,
            'services': ServiceSerializer(Service.objects.all(), many=True).data,
            'stats': StatSerializer(Stat.objects.all(), many=True).data,
            'assurances': AssuranceSerializer(Assurance.objects.all(), many=True).data,
            'about_points': AboutPointSerializer(AboutPoint.objects.all(), many=True).data,
        }
        return Response(data)