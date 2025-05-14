import { t, TFunction } from 'i18next';
import dayjs from 'dayjs';

import { IconHomeLine, IconSearch } from '@pentabd/icons';
import { Button, Calender, DownloadButtons, InputText } from '@pentabd/ui';
import { PATH } from '@constants/paths';
import { ElectionCalenderList } from '@type/election-declaration-management/election/possible-election/possible-election';
import Loader from '@components/Loader';
import YearlyView from './components/YearlyView';
import { YearlyEventsType } from '@hooks/election-schedule-management/election/possible-election/useGetElectionCalenderEventsYearlyView';

const TableColumn = 'POSSIBLE_ELECTION.TABLE_COLUMN';

export const LIST_VIEW: string = 'listView';
export const YEARLY_VIEW = 'yearlyView';
export const MONTHLY_VIEW = 'monthlyView';

export const headerExtension = ({
  tabView,
  params,
  electionCalenderList,
  onClickButtonOne,
  onClickButtonTwo,
}: {
  tabView?: string;
  params?: any;
  onClickButtonOne: () => void;
  onClickButtonTwo: () => void;
  electionCalenderList?: ElectionCalenderList[];
}) => ({
  leftComponents: [
    <div className="d-flex gap-6" key={1}>
      <Button
        fill="outline"
        className="bg-primary-lightest"
        onClick={() => onClickButtonOne()}
        type="primary"
      >
        {tabView === LIST_VIEW ? 'Calender View' : 'List View'}
      </Button>

      {tabView !== LIST_VIEW && (
        <Button
          fill="outline"
          className="bg-primary-lightest"
          onClick={() => onClickButtonTwo()}
          type="primary"
        >
          {params?.tabView === MONTHLY_VIEW ? 'Yearly View' : 'Monthly View'}
        </Button>
      )}

      <InputText
        key={1}
        name="pre-input"
        outline
        placeholder="Search"
        prefix={<IconSearch size="20" />}
        type="text"
        status="default"
      />
    </div>,
  ],

  rightComponents: [
    <DownloadButtons
      key={15}
      fileName={'test'}
      columns={getColumns(t)}
      rows={(electionCalenderList as any) || []}
    />,
  ],
});

export const getColumns = (t: TFunction<'translation', undefined>) => [
  {
    id: 1,
    name: t(`${TableColumn}.ELECTION_NAME`),
    key: 'electionScheduleNameBn',
  },
  {
    id: 2,
    name: t(`${TableColumn}.POSITION_NAME`),
    key: 'candidateTypeNameBn',
  },
  {
    id: 3,
    name: t(`${TableColumn}.FIRST_MEETING_DATE`),
    key: 'firstMeetingDate',
  },
  {
    id: 4,
    name: t(`${TableColumn}.POSSIBLE_ELECTION_DATE`),
    key: 'nextDateOfElection',
  },
  {
    id: 5,
    name: t(`${TableColumn}.POSSIBLE_RE_ELECTION_DATE`),
    key: 'nextDateOfReElection',
  },
  {
    id: 6,
    name: t(`${TableColumn}.DISTRICT`),
    key: 'zillaNameBn',
  },
  {
    id: 7,
    name: t(`${TableColumn}.UPAZILA`),
    key: 'upazilaNameBn',
  },
  {
    id: 8,
    name: t(`${TableColumn}.UNION`),
    key: 'unionOrWardNameBn',
  },
  {
    id: 9,
    name: t(`${TableColumn}.ELECTORAL_SEAT`),
    key: 'constituencyNameBn',
  },
  {
    id: 10,
    name: t(`${TableColumn}.CITY_CORPORATION`),
    key: 'municipalityNameBn',
  },
];

export const getBreadcrumbs = (t: TFunction<'translation', undefined>) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('POSSIBLE_ELECTION.POSSIBLE_ELECTION_BREADCRUMB'),
    link: PATH.POSSIBLE_ELECTION,
  },
];

export const calenderExtenderView = ({
  monthlyEventsLoading,
  yearlyEventsLoading,
  yearlyEvents,
  monthlyEvents,
  params,
  setSearchParams,
  onClickPreviousNext,
  onClickMonth,
  onClickYear,
}: {
  monthlyEventsLoading: boolean;
  yearlyEventsLoading: boolean;
  yearlyEvents?: YearlyEventsType;
  monthlyEvents: any[];
  params: any;
  setSearchParams: any;
  onClickPreviousNext: ({
    year,
    month,
  }: {
    year: number;
    month: number;
  }) => void;
  onClickMonth: (data: number) => void;
  onClickYear: (data: number) => void;
}) => {
  if (params.tabView === MONTHLY_VIEW) {
    if (monthlyEventsLoading) {
      return <Loader />;
    } else {
      return (
        <Calender
          events={monthlyEvents as any[]}
          {...(params?.year && params?.month
            ? {
                showMonth: dayjs(
                  `${params.year}-${
                    Number(params?.month) < 10
                      ? params?.month.toString().padStart(2, '0')
                      : params?.month
                  }`,
                ),
              }
            : {})}
          onClickPrevious={(data) => onClickPreviousNext(data)}
          onClickNext={(data) => onClickPreviousNext(data)}
          onClickMonth={(data) => onClickMonth(data)}
          onClickYear={(data) => onClickYear(data)}
        />
      );
    }
  } else if (params.tabView === YEARLY_VIEW) {
    if (yearlyEventsLoading) {
      return <Loader />;
    } else {
      return (
        <YearlyView
          events={yearlyEvents}
          setSearchParams={setSearchParams}
          params={params}
        />
      );
    }
  } else return null;
};
