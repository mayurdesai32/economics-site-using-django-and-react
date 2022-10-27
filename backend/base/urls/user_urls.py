from django.urls import path
from base.views import user_views as views

urlpatterns = [

    path('register/', views.registerUser, name='user-register'),
    path('login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('profile/', views.getUserProfile, name='user-profile'),


    path('updateprofile/', views.updateUserProfile, name='profile-update'),
    path('all/', views.getUsers, name='all-users'),
]
