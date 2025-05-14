import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { IconCheckCircleBroken, IconRefreshCcw01 } from '@pentabd/icons';
import { Button, Header } from '@pentabd/ui';

import FormInput from '@components/inputs/FormInput';
import { FORM_FIELDS } from '@constants/forms';
import {
  DivisionDataType,
  divisionValidation,
} from '@validations/election-declaration-management/main-list/division/divisionValidation';
import { newDivisionBreadcrumbs } from '../constants';
import { useCreateRegion } from '@hooks/election-schedule-management/main-list/region/useCreateRegion';

const DIVISION =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.MAIN_LIST.DIVISION.CREATE_DIVISION;

function CreateDivision() {
  const { t } = useTranslation();
  const { createRegion, success } = useCreateRegion();
  const navigate = useNavigate();

  const methods = useForm<DivisionDataType>({
    resolver: yupResolver(divisionValidation),
  });

  const { handleSubmit, reset } = methods;

  const submitDivisionForm = (data: DivisionDataType) => {
    const formData = { ...data, regionCode: parseInt(data.regionCode) };
    createRegion(formData);
    reset();
  };

  const resetDivisionForm = () => {
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
        <form onSubmit={handleSubmit(submitDivisionForm)}>
          <Header
            className="mb-10 pt-10"
            headerText={{ header: t('DIVISION.ADD_NEW') }}
            breadcrumbs={newDivisionBreadcrumbs(t)}
          />

          <div className="mb-9">
            <div className="d-flex flex-column gap-8 p-9 border rounded-5">
              <FormInput
                title="DIVISION.DIVISION_NAME"
                subtitle="DIVISION.BANGLA"
                placeholder={t('PLACEHOLDER.ENTER')}
                registerName={DIVISION.NAME_BN}
              />

              <FormInput
                title="DIVISION.DIVISION_NAME"
                subtitle="DIVISION.ENGLISH"
                placeholder={t('PLACEHOLDER.ENTER')}
                registerName={DIVISION.NAME_EN}
              />

              <FormInput
                title="DIVISION.DIVISION_GO_CODE"
                placeholder={t('PLACEHOLDER.ENTER')}
                registerName={DIVISION.DIVISION_GO_CODE}
              />
            </div>
          </div>

          <div className="d-flex justify-content-end align-items-center gap-6 border-top pt-8">
            <Button
              fill="outline"
              key={1}
              htmlType="button"
              type="primary"
              onClick={resetDivisionForm}
            >
              {t('DIVISION.RESET')}
              <IconRefreshCcw01 size="20" fill="primary" />
            </Button>
            <Button key={2} htmlType="submit" type="success">
              {t('DIVISION.FILED')}
              <IconCheckCircleBroken size="20" fill="light" />
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default CreateDivision;
