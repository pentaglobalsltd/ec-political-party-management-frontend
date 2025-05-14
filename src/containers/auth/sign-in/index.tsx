import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants/routes';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { SignInForm } from './components/SignInForm';

function SignIn() {
  const {
    keycloak: { authenticated },
  } = useAuthWrapper();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (authenticated) {
      navigate(ROUTES.HOME);
    }
  }, [navigate, authenticated]);

  useEffect(() => {
    if (
      import.meta.env.VITE_AUTH_GRANT_FLOW === 'true' &&
      pathname === ROUTES.SIGN_IN
    ) {
      navigate(ROUTES.HOME);
    }
  }, [pathname, navigate]);

  return (
    <div className="d-flex flex-column align-items-center vh-100">
      <SignInForm />
    </div>
  );
}

export default SignIn;
