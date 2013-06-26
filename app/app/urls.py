from django.conf.urls import patterns, include, url
from django.contrib import auth, admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^login/$', 'django.contrib.auth.views.login'),
    url(r'^admin/', include(admin.site.urls)),
)

urlpatterns += patterns('django.contrib.flatpages.views',
    url(r'^index/', 'flatpage', {'url': '/index/'}, name='index'),
    url(r'^(?P<url>.*/)$', 'flatpage'),
    url(r'^$', 'flatpage', {'url': '/index/'}, name='index'),

)

