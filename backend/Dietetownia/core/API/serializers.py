from rest_framework import serializers
from ..models import DietitianProfile, Service, Stat, Assurance, AboutPoint


class DietitianProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DietitianProfile
        fields = [
            'name', 'tagline', 'bio', 'years_of_experience', 'photo',
            'address', 'phone', 'email', 'working_hours',
        ]


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'title', 'description', 'icon', 'order']


class StatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stat
        fields = ['id', 'number', 'label', 'order']


class AssuranceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assurance
        fields = ['id', 'text', 'order']


class AboutPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutPoint
        fields = ['id', 'icon', 'title', 'description', 'order']