import { TFunction } from 'i18next';
import { IconHomeLine } from '@pentabd/icons';

import { ROUTES } from '@constants/routes';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';

export const consolidatedStatementBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('CONSOLIDATED_STATEMENT.CONSOLIDATED_STATEMENT'),
    URL: ROUTES.CONSOLIDATED_STATEMENET,
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
