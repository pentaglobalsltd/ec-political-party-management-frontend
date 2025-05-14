import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { fetchPollingCenterListForAroSummary } from '@api/result-management/electoral-process/results/get-polling-center-list';
import { PollingCenterListFilter } from '@type/result-management/electoral-process/results/results';

function mapPollingCenterList(data: any, lang: string | null) {
  return {
    ...data,
    candidateTypeName: data?.candidateTypeNameBn,
    pollingCenterName: data?.pollingInstituteNameBn,
    description: data?.descriptionBn,
    pollingCenterid: data?.pollingCenterid,
    zillaName:
      lang === LANGUAGE.BANGLA
        ? data?.pollingCenter?.zillaNameBn
        : data?.pollingCenter?.zillaNameEn,
    constituencyName:
      lang === LANGUAGE.BANGLA
        ? data?.pollingCenter?.constituencyNameBn
        : data?.pollingCenter?.constituencyNameEn,
    pollingCenterTotalVoter: data?.pollingCenter?.totalVoter,
    createdBy: data?.pollingCenter?.createdBy,
    updatedBy: data?.pollingCenter?.updatedBy,
  };
}

export const useGetPollingCenterListForAroSummary = () => {
  const [pollingCenterList, setPollingCenterList] = useState<any>([]);

  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const getPollingCenterListForAroSummary = async ({
    scheduleId,
    candidateTypeId,
    userId,
    status,
    page = 0,
    size = 10,
  }: PollingCenterListFilter) => {
    try {
      setLoading(true);

      const response = await fetchPollingCenterListForAroSummary({
        page,
        size,
        scheduleId,
        candidateTypeId,
        userId,
        status,
      });
      if (response?.data?.status === 200) {
        const pollingCenterResultsResponse =
          response?.data?.data?.pollingCenterResults;
        const mappedResponse = pollingCenterResultsResponse?.map(
          (item: any) => {
            return mapPollingCenterList(item, language);
          },
        );
        setPollingCenterList(mappedResponse);
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
    pollingCenterList,
    getPollingCenterListForAroSummary,
  };
};
