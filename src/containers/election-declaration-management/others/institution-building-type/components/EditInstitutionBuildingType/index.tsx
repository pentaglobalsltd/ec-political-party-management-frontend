import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { Button, Header, Text } from '@pentabd/ui';
import { IconCheckCircleBroken } from '@pentabd/icons';

import FormInputDouble from '@components/inputs/FormInputDouble';

import { TableBreadcrumbs } from '../../constants';
import { useGetBuildingType } from '@hooks/election-schedule-management/other/building-type/useGetBuildingType';
import { useUpdateBuildingType } from '@hooks/election-schedule-management/other/building-type/useUpdateBuildingType';
import { CreateInstitutionBuildingType } from '../../types';
import {
  INSTITUTE_BUILDING_TYPE,
  InstituteBuildingTypeDataType,
  instituteBuildingTypeValidation,
} from '@validations/election-declaration-management/others/institution-building-type/institutionBuildingTypeValidation';

const EditInstitutionBuildingType = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const { buildingType, getBuildingType } = useGetBuildingType();

  const { updateBuildingType, success } = useUpdateBuildingType();

  const methods = useForm<InstituteBuildingTypeDataType>({
    resolver: yupResolver(instituteBuildingTypeValidation),
    values: buildingType,
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<InstituteBuildingTypeDataType> = (
    data: CreateInstitutionBuildingType,
  ) => {
    if (id) {
      updateBuildingType(id, data);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (id) {
      getBuildingType(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (success) {
      navigate(-1);
    }
  }, [navigate, success]);

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{ header: t('INSTITUTION_TYPE.EDIT_INSTITUTE_TITLE') }}
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
            <Button fill="outline" type="light" onClick={handleGoBack}>
              <Text size="sm" weight="semibold">
                {t('INSTITUTION_TYPE.GO_BACK_TEXT')}
              </Text>
            </Button>

            <Button
              fill="fill"
              className="border-primary"
              type="success"
              htmlType="submit"
            >
              <Text size="sm" weight="semibold" color="white">
                {t('INSTITUTION_TYPE.SUBMISSION_BUTTON_TEXT')}
              </Text>
              <IconCheckCircleBroken size="20" fill="white" />
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditInstitutionBuildingType;
