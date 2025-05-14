import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { IconCheckCircleBroken, IconRefreshCcw01 } from '@pentabd/icons';
import { Button, Header } from '@pentabd/ui';

import FormInput from '@components/inputs/FormInput';
import FormInputDouble from '@components/inputs/FormInputDouble';
import FormSelect from '@components/inputs/FormSelect';
import { FORM_FIELDS } from '@constants/forms';
import { useCreateMunicipality } from '@hooks/election-schedule-management/main-list/municipality/useCreateMunicipality';
import { useSubDistrictListSelect } from '@hooks/election-schedule-management/main-list/sub-district/useSubDistrictListSelect';
import { useZillas } from '@hooks/miscellaneous/master-hook/zilla/useZillasDivison';
import { useRMOListSelect } from '@hooks/miscellaneous/master-hook/rmo/useRMOListSelect';
import {
  MunicipalityDataType,
  municipalityValidation,
} from '@validations/election-declaration-management/main-list/municipality/municipalityValidation';
import { newMunicipalityBreadcrumbs } from '../constants';

const MUNICIPALITY =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.MAIN_LIST.MUNICIPALITY
    .CREATE_MUNICIPALITY;

function CreateMunicipality() {
  const { t } = useTranslation();
  const { zillas, getZillasData } = useZillas({ notCallOnMount: true });
  const { upazilas, getSubDistrictListSelect } = useSubDistrictListSelect();
  const { rmos, getRMOListSelect } = useRMOListSelect();

  const navigate = useNavigate();
  const { createMunicipality, success } = useCreateMunicipality();

  useEffect(() => {
    getZillasData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getRMOListSelect();
    // eslint-disable-next-line
  }, []);

  const methods = useForm<MunicipalityDataType>({
    resolver: yupResolver(municipalityValidation),
  });

  const { handleSubmit, reset, watch } = methods;
  const districtWatch = watch(MUNICIPALITY.DISTRICT);

  useEffect(() => {
    if (districtWatch) {
      getSubDistrictListSelect(districtWatch as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtWatch]);

  const submitMunicipalityForm = (data: any) => {
    const formData = {
      ...data,
      municipalityCode: parseInt(data.municipalityCode),
      zillaId: parseInt(data.zillaId),
    };

    createMunicipality(formData);
  };

  const resetMunicipalityForm = () => {
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
        <form onSubmit={handleSubmit(submitMunicipalityForm)}>
          <Header
            className="mb-10 pt-10"
            headerText={{ header: t('MUNICIPALITY.ADD_NEW') }}
            breadcrumbs={newMunicipalityBreadcrumbs(t)}
          />

          <div className="mb-9">
            <div className="d-flex flex-column gap-8 p-9 border rounded-5">
              <FormSelect
                title={t('MUNICIPALITY.DISTRICT')}
                name={MUNICIPALITY.DISTRICT}
                options={zillas}
              />

              <FormSelect
                title={t('MUNICIPALITY.SUB_DISTRICT')}
                name={MUNICIPALITY.SUB_DISTRICT}
                disabled={upazilas.length === 0}
                options={upazilas}
                isMulti
              />

              <FormInputDouble
                title="MUNICIPALITY.MUNICIPALITY_NAME"
                placeholder={t('PLACEHOLDER.ENTER')}
                registerName={{
                  type1: MUNICIPALITY.MUNICIPALITY_BN,
                  type2: MUNICIPALITY.MUNICIPALITY_EN,
                }}
                inputLabel1="MUNICIPALITY.BANGLA"
                inputLabel2="MUNICIPALITY.ENGLISH"
              />

              <FormInput
                title="MUNICIPALITY.MUNICIPALITY_GO_CODE"
                placeholder={t('PLACEHOLDER.ENTER')}
                registerName={MUNICIPALITY.MUNICIPALITY_GO_CODE}
              />

              <FormSelect
                title="MUNICIPALITY.RMO"
                name={MUNICIPALITY.RMO}
                options={rmos}
              />
            </div>
          </div>

          <div className="d-flex justify-content-end align-items-center gap-6 border-top py-8">
            <Button
              fill="outline"
              key={1}
              htmlType="button"
              type="primary"
              onClick={resetMunicipalityForm}
            >
              {t('MUNICIPALITY.RESET')}
              <IconRefreshCcw01 size="20" fill="primary" />
            </Button>
            <Button key={2} htmlType="submit" type="success">
              {t('MUNICIPALITY.FILED')}
              <IconCheckCircleBroken size="20" fill="light" />
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default CreateMunicipality;
