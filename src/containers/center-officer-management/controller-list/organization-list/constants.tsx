import { Trans } from 'react-i18next';
import { TFunction } from 'i18next';
import { IconHomeLine } from '@pentabd/icons';

import Actions from './components/Actions';
import CommonTableSearchInput from '@components/CommonTableSearchInput';
import { AgencyListProps } from '@hooks/center-officer-management/controller-list/organization-list/useGetAgencyList';
import { getDigitBanglaFromEnglish } from '@utils';

export const organizationListBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('ORGANIZATION_LIST.ORGANIZATION_LIST_NAME_ADDRESS'),
  },
];

export const organizationListTableHeader = ({
  getAgencyListData,
}: {
  getAgencyListData: ({ searchItems, size, page }: AgencyListProps) => void;
}) => {
  const TABLE_SEARCH_KEY: string = 'nameBn';

  return {
    leftComponents: [
      <CommonTableSearchInput
        callback={getAgencyListData as any}
        tableSearchKey={TABLE_SEARCH_KEY}
      />,
    ],
  };
};

export const organizationListTableColumns = ({
  t,
  getAgencyListData,
}: {
  t: TFunction<'translation', undefined>;
  getAgencyListData: any;
}) => [
  {
    id: 1,
    name: t('ORGANIZATION_LIST.SERIAL'),
    key: 'serial',
    render: (data: string) => getDigitBanglaFromEnglish(data),
  },
  {
    id: 2,
    name: t('ORGANIZATION_LIST.NAME_BN'),
    key: 'nameBn',
  },
  {
    id: 3,
    name: t('ORGANIZATION_LIST.NAME_EN'),
    key: 'nameEn',
  },
  {
    id: 4,
    name: t('ORGANIZATION_LIST.ORGANIZATION_TYPE'),
    key: 'agencyTypeName',
  },
  {
    id: 5,
    name: t('ORGANIZATION_LIST.ADDRESS'),
    key: 'address',
  },
  {
    id: 6,
    name: t('ORGANIZATION_LIST.CONTACT_NO'),
    key: 'mobileNo',
  },

  {
    id: 7,
    name: t('ORGANIZATION_LIST.PROCESS'),
    key: 'process',
    render: (data: any, raw: any) => (
      <Actions raw={raw} getAgencyListData={getAgencyListData} />
    ),
  },
];

export const addOrganizationListBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('ORGANIZATION_LIST.ORGANIZATION_LIST_NAME_ADDRESS'),
  },
  {
    label: t('ORGANIZATION_LIST.ADD_NEW_BUTTON'),
  },
];

export const radioOptionsOrganizationList = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 'active',
    value: 'active',
    label: t('ORGANIZATION_LIST.ACTIVE'),
  },
  {
    id: 'inactive',
    value: 'inactive',
    label: t('ORGANIZATION_LIST.INACTIVE'),
  },
];

export const instructionOrganizationListModal = (
  <div>
    <Trans i18nKey="ORGANIZATION_LIST.ANNOUNCEMENT"></Trans>
  </div>
);

export const adminInputs = {
  region: true,
  district: true,
  subDistrict: true,
  rmo: true,
  municipality: true,
  unionOrWard: true,
  instituteName: true,
  designation: true,
};

export const allSelectedAgency = {
  region: false,
  zilla: false,
  upazila: false,
  rmo: false,
  municipalities: false,
  unionWard: false,
  unionWardOptions: false,
  municipalitiesOptions: false,
  upazilaOptions: false,
  zillaOption: false,
  regionOptions: false,
};

export const optionUnionWardAgency = {
  unionWard: true,
};

export const optionMunicipalitiesAgency = {
  ...optionUnionWardAgency,
  municipalities: true,
  unionWardOptions: true,
};

export const optionRmoAgency = {
  ...optionUnionWardAgency,
  rmo: true,
};

export const optionUpazillaAgency = {
  ...optionRmoAgency,
  upazila: true,
  municipalitiesOptions: true,
};

export const optionZillaAgency = {
  ...optionUpazillaAgency,
  zilla: true,
  upazilaOptions: true,
};
