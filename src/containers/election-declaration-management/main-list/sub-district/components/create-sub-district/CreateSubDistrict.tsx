import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { IconCheckCircleBroken, IconRefreshCcw01 } from '@pentabd/icons';
import { Button, Header, Text } from '@pentabd/ui';

import FormInput from '@components/inputs/FormInput';
import FormInputDouble from '@components/inputs/FormInputDouble';
import FormSelect from '@components/inputs/FormSelect';
import { FORM_FIELDS } from '@constants/forms';
import { useZillas } from '@hooks/miscellaneous/master-hook/zilla/useZillasDivison';
import {
  CreateSubDistrictDataType,
  createSubDistrictValidation,
} from '@validations/election-declaration-management/main-list/sub-district/subDistrictValidation';

import { addSubDistrictBreadcrumbs } from '../../constants';
import { useCreateSubdistrict } from '@hooks/election-schedule-management/main-list/sub-district/useCreateSubdistrict';

const CREATE_SUB_DISTRICT =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.MAIN_LIST.SUB_DISTRICT
    .CREATE_SUB_DISTRICT;

const CreateSubDistrict = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { zillas } = useZillas({});
  const { subdistrictCreate, loading, success } = useCreateSubdistrict();

  const methods = useForm<CreateSubDistrictDataType>({
    resolver: yupResolver(createSubDistrictValidation),
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (success) {
      navigate(-1);
    }
  }, [success, navigate]);

  const onSubmit: SubmitHandler<CreateSubDistrictDataType> = (data: any) => {
    const formData = {
      ...data,
      upazilaCode: parseInt(data.upazilaCode),
      zillaId: parseInt(data.zillaId),
    };
    subdistrictCreate(formData);
  };

  return (
    <div className="container-96 mb-24">
      <Header
        headerText={{ header: t('SUB_DISTRICT.ADD_SUB_DISTRICT') }}
        breadcrumbs={addSubDistrictBreadcrumbs(t)}
        className="mb-12 pt-10"
      />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-6 border p-12 mb-12">
            <FormSelect
              title="SUB_DISTRICT.DISTRICT"
              name={CREATE_SUB_DISTRICT.DISTRICT}
              options={zillas}
            />

            <FormInputDouble
              title="SUB_DISTRICT.SUB_DISTRICT"
              placeholder={t('PLACEHOLDER.ENTER')}
              registerName={{
                type1: CREATE_SUB_DISTRICT.SUB_DISTRICT_BN,
                type2: CREATE_SUB_DISTRICT.SUB_DISTRICT_EN,
              }}
              inputLabel1="SUB_DISTRICT.SUB_DISTRICT_NAME_BN"
              inputLabel2="SUB_DISTRICT.SUB_DISTRICT_NAME_EN"
            />

            <FormInput
              title="SUB_DISTRICT.GO_CODE"
              placeholder={t('PLACEHOLDER.ENTER')}
              registerName={CREATE_SUB_DISTRICT.GO_CODE}
            />
          </div>

          <div className="d-flex justify-content-end gap-6 border-top py-12">
            <Button
              fill="outline"
              className="border-primary"
              type="primary"
              onClick={() => reset()}
            >
              <Text size="sm" weight="semibold" color="primary">
                {t('SUB_DISTRICT.RESET')}
              </Text>
              <IconRefreshCcw01 size="20" fill="primary" />
            </Button>

            <Button
              fill="fill"
              className="border-primary"
              type="success"
              htmlType="submit"
              loading={loading}
            >
              <Text size="sm" weight="semibold" color="white">
                {t('SUB_DISTRICT.SUBMIT')}
              </Text>
              <IconCheckCircleBroken size="20" fill="white" />
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateSubDistrict;
