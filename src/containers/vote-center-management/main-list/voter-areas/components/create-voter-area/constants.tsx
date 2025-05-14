import { TFunction } from 'i18next';
import { IconHomeLine } from '@pentabd/icons';

export const createVoterAreaBreadcrumbs = (
  t: TFunction<'translation', undefined>,
  id?: string | number,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('VOTER_AREA.BREADCRUMB_MAIN_LIST'),
  },

  {
    label: t('VOTER_AREA.BREADCRUMB_VOTER_AREA'),
  },

  {
    label: id
      ? t('VOTER_AREA.SECTION_HEADER_CHANGE')
      : t('VOTER_AREA.CREATE_VOTER_AREA'),
  },
];

export const allSelectedVoterArea = {
  zilla: false,
  upazila: false,
  municipalities: false,
  unionWard: false,
  unionParishadWard: false,
  unionParishadWardOptions: false,
  unionWardOptions: false,
  municipalitiesOptions: false,
  upazilaOptions: false,
  zillaOption: false,
};

export const optionUnionParishadWardVoterArea = {
  unionParishadWard: true,
};

export const optionUnionWardVoterArea = {
  ...optionUnionParishadWardVoterArea,
  unionWard: true,
  unionParishadWardOptions: true,
};


export const optionMunicipalitiesVoterArea = {
  ...optionUnionWardVoterArea,
  municipalities: true,
  unionWardOptions: true,
};

export const optionUpazillaVoterArea = {
  ...optionMunicipalitiesVoterArea,
  upazila: true,
  municipalitiesOptions: true,
};

export const optionZillaVoterArea = {
  ...optionUpazillaVoterArea,
  zilla: false,
  upazilaOptions: false,
};
