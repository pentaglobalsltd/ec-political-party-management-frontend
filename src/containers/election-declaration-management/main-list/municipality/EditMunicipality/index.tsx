import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Header } from '@pentabd/ui';
import { IconCheckCircleBroken } from '@pentabd/icons';

import {
  MunicipalityDataType,
  municipalityValidation,
} from '@validations/election-declaration-management/main-list/municipality/municipalityValidation';
import { editMunicipalityBreadcrumbs } from '../constants';
import { FORM_FIELDS } from '@constants/forms';
import FormInput from '@components/inputs/FormInput';
import FormSelect from '@components/inputs/FormSelect';
import FormInputDouble from '@components/inputs/FormInputDouble';
import { useGetMunicipality } from '@hooks/election-schedule-management/main-list/municipality/useGetMunicipality';
import { useZillas } from '@hooks/miscellaneous/master-hook/zilla/useZillasDivison';
import { useUpdateMunicipality } from '@hooks/election-schedule-management/main-list/municipality/useUpdateMunicipality';
import { useSubDistrictListSelect } from '@hooks/election-schedule-management/main-list/sub-district/useSubDistrictListSelect';
import { useRMOListSelect } from '@hooks/miscellaneous/master-hook/rmo/useRMOListSelect';

const MUNICIPALITY =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.MAIN_LIST.MUNICIPALITY
    .CREATE_MUNICIPALITY;

function EditMunicipality() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { municipality, getMunicipality } = useGetMunicipality();
  const { zillas, getZillasData } = useZillas({ notCallOnMount: true });
  const { upazilas, getSubDistrictListSelect } = useSubDistrictListSelect();
  const { rmos, getRMOListSelect } = useRMOListSelect();

  const navigate = useNavigate();
  const { updateMunicipality, success } = useUpdateMunicipality();

  const methods = useForm<MunicipalityDataType>({
    resolver: yupResolver(municipalityValidation),
    values: municipality as any,
  });

  const { handleSubmit, watch } = methods;
  const districtWatch = watch(MUNICIPALITY.DISTRICT);

  useEffect(() => {
    if (id) {
      getMunicipality(id);
    }
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    getZillasData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getRMOListSelect();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (districtWatch) {
      getSubDistrictListSelect(districtWatch as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtWatch]);

  const updateMunicipalityForm = (data: any) => {
    const modifiedData = {
      municipalityCode: Number(data.municipalityCode),
      zillaId: Number(data.zillaId),
      rmoEn: data.rmoEn,
      nameBn: data.nameBn,
      nameEn: data.nameEn,
      upazilaIds: data.upazilaIds,
    };
    updateMunicipality(id as string, modifiedData);
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
        <form onSubmit={handleSubmit(updateMunicipalityForm)}>
          <Header
            className="mb-10 pt-10"
            headerText={{ header: t('MUNICIPALITY.CHANGE') }}
            breadcrumbs={editMunicipalityBreadcrumbs(t)}
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
              type="light"
              onClick={() => navigate(-1)}
            >
              {t('MUNICIPALITY.BACK')}
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

export default EditMunicipality;
