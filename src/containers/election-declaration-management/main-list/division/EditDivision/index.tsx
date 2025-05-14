import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { IconCheckCircleBroken } from '@pentabd/icons';
import { Button, Header } from '@pentabd/ui';

import FormInput from '@components/inputs/FormInput';
import { FORM_FIELDS } from '@constants/forms';
import { useUpdateRegion } from '@hooks/election-schedule-management/main-list/region/useUpdateRegion';
import { useGetRegion } from '@hooks/election-schedule-management/main-list/region/useGetRegion';
import {
  DivisionDataType,
  divisionValidation,
} from '@validations/election-declaration-management/main-list/division/divisionValidation';
import { editDivisionBreadcrumbs } from '../constants';

const DIVISION =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.MAIN_LIST.DIVISION.CREATE_DIVISION;

function EditDivision() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { region, getRegion } = useGetRegion();
  const { updateRegion, success } = useUpdateRegion();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getRegion(id);
    }
    // eslint-disable-next-line
  }, [id]);

  const methods = useForm<DivisionDataType>({
    resolver: yupResolver(divisionValidation),
    values: region as any,
  });

  const { handleSubmit } = methods;
  const updateDivisionForm = (data: any) => {
    const formData = {
      nameBn: data.nameBn,
      nameEn: data.nameEn,
      regionCode: parseInt(data.regionCode),
    };
    updateRegion(id as string, formData);
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
        <form onSubmit={handleSubmit(updateDivisionForm)}>
          <Header
            className="mb-10 pt-10"
            headerText={{ header: t('DIVISION.CHANGE') }}
            breadcrumbs={editDivisionBreadcrumbs(t)}
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
              type="light"
              onClick={() => navigate(-1)}
            >
              {t('DIVISION.BACK')}
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

export default EditDivision;
