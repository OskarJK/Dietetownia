from django.db import IntegrityError
from django.db.models.deletion import ProtectedError
from django.test import TestCase

from .models import Category, Ingredient, Recipe, Step, Tag


class CategoryModelTest(TestCase):
  """Testy dla modelu Category."""

  def setUp(self):
    self.category = Category.objects.create(
        name='Zupy', slug='zupy', order=1
    )

  def test_category_str(self):
    """Sprawdza metodę __str__."""
    self.assertEqual(str(self.category), 'Zupy')

  def test_unique_name_constraint(self):
    """Sprawdza, czy nazwa kategorii musi być unikalna."""
    with self.assertRaises(IntegrityError):
      Category.objects.create(name='Zupy', slug='inna-kategoria', order=2)

  def test_unique_slug_constraint(self):
    """Sprawdza, czy slug kategorii musi być unikalny."""
    with self.assertRaises(IntegrityError):
      Category.objects.create(name='Inna nazwa', slug='zupy', order=2)

  def test_default_ordering(self):
    """Sprawdza domyślne sortowanie po polu 'order'."""
    Category.objects.create(name='Desery', slug='desery', order=0)
    categories = Category.objects.all()
    self.assertEqual(categories[0].name, 'Desery')
    self.assertEqual(categories[1].name, 'Zupy')


class TagModelTest(TestCase):
  """Testy dla modelu Tag."""

  def setUp(self):
    self.tag = Tag.objects.create(name='wegańskie')

  def test_tag_str(self):
    """Sprawdza metodę __str__."""
    self.assertEqual(str(self.tag), 'wegańskie')

  def test_unique_name(self):
    """Sprawdza unikalność nazwy tagu."""
    with self.assertRaises(IntegrityError):
      Tag.objects.create(name='wegańskie')

  def test_alphabetical_ordering(self):
    """Sprawdza domyślne sortowanie alfabetyczne po nazwie."""
    Tag.objects.create(name='bez glutenu')
    tags = Tag.objects.all()
    self.assertEqual(tags[0].name, 'bez glutenu')
    self.assertEqual(tags[1].name, 'wegańskie')


class RecipeModelTest(TestCase):
  """Testy dla modelu Recipe oraz jego relacji."""

  def setUp(self):
    self.category = Category.objects.create(name='Obiady', slug='obiady')
    self.tag1 = Tag.objects.create(name='szybkie')
    self.tag2 = Tag.objects.create(name='fit')

    self.recipe = Recipe.objects.create(
        title='Pomidorowa',
        slug='pomidorowa',
        category=self.category,
        description='Tradycjna zupa pomidorowa.',
        prep_time='30 min',
        kcal=350,
        is_published=True,
    )
    self.recipe.tags.add(self.tag1, self.tag2)

  def test_recipe_str(self):
    """Sprawdza metodę __str__."""
    self.assertEqual(str(self.recipe), 'Pomidorowa')

  def test_recipe_relations(self):
    """Sprawdza powiązania z kategorią i tagami."""
    self.assertEqual(self.recipe.category, self.category)
    self.assertEqual(self.recipe.tags.count(), 2)
    self.assertIn(self.tag1, self.recipe.tags.all())

  def test_category_protect_on_delete(self):
    """Sprawdza, czy kategoria jest chroniona przed usunięciem, gdy przypisane są do niej przepisy."""
    with self.assertRaises(ProtectedError):
      self.category.delete()


class IngredientModelTest(TestCase):
  """Testy dla modelu Ingredient."""

  def setUp(self):
    category = Category.objects.create(name='Zupy', slug='zupy')
    self.recipe = Recipe.objects.create(
        title='Barszcz',
        slug='barszcz',
        category=category,
        description='Czerwony barszcz.',
        prep_time='45 min',
        kcal=150,
    )
    self.ingredient = Ingredient.objects.create(
        recipe=self.recipe, name='Buraki', amount='3 szt.', order=1
    )

  def test_ingredient_str(self):
    """Sprawdza metodę __str__ z uwzględnieniem ilości i nazwy."""
    self.assertEqual(str(self.ingredient), '3 szt. Buraki')

  def test_ingredient_str_without_amount(self):
    """Sprawdza metodę __str__, gdy ilość jest pusta."""
    ing_no_amount = Ingredient.objects.create(
        recipe=self.recipe, name='Sól', amount='', order=2
    )
    self.assertEqual(str(ing_no_amount), 'Sól')

  def test_cascade_delete_with_recipe(self):
    """Sprawdza, czy składniki są automatycznie usuwane po usunięciu przepisu."""
    self.assertEqual(Ingredient.objects.count(), 1)
    self.recipe.delete()
    self.assertEqual(Ingredient.objects.count(), 0)


class StepModelTest(TestCase):
  """Testy dla modelu Step."""

  def setUp(self):
    category = Category.objects.create(name='Desery', slug='desery')
    self.recipe = Recipe.objects.create(
        title='Ciasto',
        slug='ciasto',
        category=category,
        description='Słodkie ciasto.',
        prep_time='1 h',
        kcal=500,
    )
    self.step = Step.objects.create(
        recipe=self.recipe,
        content='Wymieszaj mąkę z jajkami i cukrem.',
        order=1,
    )

  def test_step_str(self):
    """Sprawdza metodę __str__ (numer i skrócona treść)."""
    self.assertEqual(str(self.step), '1. Wymieszaj mąkę z jajkami i cukrem.')

  def test_cascade_delete_with_recipe(self):
    """Sprawdza, czy kroki są automatycznie usuwane po usunięciu przepisu."""
    self.assertEqual(Step.objects.count(), 1)
    self.recipe.delete()
    self.assertEqual(Step.objects.count(), 0)