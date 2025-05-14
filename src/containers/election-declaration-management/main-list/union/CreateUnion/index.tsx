import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  IconCheckCircleBroken,
  IconInfoCircle,
  IconRefreshCcw01,
} from '@pentabd/icons';
import { Button, Header, Note, Text } from '@pentabd/ui';

import FormInput from '@components/inputs/FormInput';
import FormInputDouble from '@components/inputs/FormInputDouble';
import FormSelect from '@components/inputs/FormSelect';
import { FORM_FIELDS } from '@constants/forms';
import { useCreateUnion } from '@hooks/election-schedule-management/main-list/union/useCreateUnion';
import { useMunicipalitiesListSelect } from '@hooks/miscellaneous/master-hook/municipality/useMunicipalitiesListSelect';
import { useSubDistrictListSelect } from '@hooks/election-schedule-management/main-list/sub-district/useSubDistrictListSelect';

import { useZillas } from '@hooks/miscellaneous/master-hook/zilla/useZillasDivison';

import {
  UnionDataType,
  unionValidation,
} from '@validations/election-declaration-management/main-list/union/unionValidation';
import { useEffect } from 'react';
import { newUnionBreadcrumbs } from '../constants';

const UNION =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.MAIN_LIST.UNION.CREATE_UNION;

function CreateUnion() {
  const { t } = useTranslation();
  const { zillas } = useZillas({});
  const { upazilas, getSubDistrictListSelect } = useSubDistrictListSelect();
  const { municipalities, getMunicipalitiesListSelect } =
    useMunicipalitiesListSelect();
  const {
    createUnionHandler,
    state: { loading },
  } = useCreateUnion();

  const methods = useForm<UnionDataType>({
    resolver: yupResolver(unionValidation),
  });

  const { handleSubmit, reset, watch } = methods;
  const currentDistrictValue = watch(UNION.ZILLA_ID);

  const submitUnionForm = (data: any) => {
    const createUnionData = {
      geoCode: data.geoCode,
      upazilaId: Number(data.upazilaId),
      ...(data.municipalityId && {
        municipalityId: Number(data.municipalityId),
      }),
      nameBn: data.nameBn,
      nameEn: data.nameEn,
    };
    createUnionHandler(createUnionData);
  };

  useEffect(() => {
    if (currentDistrictValue) {
      getSubDistrictListSelect(currentDistrictValue);
      getMunicipalitiesListSelect(currentDistrictValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDistrictValue]);

  const resetUnionForm = () => {
    reset();
  };

  return (
    <div className="container-96 mb-24">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submitUnionForm)}>
          <Header
            className="mb-10 pt-10"
            headerText={{ header: t('UNION.ADD_NEW') }}
            breadcrumbs={newUnionBreadcrumbs(t)}
          />

          <div className="mb-9">
            <div className="d-grid grid-cols-12 gap-8 p-9 border rounded-5">
              <div className="col-span-12 col-span-lg-9">
                <FormSelect
                  title={t('UNION.DISTRICT')}
                  name={UNION.ZILLA_ID}
                  options={zillas}
                  disabled={zillas.length === 0}
                  colOneClassName="col-span-4"
                  colTwoClassName="col-span-lg-6"
                />

                <FormSelect
                  title={t('UNION.SUB_DISTRICT')}
                  name={UNION.SUB_DISTRICT_ID}
                  options={upazilas}
                  disabled={upazilas.length === 0}
                  colOneClassName="col-span-4"
                  colTwoClassName="col-span-lg-6"
                />

                <FormSelect
                  title={t('UNION.MUNICIPALITY_OR_CITY_CORPORATION')}
                  name={UNION.MUNICIPALITY_ID}
                  options={municipalities}
                  disabled={municipalities.length === 0}
                  colOneClassName="col-span-4"
                  colTwoClassName="col-span-lg-6"
                />

                <FormInputDouble
                  title="UNION.UNION_OR_WARD"
                  placeholder={t('PLACEHOLDER.ENTER')}
                  registerName={{
                    type1: UNION.NAME_BN,
                    type2: UNION.NAME_EN,
                  }}
                  inputLabel1="UNION.BANGLA"
                  inputLabel2="UNION.ENGLISH"
                  colOneClassName="col-span-4"
                  colTwoClassName="col-span-lg-6"
                />

                <FormInput
                  title="UNION.UNION_OR_WARD_GO_CODE"
                  placeholder={t('PLACEHOLDER.ENTER')}
                  registerName={UNION.GEO_CODE}
                  colOneClassName="col-span-4"
                  colTwoClassName="col-span-lg-6"
                />
              </div>
              <div className="col-span-12 col-span-lg-3">
                <Note
                  icon={<IconInfoCircle size="20" fill="primary" />}
                  body={
                    <Text
                      size="sm"
                      weight="medium"
                      className="lh-sm text-primary-middark"
                    >
                      {t('UNION.CONCERN_MSG')}
                    </Text>
                  }
                  classes="border-primary-midlight bg-primary-25"
                />
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end align-items-center gap-6 border-top py-8">
            <Button
              fill="outline"
              key={1}
              htmlType="button"
              type="primary"
              onClick={resetUnionForm}
              disabled={loading}
            >
              {t('UNION.RESET')}
              <IconRefreshCcw01 size="20" fill="primary" />
            </Button>
            <Button key={2} htmlType="submit" type="success" disabled={loading}>
              {t('UNION.FILED')}
              <IconCheckCircleBroken size="20" fill="light" />
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default CreateUnion;
