from rest_framework import serializers
from ..models import Category, Tag, Recipe, Ingredient, Step


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['name', 'amount']


class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = ['order', 'content']


class RecipeListSerializer(serializers.ModelSerializer):
    """Lekka wersja do kart na liście."""
    category = CategorySerializer(read_only=True)
    tags = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')

    class Meta:
        model = Recipe
        fields = ['id', 'title', 'slug', 'category', 'description',
                  'prep_time', 'kcal', 'image', 'tags']


class RecipeDetailSerializer(RecipeListSerializer):
    """Pełna wersja ze składnikami i krokami."""
    ingredients = IngredientSerializer(many=True, read_only=True)
    steps = StepSerializer(many=True, read_only=True)

    class Meta(RecipeListSerializer.Meta):
        fields = RecipeListSerializer.Meta.fields + ['ingredients', 'steps']