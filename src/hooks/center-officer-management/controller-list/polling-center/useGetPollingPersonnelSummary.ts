import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { CenterOfficerManagementSearchProps } from '@type/search-types';
import {
  CenterSummary,
  PollingCenterSummary,
  PollingPersonnels,
} from '@type/center-officer-management/polling-center/polling center-summary';
import { getPollingPersonnelSummary } from '@api/center-officer-management/controller-list/polling-center/get-polling-personnel-center-summary';
import { getDigitBanglaFromEnglish } from '@utils';

interface PollingPersonnelSummaryProps {
  searchItems?: CenterOfficerManagementSearchProps;
  page?: number;
  size?: number;
}

interface Props {
  getPollingPersonnelSummaryData: ({
    searchItems,
    size,
    page,
  }: PollingPersonnelSummaryProps) => void;
  pollingPersonnelSummaryList: any;
  loading: boolean;
  activePage: number;
  totalPage: number;
  countSerial: number;
}

function mapPollingPersonnelList(
  data: PollingPersonnels,
  lang: string | null,
  index: number,
  page: number,
) {
  return {
    ...data,
    idx: getDigitBanglaFromEnglish(index + 1 + page * 10),
    pollingPersonnelName:
      lang === LANGUAGE.BANGLA
        ? data?.pollingPersonnel?.nameBn
        : data?.pollingPersonnel?.nameEn,
    agencyName:
      lang === LANGUAGE.BANGLA
        ? data?.pollingPersonnel?.agency?.nameBn
        : data?.pollingPersonnel?.agency?.nameEn,
    assignedDesignationName:
      lang === LANGUAGE.BANGLA
        ? data?.pollingPersonnelCenter?.assignedDesignationBn
        : data?.pollingPersonnelCenter?.assignedDesignationEn,
    grade:
      lang === LANGUAGE.BANGLA
        ? data?.pollingPersonnel?.payScale?.nameBn
        : data?.pollingPersonnel?.payScale?.nameEn,
    pollingCenterName:
      lang === LANGUAGE.BANGLA
        ? data?.pollingCenter?.instituteNameBn
        : data?.pollingCenter?.instituteNameEn,
    electionScheduleName:
      lang === LANGUAGE.BANGLA
        ? data?.pollingPersonnelCenter?.electionSchedule?.nameBn
        : data?.pollingPersonnelCenter?.electionSchedule?.nameEn,
  };
}

function mappedCenterSummary(data?: CenterSummary, lang?: string | null) {
  return {
    ...data,
    instituteName:
      lang === LANGUAGE.BANGLA ? data?.instituteNameBn : data?.instituteNameEn,
    boothNoForAPO: data?.availableBoothForAPO?.map((item) => {
      return { label: item.toString(), value: item };
    }),
    boothNoForPO: data?.availableBoothForPO?.map((item) => {
      return { label: item.toString(), value: item };
    }),
  };
}
export const usePollingPersonnelSummaryList = (): Props => {
  const [pollingPersonnelSummaryList, setPollingPersonnelSummary] =
    useState<PollingCenterSummary>();
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [countSerial, setCountSerial] = useState(0);

  const getPollingPersonnelSummaryData = async ({
    searchItems,
    size = 10,
    page = 0,
  }: PollingPersonnelSummaryProps) => {
    try {
      setLoading(true);
      const response = await getPollingPersonnelSummary(
        searchItems,
        page,
        size,
      );
      if (response?.data?.status === 200) {
        const page = response?.data?.data?.pollingPersonnels?.page || 0;
        const modifiedPersonnel = {
          ...response?.data?.data?.pollingPersonnels,
          items: response?.data?.data?.pollingPersonnels?.items?.map(
            (item: any, index: number) => {
              return mapPollingPersonnelList(item, language, index, page);
            },
          ),
        };
        const centerSummary = mappedCenterSummary(
          response?.data?.data.centerSummary,
          language,
        );
        const data = {
          centerSummary,
          pollingPersonnels: modifiedPersonnel,
        };
        setPollingPersonnelSummary(data);

        setActivePage(
          (response?.data?.data?.pollingPersonnels.total &&
            (response?.data?.data?.pollingPersonnels?.page || 0) + 1) ||
            1,
        );
        if (response?.data?.data?.pollingPersonnels.total) {
          setTotalPage(
            Math.ceil(response?.data?.data?.pollingPersonnels.total / size),
          );
        }
        if (
          response?.data?.data?.pollingPersonnels.size &&
          (response?.data?.data?.pollingPersonnels?.page as number) >= 0
        )
          setCountSerial(
            (response?.data?.data?.pollingPersonnels?.page as number) *
              response?.data?.data?.pollingPersonnels.size,
          );
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    getPollingPersonnelSummaryData,
    pollingPersonnelSummaryList,
    loading,
    activePage,
    totalPage,
    countSerial,
  };
};
