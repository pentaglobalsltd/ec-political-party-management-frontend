import { PATH } from '@constants/paths';
import { Text } from '@pentabd/ui';
import { IconHomeLine } from '@pentabd/icons';
import { TFunction } from 'i18next';
import dayjs from 'dayjs';
import Actions from './Actions';
import { getDigitBanglaFromEnglish } from '@utils';

const tTableColumn = 'ADD_SCHEDULE_INFO.TABLE_COLUMN';

export const getBreadcrumbs = (t: TFunction<'translation', undefined>) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('ADD_SCHEDULE_INFO.BREADCRUMBS.SCHEDULE_INFO_ADD'),
    link: PATH.ADD_SCHEDULE_INFO,
  },
];

export const getColumns = ({
  t,
}: {
  t: TFunction<'translation', undefined>;
}) => [
  {
    id: 1,
    name: t(`${tTableColumn}.ELECTION_NAME`),
    key: 'electionScheduleNameBn',
  },
  {
    id: 2,
    name: t(`${tTableColumn}.DISTRICT`),
    key: 'zillaNameBn',
  },
  {
    id: 3,
    name: t(`${tTableColumn}.ELECTORAL_SEAT`),
    key: 'electionSettingsNameBn',
  },
  {
    id: 4,
    name: t(`${tTableColumn}.CANDIDATE_TYPE`),
    key: 'candidateTypeNameBn',
  },
  {
    id: 5,
    name: t(`${tTableColumn}.ELECTION_DATE`),
    key: 'dateOfElection',
    render: (data: string) => {
      return (
        <div>
          {data && (
            <Text>
              {getDigitBanglaFromEnglish(dayjs(data).format('YYYY-MM-DD'))}
            </Text>
          )}
        </div>
      );
    },
  },
  {
    id: 6,
    name: t(`${tTableColumn}.RESULT_GAZATTE_DATE`),
    key: 'gazettePublishDate',
    render: (data: string) => {
      return (
        <div>
          {data && (
            <Text>
              {getDigitBanglaFromEnglish(dayjs(data).format('YYYY-MM-DD'))}
            </Text>
          )}
        </div>
      );
    },
  },
  {
    id: 7,
    name: t(`${tTableColumn}.OATH_DATE`),
    key: 'swearDate',
    render: (data: string) => {
      return (
        <div>
          {data && (
            <Text>
              {getDigitBanglaFromEnglish(dayjs(data).format('YYYY-MM-DD'))}
            </Text>
          )}
        </div>
      );
    },
  },
  {
    id: 8,
    name: t(`${tTableColumn}.FIRST_MEETING_DATE`),
    key: 'firstMeetingDate',
    render: (data: string) => {
      return (
        <div>
          {data && (
            <Text>
              {getDigitBanglaFromEnglish(dayjs(data).format('YYYY-MM-DD'))}
            </Text>
          )}
        </div>
      );
    },
  },
  {
    id: 9,
    name: t(`${tTableColumn}.LATEST_CASE_DETAIL`),
    key: 'caseLastInfo',
  },
  {
    id: 10,
    name: t(`${tTableColumn}.REARRANGE_SEAT`),
    key: 'electionAreaReorganized',
  },
  {
    id: 11,
    name: t(`${tTableColumn}.NEXT_ELECTION_DATE`),
    key: 'nextDateOfElection',
    render: (data: string) => {
      return (
        <div>
          {data && (
            <Text>
              {getDigitBanglaFromEnglish(dayjs(data).format('YYYY-MM-DD'))}
            </Text>
          )}
        </div>
      );
    },
  },
  {
    id: 12,
    name: t(`${tTableColumn}.NEXT_GENERAL_ELECTION_DATE`),
    key: 'nextDateOfReElection',
    render: (data: string) => {
      return (
        <div>
          {data && (
            <Text>
              {getDigitBanglaFromEnglish(dayjs(data).format('YYYY-MM-DD'))}
            </Text>
          )}
        </div>
      );
    },
  },
  {
    id: 13,
    name: '',
    key: 'edit',
    render: (data: string, row: any) => {
      return <Actions row={row} />;
    },
  },
];
