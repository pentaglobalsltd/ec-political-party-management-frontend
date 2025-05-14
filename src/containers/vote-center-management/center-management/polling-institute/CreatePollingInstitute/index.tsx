import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';

import { Text, Button, Header } from '@pentabd/ui';
import { IconCheckCircleBroken, IconRefreshCcw01 } from '@pentabd/icons';

import FormSelect from '@components/inputs/FormSelect';
import FormInput from '@components/inputs/FormInput';
import FormCheckbox from '@components/inputs/FormCheckbox';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import useRoReportFilters from '@hooks/candidate-info-management/report/useRoReportFilters';

import useCreatePollingInstitute from '@hooks/vote-center-management/center-management/polling-institute/useCreatePollingInstitute';
import useGetPollingInstituteById from '@hooks/vote-center-management/center-management/polling-institute/useGetPollingInstituteById';
import useUpdatePollingInstitute from '@hooks/vote-center-management/center-management/polling-institute/useUpdatePollingInstitute';

import { USER_TYPES } from '@constants/user-types';
import { CHECK_ONLY_NUMBER_AND_EMPTY } from '@constants/validation-string';
import {
  createPollingInstituteBreadcrumbs,
  allSelectedPollingInstitute,
  optionMunicipalitiesPollingInstitute,
  optionRmoPollingInstitute,
  optionUpazillaPollingInstitute,
  optionZillaPollingInstitute,
  optionUnionWardPollingInstitute,
} from './constants';

import {
  createPollingInstituteDataType,
  createPollingInstituteValidation,
  CREATE_POLLING_INSTITUTE,
} from '@validations/vote-center-management/center-management/polling-institute/createPollingInstituteValidation';
import useFields from './useFields';

export interface Props {
  pollingInstituteId?: number;
  closeModal?: () => void;
  getPollingInstitutesList?: () => void;
}

const CreatePollingInstitute = ({
  pollingInstituteId,
  closeModal,
  getPollingInstitutesList,
}: Props) => {
  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  // only for Operator
  const { roReportFilters } = useRoReportFilters();
  const operatorRegion: any = roReportFilters?.region;
  const operatorZila: any = roReportFilters?.zilla;

  const { pollingInstituteCreate, createLoading, createSuccess } =
    useCreatePollingInstitute();
  const { pollingInstituteById, getPollingInstituteByIdData } =
    useGetPollingInstituteById();
  const { updatePollingInstituteById, updateLoading, updateSuccess } =
    useUpdatePollingInstitute();

  const [resetData, setResetData] = useState({
    ...allSelectedPollingInstitute,
  });

  const emptyBelowData = (newData: { [name: string]: boolean }) => {
    setResetData((data: any) => ({
      ...data,
      ...newData,
    }));
  };

  const methods = useForm<any>({
    resolver: yupResolver(createPollingInstituteValidation),
    values: pollingInstituteById,
  });

  const { handleSubmit, reset, watch, setValue } = methods;

  // const rmoChange = watch(CREATE_POLLING_INSTITUTE.RMO);
  const {
    regions,
    zillas,
    upazilas,
    rmos,
    municipalities,
    unionsOrWards,
    upWards,

    buildingTypeListSelect,
    instituteTypesSelect,

    showMunicipality,
    showUnionParishadWard,
  } = useFields({ watch, userType });

  const resetSystemUserForm = () => {
    reset();
  };

  // set region value for Operator
  useEffect(() => {
    if (userType === USER_TYPES.OPERATOR) {
      if (operatorRegion) {
        setValue(CREATE_POLLING_INSTITUTE.DIVISION, operatorRegion?.[0]?.value);
      }
      if (operatorZila) {
        setValue(CREATE_POLLING_INSTITUTE.ZILA, operatorZila?.[0]?.value);
      }
    }
  }, [operatorRegion, operatorZila, setValue, userType]);

  // Get single data by ID
  useEffect(() => {
    if (id) {
      getPollingInstituteByIdData(id);
    }
    if (pollingInstituteId) {
      getPollingInstituteByIdData(pollingInstituteId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, pollingInstituteId]);

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      if (pollingInstituteId && closeModal && getPollingInstitutesList) {
        getPollingInstitutesList();
        closeModal();
      } else {
        navigate(-1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, createSuccess, updateSuccess, pollingInstituteId]);

  const onSubmit: SubmitHandler<createPollingInstituteDataType> = (
    postData: any,
  ) => {
    if (id) updatePollingInstituteById(id, postData);
    else if (pollingInstituteId)
      updatePollingInstituteById(pollingInstituteId, postData);
    else pollingInstituteCreate(postData);
  };

  return (
    <div className="container-96 mb-24">
      <FormProvider {...methods}>
        <Header
          headerText={{
            header: t('POLLING_INSTITUTE.INSTITUTE_ADD_FORM_TITLE'),
          }}
          {...(!pollingInstituteId
            ? { breadcrumbs: createPollingInstituteBreadcrumbs(t) }
            : {})}
          className="mb-12 pt-10"
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="pt-12">
            {userType === USER_TYPES.ADMIN ? (
              <FormSelect
                title="POLLING_INSTITUTE.DIVISION"
                name={CREATE_POLLING_INSTITUTE.DIVISION}
                options={regions}
                required
                clearValue={resetData.region}
                clearOptions={resetData.regionOptions}
                resetData={() =>
                  emptyBelowData({
                    ...optionZillaPollingInstitute,
                    region: false,
                    regionOptions: false,
                    zillaOption: false,
                  })
                }
              />
            ) : null}

            <FormSelect
              title="POLLING_INSTITUTE.ZILA"
              name={CREATE_POLLING_INSTITUTE.ZILA}
              options={userType === USER_TYPES.ADMIN ? zillas : operatorZila}
              disabled={userType === USER_TYPES.OPERATOR}
              required
              clearValue={resetData.zilla}
              clearOptions={resetData.zillaOption}
              resetData={() =>
                emptyBelowData({
                  ...optionUpazillaPollingInstitute,
                  zilla: false,
                  upazilaOptions: false,
                })
              }
            />

            <FormSelect
              title="POLLING_INSTITUTE.UPAZILA"
              name={CREATE_POLLING_INSTITUTE.UPAZILA}
              options={
                userType === USER_TYPES.OPERATOR
                  ? roReportFilters?.upazilla || []
                  : upazilas
              }
              required
              clearValue={resetData.upazila}
              clearOptions={resetData.upazilaOptions}
              resetData={() =>
                emptyBelowData({
                  ...optionRmoPollingInstitute,
                  upazila: false,
                })
              }
            />

            <FormSelect
              title="POLLING_INSTITUTE.RMO"
              name={CREATE_POLLING_INSTITUTE.RMO}
              options={rmos}
              required
              clearValue={resetData.rmo}
              resetData={() =>
                emptyBelowData({
                  ...optionRmoPollingInstitute,
                  rmo: false,
                  municipalitiesOptions: false,
                  unionWardOptions: false,
                })
              }
            />

            {showMunicipality && (
              <FormSelect
                title="POLLING_INSTITUTE.MUNICIPALITY_CITY_CORPORATION"
                name={CREATE_POLLING_INSTITUTE.MUNICIPALITY_CITY_CORPORATION}
                options={municipalities}
                clearValue={resetData.municipalities}
                clearOptions={resetData.municipalitiesOptions}
                resetData={() =>
                  emptyBelowData({
                    ...optionMunicipalitiesPollingInstitute,
                    municipalities: false,
                    unionWardOptions: false,
                  })
                }
              />
            )}

            <FormSelect
              title={t('POLLING_INSTITUTE.UNION_WARD')}
              name={CREATE_POLLING_INSTITUTE.UNION_WARD}
              options={unionsOrWards}
              required
              clearValue={resetData.unionWard}
              clearOptions={resetData.unionWardOptions}
              resetData={() =>
                emptyBelowData({
                  ...optionUnionWardPollingInstitute,
                  unionWard: false,
                  optionUpWard: false,
                })
              }
            />

            {showUnionParishadWard && (
              <FormSelect
                title={t('POLLING_INSTITUTE.UP_WARD')}
                name={CREATE_POLLING_INSTITUTE.UP_WARD}
                options={upWards}
                required
                clearValue={resetData.upWard}
                clearOptions={resetData.upWardOptions}
                resetData={() =>
                  emptyBelowData({
                    upWard: false,
                  })
                }
              />
            )}

            <FormInput
              registerName={CREATE_POLLING_INSTITUTE.INSTITUTE_NAME_BANGLA}
              title={t('POLLING_INSTITUTE.INSTITUTE_NAME_BANGLA')}
              placeholder="PLACEHOLDER.ENTER"
              required
            />

            <FormInput
              registerName={CREATE_POLLING_INSTITUTE.INSTITUTE_NAME_ENGLISH}
              title={t('POLLING_INSTITUTE.INSTITUTE_NAME_ENGLISH')}
              placeholder="PLACEHOLDER.ENTER"
            />

            <FormInput
              registerName={CREATE_POLLING_INSTITUTE.INSTITUTE_ADDRESS_BANGLA}
              title={t('POLLING_INSTITUTE.INSTITUTE_ADDRESS_BANGLA')}
              placeholder="PLACEHOLDER.ENTER"
            />

            <FormInput
              registerName={CREATE_POLLING_INSTITUTE.INSTITUTE_ADDRESS_ENGLISH}
              title={t('POLLING_INSTITUTE.INSTITUTE_ADDRESS_ENGLISH')}
              placeholder="PLACEHOLDER.ENTER"
            />

            <FormSelect
              title={t('POLLING_INSTITUTE.INSTITUTE_TYPE')}
              name={CREATE_POLLING_INSTITUTE.INSTITUTE_TYPE}
              options={instituteTypesSelect}
              required
            />

            <FormInput
              title="POLLING_INSTITUTE.HEAD_NAME_DESIGNATION"
              registerName={CREATE_POLLING_INSTITUTE.HEAD_NAME_DESIGNATION}
              placeholder="PLACEHOLDER.ENTER"
            />

            <FormInput
              title="POLLING_INSTITUTE.HEAD_CONTACT_NO"
              subtitle="POLLING_INSTITUTE.NUMBER_FIELD_SUBTITLE"
              registerName={CREATE_POLLING_INSTITUTE.HEAD_CONTACT_NO}
              placeholder="PLACEHOLDER.ENTER"
              formattedValue={CHECK_ONLY_NUMBER_AND_EMPTY}
            />

            <FormInput
              title="POLLING_INSTITUTE.INSTITUTE_EMPLOYEE_AMOUNT"
              subtitle="POLLING_INSTITUTE.NUMBER_FIELD_SUBTITLE"
              registerName={CREATE_POLLING_INSTITUTE.INSTITUTE_EMPLOYEE_AMOUNT}
              placeholder="PLACEHOLDER.ENTER"
              formattedValue={CHECK_ONLY_NUMBER_AND_EMPTY}
            />

            <FormSelect
              title="POLLING_INSTITUTE.BUILDING_TYPE"
              name={CREATE_POLLING_INSTITUTE.BUILDING_TYPE}
              options={buildingTypeListSelect}
              required
            />

            <FormInput
              title={t('POLLING_INSTITUTE.BUILDING_FLOORS')}
              subtitle="POLLING_INSTITUTE.NUMBER_FIELD_SUBTITLE"
              registerName={CREATE_POLLING_INSTITUTE.BUILDING_FLOORS}
              placeholder="PLACEHOLDER.ENTER"
              formattedValue={CHECK_ONLY_NUMBER_AND_EMPTY}
            />

            <FormInput
              registerName={CREATE_POLLING_INSTITUTE.TOTAL_ROOM_AMOUNT}
              subtitle="POLLING_INSTITUTE.NUMBER_FIELD_SUBTITLE"
              title={t('POLLING_INSTITUTE.TOTAL_ROOM_AMOUNT')}
              placeholder="PLACEHOLDER.ENTER"
              formattedValue={CHECK_ONLY_NUMBER_AND_EMPTY}
            />

            <FormCheckbox
              title={t('POLLING_INSTITUTE.IS_INSTITUTE_ELECTRICITY_SUPPLY')}
              registerName={
                CREATE_POLLING_INSTITUTE.IS_INSTITUTE_ELECTRICITY_SUPPLY
              }
            />

            <FormCheckbox
              title={t('POLLING_INSTITUTE.IS_INSTITUTE_DRINKING_WATER')}
              registerName={
                CREATE_POLLING_INSTITUTE.IS_INSTITUTE_DRINKING_WATER
              }
            />

            <FormCheckbox
              registerName={CREATE_POLLING_INSTITUTE.INSTITUTE_TOILET}
              title={t('POLLING_INSTITUTE.INSTITUTE_TOILET')}
            />

            <FormCheckbox
              registerName={CREATE_POLLING_INSTITUTE.IS_BOUNDARY_RAILED}
              title={t('POLLING_INSTITUTE.IS_BOUNDARY_RAILED')}
            />

            <FormInput
              title="POLLING_INSTITUTE.DESCRIPTION_OF_BLOCK"
              subtitle="POLLING_INSTITUTE.DESCRIPTION_OF_BLOCK_SUBTITLE"
              registerName={CREATE_POLLING_INSTITUTE.DESCRIPTION_OF_BLOCK}
              placeholder="PLACEHOLDER.ENTER"
            />

            <FormInput
              title="POLLING_INSTITUTE.INSTITUTE_DISTANCE"
              subtitle="POLLING_INSTITUTE.NUMBER_FIELD_SUBTITLE"
              registerName={CREATE_POLLING_INSTITUTE.INSTITUTE_DISTANCE}
              placeholder="PLACEHOLDER.ENTER"
              formattedValue={CHECK_ONLY_NUMBER_AND_EMPTY}
            />

            <FormInput
              title="POLLING_INSTITUTE.INSTITUTE_REACHING_WAYS"
              registerName={CREATE_POLLING_INSTITUTE.INSTITUTE_REACHING_WAYS}
              placeholder="PLACEHOLDER.ENTER"
            />

            <FormCheckbox
              title="POLLING_INSTITUTE.IS_PAST_RISKY_IMPORTANT_INSTITUTE"
              registerName={
                CREATE_POLLING_INSTITUTE.IS_PAST_RISKY_IMPORTANT_INSTITUTE
              }
            />

            <FormCheckbox
              registerName={CREATE_POLLING_INSTITUTE.IS_DAYLIGHT_ENOUGH}
              title={t('POLLING_INSTITUTE.IS_DAYLIGHT_ENOUGH')}
            />

            <FormCheckbox
              registerName={CREATE_POLLING_INSTITUTE.IS_OPEN_SPACE}
              title={t('POLLING_INSTITUTE.IS_OPEN_SPACE')}
            />

            <FormCheckbox
              registerName={CREATE_POLLING_INSTITUTE.IS_FLOOD_PRONE_AREA}
              title={t('POLLING_INSTITUTE.IS_FLOOD_PRONE_AREA')}
            />

            <FormInput
              registerName={CREATE_POLLING_INSTITUTE.COMMENT}
              title={t('POLLING_INSTITUTE.COMMENT')}
              placeholder="PLACEHOLDER.ENTER"
            />
            {id || pollingInstituteId ? (
              <>
                <FormInput
                  registerName={CREATE_POLLING_INSTITUTE.LAT}
                  title={t('POLLING_INSTITUTE.LATITUDE')}
                  placeholder="PLACEHOLDER.ENTER"
                  disabled
                />
                <FormInput
                  registerName={CREATE_POLLING_INSTITUTE.LON}
                  title={t('POLLING_INSTITUTE.LONGITUDE')}
                  placeholder="PLACEHOLDER.ENTER"
                  disabled
                />
              </>
            ) : null}

            <div className="d-flex justify-content-end gap-6 border-top pt-12">
              <Button
                key={1}
                fill="outline"
                className="border-primary"
                type="primary"
                htmlType="button"
                onClick={resetSystemUserForm}
              >
                {t('SYMBOL.RESET')}
                <IconRefreshCcw01 size="20" fill="primary" />
              </Button>
              <Button
                key={2}
                fill="fill"
                className="border-primary"
                type="primary"
                htmlType="submit"
                loading={createLoading || updateLoading}
              >
                <Text size="sm" weight="semibold" color="white">
                  {t('SYMBOL.SUBMIT')}
                </Text>
                <IconCheckCircleBroken size="20" fill="white" />
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreatePollingInstitute;
