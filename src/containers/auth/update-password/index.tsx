import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Text, Button, TopBar } from '@pentabd/ui';

import { ROUTES } from '@constants/routes';
import { FORM_FIELDS } from '@constants/forms';
import { resetPasswordValidation } from '@validations/auth/resetPasswordValidation';
import { brand, getLeftNavMenu, userDetails } from './constants';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import useUpdateUserResetPassword from '@hooks/user-management/useUpdateResetPassword';
import Input from '@components/inputs/Input';

const RESET_PASSWORD = FORM_FIELDS.RESET_PASSWORD;
type FormData = yup.InferType<typeof resetPasswordValidation>;

function UpdatePassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { keycloak } = useAuthWrapper();

  const {
    updateLoading,
    updateUserResetPassword,
    updateSuccess,
    setUpdateSuccess,
  } = useUpdateUserResetPassword();

  const methods = useForm<FormData>({
    resolver: yupResolver(resetPasswordValidation),
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const password = {
      password: data.password,
    };

    if (keycloak?.tokenParsed?.sub) {
      updateUserResetPassword({
        data: password,
        userId: keycloak?.tokenParsed?.sub,
      });
    }
  };

  useEffect(() => {
    if (updateSuccess) {
      setUpdateSuccess(false);
      navigate(ROUTES.HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSuccess, navigate]);

  return (
    <div className="d-flex flex-column align-items-center vh-100">
      <div className="row g-0 w-100 vh-100 position-relative">
        <div className="col-xl-12 col-lg-12 col-md-12 position-relative d-flex flex-column  align-items-center bg-white">
          {/* 1 */}
          <TopBar
            brand={brand}
            leftNavMenu={getLeftNavMenu(t)} // TODO fixing ui library
            userDetails={userDetails}
            Link={Link}
          />

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
                      {t('REGISTRATION.ACTIVATE_ACCOUNT_TEXT')}
                    </Text>
                  </div>

                  <div>
                    {/* password */}
                    <div className="w-100 my-10">
                      <Input
                        registerName={RESET_PASSWORD.PASSWORD}
                        subtitle="REGISTRATION.PASSWORD"
                        type="password"
                      />
                    </div>

                    {/* confirm password */}
                    <div className="w-100 my-10">
                      <Input
                        registerName={RESET_PASSWORD.CONFIRM_PASSWORD}
                        subtitle="REGISTRATION.CONFIRM_PASSWORD"
                        type="password"
                      />
                    </div>

                    {/* submit btn */}
                    <Button
                      fill="fill"
                      className="w-100"
                      type="primary"
                      loading={updateLoading}
                      htmlType="submit"
                    >
                      {t(`LOGIN.RESET_PASSWORD_BUTTON`)}
                    </Button>
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;
