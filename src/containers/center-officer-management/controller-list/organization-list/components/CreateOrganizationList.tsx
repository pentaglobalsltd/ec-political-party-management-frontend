import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { Button, Header, Text } from '@pentabd/ui';
import { IconCheckCircleBroken, IconRefreshCcw01 } from '@pentabd/icons';
import { yupResolver } from '@hookform/resolvers/yup';

import FormInput from '@components/inputs/FormInput';
import FormRadio from '@components/inputs/FormRadio';
import FormSelect from '@components/inputs/FormSelect';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useOrganizationSelectOption } from '@hooks/center-officer-management/controller-list/organization-list/useOrganizationSelectOptions';
import useGetAgencyById from '@hooks/center-officer-management/controller-list/organization-list/useGetAgencyById';
import { useCreateAgency } from '@hooks/center-officer-management/controller-list/organization-list/useCreateAgency';
import useUpdateAgencyById from '@hooks/center-officer-management/controller-list/organization-list/useUpdateAgencyById';

import { FORM_FIELDS } from '@constants/forms';
import {
  MUNICIPALITY_TYPE,
  RMO_CITYCORPORATION,
  RMO_MUNICIPALITY,
} from '@components/application-search/constants';
import {
  createOrganizationListDataType,
  createOrganizationListValidation,
} from '@validations/center-officer-management/controller-list/organization-list/organizationListValidation';
import {
  addOrganizationListBreadcrumbs,
  adminInputs,
  allSelectedAgency,
  optionMunicipalitiesAgency,
  optionRmoAgency,
  optionUpazillaAgency,
  optionZillaAgency,
  radioOptionsOrganizationList,
} from '../constants';

const CREATE_ORGANIZATION_LIST =
  FORM_FIELDS.CENTER_OFFICER_MANAGEMENT.CONTROLLER_LIST.ORGANIZATION_LIST
    .CREATE_ORGANIZATION_LIST;

const CreateOrganizationList = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;

  const { agency, getAgencyByIdData } = useGetAgencyById();
  const { createAgencyData, loading, success } = useCreateAgency();
  const { updateAgencyByIdData, updateLoading, updateSuccess } =
    useUpdateAgencyById();

  const [resetData, setResetData] = useState({
    ...allSelectedAgency,
  });

  const emptyBelowData = (newData: { [name: string]: boolean }) => {
    setResetData((data: any) => ({
      ...data,
      ...newData,
    }));
  };

  const methods = useForm({
    resolver: yupResolver(createOrganizationListValidation),
    values: agency as any,
  });

  const { handleSubmit, reset, watch } = methods;

  const divisionWatch = watch(CREATE_ORGANIZATION_LIST.DIVISION);
  const districtWatch = watch(CREATE_ORGANIZATION_LIST.DISTRICT);
  const rmoWatch = watch(CREATE_ORGANIZATION_LIST.RMO);
  const municipalityWatch = watch(CREATE_ORGANIZATION_LIST.CITY_CORPORATION);
  const subdistrictWatch = watch(CREATE_ORGANIZATION_LIST.SUBDISTRICT);

  const {
    regions,
    zillas,
    upazilas,
    rmos,
    municipalities,
    unionsOrWards,
    agencyType,
  } = useOrganizationSelectOption({
    inputs: userType ? adminInputs : {},
    divisionWatch,
    districtWatch,
    rmoWatch,
    municipalityWatch,
    subdistrictWatch,
  });

  const onSubmit: SubmitHandler<createOrganizationListDataType> = (
    data: any,
  ) => {
    data.isActive = data?.isActive === 'active' ? true : false;

    if (id) {
      updateAgencyByIdData({ id, data });
    } else {
      createAgencyData(data);
    }
  };

  useEffect(() => {
    if (id) {
      getAgencyByIdData(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (success || updateSuccess) {
      navigate(-1);
    }
  }, [navigate, success, updateSuccess]);

  return (
    <div className="container-96 mb-24">
      <Header
        headerText={{ header: t('ORGANIZATION_LIST.ENTER_ORGANIZATION_NAME') }}
        breadcrumbs={addOrganizationListBreadcrumbs(t)}
        className="mb-12 pt-10"
      />
      <div className="rounded-6 border p-12 mb-12">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormSelect
              title="ORGANIZATION_LIST.DIVISION"
              name={CREATE_ORGANIZATION_LIST.DIVISION}
              options={regions}
              clearValue={resetData.region}
              resetData={() =>
                emptyBelowData({
                  ...optionZillaAgency,
                  region: false,
                  regionOptions: false,
                  zillaOption: false,
                })
              }
              clearOptions={resetData.regionOptions}
            />
            <FormSelect
              title="ORGANIZATION_LIST.DISTRICT"
              name={CREATE_ORGANIZATION_LIST.DISTRICT}
              disabled={!divisionWatch}
              options={zillas}
              clearValue={resetData.zilla}
              resetData={() =>
                emptyBelowData({
                  ...optionUpazillaAgency,
                  zilla: false,
                  upazilaOptions: false,
                })
              }
              clearOptions={resetData.zillaOption}
            />
            <FormSelect
              title="ORGANIZATION_LIST.SUBDISTRICT"
              name={CREATE_ORGANIZATION_LIST.SUBDISTRICT}
              disabled={!districtWatch}
              options={upazilas}
              clearValue={resetData.upazila}
              resetData={() =>
                emptyBelowData({
                  ...optionRmoAgency,
                  upazila: false,
                  municipalitiesOptions: false,
                })
              }
              clearOptions={resetData.upazilaOptions}
            />
            <FormSelect
              title="ORGANIZATION_LIST.RMO"
              name={CREATE_ORGANIZATION_LIST.RMO}
              options={rmos}
              clearValue={resetData.rmo}
              resetData={() =>
                emptyBelowData({
                  ...optionRmoAgency,
                  rmo: false,
                  unionWardOptions: false,
                })
              }
            />
            {rmoWatch === RMO_MUNICIPALITY ||
            rmoWatch === RMO_CITYCORPORATION ? (
              <FormSelect
                title={MUNICIPALITY_TYPE[rmoWatch]}
                name={CREATE_ORGANIZATION_LIST.CITY_CORPORATION}
                disabled={municipalities.length === 0}
                options={municipalities}
                clearValue={resetData.municipalities}
                resetData={() =>
                  emptyBelowData({
                    ...optionMunicipalitiesAgency,
                    municipalities: false,
                    unionWardOptions: false,
                  })
                }
                clearOptions={resetData.municipalitiesOptions}
              />
            ) : null}

            <FormSelect
              title="ORGANIZATION_LIST.UNION_OR_WARD"
              name={CREATE_ORGANIZATION_LIST.UNION_OR_WARD}
              disabled={unionsOrWards.length === 0}
              options={unionsOrWards}
              clearValue={resetData.unionWard}
              resetData={() =>
                emptyBelowData({
                  unionWard: false,
                })
              }
              clearOptions={resetData.unionWardOptions}
              required
            />
            <FormSelect
              title="ORGANIZATION_LIST.ORGANIZATION_TYPE"
              name={CREATE_ORGANIZATION_LIST.ORGANIZATION_TYPE}
              options={agencyType}
              required
            />
            <FormInput
              title="ORGANIZATION_LIST.ORGANIZATION_NAME_BN"
              registerName={CREATE_ORGANIZATION_LIST.ORGANIZATION_NAME_BN}
              required
            />
            <FormInput
              title="ORGANIZATION_LIST.ORGANIZATION_NAME_EN"
              registerName={CREATE_ORGANIZATION_LIST.ORGANIZATION_NAME_EN}
            />
            <FormInput
              title="ORGANIZATION_LIST.ORGANIZATION_ADDRESS_BN"
              registerName={CREATE_ORGANIZATION_LIST.ORGANIZATION_ADDRESS_BN}
              required
            />
            <FormInput
              title="ORGANIZATION_LIST.ORGANIZATION_ADDRESS_EN"
              registerName={CREATE_ORGANIZATION_LIST.ORGANIZATION_ADDRESS_EN}
            />
            <FormInput
              title="ORGANIZATION_LIST.ORGANIZATION_EMAIL"
              registerName={CREATE_ORGANIZATION_LIST.ORGANIZATION_EMAIL}
            />
            <FormInput
              title="ORGANIZATION_LIST.CONTACT_NO"
              registerName={CREATE_ORGANIZATION_LIST.CONTACT_NO}
            />
            <FormRadio
              options={radioOptionsOrganizationList(t)}
              title="ORGANIZATION_LIST.CONDITION"
              name={CREATE_ORGANIZATION_LIST.CONDITION}
              id={CREATE_ORGANIZATION_LIST.CONDITION}
              required
            />
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
                loading={loading || updateLoading}
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
    </div>
  );
};
export default CreateOrganizationList;
