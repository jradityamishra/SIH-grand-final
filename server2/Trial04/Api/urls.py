from django.urls import path,include
from Api.views import Teacher,Student

urlpatterns = [
    path("<str:pk>/",Teacher.as_view()),   
    path("student/<str:pk>/",Student.as_view())   
]
