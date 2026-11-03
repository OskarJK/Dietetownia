from rest_framework import viewsets
from ..models import Category, Recipe
from .serializers import CategorySerializer, RecipeListSerializer, RecipeDetailSerializer


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = None


class RecipeViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Lista:    GET /api/recipes/?category=sniadanie
    Szczegóły: GET /api/recipes/<slug>/
    """
    lookup_field = 'slug'

    def get_queryset(self):
        qs = (
            Recipe.objects.filter(is_published=True)
            .select_related('category')
            .prefetch_related('tags', 'ingredients', 'steps')
        )
        category = self.request.query_params.get('category')
        if category:
            qs = qs.filter(category__slug=category)
        return qs

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return RecipeDetailSerializer
        return RecipeListSerializer