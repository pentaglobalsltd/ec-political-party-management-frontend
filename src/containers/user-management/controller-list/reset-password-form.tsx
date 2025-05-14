import FormInput from '@components/inputs/FormInput';
import { FORM_FIELDS } from '@constants/forms';
import { yupResolver } from '@hookform/resolvers/yup';
import { GetUserProfileList } from '@hooks/user-management/useGetUserProfileList';
import useUpdateUserResetPassword from '@hooks/user-management/useUpdateResetPassword';
import { Button, Text } from '@pentabd/ui';
import {
  SystemUserPasswordDataType,
  systemUserPasswordValidation,
} from '@validations/user-management/SystemUserValidation';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface props {
  updatePassword?: string;
  closeResetPasswordModal: () => void;
  getUserProfileListData?: ({
    searchItems,
    page,
    size,
  }: GetUserProfileList) => void;
  getUserProfileListDataById?: ({ userId }: { userId: string }) => void;
  params: any;
  type: string;
  userId?: string;
}

const SYSTEM_USER = FORM_FIELDS.USER_MANAGEMENT.CREATE_ELECTION_USER;

export const ResetPasswordForm = ({
  updatePassword,
  closeResetPasswordModal,
  getUserProfileListData,
  getUserProfileListDataById,
  params,
  type,
  userId,
}: props) => {
  const { t } = useTranslation();
  const {
    updateLoading,
    updateUserResetPassword,
    updateSuccess,
    setUpdateSuccess,
  } = useUpdateUserResetPassword();

  const methods = useForm<SystemUserPasswordDataType>({
    resolver: yupResolver(systemUserPasswordValidation),
  });

  const { handleSubmit } = methods;

  useEffect(() => {
    if (updateSuccess) {
      getUserProfileListData &&
        getUserProfileListData({
          searchItems: params,
          type: type,
        });

      getUserProfileListDataById &&
        getUserProfileListDataById({
          userId: userId as string,
        });
      setUpdateSuccess(false);
      closeResetPasswordModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSuccess]);

  const onSubmit = (data: any) => {
    const password = {
      password: data.password,
    };
    if (updatePassword) {
      updateUserResetPassword({ data: password, userId: updatePassword });
    }
  };
  return (
    <FormProvider {...methods}>
      <form className="p-12" onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-20">
          <Text weight="semibold" size="md">
            {t('ELECTION_USER.CHANGE_USER_DETAILS')}
          </Text>
        </div>
        <FormInput
          title={t('ELECTION_USER.PASSWORD')}
          registerName={SYSTEM_USER.PASSWORD}
          type="password"
          colOneClassName="col-span-lg-4"
          colTwoClassName="col-span-lg-8"
        />

        <FormInput
          title={t('ELECTION_USER.CONFIRM_PASSWORD')}
          registerName={SYSTEM_USER.CONFIRM_PASSWORD}
          type="password"
          colOneClassName="col-span-lg-4"
          colTwoClassName="col-span-lg-8"
        />
        <div className="d-flex flex-row-reverse pt-10 gap-5">
          <Button htmlType="submit" type="primary" loading={updateLoading}>
            {t('ELECTION_USER.FILED')}
          </Button>
          <Button
            htmlType="button"
            type="primary"
            onClick={(e) => closeResetPasswordModal()}
          >
            {t('ELECTION_USER.GO_BACK')}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
