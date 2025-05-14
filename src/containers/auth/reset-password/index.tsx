import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { ResetPasswordForm } from './components/ResetPasswordForm';

function ResetPassword() {
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
      pathname === ROUTES.RESET_PASSWORD
    ) {
      navigate(ROUTES.HOME);
    }
  }, [pathname, navigate]);

  return (
    <div className="d-flex flex-column align-items-center vh-100">
      <ResetPasswordForm />
    </div>
  );
}

export default ResetPassword;
