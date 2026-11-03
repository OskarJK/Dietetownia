from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, RecipeViewSet

router = DefaultRouter()
router.register('recipes', RecipeViewSet, basename='recipe')
router.register('recipe-categories', CategoryViewSet, basename='recipe-category')

urlpatterns = router.urls