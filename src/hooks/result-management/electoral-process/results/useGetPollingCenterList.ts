import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { fetchPollingCenterList } from '@api/result-management/electoral-process/results/get-polling-center-list';
import { PollingCenterListFilter } from '@type/result-management/electoral-process/results/results';
import { getDigitBanglaFromEnglish } from '@utils';

function mapPollingCenterList(data: any, lang: string | null) {
  return {
    ...data,
    serial: data?.pollingCenter?.serial,
    candidateTypeName:
      lang === LANGUAGE.BANGLA
        ? data?.pollingCenter?.candidateTypeNameBn
        : data?.pollingCenter?.candidateTypeNameEn,
    pollingCenterName:
      lang === LANGUAGE.BANGLA
        ? data?.pollingCenter?.pollingInstituteNameBn
        : data?.pollingCenter?.pollingInstituteNameEn,
    description:
      lang === LANGUAGE.BANGLA
        ? data?.pollingCenter?.descriptionBn
        : data?.pollingCenter?.descriptionEn,
    zillaName:
      lang === LANGUAGE.BANGLA
        ? data?.pollingCenter?.zillaNameBn
        : data?.pollingCenter?.zillaNameEn,

    constituencyName:
      lang === LANGUAGE.BANGLA
        ? data?.pollingCenter?.constituencyNameBn
        : data?.pollingCenter?.constituencyNameEn,

    municipalityName:
      lang === LANGUAGE.BANGLA
        ? data?.pollingCenter?.municipalityNameBn
        : data?.pollingCenter?.municipalityNameEn,

    unionOrWardName:
      lang === LANGUAGE.BANGLA
        ? data?.pollingCenter?.unionOrWardNameBn
        : data?.pollingCenter?.unionOrWardNameEn,
    unionWardName:
      lang === LANGUAGE.BANGLA
        ? data?.pollingCenter?.unionWardNameBn
        : data?.pollingCenter?.unionWardNameEn,
    upazilaName:
      lang === LANGUAGE.BANGLA
        ? data?.pollingCenter?.upazilaNameBn
        : data?.pollingCenter?.upazilaNameEn,

    pollingCenterTotalVoter: getDigitBanglaFromEnglish(
      data?.pollingCenter?.totalVoter,
    ),
    totalLegalVoteCount: getDigitBanglaFromEnglish(data?.totalLegalVoteCount),
    totalIllegalVoteCount: getDigitBanglaFromEnglish(
      data?.totalIllegalVoteCount,
    ),
    createdBy: data?.createdBy,
    updatedBy: data?.updatedBy,
  };
}

export const useGetPollingCenterList = () => {
  const [pollingCenterList, setPollingCenterList] = useState<any>([]);

  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const getPollingCenterList = async ({
    scheduleId,
    electionSettings,
    status,
    constituencyId,
    candidateTypeId,
    zillaId,
    upazilaId,
    page = 0,
    size = 10,
    commonSearchParam,
  }: PollingCenterListFilter) => {
    try {
      setLoading(true);
      const response = await fetchPollingCenterList({
        page,
        size,
        scheduleId,
        electionSettings,
        status,
        constituencyId,
        candidateTypeId,
        zillaId,
        upazilaId,
        commonSearchParam,
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
    getPollingCenterList,
  };
};
