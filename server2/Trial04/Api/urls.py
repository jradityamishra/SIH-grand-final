from django.urls import path,include
from Api.views import Teacher,Student,AutoAssign

urlpatterns = [
    path("<str:pk>/",Teacher.as_view()),   
    path("student/<str:pk>/",Student.as_view()),   
    path("autoassign/<str:pk>/",AutoAssign.as_view())   
]
