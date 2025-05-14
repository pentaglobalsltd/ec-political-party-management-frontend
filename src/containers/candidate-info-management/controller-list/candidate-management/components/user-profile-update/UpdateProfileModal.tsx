import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '@pentabd/ui';

import FormInput from '@components/inputs/FormInput';

import { FORM_FIELDS } from '@constants/forms';
import * as yup from 'yup';
import { updateProfileValidation } from '@validations/auth/updateProfileValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import useUpdateProfile from '@hooks/miscellaneous/auth/useUpdateProfile';
import { useEffect } from 'react';
import { NominationListSearchProps } from '@type/candidate-info-management/nomination-list-type';
import useGetUpdateProfile from '@hooks/miscellaneous/auth/useGetUpdateProfile';

const UPDATE_PROFILE =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_MANAGEMENT
    .UPDATE_PROFILE;
type FormData = yup.InferType<typeof updateProfileValidation>;

const UpdateProfileModal = ({
  rowData,
  closeProfileHandler,
}: {
  rowData?: NominationListSearchProps;
  closeProfileHandler: () => void;
}) => {
  const { updateProfile, loading, success } = useUpdateProfile();
  const { getUpdateProfileData, profileData, error } = useGetUpdateProfile();
  const { t } = useTranslation();

  const methods = useForm<FormData>({
    resolver: yupResolver(updateProfileValidation),
    values: profileData as FormData,
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: any) => {
    if (rowData?.userId) {
      updateProfile({
        data,
        username: rowData?.userId,
      });
    }
  };

  useEffect(() => {
    if (rowData?.userId) {
      getUpdateProfileData({ username: rowData?.userId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowData?.userId]);

  useEffect(() => {
    if (success) {
      closeProfileHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  return (
    <FormProvider {...methods}>
      <form className="p-20" onSubmit={handleSubmit(onSubmit)}>
        {/* User name */}
        <FormInput
          title="REGISTRATION.USER_ID"
          registerName={UPDATE_PROFILE.USER_NAME}
          colTwoClassName="col-12 col-lg-12 col-md-12 col-sm-12"
          placeholder={t('PLACEHOLDER.ENTER')}
          disabled
        />
        {/* মোবাইল নম্বর */}
        <FormInput
          title="REGISTRATION.MOBILE"
          registerName={UPDATE_PROFILE.PHONE}
          colTwoClassName="col-12 col-lg-12 col-md-12 col-sm-12"
          placeholder={t('PLACEHOLDER.ENTER')}
        />
        {/* ই-মেইল */}
        <FormInput
          title="REGISTRATION.EMAIL"
          registerName={UPDATE_PROFILE.EMAIL}
          colTwoClassName="col-12 col-lg-12 col-md-12 col-sm-12"
          placeholder={t('PLACEHOLDER.ENTER')}
        />
        <div className="d-flex justify-content-center p-10">
          <Button
            fill="fill"
            type="primary"
            htmlType="submit"
            testId="sign-in-submit-button"
            loading={loading}
            disabled={error}
          >
            {t(`CANDIDATE_MANAGEMENT.PROFILE_UPDATE`)}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default UpdateProfileModal;
