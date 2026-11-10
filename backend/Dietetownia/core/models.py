from django.db import models

# Create your models here.
from django.db import models


class DietitianProfile(models.Model):
    """
    Dane dietetyczki — singleton (jeden rekord w całej bazie).
    Wypełniany i edytowany przez nią samą w Django Admin.
    """
    name = models.CharField(max_length=150)
    tagline = models.CharField(
        max_length=200,
        help_text='Krótki podpis, np. "Pasjonatka dietetyki"',
        blank=True,
    )
    bio = models.TextField(help_text='Główny opis widoczny w sekcji "O mnie" *')
    years_of_experience = models.PositiveIntegerField(default=0)
    photo = models.ImageField(upload_to='profile/', blank=True, null=True, help_text='Zdjęcie główne na stronie')
    about_photo = models.ImageField(
        upload_to='profile/',
        blank=True,
        null=True,
        help_text='Zdjęcie w sekcji "O mnie" (najlepiej pionowe, proporcje 3:4)',
    )

    # Dane kontaktowe wyświetlane na stronie (statyczne, nie formularz)
    address = models.CharField(max_length=255, blank=True, help_text='Zostaw puste, jeśli nie ma być widoczne na stronie')
    phone = models.CharField(max_length=30, blank=True, help_text='Zostaw puste, jeśli nie ma być widoczne na stronie')
    email = models.EmailField(blank=True, help_text='Zostaw puste, jeśli nie ma być widoczne na stronie')
    working_hours = models.CharField(max_length=255, blank=True, help_text='Zostaw puste, jeśli nie ma być widoczne na stronie')

    class Meta:
        verbose_name = 'Profil dietetyczki'
        verbose_name_plural = 'Profil dietetyczki'

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # Wymusza istnienie tylko jednego rekordu (singleton)
        self.pk = 1
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass  # blokada usunięcia jedynego rekordu


class Service(models.Model):
    """Sekcja 'Jak mogę Ci pomóc?' — oferta usług."""
    title = models.CharField(max_length=150)
    description = models.TextField()
    icon = models.CharField(
        max_length=10,
        blank=True,
        null=True,
        help_text='Emoji używane jako ikona, np. 🥗',
    )
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Sekcja-Jak mogę Ci pomóc'
        verbose_name_plural = 'Sekcja-Jak mogę Ci pomóc'

    def __str__(self):
        return self.title


class Stat(models.Model):
    """Sekcja statystyk, np. '8+ lat doświadczenia'."""
    number = models.CharField(max_length=20, help_text='np. "8+", "1 200+"')
    label = models.CharField(max_length=100, help_text='np. "lat doświadczenia"')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Sekcja statystyk'
        verbose_name_plural = 'Sekcja statystyk'

    def __str__(self):
        return f'{self.number} {self.label}'
    
class Assurance(models.Model):
    """Sekcja 'Zapewniam, że:' — lista zapewnień widoczna na stronie głównej."""
    text = models.CharField(
        max_length=200,
        help_text='np. "współpraca jest w pełni dobrowolna"',
    )
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Zapewniam, że'
        verbose_name_plural = 'Zapewniam, że'

    def __str__(self):
        return self.text
    
class AboutPoint(models.Model):
    """Sekcja 'O mnie' → 'Dlaczego to ważne?' — argumenty z ikoną."""
    icon = models.CharField(
        max_length=10,
        blank=True,
        help_text='Emoji używane jako ikona, np. 🧠',
    )
    title = models.CharField(
        max_length=150,
        help_text='Pogrubiona część, np. "Holistyczne podejście"',
    )
    description = models.CharField(
        max_length=300,
        help_text='Reszta zdania po myślniku, np. "— dieta to nie tylko kalorie..."',
    )
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Punkt "Dlaczego to ważne"'
        verbose_name_plural = 'Punkty "Dlaczego to ważne"'

    def __str__(self):
        return self.title

# W przyszłości...

# class Testimonial(models.Model):
#     """Opinie klientów."""
#     author_name = models.CharField(max_length=150)
#     content = models.TextField()
#     client_since_year = models.PositiveIntegerField(blank=True, null=True)
#     is_featured = models.BooleanField(
#         default=False,
#         help_text='Czy pokazywać na stronie głównej',
#     )
#     created_at = models.DateTimeField(auto_now_add=True)

#     class Meta:
#         ordering = ['-created_at']

#     def __str__(self):
#         return f'{self.author_name} — {self.content[:40]}'