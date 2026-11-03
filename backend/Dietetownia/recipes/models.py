from django.db import models

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True, help_text='np. Desery, Zupy')
    slug = models.SlugField(unique=True, help_text='Automatycznie uzupełniane')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Kategoria'
        verbose_name_plural = 'Kategorie'

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True, help_text='np. "wegańskie", "bez glutenu"')

    class Meta:
        ordering = ['name']
        verbose_name = 'Tag'
        verbose_name_plural = 'Tagi'

    def __str__(self):
        return self.name


class Recipe(models.Model):
    title = models.CharField(max_length=200, help_text='np. Pomidorowa')
    slug = models.SlugField(unique=True, help_text='Automatycznie uzupełniane')
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='recipes')
    description = models.TextField()
    prep_time = models.CharField(max_length=50, help_text='np. "10 min" albo "5 min + noc"')
    kcal = models.PositiveIntegerField()
    image = models.ImageField(upload_to='recipes/', blank=True, null=True)
    tags = models.ManyToManyField(Tag, blank=True, related_name='recipes')
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Przepis'
        verbose_name_plural = 'Przepisy'

    def __str__(self):
        return self.title


class Ingredient(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='ingredients')
    name = models.CharField(max_length=150, help_text='np. Pomidor, mango etc.')
    amount = models.CharField(max_length=50, blank=True, help_text='np. "2 szt.", "100 g"')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Składnik'
        verbose_name_plural = 'Składniki'

    def __str__(self):
        return f'{self.amount} {self.name}'.strip()


class Step(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='steps')
    content = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Krok'
        verbose_name_plural = 'Kroki'

    def __str__(self):
        return f'{self.order}. {self.content[:40]}'