from django.conf.urls import patterns, include, url
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('django.contrib.flatpages.views',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^(?P<url>.*/)$', 'flatpage'),
    url(r'^$', 'flatpage', {'url': '/index/'}, name='index'),
)

