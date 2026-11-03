from django.contrib import admin

# Register your models here.
from .models import Category, Tag, Recipe, Ingredient, Step


class IngredientInline(admin.TabularInline):
    model = Ingredient
    extra = 3


class StepInline(admin.TabularInline):
    model = Step
    extra = 3


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'order')
    list_editable = ('order',)
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    search_fields = ('name',)


@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'kcal', 'prep_time', 'is_published', 'created_at')
    list_filter = ('category', 'is_published', 'tags')
    list_editable = ('is_published',)
    search_fields = ('title', 'description')
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ('tags',)
    inlines = [IngredientInline, StepInline]