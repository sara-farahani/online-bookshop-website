from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed


class JWTAuthenticationFromCookie(JWTAuthentication):
    def authenticate(self, request):
        access_token = request.COOKIES.get('access_token')
        if access_token is None:
            return None

        try:
            validated_token = self.get_validated_token(access_token)
        except Exception as e:
            raise AuthenticationFailed("Invalid token")
        return self.get_user(validated_token), validated_token
