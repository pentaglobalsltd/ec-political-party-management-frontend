import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { IconCheckCircleBroken } from '@pentabd/icons';
import { Button, Header } from '@pentabd/ui';

import FormInput from '@components/inputs/FormInput';
import FormInputDouble from '@components/inputs/FormInputDouble';
import FormSelect from '@components/inputs/FormSelect';
import { FORM_FIELDS } from '@constants/forms';
import {
  DistrictDataType,
  districtValidation,
} from '@validations/election-declaration-management/main-list/district/districtValidation';
import { editDistrictBreadcrumbs } from '../constants';
import { useRegionListSelect } from '@hooks/election-schedule-management/main-list/region/useRegionListSelect';
import { useGetDistrict } from '@hooks/election-schedule-management/main-list/district/useGetDistrict';
import { useUpdateDistrict } from '@hooks/election-schedule-management/main-list/district/useUpdateDistrict';

const DISTRICT =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.MAIN_LIST.DISTRICT.CREATE_DISTRICT;

function EditDistrict() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { regions, getRegionListSelect } = useRegionListSelect();
  const { updateDistrict, success } = useUpdateDistrict();
  const { district, getDistrict } = useGetDistrict();
  const navigate = useNavigate();

  useEffect(() => {
    getRegionListSelect();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (id) {
      getDistrict(id);
    }
    // eslint-disable-next-line
  }, [id]);

  const methods = useForm<DistrictDataType>({
    resolver: yupResolver(districtValidation),
    values: district as any,
  });

  const { handleSubmit } = methods;
  const updateDistrictForm = (data: any) => {
    const formData = {
      zillaCode: parseInt(data.zillaCode),
      regionId: parseInt(data.regionId),
      nameBn: data.nameBn,
      nameEn: data.nameEn,
      serialNo: parseInt(data.serialNo),
    };

    updateDistrict(id as string, formData);
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
        <form onSubmit={handleSubmit(updateDistrictForm)}>
          <Header
            className="mb-10 pt-10"
            headerText={{ header: t('DISTRICT.CHANGE') }}
            breadcrumbs={editDistrictBreadcrumbs(t)}
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
              type="light"
              onClick={() => navigate(-1)}
            >
              {t('DISTRICT.BACK')}
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

export default EditDistrict;
