import { TFunction } from 'i18next';
import { IconHomeLine } from '@pentabd/icons';

export const createPollingInstituteBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('POLLING_INSTITUTE.INSTITUTE_LIST_BREADCRUMB'),
  },
];

export const allSelectedPollingInstitute = {
  region: false,
  zilla: false,
  upazila: false,
  rmo: false,
  municipalities: false,
  unionWard: false,
  upWard: false,

  regionOptions: false,
  zillaOption: false,
  upazilaOptions: false,
  municipalitiesOptions: false,
  unionWardOptions: false,
  upWardOptions: false,
};

export const optionUpWardPollingInstitute = {
  upWard: true,
};

export const optionUnionWardPollingInstitute = {
  ...optionUpWardPollingInstitute,
  unionWard: true,
};

export const optionRmoPollingInstitute = {
  ...optionUnionWardPollingInstitute,
  rmo: true,
  municipalitiesOptions: true,
};

export const optionMunicipalitiesPollingInstitute = {
  ...optionUnionWardPollingInstitute,
  municipalities: true,
  unionWardOptions: true,
};

export const optionUpazillaPollingInstitute = {
  ...optionRmoPollingInstitute,
  upazila: true,
};

export const optionZillaPollingInstitute = {
  ...optionUpazillaPollingInstitute,
  zilla: true,
  upazilaOptions: true,
};
