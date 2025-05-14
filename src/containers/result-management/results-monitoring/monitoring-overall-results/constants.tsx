import { TFunction } from 'i18next';

import { IconHomeLine } from '@pentabd/icons';
import { Text } from '@pentabd/ui';

import { getDigitBanglaFromEnglish } from '@utils';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import { ELECTION_INFO } from '@constants/election-info';

const mapRowWiseData = (arr: string[]) => {
  return (
    <div className="d-flex flex-column gap-2">
      {arr.map((item: string, index: number) => (
        <Text key={index} className="p-2 rounded">
          {getDigitBanglaFromEnglish(item)}
        </Text>
      ))}
    </div>
  );
};

export const monitoringOverallResultsTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('MONITORING_OVERALL_RESULTS.MONITORING_OVERALL_RESULTS'),
  },
];

export const resultObservationTableColumn = (
  t: TFunction<'translation', undefined>,
  colName1?: string,
) => [
  {
    id: 1,
    name: colName1,
    key: 'label',
  },
  {
    id: 2,
    name: '',
    key: 'description',
    render: (data: any) => {
      if (typeof data === 'string') {
        return data;
      } else if (Array.isArray(data)) {
        return mapRowWiseData(data);
      } else {
        return null;
      }
    },
  },
  {
    id: 3,
    name: '',
    key: 'value',
    render: (data: any) => {
      if (typeof data === 'number') {
        return getDigitBanglaFromEnglish(data);
      } else if (Array.isArray(data)) {
        return mapRowWiseData(data);
      } else {
        return null;
      }
    },
  },
];

export const conditionalRequiredField = [
  {
    fieldName: SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
  },
  {
    fieldName: SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
  },
  {
    fieldName: SEARCH_FIELD_REQUIRED.ZILLA_ID,
  },
  {
    fieldName: SEARCH_FIELD_REQUIRED.UPAZILA_ID,
    watchId: SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
    value: [ELECTION_INFO.UPAZILLA.ID],
  },
];
