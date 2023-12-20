from django.urls import path
from Api.views import Assignment,Teacher,Student

urlpatterns = [
    path("<str:pk>/",Teacher.as_view()),   
    path("student/<str:pk>/",Student.as_view()),
    path("assign/<str:pk>",Assignment.as_view())
]
