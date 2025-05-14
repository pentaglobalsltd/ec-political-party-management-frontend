import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Text, Button } from '@pentabd/ui';

import { ROUTES } from '@constants/routes';
import useResetPassword from '@hooks/miscellaneous/auth/useResetPassword';
import { FORM_FIELDS } from '@constants/forms';
import { resetPasswordValidation } from '@validations/auth/resetPasswordValidation';
import { getParams } from '@utils';
import SiteMaintenance from '@components/SiteMaintenance';
import Input from '@components/inputs/Input';

const RESET_PASSWORD = FORM_FIELDS.RESET_PASSWORD;
type FormData = yup.InferType<typeof resetPasswordValidation>;

const Form = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { resetPassword, isSuccess, requested } = useResetPassword();

  const methods = useForm<FormData>({
    resolver: yupResolver(resetPasswordValidation),
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const username = params.username;
    const password = data.password;
    resetPassword(username, password);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(ROUTES.SIGN_IN);
    }
  }, [isSuccess, navigate]);

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
                <Text size="lg" weight="semibold" color="dark">
                  {t('LOGIN.ACTIVATE_ACCOUNT_TEXT')}
                </Text>
              </div>

              {import.meta.env.VITE_MAINTENANCE_TEXT !== 'true' && (
                <>
                  {/* password */}
                  <div className="w-100">
                    <Input
                      registerName={RESET_PASSWORD.PASSWORD}
                      subtitle="LOGIN.PASSWORD"
                      type="password"
                    />
                  </div>

                  {/* confirm password */}
                  <div className="w-100">
                    <Input
                      registerName={RESET_PASSWORD.CONFIRM_PASSWORD}
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
                    {t(`LOGIN.RESET_PASSWORD_BUTTON`)}
                  </Button>
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

      {/* 3 - password */}
      <div className="py-9">
        <Text size="sm" weight="normal" color="subtitle1">
          {/* {t('LOGIN.PASSWORD_FORGOT')}  */}
          Password Grant Flow
        </Text>
      </div>
    </>
  );
};
export default Form;
