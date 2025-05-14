import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { IconCheckCircleBroken, IconRefreshCcw01 } from '@pentabd/icons';
import { Button, Header, Text } from '@pentabd/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';

import FormDate from '@components/inputs/FormDate';
import FormInput from '@components/inputs/FormInput';
import FormSelect from '@components/inputs/FormSelect';
import FormCheckbox from '@components/inputs/FormCheckbox';

import { useCreateOfficer } from '@hooks/center-officer-management/controller-list/officer-list/useCreateOfficer';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useOfficerSelectOptionsHook } from '@hooks/center-officer-management/controller-list/officer-list/useOfficerSelectOptions';

import { USER_TYPES } from '@constants/user-types';
import { FORM_FIELDS } from '@constants/forms';
import {
  MUNICIPALITY_TYPE,
  RMO_CITYCORPORATION,
  RMO_MUNICIPALITY,
} from '@components/application-search/constants';
import {
  CreateOfficerListDataType,
  createOfficerListValidation,
} from '@validations/center-officer-management/controller-list/officer-list-validation';
import {
  createOfficerListBreadcrumbs,
  userTypeCodes,
  adminInputs,
  allSelectedOfficer,
  optionZillaOfficer,
  optionUpazillaOfficer,
  optionRmoOfficer,
  optionMunicipalitiesOfficer,
} from '../../constants';

const CREATE_OFFICER_LIST =
  FORM_FIELDS.CENTER_OFFICER_MANAGEMENT.CONTROLLER_LIST.OFFICER_LIST
    .CREATE_OFFICER_LIST;

const CreateOfficerList = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;
  const isAdmin = userType === USER_TYPES.ADMIN;

  const { addOfficer, success } = useCreateOfficer();

  const [resetData, setResetData] = useState({
    ...allSelectedOfficer,
  });

  const emptyBelowData = (newData: { [name: string]: boolean }) => {
    setResetData((data: any) => ({
      ...data,
      ...newData,
    }));
  };

  const methods = useForm<CreateOfficerListDataType>({
    resolver: yupResolver(createOfficerListValidation),
  });

  const { handleSubmit, reset, watch, setValue } = methods;

  const divisionWatch = watch(CREATE_OFFICER_LIST.REGION) as string;
  const districtWatch = watch(CREATE_OFFICER_LIST.DISTRICT) as string;
  const subdistrictWatch = watch(CREATE_OFFICER_LIST.SUB_DISTRICT) as string;
  const rmoWatch = watch(CREATE_OFFICER_LIST.RMO) as string;
  const municipalityWatch = watch(CREATE_OFFICER_LIST.MUNICIPALITY) as string;
  const unionOrWardWatch = watch(CREATE_OFFICER_LIST.UNION_OR_WARD) as string;
  const birthday = watch(CREATE_OFFICER_LIST.DATE_OF_BIRTH);
  const ageWatch = watch(CREATE_OFFICER_LIST.AGE);

  const {
    regions,
    zillas,
    upazilas,
    rmos,
    municipalities,
    unionsOrWards,
    institutes,
    userTypes,
    payScales,
    allZillas,
  } = useOfficerSelectOptionsHook({
    inputs: userType ? adminInputs : {},
    divisionWatch,
    districtWatch,
    rmoWatch,
    municipalityWatch,
    subdistrictWatch,
    unionOrWardWatch,
    userTypeCodes,
    isActiveInstitute: true,
  });

  useEffect(() => {
    if (birthday && !ageWatch) {
      const date1 = dayjs();
      const age = date1.diff(dayjs(birthday), 'year');
      setValue(CREATE_OFFICER_LIST.AGE, age.toString());
    }
  }, [birthday, setValue, ageWatch]);

  useEffect(() => {
    if (success) {
      navigate(-1);
    }
    // eslint-disable-next-line
  }, [success]);

  const onSubmit: SubmitHandler<CreateOfficerListDataType> = (data: any) => {
    delete data[CREATE_OFFICER_LIST.REGION];
    delete data[CREATE_OFFICER_LIST.DISTRICT];
    delete data[CREATE_OFFICER_LIST.SUB_DISTRICT];
    delete data[CREATE_OFFICER_LIST.RMO];
    delete data[CREATE_OFFICER_LIST.MUNICIPALITY];
    delete data[CREATE_OFFICER_LIST.UNION_OR_WARD];

    const formData = {
      ...data,
      agencyId: Number(data.agencyId),
      age: Number(data.age),
      personalZillaId: Number(data.personalZillaId),
      basicSalary: Number(data.basicSalary),
      payScaleId: Number(data.payScaleId),
    };

    addOfficer(formData);
  };

  return (
    <div className="container-96 mb-24">
      <Header
        headerText={{ header: t('OFFICER_LIST.ADD_OFFICER_FORM_TITLE') }}
        breadcrumbs={createOfficerListBreadcrumbs(t)}
        className="mb-12 pt-10"
      />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-6 border p-12 mb-12">
            <FormSelect
              title="OFFICER_LIST.DIVISION_NAME"
              name={CREATE_OFFICER_LIST.REGION}
              options={regions}
              clearValue={resetData.region}
              resetData={() =>
                emptyBelowData({
                  ...optionZillaOfficer,
                  region: false,
                  regionOptions: false,
                  zillaOption: false,
                })
              }
              clearOptions={resetData.regionOptions}
            />

            <FormSelect
              title="OFFICER_LIST.DISTRICT_NAME"
              name={CREATE_OFFICER_LIST.DISTRICT}
              disabled={zillas.length === 0}
              options={zillas}
              clearValue={resetData.zilla}
              resetData={() =>
                emptyBelowData({
                  ...optionUpazillaOfficer,
                  zilla: false,
                  upazilaOptions: false,
                })
              }
              clearOptions={resetData.zillaOption}
            />

            <FormSelect
              title="OFFICER_LIST.UPAZILLA_OR_THANA"
              name={CREATE_OFFICER_LIST.SUB_DISTRICT}
              disabled={!districtWatch}
              options={upazilas}
              clearValue={resetData.upazila}
              resetData={() =>
                emptyBelowData({
                  ...optionRmoOfficer,
                  upazila: false,
                  municipalitiesOptions: false,
                })
              }
              clearOptions={resetData.upazilaOptions}
            />

            <FormSelect
              title="OFFICER_LIST.RMO"
              name={CREATE_OFFICER_LIST.RMO}
              options={rmos}
              disabled={rmos.length === 0}
              clearValue={resetData.rmo}
              resetData={() =>
                emptyBelowData({
                  ...optionRmoOfficer,
                  rmo: false,
                  unionWardOptions: false,
                })
              }
            />

            {rmoWatch === RMO_MUNICIPALITY ||
            rmoWatch === RMO_CITYCORPORATION ? (
              <FormSelect
                title={MUNICIPALITY_TYPE[rmoWatch]}
                name={CREATE_OFFICER_LIST.MUNICIPALITY}
                disabled={municipalities.length === 0}
                options={municipalities}
                clearValue={resetData.municipalities}
                resetData={() =>
                  emptyBelowData({
                    ...optionMunicipalitiesOfficer,
                    municipalities: false,
                    unionWardOptions: false,
                  })
                }
                clearOptions={resetData.municipalitiesOptions}
              />
            ) : null}

            <FormSelect
              title="OFFICER_LIST.UNION_OR_WARD"
              name={CREATE_OFFICER_LIST.UNION_OR_WARD}
              disabled={unionsOrWards.length === 0}
              options={unionsOrWards}
              clearValue={resetData.unionWard}
              resetData={() =>
                emptyBelowData({
                  unionWard: false,
                })
              }
              clearOptions={resetData.unionWardOptions}
            />
            <FormSelect
              title="OFFICER_LIST.INSTITUTE_NAME"
              name={CREATE_OFFICER_LIST.AGENCY}
              options={institutes}
              disabled={institutes.length === 0}
              required
              isSearchable
            />

            <FormInput
              title="OFFICER_LIST.NID_NUMBER"
              registerName={CREATE_OFFICER_LIST.NID_NUMBER}
              required
            />

            <FormDate
              title="OFFICER_LIST.DATE_OF_BIRTH"
              name={CREATE_OFFICER_LIST.DATE_OF_BIRTH}
              registerName={CREATE_OFFICER_LIST.DATE_OF_BIRTH}
              placeholder="PLACEHOLDER.SELECT"
              required
            />

            <FormInput
              title="OFFICER_LIST.NAME_BN"
              registerName={CREATE_OFFICER_LIST.NAME_BN}
              disabled={!isAdmin}
            />

            <FormInput
              title="OFFICER_LIST.NAME_EN"
              registerName={CREATE_OFFICER_LIST.NAME_EN}
              disabled={!isAdmin}
            />

            <FormInput
              title="OFFICER_LIST.FATHER_NAME"
              registerName={CREATE_OFFICER_LIST.FATHER_NAME}
              disabled={!isAdmin}
            />

            <FormSelect
              title="OFFICER_LIST.OWN_DISTRICT"
              name={CREATE_OFFICER_LIST.OWN_DISTRICT}
              options={allZillas}
            />

            <FormInput
              title="OFFICER_LIST.AGE"
              registerName={CREATE_OFFICER_LIST.AGE}
              disabled
            />

            <FormInput
              title="OFFICER_LIST.DESIGNATION_BN"
              registerName={CREATE_OFFICER_LIST.DESIGNATION_BN}
            />

            <FormInput
              title="OFFICER_LIST.MOBILE_NUMBER"
              registerName={CREATE_OFFICER_LIST.MOBILE_NUMBER}
              required
            />

            <FormInput
              title="OFFICER_LIST.BASIC_SALARY"
              registerName={CREATE_OFFICER_LIST.BASIC_SALARY}
              required
            />

            <FormSelect
              title="OFFICER_LIST.PAY_SCALE"
              name={CREATE_OFFICER_LIST.PAY_SCALE}
              options={payScales}
              required
            />

            <FormInput
              title="OFFICER_LIST.CURRENT_WORK_ADDRESS"
              registerName={CREATE_OFFICER_LIST.CURRENT_WORK_ADDRESS}
            />

            <FormInput
              title="OFFICER_LIST.PERMANENT_ADDRESS"
              registerName={CREATE_OFFICER_LIST.PERMANENT_ADDRESS}
              disabled={!isAdmin}
            />

            <FormSelect
              title="OFFICER_LIST.PROBABLE_OFFICER_GROUP"
              name={CREATE_OFFICER_LIST.PROBABLE_OFFICER_GROUP}
              options={userTypes}
              required
            />

            <FormCheckbox
              title="OFFICER_LIST.IS_IT_KNOWLEDGEABLE"
              registerName={CREATE_OFFICER_LIST.IS_IT_KNOWLEDGEABLE}
            />

            <FormCheckbox
              title="OFFICER_LIST.IS_VOTED_EVM"
              registerName={CREATE_OFFICER_LIST.IS_VOTED_EVM}
            />

            <FormCheckbox
              title="OFFICER_LIST.IS_ON_MATERNITY_LEAVE"
              registerName={CREATE_OFFICER_LIST.IS_ON_MATERNITY_LEAVE}
            />

            <FormCheckbox
              title="OFFICER_LIST.IS_ON_EDUCATION_LEAVE"
              registerName={CREATE_OFFICER_LIST.IS_ON_EDUCATION_LEAVE}
            />

            <FormCheckbox
              title="OFFICER_LIST.IS_ON_PRN"
              registerName={CREATE_OFFICER_LIST.IS_ON_PRN}
            />
          </div>

          <div className="d-flex justify-content-end gap-6 border-top py-12">
            <Button
              fill="outline"
              className="border-primary"
              type="primary"
              onClick={() => reset()}
            >
              <Text size="sm" weight="semibold" color="primary">
                {t('SYMBOL.RESET')}
              </Text>
              <IconRefreshCcw01 size="20" fill="primary" />
            </Button>

            <Button
              fill="fill"
              className="border-primary"
              type="success"
              htmlType="submit"
            >
              <Text size="sm" weight="semibold" color="white">
                {t('SYMBOL.SUBMIT')}
              </Text>
              <IconCheckCircleBroken size="20" fill="white" />
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateOfficerList;
