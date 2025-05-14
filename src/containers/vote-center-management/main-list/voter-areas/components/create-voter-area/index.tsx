import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { IconCheckCircleBroken } from '@pentabd/icons';
import { Text, Button, Header, useDebounce } from '@pentabd/ui';

import FormInput from '@components/inputs/FormInput';
import FormSelect from '@components/inputs/FormSelect';
import { RMO_RURAL } from '@components/application-search/constants';

import { USER_TYPES } from '@constants/user-types';
import { FORM_FIELDS } from '@constants/forms';
import { ELECTION_CLASS_NATIONAL } from '../../constants';
import { CHECK_ONLY_NUMBER_AND_EMPTY } from '@constants/validation-string';
import {
  allSelectedVoterArea,
  createVoterAreaBreadcrumbs,
  optionMunicipalitiesVoterArea,
  optionUnionParishadWardVoterArea,
  optionUnionWardVoterArea,
  optionZillaVoterArea,
} from './constants';

import {
  CreateVoterAreaDataType,
  createVoterAreaValidation,
} from '@validations/vote-center-management/main-list/voter-area/voterAreaValidation';

import useUpdateVoterAreaById from '@hooks/vote-center-management/main-list/voter-areas/useUpdateVoterArea';
import useGetVoterAreaById from '@hooks/vote-center-management/main-list/voter-areas/useGetVoterAreaById';
import useRoReportFilters from '@hooks/candidate-info-management/report/useRoReportFilters';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useZillas } from '@hooks/miscellaneous/master-hook/zilla/useZillasDivison';
import { useUnionsOrWards } from '@hooks/miscellaneous/master-hook/union-or-ward/useUnionsOrWardsSelect';
import { useCreateVoterArea } from '@hooks/vote-center-management/main-list/voter-areas/useCreateVoterArea';
import { useGetUnionsWardsSelect } from '@hooks/election-schedule-management/main-list/union-ward/useGetUnionsWardsSelect';
import { useSubDistrictListSelect } from '@hooks/election-schedule-management/main-list/sub-district/useSubDistrictListSelect';
import { useUpazillaMunicipalities } from '@hooks/miscellaneous/master-hook/upazilas/useUpazillasMunicipalities';
import { useVoterAreaCodeFromZilla } from '@hooks/vote-center-management/main-list/voter-areas/useVoterAreaCodeFromZilla';

export const CREATE_VOTER_AREA =
  FORM_FIELDS.VOTE_CENTER_MANAGEMENT.MAIN_LIST.VOTER_AREA.CREATE_VOTER_AREA;

const CreateVoterArea = () => {
  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;

  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { roReportFilters } = useRoReportFilters();

  const [value, setDebounceValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 500);

  const { zillas, getZillasData } = useZillas({ notCallOnMount: true });
  const { upazilas, getSubDistrictListSelect } = useSubDistrictListSelect();
  const { municipalities, getUpazillasMunicipalitiesList } =
    useUpazillaMunicipalities();
  const { unionsOrWards, getUnionsOrWardsData } = useUnionsOrWards();
  const { unionsWards, getUnionsWardsSelect } = useGetUnionsWardsSelect();
  const { getVoterAreaByIdData, voterAreaData } = useGetVoterAreaById();
  const { getVoterAreaCodeFromZillaData, success, setSuccess } =
    useVoterAreaCodeFromZilla();

  const {
    voterAreaCreate,
    loading: createLoading,
    success: createSuccess,
  } = useCreateVoterArea();
  const {
    updateVoterAreaById,
    loading: updateLoading,
    success: updateSuccess,
  } = useUpdateVoterAreaById();

  const [resetData, setResetData] = useState({
    ...allSelectedVoterArea,
  });

  const emptyBelowData = (newData: { [name: string]: boolean }) => {
    setResetData((data: any) => ({
      ...data,
      ...newData,
    }));
  };

  const methods = useForm<CreateVoterAreaDataType>({
    resolver: yupResolver(createVoterAreaValidation),
    values: voterAreaData as CreateVoterAreaDataType,
  });

  const { handleSubmit, watch, setValue } = methods;

  const districtWatch = watch(CREATE_VOTER_AREA.DISTRICT);
  const subDistrictWatch = watch(CREATE_VOTER_AREA.SUB_DISTRICT);
  const cityCorporationWatch = watch(CREATE_VOTER_AREA.CITY_CORPORATION);
  const unionOrWardWatch = watch(CREATE_VOTER_AREA.UNION_OR_WARD);
  const maleVoterWatch = watch(CREATE_VOTER_AREA.MALE_VOTER);
  const femaleVoterWatch = watch(CREATE_VOTER_AREA.FEMALE_VOTER);
  const thirdGenderWatch = watch(CREATE_VOTER_AREA.THIRD_GENDER_VOTER);
  const areaCodeWatch = watch(CREATE_VOTER_AREA.VOTER_AREA_CODE);

  let total: number = 0;
  if (maleVoterWatch) {
    total += parseInt(maleVoterWatch as string);
  }
  if (femaleVoterWatch) {
    total += parseInt(femaleVoterWatch as string);
  }
  if (thirdGenderWatch) {
    total += parseInt(thirdGenderWatch as string);
  }

  useEffect(() => {
    if (
      districtWatch &&
      areaCodeWatch &&
      areaCodeWatch.toString()?.trim()?.length
    )
      if (areaCodeWatch !== voterAreaData?.areaCode) {
        getVoterAreaCodeFromZillaData({
          zillaId: districtWatch as number,
          areaCode: areaCodeWatch as string,
        });
      } else {
        setSuccess(false);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, districtWatch]);

  useEffect(() => {
    if (id) {
      getVoterAreaByIdData(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      navigate(-1);
    }
  }, [navigate, createSuccess, updateSuccess]);

  useEffect(() => {
    if (total || total === 0) {
      setValue(CREATE_VOTER_AREA.TOTAL_VOTER, total);
    }
  }, [setValue, total]);

  // Districts/Zillas
  useEffect(() => {
    if (userType === USER_TYPES.ADMIN) getZillasData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType]);

  // Subdistricts/Upazillas && Municipalities
  useEffect(() => {
    if (districtWatch) {
      getSubDistrictListSelect(districtWatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtWatch]);

  useEffect(() => {
    if (subDistrictWatch) {
      getUpazillasMunicipalitiesList({ upazilasId: subDistrictWatch });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subDistrictWatch]);

  // Union or Wards
  useEffect(() => {
    if (cityCorporationWatch || subDistrictWatch) {
      getUnionsOrWardsData({
        municipalityId: Number(cityCorporationWatch),
        upazilaId: Number(subDistrictWatch),
        rmoEn: !cityCorporationWatch ? RMO_RURAL : undefined,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityCorporationWatch, subDistrictWatch]);

  // Union Parishad Wards
  useEffect(() => {
    if (unionOrWardWatch) {
      getUnionsWardsSelect({ unionId: Number(unionOrWardWatch) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unionOrWardWatch]);

  const onSubmit: SubmitHandler<CreateVoterAreaDataType> = (postData: any) => {
    const data = {
      unionOrWardId: Number(postData.unionOrWardId),
      unionWardId: postData.unionWardId,
      areaCode: postData.areaCode,
      nameEn: postData.nameEn,
      nameBn: postData.nameBn,
      maleVoter: postData.maleVoter,
      femaleVoter: postData.femaleVoter,
      thirdGenderVoter: postData.thirdGenderVoter,
      electionClass: ELECTION_CLASS_NATIONAL,
    };

    if (id) {
      updateVoterAreaById(id, data);
    } else voterAreaCreate(data);
  };

  return (
    <div className="container-96 mb-24">
      <FormProvider {...methods}>
        <Header
          headerText={{
            header: id
              ? t('VOTER_AREA.SECTION_HEADER_CHANGE')
              : t('VOTER_AREA.CREATE_VOTER_AREA'),
          }} // TODO: this may come from api
          breadcrumbs={createVoterAreaBreadcrumbs(t, id)}
          className="mb-12 pt-10"
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-6 border p-12 mb-12">
            <FormSelect
              title="VOTER_AREA.DISTRICT"
              name={CREATE_VOTER_AREA.DISTRICT}
              options={
                userType === USER_TYPES.ADMIN ? zillas : roReportFilters?.zilla
              }
              isSearchable
              clearValue={resetData.zilla}
              resetData={() =>
                emptyBelowData({
                  ...optionZillaVoterArea,
                })
              }
              clearOptions={resetData.zillaOption}
              disabled={userType === USER_TYPES.UPAZILA_ELECTION_OFFICER}
            />

            <FormSelect
              title="VOTER_AREA.UPAZILA"
              name={CREATE_VOTER_AREA.SUB_DISTRICT}
              options={upazilas}
              clearValue={resetData.upazila}
              resetData={() =>
                emptyBelowData({
                  ...optionMunicipalitiesVoterArea,
                  upazila: false,
                  municipalitiesOptions: false,
                  unionWardOptions: false,
                })
              }
              clearOptions={resetData.upazilaOptions}
              disabled={userType === USER_TYPES.UPAZILA_ELECTION_OFFICER}
            />

            <FormSelect
              title="VOTER_AREA.CITY_CORPORATION"
              name={CREATE_VOTER_AREA.CITY_CORPORATION}
              options={municipalities}
              clearValue={resetData.municipalities}
              resetData={() =>
                emptyBelowData({
                  ...optionUnionWardVoterArea,
                  municipalities: false,
                  unionWardOptions: false,
                })
              }
              clearOptions={resetData.municipalitiesOptions}
              disabled={userType === USER_TYPES.UPAZILA_ELECTION_OFFICER}
            />

            <FormSelect
              title="VOTER_AREA.UNION_OR_WARD"
              name={CREATE_VOTER_AREA.UNION_OR_WARD}
              options={unionsOrWards}
              clearValue={resetData.unionWard}
              resetData={() =>
                emptyBelowData({
                  ...optionUnionParishadWardVoterArea,
                  unionWard: false,
                  unionParishadWardOptions: false,
                })
              }
              clearOptions={resetData.unionWardOptions}
              disabled={userType === USER_TYPES.UPAZILA_ELECTION_OFFICER}
            />

            <FormSelect
              title="VOTER_AREA.UNION_PARISHAD_WARD"
              name={CREATE_VOTER_AREA.UNION_PARISHAD_WARD}
              options={unionsWards}
              clearValue={resetData.unionParishadWard}
              resetData={() =>
                emptyBelowData({
                  unionParishadWard: false,
                })
              }
              clearOptions={resetData.unionParishadWardOptions}
            />

            <FormInput
              registerName={CREATE_VOTER_AREA.VOTER_AREA_CODE}
              title={t('VOTER_AREA.VOTER_AREA_CODE')}
              placeholder="PLACEHOLDER.ENTER"
              onchange={(data) => setDebounceValue(data)}
              disabled={
                !districtWatch ||
                userType === USER_TYPES.UPAZILA_ELECTION_OFFICER
              }
            />

            <FormInput
              registerName={CREATE_VOTER_AREA.VOTER_AREA_NAME_IN_ENGLISH}
              title={t('VOTER_AREA.NAME_OF_VOTER_AREA_EN')}
              placeholder="PLACEHOLDER.ENTER"
              disabled={userType === USER_TYPES.UPAZILA_ELECTION_OFFICER}
            />

            <FormInput
              registerName={CREATE_VOTER_AREA.VOTER_AREA_NAME_IN_BANGLA}
              title={t('VOTER_AREA.NAME_OF_VOTER_AREA_BN')}
              placeholder="PLACEHOLDER.ENTER"
              disabled={userType === USER_TYPES.UPAZILA_ELECTION_OFFICER}
            />

            <FormInput
              registerName={CREATE_VOTER_AREA.MALE_VOTER}
              title={t('VOTER_AREA.MALE_VOTER')}
              placeholder="PLACEHOLDER.ENTER"
              formattedValue={CHECK_ONLY_NUMBER_AND_EMPTY}
              disabled={userType === USER_TYPES.UPAZILA_ELECTION_OFFICER}
            />

            <FormInput
              registerName={CREATE_VOTER_AREA.FEMALE_VOTER}
              title={t('VOTER_AREA.FEMALE_VOTER')}
              placeholder="PLACEHOLDER.ENTER"
              formattedValue={CHECK_ONLY_NUMBER_AND_EMPTY}
              disabled={userType === USER_TYPES.UPAZILA_ELECTION_OFFICER}
            />
            <FormInput
              registerName={CREATE_VOTER_AREA.THIRD_GENDER_VOTER}
              title={t('VOTER_AREA.THIRD_GENDER_VOTER')}
              placeholder="PLACEHOLDER.ENTER"
              formattedValue={CHECK_ONLY_NUMBER_AND_EMPTY}
              disabled={userType === USER_TYPES.UPAZILA_ELECTION_OFFICER}
            />

            <FormInput
              registerName={CREATE_VOTER_AREA.TOTAL_VOTER}
              title={t('VOTER_AREA.TOTAL_VOTER')}
              readOnly
              disabled={userType === USER_TYPES.UPAZILA_ELECTION_OFFICER}
            />
            <div className="d-flex justify-content-end gap-6 border-top py-12">
              <Button
                fill="fill"
                className="border-primary"
                type="success"
                htmlType="submit"
                disabled={success}
                loading={updateLoading || createLoading}
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

export default CreateVoterArea;
