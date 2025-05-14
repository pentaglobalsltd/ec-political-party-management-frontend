import { useEffect } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Text, Button } from '@pentabd/ui';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signInValidation } from '@validations/auth/signInValidation';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { FORM_FIELDS } from '@constants/forms';
import { ROUTES } from '@constants/routes';
import { signInRestoreRequest } from '@actions/auth/auth-actions';
import SiteMaintenance from '@components/SiteMaintenance';
import Input from '@components/inputs/Input';

const SIGN_IN = FORM_FIELDS.SIGN_IN;
type FormData = yup.InferType<typeof signInValidation>;

const Form = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    keycloak: { signIn, requested, isSuccess, isFailed, authData },
  } = useAuthWrapper();

  const methods = useForm<FormData>({
    resolver: yupResolver(signInValidation),
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<FormData> = (data) => {
    signIn({ username: data.username, password: data.password });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(signInRestoreRequest());
      navigate(ROUTES.HOME);
    } else if (isFailed) {
      if (authData?.statusCode === 403) {
        dispatch(signInRestoreRequest());
        navigate({
          pathname: ROUTES.RESET_PASSWORD,
          search: `?username=${authData.username}`,
        });
      }
    }
  }, [isSuccess, navigate, isFailed, authData, dispatch]);

  return (
    <>
      {/* 2 */}
      <div className="d-flex flex-column justify-content-center flex-1">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="login-form d-flex mx-auto justify-content-center flex-column gap-9 align-items-center">
              {/* logo */}
              <img
                src="/company-logo.png"
                alt="company-logo"
                width={156}
                height={170}
              />

              {/* LOGIN_TITLE */}
              <div className="d-flex flex-column gap-6 align-items-center">
                <Text
                  size="sm"
                  weight="semibold"
                  color="dark"
                  sizeType="display"
                >
                  {t(`LOGIN.COMPANY_NAME`)}
                </Text>
              </div>

              {import.meta.env.VITE_MAINTENANCE_TEXT !== 'true' && (
                <>
                  {/* user id */}
                  <div className="w-100">
                    <Input
                      registerName={SIGN_IN.USERNAME}
                      subtitle="LOGIN.USER_ID"
                    />
                  </div>

                  {/* password */}
                  <div className="w-100">
                    <Input
                      registerName={SIGN_IN.PASSWORD}
                      subtitle="LOGIN.PASSWORD"
                      type="password"
                    />
                  </div>

                  {/* submit btn */}
                  <Button
                    fill="fill"
                    className="w-100"
                    type="primary"
                    loading={requested}
                    htmlType="submit"
                  >
                    {t(`LOGIN.LOGIN_BUTTON`)}
                  </Button>

                  {/* 3 - password */}
                  {/* <div className="py-9">
                  <Text size="sm" weight="normal" color="subtitle1">
                  {t('LOGIN.PASSWORD_FORGOT')} 
                    Password Grant Flow
                  </Text>
                </div>  */}
                </>
              )}

              {/* maintenance */}
              {import.meta.env.VITE_MAINTENANCE_TEXT === 'true' && (
                <SiteMaintenance />
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};
export default Form;
