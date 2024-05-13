from django.http import JsonResponse
from ser.models import Product, Picture
import json

cache = {}

def products(request):
    if cache['products'] is not None:
        return cache['products']
    products_list = Product.objects.all()
    products_pictures = [Picture.objects.filter(product=product).values_list('url', flat=True) for product in products_list]
    products_dict = [dict(product) for product in products_list]
    for i in range(len(products_list)):
        products_dict[i]['pictures'] = products_pictures[i]
    products_json = JsonResponse({'result': [json.dump(product) for product in products_list]})
    cache['products'] = products_json
    return products_json