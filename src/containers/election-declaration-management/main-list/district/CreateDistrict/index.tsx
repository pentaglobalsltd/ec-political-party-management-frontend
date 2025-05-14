import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { IconCheckCircleBroken, IconRefreshCcw01 } from '@pentabd/icons';
import { Button, Header } from '@pentabd/ui';

import FormInput from '@components/inputs/FormInput';
import FormInputDouble from '@components/inputs/FormInputDouble';
import FormSelect from '@components/inputs/FormSelect';
import { FORM_FIELDS } from '@constants/forms';
import {
  DistrictDataType,
  districtValidation,
} from '@validations/election-declaration-management/main-list/district/districtValidation';
import { newDistrictBreadcrumbs } from '../constants';

import { useRegionListSelect } from '@hooks/election-schedule-management/main-list/region/useRegionListSelect';
import { useCreateDistrict } from '@hooks/election-schedule-management/main-list/district/useCreateDistrict';

const DISTRICT =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.MAIN_LIST.DISTRICT.CREATE_DISTRICT;

function CreateDistrict() {
  const { t } = useTranslation();
  const { regions, getRegionListSelect } = useRegionListSelect();
  const { createDistrict, success } = useCreateDistrict();
  const navigate = useNavigate();

  useEffect(() => {
    getRegionListSelect();

    // eslint-disable-next-line
  }, []);

  const methods = useForm<DistrictDataType>({
    resolver: yupResolver(districtValidation),
  });

  const { handleSubmit, reset } = methods;

  const submitDistrictForm = (data: DistrictDataType) => {
    const formData = {
      ...data,
      zillaCode: parseInt(data.zillaCode),
      regionId: parseInt(data.regionId),
      serialNo: parseInt(data.serialNo),
    };
    createDistrict(formData);
  };

  const resetDistrictForm = () => {
    reset();
  };

  useEffect(() => {
    if (success) {
      navigate(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  return (
    <div className="container-96 mb-24">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submitDistrictForm)}>
          <Header
            className="mb-10 pt-10"
            headerText={{ header: t('DISTRICT.ADD_NEW') }}
            breadcrumbs={newDistrictBreadcrumbs(t)}
          />

          <div className="mb-9">
            <div className="d-flex flex-column gap-8 p-9 border rounded-5">
              <FormSelect
                title={t('DISTRICT.DIVISION')}
                name={DISTRICT.DIVISION}
                options={regions}
              />

              <FormInputDouble
                title="DISTRICT.DISTRICT_NAME"
                placeholder={t('PLACEHOLDER.ENTER')}
                registerName={{
                  type1: DISTRICT.DISTRICT_BN,
                  type2: DISTRICT.DISTRICT_EN,
                }}
                inputLabel1="DISTRICT.BANGLA"
                inputLabel2="DISTRICT.ENGLISH"
              />

              <FormInput
                title="DISTRICT.DISTRICT_GO_CODE"
                placeholder={t('PLACEHOLDER.ENTER')}
                registerName={DISTRICT.DISTRICT_GO_CODE}
              />

              <FormInput
                title={t('DISTRICT.SERIAL_NO')}
                placeholder={t('PLACEHOLDER.ENTER')}
                registerName={DISTRICT.SERIAL_NO}
              />
            </div>
          </div>

          <div className="d-flex justify-content-end align-items-center gap-6 border-top pt-8">
            <Button
              fill="outline"
              key={1}
              htmlType="button"
              type="primary"
              onClick={resetDistrictForm}
            >
              {t('DISTRICT.RESET')}
              <IconRefreshCcw01 size="20" fill="primary" />
            </Button>
            <Button key={2} htmlType="submit" type="success">
              {t('DISTRICT.FILED')}
              <IconCheckCircleBroken size="20" fill="light" />
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default CreateDistrict;
