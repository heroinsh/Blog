from django.contrib import admin
from django.utils.html import format_html
from .models import Category

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'parent_display', 'created_at', 'updated_at', 'tags_display')
    list_display_links = ('id', 'title')
    list_editable = ('parent',)
    search_fields = ('title', 'description')
    list_filter = ('created_at', 'updated_at')
    ordering = ('-created_at', 'title')
    readonly_fields = ('image_tag',)
    filter_horizontal = ('tag',)
    def parent_display(self, obj):
        return obj.parent.title if obj.parent else '-'
    parent_display.short_description = 'Parent Category'
    parent_display.admin_order_field = 'parent__title'


    def tags_display(self, obj):
        return ", ".join([tag.name for tag in obj.tag.all()])
    tags_display.short_description = 'Tags'
