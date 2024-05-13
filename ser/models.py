from django.db import models

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=50)
    price_in_cents = models.IntegerField()
    description = models.CharField(max_length=350)


    def __dict__(self):
        product_dict = {
            'name': self.name,
            'price': str(self.price_in_cents),
            'description': self.description,
        }
        return product_dict
    
    def __str__(self):
        return str(self.__dict__(self))

class Picture(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    url = models.TextField()

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['product', 'url'], name='unique_product_url')
        ]

    def __str__(self):
        return self.url