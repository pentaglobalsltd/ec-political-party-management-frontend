import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { Header, Table } from '@pentabd/ui';
import {
  calenderExtenderView,
  getBreadcrumbs,
  getColumns,
  headerExtension,
  LIST_VIEW,
  MONTHLY_VIEW,
  YEARLY_VIEW,
} from './constants';
import { SearchComponents } from '@components/application-search/SearchComponents';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import { searchStruct } from './searchConstants';
import { useGetElectionCalenderList } from '@hooks/election-schedule-management/election/possible-election/useGetElectionCalenderList';
import { getParams } from '@utils';

import { useGetElectionCalenderEventsYearlyView } from '@hooks/election-schedule-management/election/possible-election/useGetElectionCalenderEventsYearlyView';
import { useGetElectionCalenderEventsMonthlyView } from '@hooks/election-schedule-management/election/possible-election/useGetElectionCalenderEventsMonthlyView';

export type TabView = 'listView' | 'yearlyView' | 'monthlyView';

const PossibleElection = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const [tabView, setTabView] = useState(
    params?.tabView ? params.tabView : LIST_VIEW,
  );
  const [defaultYear, setDefaultYear] = useState(
    params?.year ? params.year : dayjs().year().toString(),
  );
  const [defaultMonth, setDefaultMonth] = useState(
    params?.month ? Number(params.month) : dayjs().month() + 1,
  );

  const isListView = tabView === LIST_VIEW;
  const isMonthlyView = tabView === MONTHLY_VIEW;
  const isYearlyView = tabView === YEARLY_VIEW;

  const {
    getElectionCalenderList,
    electionCalenderList,
    listActivePage,
    listTotalPage,
    listLoading,
  } = useGetElectionCalenderList();

  const { getElectionCalenderYearlyEvents, yearlyEvents, yearlyEventsLoading } =
    useGetElectionCalenderEventsYearlyView();

  const {
    getElectionCalenderMonthlyEvents,
    monthlyEvents,
    monthlyEventsLoading,
  } = useGetElectionCalenderEventsMonthlyView();

  const today = new Date();
  const defaultFromDate = params?.fromDate
    ? params?.fromDate
    : today.toISOString().split('T')[0];
  const defaultToDate = params?.toDate
    ? params?.toDate
    : new Date(today.getFullYear(), today.getMonth() + 2, today.getDate())
        .toISOString()
        .split('T')[0];

  const onSubmitSearch = (data: any) => {
    if (isListView) {
      setSearchParams({
        ...data,
        tabView: LIST_VIEW,
        isListSubmitted: 'true',
        year: data?.fromDate?.split('-')[0],
        month: Number(data?.fromDate?.split('-')[1]),
      });
      setDefaultYear(data.fromDate?.split('-')[0]);
      setDefaultMonth(Number(data?.fromDate?.split('-')[1]));
    }
    if (isMonthlyView) {
      setSearchParams({ ...data, tabView: MONTHLY_VIEW });
    }
    if (isYearlyView) {
      setSearchParams({ ...data, tabView: YEARLY_VIEW });
    }
  };

  const onClickButtonOne = () => {
    if (tabView === LIST_VIEW) {
      setTabView(MONTHLY_VIEW);
      setSearchParams({
        ...params,
        tabView: MONTHLY_VIEW,
      });
    } else {
      setTabView(LIST_VIEW);
      setSearchParams({ ...params, tabView: LIST_VIEW });
    }
  };

  const onClickButtonTwo = () => {
    if (params?.tabView === MONTHLY_VIEW) {
      setTabView(YEARLY_VIEW);
      setSearchParams({ ...params, tabView: YEARLY_VIEW });
    } else {
      setTabView(MONTHLY_VIEW);
      setSearchParams({
        ...params,
        tabView: MONTHLY_VIEW,
      });
    }
  };

  const onClickPreviousNext = ({
    year,
    month,
  }: {
    year: number;
    month: number;
  }) => {
    setSearchParams({
      ...params,
      year: year.toString(),
      month: month.toString(),
    });
  };

  const onClickYear = (year: number) => {
    setSearchParams({ ...params, year: year.toString() });
  };

  const onClickMonth = (month: number) => {
    setSearchParams({ ...params, month: month.toString() });
  };

  useEffect(() => {
    if (Object.keys(params).length > 1) {
      if (params.tabView === LIST_VIEW && params.fromDate && params.toDate) {
        getElectionCalenderList(params);
      }
      if (params.tabView === MONTHLY_VIEW && params.year && params.month)
        getElectionCalenderMonthlyEvents(params);

      if (params.tabView === YEARLY_VIEW && params.year)
        getElectionCalenderYearlyEvents(params);
    }
  }, [JSON.stringify(params)]);

  return (
    <div className="container-96 mb-24">
      <div className="my-5">
        <Header breadcrumbs={getBreadcrumbs(t)} />

        {/* how to change the color of header ? */}
        <Header
          className=""
          headerText={{
            header: t('POSSIBLE_ELECTION.SECTION_HEADER'),
          }}
        />
      </div>

      <SearchComponents
        struct={searchStruct({ isMonthlyView, isListView, isYearlyView })}
        onSubmitHandler={onSubmitSearch}
        defaultFromDate={defaultFromDate}
        defaultToDate={defaultToDate}
        defaultYear={defaultYear}
        defaultMonth={defaultMonth}
        requiredField={[
          SEARCH_FIELD_REQUIRED.DATE_FROM,
          SEARCH_FIELD_REQUIRED.DATE_TO,
        ]}
        isSetSearchParams={false}
      />

      {/* Table View */}

      <div className="my-10">
        <Table
          headerExtension={headerExtension({
            tabView,
            params,
            onClickButtonOne,
            onClickButtonTwo,
            electionCalenderList,
          })}
          rows={(electionCalenderList as any) || []}
          columns={getColumns(t)}
          loading={listLoading || monthlyEventsLoading || yearlyEventsLoading}
          loadingItemCount={10}
          {...(isListView
            ? {
                pagination: {
                  totalPage: listTotalPage,
                  activePage: listActivePage,
                  onClick: (page: number) => {
                    setSearchParams({ ...params, page: (page - 1).toString() });
                    getElectionCalenderList({ ...params, page: page - 1 });
                  },
                },
              }
            : {})}
          isShowTable={isListView}
          extendedView={calenderExtenderView({
            monthlyEventsLoading,
            yearlyEventsLoading,
            yearlyEvents,
            monthlyEvents,
            params,
            setSearchParams,
            onClickPreviousNext,
            onClickMonth,
            onClickYear,
          })}
        />
      </div>
    </div>
  );
};

export default PossibleElection;
