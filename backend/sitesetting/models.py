from django.db import models
from django.utils.text import gettext_lazy as _

class SiteSettings(models.Model):
    site_name = models.CharField(max_length=255, default="نام سایت")
    logo = models.ImageField(upload_to='logos/', blank=True, null=True)

    def __str__(self):
        return _('site_setting')

    class Meta:
        verbose_name = _('site_setting')
        verbose_name_plural = _('site_setting')
