import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Header } from '@pentabd/ui';
import { IconCheckCircleBroken } from '@pentabd/icons';

import FormInputDouble from '@components/inputs/FormInputDouble';

import { FORM_FIELDS } from '@constants/forms';
import { EditBreadcrumbs } from '../constants';
import { useGetInstituteType } from '@hooks/election-schedule-management/other/institute-type/useGetInstituteType';
import { useUpdateInstituteType } from '@hooks/election-schedule-management/other/institute-type/useUpdateInstituteType';
import {
  InstitutionTypeDataType,
  institutionTypeValidation,
} from '@validations/election-declaration-management/others/institution-type/institutionTypeValidation';
import { CreateInstitutionTypes } from '../types';

const INSTITUTION_TYPE =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.OTHERS.INSTITUTION_BUILDING_TYPE;

const EditInstitutionType = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { instituteType, getInstituteType } = useGetInstituteType();
  const { editInstituteType, loading, success } = useUpdateInstituteType();

  const methods = useForm<InstitutionTypeDataType>({
    resolver: yupResolver(institutionTypeValidation),
    values: instituteType as InstitutionTypeDataType,
  });

  const { handleSubmit } = methods;
  const updateInstitutionBuildingTypeForm = (data: CreateInstitutionTypes) => {
    if (id) {
      editInstituteType(Number(id), data);
    }
  };

  const handleReturn = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (success) {
      navigate(-1);
    }
  }, [success, navigate]);

  useEffect(() => {
    if (id) {
      getInstituteType(Number(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="container-96 mb-24">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(updateInstitutionBuildingTypeForm)}>
          <Header
            className="mb-10 pt-10"
            headerText={{ header: t('INSTITUTION_BUILDING_TYPE.CHANGE') }}
            breadcrumbs={EditBreadcrumbs(t)}
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
              type="light"
              fill="outline"
              htmlType="button"
              onClick={handleReturn}
            >
              {t('INSTITUTION_BUILDING_TYPE.BACK')}
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

export default EditInstitutionType;
