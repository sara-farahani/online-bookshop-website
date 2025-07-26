from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=100)
    bio = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Book(models.Model):
    BOOK_TYPES = [
        ('ebook', 'E-book'),
        ('audiobook', 'Audiobook'),
    ]

    title = models.CharField(max_length=200, null=False, blank=False )
    author = models.ForeignKey(Author, on_delete=models.SET_NULL, null=True)
    categories = models.ManyToManyField(Category, null=False, blank=False )
    description = models.TextField(null=False, blank=False )
    price = models.DecimalField(max_digits=15, decimal_places=0, null=False, blank=False )
    type = models.CharField(max_length=10, choices=BOOK_TYPES, default="ebook", null=False, blank=False )
    cover_image = models.ImageField(upload_to='covers/', default="", null=False, blank=False )
    file = models.FileField(upload_to='books/', default="", blank=True, null=True)
    audio_sample = models.FileField(upload_to='samples/', null=True, blank=True)
    published_at = models.DateField(null=True, blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=1, null=False, blank=False, default=0.0)


    def __str__(self):
        return self.title

