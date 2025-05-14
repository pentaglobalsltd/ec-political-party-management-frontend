import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Header } from '@pentabd/ui';
import { IconCheckCircleBroken, IconRefreshCcw01 } from '@pentabd/icons';

import FormInputDouble from '@components/inputs/FormInputDouble';

import { FORM_FIELDS } from '@constants/forms';
import { CreateBreadcrumbs } from '../constants';
import { useCreateInstituteType } from '@hooks/election-schedule-management/other/institute-type/useCreateInstituteType';
import { CreateInstitutionTypes } from '../types';
import {
  InstitutionTypeDataType,
  institutionTypeValidation,
} from '@validations/election-declaration-management/others/institution-type/institutionTypeValidation';

const INSTITUTION_TYPE =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.OTHERS.INSTITUTION_BUILDING_TYPE;

const CreateInstitutionType = () => {
  const { t } = useTranslation();
  const { addInstituteType, loading, success } = useCreateInstituteType();
  const navigate = useNavigate();

  const methods = useForm<InstitutionTypeDataType>({
    resolver: yupResolver(institutionTypeValidation),
  });

  const { handleSubmit, reset } = methods;
  const submitInstitutionBuildingTypeForm = (data: CreateInstitutionTypes) => {
    addInstituteType(data);
  };

  const resetInstitutionBuildingTypeForm = () => {
    reset();
  };

  useEffect(() => {
    if (success) {
      navigate(-1);
    }
  }, [success, navigate]);

  return (
    <div className="container-96 mb-24">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submitInstitutionBuildingTypeForm)}>
          <Header
            className="mb-10 pt-10"
            headerText={{ header: t('INSTITUTION_BUILDING_TYPE.ADD_NEW') }}
            breadcrumbs={CreateBreadcrumbs(t)}
          />

          <div className="mb-9">
            <div className="d-flex flex-column gap-8 p-9 border rounded-5">
              <FormInputDouble
                title="INSTITUTION_BUILDING_TYPE.BUILDING_CATEGORY"
                placeholder={t('PLACEHOLDER.ENTER')}
                registerName={{
                  type1: INSTITUTION_TYPE.BUILDING_CATEGORY_BN,
                  type2: INSTITUTION_TYPE.BUILDING_CATEGORY_EN,
                }}
                inputLabel1="INSTITUTION_BUILDING_TYPE.BANGLA"
                inputLabel2="INSTITUTION_BUILDING_TYPE.ENGLISH"
              />
            </div>
          </div>

          <div className="d-flex justify-content-end align-items-center gap-6 border-top pt-8">
            <Button
              key={1}
              fill="outline"
              htmlType="button"
              type="primary"
              onClick={resetInstitutionBuildingTypeForm}
            >
              {t('INSTITUTION_BUILDING_TYPE.RESET')}
              <IconRefreshCcw01 size="20" fill="primary" />
            </Button>
            <Button key={2} htmlType="submit" type="success" loading={loading}>
              {t('INSTITUTION_BUILDING_TYPE.FILED')}
              <IconCheckCircleBroken size="20" fill="light" />
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateInstitutionType;
