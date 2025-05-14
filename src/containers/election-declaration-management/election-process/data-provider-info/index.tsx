import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { Header, Table, Text } from '@pentabd/ui';
import dayjs from 'dayjs';

import { SearchComponents } from '@components/application-search/SearchComponents';

import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import { allSelectedData, searchStruct } from './searchConstants';
import {
  dataProviderInfosTableColumns,
  dataProviderInfosTableBreadcrumbs,
  dataProviderRows,
} from './constants';
import { DataProviderSearchProps } from '@type/election-declaration-management/election-process/data-provider-info';
import { useEffect, useState } from 'react';
import { getParams } from '@utils';
import useProviderHistory from '@hooks/election-schedule-management/election-process/data-provider-info/useProviderHistory';
import { mapDataProviderData } from '@components/SendToAppButton/helper/mapDataProviderData';
import { DATA_PROVIDER_HISTORY_LIST } from '@components/SendToAppButton/constant';

function DataProviderInfo() {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { electionScheduleId, regionId, dateOfElection } = params;

  const [showTable, setShowTable] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [disableAll, setDisableAll] = useState<boolean>(false);

  const { error, fullData, getProviderHistoryData, success } =
    useProviderHistory();

  const row = dataProviderRows({ t }).map((item) => {
    const { dataExists, modifiedUpdatedDate, status } = mapDataProviderData(
      item.key,
      fullData,
    );

    return {
      ...item,
      dataExists,
      modifiedUpdatedDate,
      status
    };
  });

  const handleCurrentDateAndTime = () => {

    const apiDate = dayjs(dateOfElection);
    const currentDate = dayjs();

    const isSameDate = apiDate.isSame(currentDate, 'day');
    const currentHour = currentDate.hour();
    const isWithinTimeRange = currentHour >= 10 && currentHour < 17;

    if (isSameDate && isWithinTimeRange) {
      setDisableAll(true)
    } else {
      setDisableAll(false)
    }
  }

  const onSubmitSearch = (data: DataProviderSearchProps) => {
    if (data?.electionScheduleId) {
      getProviderHistoryData(
        DATA_PROVIDER_HISTORY_LIST.ALL,
        data?.electionScheduleId,
        data?.regionId
      );
    }
  };

  useEffect(() => {
    if (electionScheduleId) {
      getProviderHistoryData(
        DATA_PROVIDER_HISTORY_LIST.ALL,
        electionScheduleId,
        regionId
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (success) {
      setShowTable(true);
      setStep(1);
    } else {
      setShowTable(false);
      setStep(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  useEffect(()=>{
    handleCurrentDateAndTime()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[electionScheduleId])

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t('DATA_PROVIDER_INFO.SECTION_HEADER.DATA_PROVIDER_INFO'),
        }}
        breadcrumbs={dataProviderInfosTableBreadcrumbs(t)}
      />

      <SearchComponents
        totalCol="grid-cols-lg-9"
        colSpan="col-span-2"
        struct={searchStruct}
        onSubmitHandler={onSubmitSearch}
        requiredField={[
          SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
          SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
        ]}
        allSelectedData={allSelectedData}
        getScheduleDate
      ></SearchComponents>
      {
        disableAll ? 
        <div className='my-8'>
          <Text color="danger" weight='bold' className='text-center' component='h1'>
            {t('DATA_PROVIDER_INFO.ERROR_MESSAGE.BLOCK_DATA_PUBLISH_MESSAGE')}
          </Text>
        </div> : null
      }

      {showTable && !error && (
        <Table
          rows={row || []}
          columns={dataProviderInfosTableColumns({
            t,
            step,
            setStep,
            disableAll
          })}
        />
      )}
    </div>
  );
}

export default DataProviderInfo;
