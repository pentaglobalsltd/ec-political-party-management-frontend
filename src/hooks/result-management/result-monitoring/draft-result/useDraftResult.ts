import { useState } from 'react';

import {
  DraftResultParams,
  fetchDraftResultList,
} from '@api/result-management/results-monitoring/draft-result/draft-result';
import { DraftResultType } from '@type/result-management/result-monitoring/draft-result/draft-result-types';
import { getDigitBanglaFromEnglish } from '@utils';

interface DraftResultHookType {
  draftResults: DraftResultType[];
  getDraftResultData: (obj: DraftResultParams) => void;
  loading: boolean;
  activePage: number;
  totalPage: number;
}

const mapDraftResult = (data: DraftResultType) => {
  return {
    ...data,
    totalPollingCenters: getDigitBanglaFromEnglish(data?.totalPollingCenters),
    receivedVote: getDigitBanglaFromEnglish(data?.receivedVote),
    totalIllegalVote: getDigitBanglaFromEnglish(data?.totalIllegalVote),
    attendancePercentage: data?.attendancePercentage
      ? getDigitBanglaFromEnglish(Number(data?.attendancePercentage.toFixed(3)))
      : '',
  };
};

const useDraftResult = (): DraftResultHookType => {
  const [draftResults, setDraftResults] = useState<DraftResultType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  const getDraftResultData = async ({
    page = 0,
    size = 10,
    electionScheduleId,
    settingsId,
    queryParams,
  }: DraftResultParams) => {
    try {
      setLoading(true);

      const response = await fetchDraftResultList({
        page,
        size,
        electionScheduleId,
        settingsId,
        queryParams,
      });
      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.draftResults?.map((item) => {
            return mapDraftResult(item);
          }) || [];
        setDraftResults(dataArray as any);

        setActivePage(
          (response?.data?.data?.page && response?.data?.data?.page + 1) || 1,
        );

        if (response?.data?.data?.total) {
          setTotalPage(Math.ceil(response?.data?.data?.total / size));
        }

        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return {
    draftResults,
    getDraftResultData,
    loading,
    activePage,
    totalPage,
  };
};

export default useDraftResult;
