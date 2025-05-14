import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { PollingCenterListFilterWithUserId } from '@type/result-management/electoral-process/results/results';
import { fetchPollingCenterResultListWithUserIds } from '@api/result-management/electoral-process/results/get-polling-center-results-list-with-user-id';

function mapPollingCenterList(data: any, lang: string | null) {
  return {
    ...data,
    serial: data?.serial,
    candidateTypeName:
      lang === LANGUAGE.BANGLA
        ? data?.candidateTypeNameBn
        : data?.candidateTypeNameEn,
    pollingCenterName:
      lang === LANGUAGE.BANGLA
        ? data?.pollingInstituteNameBn
        : data?.pollingInstituteNameEn,
    description:
      lang === LANGUAGE.BANGLA ? data?.descriptionBn : data?.descriptionEn,
    zillaName: lang === LANGUAGE.BANGLA ? data?.zillaNameBn : data?.zillaNameEn,
    constituencyName:
      lang === LANGUAGE.BANGLA
        ? data?.constituencyNameBn
        : data?.constituencyNameEn,
  };
}

export const useGetPollingCenterResultListWithUserId = () => {
  const [pollingCenterList, setPollingCenterList] = useState<any>([]);

  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const getPollingCenterList = async ({
    scheduleId,
    electionSettingsId,
    userId,
    status,
    constituencyId,
    candidateTypeId,
    zillaId,
    upazilaId,
    electionTypeId,
    page = 0,
    size = 10,
  }: PollingCenterListFilterWithUserId) => {
    try {
      setLoading(true);
      const response = await fetchPollingCenterResultListWithUserIds({
        page,
        size,
        scheduleId,
        electionSettingsId,
        userId,
        status,
        constituencyId,
        candidateTypeId,
        zillaId,
        upazilaId,
        electionTypeId,
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

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return {
    activePage,
    totalPage,
    loading,
    pollingCenterList,
    getPollingCenterList,
  };
};
