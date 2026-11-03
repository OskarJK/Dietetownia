from django.test import TestCase

# Create your tests here.
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from django.test import TestCase

from .models import AboutPoint, Assurance, DietitianProfile, Service, Stat


class DietitianProfileModelTest(TestCase):
  """Testy dla modelu DietitianProfile (wzorzec Singleton + zabezpieczenie przed usunięciem)."""

  def setUp(self):
    # Tworzymy początkowy profil
    self.profile = DietitianProfile.objects.create(
        name='Anna Nowak',
        tagline='Pasjonatka zdrowego odżywiania',
        bio='Jestem dietetykiem z pasją.',
        years_of_experience=5,
        address='ul. Dietetyczna 1, Warszawa',
        phone='123456789',
        email='anna@example.com',
        working_hours='Pon-Pt: 8:00 - 16:00',
    )

  def test_profile_creation_and_str(self):
    """Sprawdza poprawność utworzenia obiektu oraz metodę __str__."""
    self.assertEqual(str(self.profile), 'Anna Nowak')
    self.assertEqual(self.profile.years_of_experience, 5)
    self.assertEqual(self.profile.email, 'anna@example.com')

  def test_singleton_behavior(self):
    """Sprawdza, czy niezależnie od liczby wywołań .create() lub .save(),

    w bazie zawsze istnieje tylko jeden rekord z pk=1.
    """
    # Próba utworzenia nowego rekordu za pomocą save (nadpisze pk=1)
    second_profile = DietitianProfile(
        name='Katarzyna Kowalska',
        bio='Inny bio',
        years_of_experience=10,
    )
    second_profile.save()

    # Sprawdzamy liczbę obiektów w bazie
    self.assertEqual(DietitianProfile.objects.count(), 1)

    # Pobieramy rekord z bazy i sprawdzamy, czy dane zostały nadpisane (zachowanie singletonu)
    profile_in_db = DietitianProfile.objects.get(pk=1)
    self.assertEqual(profile_in_db.name, 'Katarzyna Kowalska')
    self.assertEqual(profile_in_db.years_of_experience, 10)

  def test_delete_block(self):
    """Sprawdza, czy metoda delete() skutecznie blokuje usunięcie profilu."""
    self.assertEqual(DietitianProfile.objects.count(), 1)

    # Próba usunięcia profilu
    self.profile.delete()

    # Rekord nadal powinien znajdować się w bazie
    self.assertEqual(DietitianProfile.objects.count(), 1)
    self.assertTrue(DietitianProfile.objects.filter(pk=1).exists())


class ServiceModelTest(TestCase):
  """Testy dla modelu Service (oferta usług)."""

  def setUp(self):
    Service.objects.create(
        title='Konsultacja indywiualna',
        description='Opis konsultacji...',
        icon='🥗',
        order=2,
    )
    Service.objects.create(
        title='Plan dietetyczny',
        description='Opis planu...',
        icon='📋',
        order=1,
    )

  def test_service_str(self):
    """Sprawdza metodę __str__."""
    service = Service.objects.get(title='Konsultacja indywiualna')
    self.assertEqual(str(service), 'Konsultacja indywiualna')

  def test_default_ordering(self):
    """Sprawdza, czy usługi domyślnie sortują się według pola 'order' rosnąco."""
    services = Service.objects.all()
    self.assertEqual(services[0].title, 'Plan dietetyczny')
    self.assertEqual(services[1].title, 'Konsultacja indywiualna')


class StatModelTest(TestCase):
  """Testy dla modelu Stat (sekcja statystyk)."""

  def setUp(self):
    Stat.objects.create(number='10+', label='lat doświadczenia', order=1)
    Stat.objects.create(number='500+', label='zadowolonych klientów', order=2)

  def test_stat_str(self):
    """Sprawdza metodę __str__."""
    stat = Stat.objects.get(order=1)
    self.assertEqual(str(stat), '10+ lat doświadczenia')

  def test_default_ordering(self):
    """Sprawdza domyślne sortowanie po 'order'."""
    stats = Stat.objects.all()
    self.assertEqual(stats[0].number, '10+')
    self.assertEqual(stats[1].number, '500+')


class AssuranceModelTest(TestCase):
  """Testy dla modelu Assurance (sekcja 'Zapewniam, że')."""

  def setUp(self):
    Assurance.objects.create(text='Współpraca jest w pełni dobrowolna', order=2)
    Assurance.objects.create(text='Indywidualne podejście do każdego', order=1)

  def test_assurance_str(self):
    """Sprawdza metodę __str__."""
    assurance = Assurance.objects.get(order=1)
    self.assertEqual(str(assurance), 'Indywidualne podejście do każdego')

  def test_default_ordering(self):
    """Sprawdza domyślne sortowanie po 'order'."""
    assurances = Assurance.objects.all()
    self.assertEqual(assurances[0].text, 'Indywidualne podejście do każdego')
    self.assertEqual(assurances[1].text, 'Współpraca jest w pełni dobrowolna')


class AboutPointModelTest(TestCase):
  """Testy dla modelu AboutPoint (punkt 'Dlaczego to ważne')."""

  def setUp(self):
    AboutPoint.objects.create(
        icon='🧠',
        title='Holistyczne podejście',
        description='— dieta to nie tylko kalorie...',
        order=1,
    )

  def test_about_point_str(self):
    """Sprawdza metodę __str__."""
    point = AboutPoint.objects.get(title='Holistyczne podejście')
    self.assertEqual(str(point), 'Holistyczne podejście')