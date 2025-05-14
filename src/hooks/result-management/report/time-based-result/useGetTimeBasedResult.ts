import { useState } from 'react';
import dayjs from 'dayjs';

import {
  TimeBasedResult,
  TimeBasedResultListParams,
} from '@type/result-management/report/time-based-result/time-based-result-type';
import { fetchTimeBasedResultList } from '@api/result-management/report/time-based-result/time-based-result';
import { getDigitBanglaFromEnglish } from '@utils';

const mapResultsList = (data: TimeBasedResult) => {
  return {
    ...data,
    centerSerial: getDigitBanglaFromEnglish(data?.centerSerial),
    resultSubmitTime: data?.resultSubmitTime
      ? getDigitBanglaFromEnglish(
          dayjs(data?.resultSubmitTime.split('.')[0]).format(
            'YYYY-MM-DD HH:mm',
          ),
        )
      : '',
    resultPublishTime: data?.resultPublishTime
      ? getDigitBanglaFromEnglish(
          dayjs(data?.resultPublishTime.split('.')[0]).format(
            'YYYY-MM-DD HH:mm',
          ),
        )
      : '',
  };
};

export const useGetTimeBasedResult = () => {
  const [resultList, setResultList] = useState<TimeBasedResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  const getTimeBasedResultList = async ({
    electionScheduleId,
    electionSettingsId,
    page = 0,
    size = 10,
  }: TimeBasedResultListParams) => {
    try {
      setLoading(true);
      const response = await fetchTimeBasedResultList({
        page,
        size,
        electionScheduleId,
        electionSettingsId,
      });
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data?.results?.map((item) => {
          return mapResultsList(item);
        }) as any;

        setResultList(dataArray);
        setActivePage(
          (response?.data?.data?.page && response?.data?.data?.page + 1) || 1,
        );
        if (response?.data?.data?.total) {
          setTotalPage(Math.ceil(response?.data?.data?.total / size));
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    activePage,
    totalPage,
    loading,
    getTimeBasedResultList,
    resultList,
  };
};
