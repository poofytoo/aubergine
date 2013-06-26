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

# REMOVE ALL LINES BELOW WHEN WE DEPLOY TO PRODUCTION SERVER
# IT IS GROSSLY INEFFICIENT
# FOR DEPLOYMENT ONLY!!
from django.conf import settings

if settings.DEBUG:
    urlpatterns += patterns('django.contrib.staticfiles.views',
        url(r'^static/(?P<path>.*)$', 'serve'),
    )

from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns += staticfiles_urlpatterns()