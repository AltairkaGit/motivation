from django.contrib import admin

# Register your models here.
from .models import Product, Picture

admin.site.register(Product)
admin.site.register(Picture)