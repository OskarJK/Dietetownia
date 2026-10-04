from django.contrib import admin

# Register your models here.
from .models import DietitianProfile, Service, Stat, Assurance, AboutPoint


@admin.register(DietitianProfile)
class DietitianProfileAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        # Blokada tworzenia drugiego rekordu — singleton
        return not DietitianProfile.objects.exists()


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'order')
    list_editable = ('order',)
    ordering = ('order',)


@admin.register(Stat)
class StatAdmin(admin.ModelAdmin):
    list_display = ('number', 'label', 'order')
    list_editable = ('order',)
    ordering = ('order',)

# W przyszłości...

# @admin.register(Testimonial)
# class TestimonialAdmin(admin.ModelAdmin):
#     list_display = ('author_name', 'is_featured', 'created_at')
#     list_filter = ('is_featured',)


@admin.register(Assurance)
class AssuranceAdmin(admin.ModelAdmin):
    list_display = ('text', 'order')
    list_editable = ('order',)
    ordering = ('order',)
    
@admin.register(AboutPoint)
class AboutPointAdmin(admin.ModelAdmin):
    list_display = ('title', 'order')
    list_editable = ('order',)
    ordering = ('order',)