import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { Button, Header, Text } from '@pentabd/ui';
import { IconCheckCircleBroken, IconRefreshCcw01 } from '@pentabd/icons';

import FormInputDouble from '@components/inputs/FormInputDouble';

import { TableBreadcrumbs } from '../../constants';
import { useCreateBuildingType } from '@hooks/election-schedule-management/other/building-type/useCreateBuildingType';
import { CreateInstitutionBuildingType } from '../../types';
import {
  INSTITUTE_BUILDING_TYPE,
  instituteBuildingTypeValidation,
  InstituteBuildingTypeDataType,
} from '@validations/election-declaration-management/others/institution-building-type/institutionBuildingTypeValidation';

const AddInstitutionBuildingType = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { addBuildingType, success, loading } = useCreateBuildingType();

  const methods = useForm<InstituteBuildingTypeDataType>({
    resolver: yupResolver(instituteBuildingTypeValidation),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<InstituteBuildingTypeDataType> = (
    data: CreateInstitutionBuildingType,
  ) => {
    addBuildingType(data);
  };

  useEffect(() => {
    if (success) {
      navigate(-1);
    }
  }, [navigate, success]);

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{ header: t('INSTITUTION_TYPE.ADD_NEW_INSTITUTE_TITLE') }}
        breadcrumbs={TableBreadcrumbs(t)}
      />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-6 border p-12 mb-12">
            <FormInputDouble
              title={t('INSTITUTION_TYPE.INSTITUTE_TYPE')}
              placeholder={t('PLACEHOLDER.ENTER')}
              registerName={{
                type1: INSTITUTE_BUILDING_TYPE.INSTITUTE_TYPE_BN,
                type2: INSTITUTE_BUILDING_TYPE.INSTITUTE_TYPE_EN,
              }}
              inputLabel1={t('INSTITUTION_TYPE.INSTITUTE_TYPE_BN')}
              inputLabel2={t('INSTITUTION_TYPE.INSTITUTE_TYPE_EN')}
            />
          </div>

          <div className="d-flex justify-content-end gap-6 border-top py-12">
            <Button
              key={1}
              fill="outline"
              className="border-primary"
              type="primary"
              onClick={() => reset()}
            >
              <Text size="sm" weight="semibold" color="primary">
                {t('INSTITUTION_TYPE.RESET_BUTTON_TEXT')}
              </Text>
              <IconRefreshCcw01 size="20" fill="primary" />
            </Button>

            <Button key={2} type="success" loading={loading} htmlType="submit">
              {t('INSTITUTION_TYPE.SUBMISSION_BUTTON_TEXT')}
              <IconCheckCircleBroken size="20" fill="light" />
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddInstitutionBuildingType;
