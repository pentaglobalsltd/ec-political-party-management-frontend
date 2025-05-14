import { ROUTES } from '@constants/routes';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import { IconHomeLine } from '@pentabd/icons';
import { TFunction } from 'i18next';

export const nineteenthFormBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('NINETEENTH_FORM.NINETEENTH_FORM'),
    URL: ROUTES.NINETEENTH_FORM,
  },
];

export const inputs = {
  electionType: true,
  electionName: true,
  candidateType: true,
  district: true,
  constituency: true,
};

export const requiredFields = [
  SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
  SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
  SEARCH_FIELD_REQUIRED.CANDIDATE_TYPE,
  SEARCH_FIELD_REQUIRED.ZILLA_ID,
  SEARCH_FIELD_REQUIRED.CONSTITUENCY_ID,
];
