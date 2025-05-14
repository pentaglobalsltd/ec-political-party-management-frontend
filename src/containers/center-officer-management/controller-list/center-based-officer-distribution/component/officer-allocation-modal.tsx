import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import { Button, InputSelect, Text } from '@pentabd/ui';

import {
  CenterBasedOfficerAllocationType,
  centerBasedofficerAllocationValidation,
} from '@validations/center-officer-management/controller-list/center-based-officer-distribution/centerBasedOfficerDistributionValidation';

import { FORM_FIELDS } from '@constants/forms';
import { useCreatePollingPersonnelCenter } from '@hooks/center-officer-management/controller-list/polling-center/useCreatePollingPersonnelCenter';
import useUserTypesList from '@hooks/user-management/useUserTypesList';
import { useEffect } from 'react';
import {
  ASSISTANT_PRESIDING_OFFICER_CODE,
  POLLING_OFFICER_CODE,
  PRESIDING_OFFICER_CODE,
} from '../constant';
import { SelectionType } from '@pentabd/ui/build/atoms/select/types';

const CENTER_BASED_OFFICER_ALLOCATION =
  FORM_FIELDS.CENTER_OFFICER_MANAGEMENT.CONTROLLER_LIST
    .CENTER_BASED_OFFICER_ALLOCATION;
interface Props {
  userTypeCodes?: string;
  pollingPersonnel?: number;
  pollingCenter?: number;
  closeModal: () => void;
  getDataOnSuccess: () => void;
  centerSummary: any;
}
const OfficerAllocationModal = ({
  userTypeCodes,
  pollingPersonnel,
  pollingCenter,
  closeModal,
  getDataOnSuccess,
  centerSummary,
}: Props) => {
  const { t } = useTranslation();
  const { createPollingPersonnelCenterData, loading, isSuccess, setIsSuccess } =
    useCreatePollingPersonnelCenter();
  const { userTypes, getUserTypesData } = useUserTypesList();
  const methods = useForm<CenterBasedOfficerAllocationType>({
    resolver: yupResolver(centerBasedofficerAllocationValidation),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = methods;

  const userTypeCodeWatch = watch(CENTER_BASED_OFFICER_ALLOCATION.DESIGNATION);

  useEffect(() => {
    getUserTypesData({
      userTypeCodes,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSuccess) {
      getDataOnSuccess();

      setIsSuccess(false);
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    if (userTypeCodeWatch !== ASSISTANT_PRESIDING_OFFICER_CODE) {
      setValue(
        CENTER_BASED_OFFICER_ALLOCATION.IS_ACTIVE_PRESIDING_OFFICER,
        false,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userTypeCodeWatch]);

  const onSubmit: SubmitHandler<any> = (postData: any) => {
    if (postData.userTypeCode === PRESIDING_OFFICER_CODE) {
      postData.boothNo = null;
      postData.isIncharge = null;
    }
    if (postData.userTypeCode === POLLING_OFFICER_CODE) {
      postData.isIncharge = null;
    }
    const data = {
      ...postData,
      pollingCenterId: pollingCenter,
      pollingPersonnelId: pollingPersonnel,
    };
    createPollingPersonnelCenterData(data);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form className="p-8 mt-10" onSubmit={handleSubmit(onSubmit)}>
          <Text
            weight="semibold"
            size="md"
            color="dark"
            component="p"
            className="mb-16"
          >
            {centerSummary?.instituteName}
          </Text>
          <div className="d-flex flex-column gap-8 mb-8">
            <Controller
              control={control}
              name={CENTER_BASED_OFFICER_ALLOCATION.DESIGNATION}
              render={({ field }) => (
                <InputSelect
                  title={t('CENTER_BASED_OFFICER_ALLOCATION.DESIGNATION')}
                  name={CENTER_BASED_OFFICER_ALLOCATION.DESIGNATION}
                  onSelectItem={(data: SelectionType) => field.onChange(data)}
                  minWidth
                  options={userTypes}
                  error={errors as any}
                />
              )}
            />

            <Controller
              control={control}
              name={CENTER_BASED_OFFICER_ALLOCATION.BOOTH}
              render={({ field }) => (
                <InputSelect
                  {...register(CENTER_BASED_OFFICER_ALLOCATION.BOOTH)}
                  title={t('CENTER_BASED_OFFICER_ALLOCATION.BOOTH')}
                  disabled={
                    !userTypeCodeWatch ||
                    userTypeCodeWatch === PRESIDING_OFFICER_CODE
                  }
                  options={
                    userTypeCodeWatch === ASSISTANT_PRESIDING_OFFICER_CODE
                      ? centerSummary.boothNoForAPO
                      : userTypeCodeWatch === POLLING_OFFICER_CODE
                      ? centerSummary.boothNoForPO
                      : []
                  }
                  onSelectItem={(data: SelectionType) => field.onChange(data)}
                  error={errors as any}
                />
              )}
            />
          </div>
          <div className="d-flex gap-8 mb-16">
            <input
              type="checkbox"
              id={CENTER_BASED_OFFICER_ALLOCATION.IS_ACTIVE_PRESIDING_OFFICER}
              {...register(
                CENTER_BASED_OFFICER_ALLOCATION.IS_ACTIVE_PRESIDING_OFFICER,
              )}
              disabled={userTypeCodeWatch !== ASSISTANT_PRESIDING_OFFICER_CODE}
            />
            <Text weight="semibold" size="sm" color="title" component="p">
              {t('CENTER_BASED_OFFICER_ALLOCATION.ACTING_PRESIDING_OFFICER')}
            </Text>
          </div>
          <div className="d-flex justify-content-end gap-8">
            <Button fill="outline" type="danger" onClick={() => closeModal()}>
              {t('CENTER_BASED_OFFICER_ALLOCATION.CANCEL')}
            </Button>
            <Button
              fill="fill"
              className="border-primary"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              {t('CENTER_BASED_OFFICER_ALLOCATION.SUBMIT')}
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default OfficerAllocationModal;
