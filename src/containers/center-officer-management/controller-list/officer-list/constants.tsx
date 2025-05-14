import { TFunction } from 'i18next';
import { Text } from '@pentabd/ui';
import { IconHomeLine } from '@pentabd/icons';

import Actions from './components/Actions';

export const officerListBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('OFFICER_LIST.OFFICER_LIST'),
  },
];

export const officerListTableColumns = ({
  t,
  isDownload = false,
  getOfficers,
}: {
  t: TFunction<'translation', undefined>;
  isDownload?: boolean;
  getOfficers: any;
}) => [
  {
    id: 1,
    name: t('OFFICER_LIST.SERIAL'),
    key: 'serial',
  },
  {
    id: 2,
    name: t('OFFICER_LIST.NAME'),
    key: 'nameBn',
  },
  {
    id: 12,
    name: t('OFFICER_LIST.UPAZILA'),
    key: 'agencyUpazilaName',
  },
  {
    id: 3,
    name: t('OFFICER_LIST.INSTITUTE_NAME'),
    key: 'agencyName',
  },
  {
    id: 4,
    name: t('OFFICER_LIST.DESIGNATION_BN'),
    key: 'designation',
  },
  {
    id: 5,
    name: t('OFFICER_LIST.BASIC_SALARY'),
    key: 'basicSalaryBn',
  },
  {
    id: 6,
    name: t('OFFICER_LIST.CONTACT_NUMBER'),
    key: 'phone',
  },
  {
    id: 7,
    name: t('OFFICER_LIST.IDENTIFICATION_NUMBER'),
    key: 'nid',
  },
  {
    id: 8,
    name: t('OFFICER_LIST.PERMANENT_ADDRESS'),
    key: 'permanentAddress',
  },

  {
    id: 9,
    name: t('OFFICER_LIST.POTENTIAL_USER_TYPE'),
    key: 'userType',
  },

  {
    id: 10,
    name: t('ORGANIZATION_LIST.PROCESS'),
    key: 'process',
    hide: isDownload,
    render: (data: any, raw: any) => (
      <Actions raw={raw} getOfficers={getOfficers} />
    ),
  },
];

export const officerListTableElectionUserColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    name: t('OFFICER_LIST.SERIAL'),
    key: 'id',
  },
  {
    id: 2,
    name: t('OFFICER_LIST.NAME'),
    key: 'nameBn',
  },

  {
    id: 3,
    name: t('OFFICER_LIST.IDENTIFICATION_NUMBER'),
    key: 'nid',
  },
];

export const createOfficerListBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('OFFICER_LIST.OFFICER_LIST'),
  },
  {
    label: t('OFFICER_LIST.ADD_NEW'),
  },
];

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

export const Instructions = (t: TFunction<'translation', undefined>) => (
  <>
    <Text
      size="sm"
      weight="medium"
      color="title"
      component="p"
      className="lh-md"
    >
      {t('OFFICER_LIST.MODAL_INSTRUCTION_1')}
    </Text>
    <Text
      size="sm"
      weight="medium"
      color="title"
      component="p"
      className="lh-md"
    >
      {t('OFFICER_LIST.MODAL_INSTRUCTION_2')}
    </Text>
    <Text
      size="sm"
      weight="medium"
      color="title"
      component="p"
      className="lh-md"
    >
      {t('OFFICER_LIST.MODAL_INSTRUCTION_3')}
    </Text>
    <Text
      size="sm"
      weight="medium"
      color="title"
      component="p"
      className="lh-md"
    >
      {t('OFFICER_LIST.MODAL_INSTRUCTION_4')}
    </Text>
    <Text
      size="sm"
      weight="medium"
      color="title"
      component="p"
      className="lh-md"
    >
      {t('OFFICER_LIST.MODAL_INSTRUCTION_5')}
    </Text>
    <Text
      size="sm"
      weight="medium"
      color="title"
      component="p"
      className="lh-md"
    >
      {t('OFFICER_LIST.MODAL_INSTRUCTION_6')}
    </Text>
    <Text
      size="sm"
      weight="medium"
      color="title"
      component="p"
      className="lh-md"
    >
      {t('OFFICER_LIST.MODAL_INSTRUCTION_7')}
    </Text>
  </>
);

const PRESIDING_OFFICER_CODE = '1011';
const ASSISTANT_PRESIDING_OFFICER_CODE = '1012';
const POLLING_OFFICER_CODE = '1013';

export const userTypeCodes = `${PRESIDING_OFFICER_CODE},${ASSISTANT_PRESIDING_OFFICER_CODE},${POLLING_OFFICER_CODE}`;

export const editOfficerListBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('OFFICER_LIST.OFFICER_LIST'),
  },
  {
    label: t('OFFICER_LIST.EDIT'),
  },
];

export const allSelectedOfficer = {
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

export const optionUnionWardOfficer = {
  unionWard: true,
};

export const optionMunicipalitiesOfficer = {
  ...optionUnionWardOfficer,
  municipalities: true,
  unionWardOptions: true,
};

export const optionRmoOfficer = {
  ...optionUnionWardOfficer,
  rmo: true,
};

export const optionUpazillaOfficer = {
  ...optionRmoOfficer,
  upazila: true,
  municipalitiesOptions: true,
};

export const optionZillaOfficer = {
  ...optionUpazillaOfficer,
  zilla: true,
  upazilaOptions: true,
};
