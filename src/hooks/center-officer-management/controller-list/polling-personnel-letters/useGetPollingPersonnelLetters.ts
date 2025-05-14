import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { CenterOfficerManagementSearchProps } from '@type/search-types';
import { PollingPersonnelLetterTypes } from '@type/center-officer-management/polling-personnel-letters';
import { getPollingPersonnelLetterSummary } from '@api/center-officer-management/controller-list/polling-personnel-letters/get-polling-personnel-letters';
import { getDigitBanglaFromEnglish } from '@utils';

interface PollingPersonnelLetterListProps {
  searchItems?: CenterOfficerManagementSearchProps;
  page?: number;
  size?: number;
}

interface Props {
  getPollingPersonnelLetterListData: ({
    searchItems,
    size,
    page,
  }: PollingPersonnelLetterListProps) => void;
  pollingPersonnelLetterList: PollingPersonnelLetterTypes[];
  loading: boolean;
  activePage: number;
  totalPage: number;
}

function mapPollingPersonnelLetterSummaryList(
  data: PollingPersonnelLetterTypes,
  lang: string | null,
  countSerial: number,
  idx: number,
) {
  return {
    ...data,
    serialNo: getDigitBanglaFromEnglish(countSerial + idx + 1),
    instituteName:
      lang === LANGUAGE.BANGLA ? data?.instituteNameBn : data?.instituteNameEn,
  };
}
export const useGetPollingPersonnelLetterSummaryList = (): Props => {
  const [pollingPersonnelLetterList, setPollingPersonnelLetterList] = useState<
    PollingPersonnelLetterTypes[]
  >([]);
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const getPollingPersonnelLetterListData = async ({
    searchItems,
    size = 10,
    page = 0,
  }: PollingPersonnelLetterListProps) => {
    try {
      setLoading(true);
      const response = await getPollingPersonnelLetterSummary(
        searchItems,
        page,
        size,
      );
      if (response?.data?.status === 200) {
        let countSerial = 0;
        if (
          response?.data?.data?.size &&
          (response?.data?.data?.page as number) >= 0
        ) {
          countSerial =
            (response?.data?.data?.page as number) * response?.data?.data?.size;
        }

        const data = response?.data?.data?.pollingCenterSummaries?.map(
          (item, idx) =>
            mapPollingPersonnelLetterSummaryList(
              item,
              language,
              countSerial,
              idx,
            ),
        );
        setPollingPersonnelLetterList(data);

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
    getPollingPersonnelLetterListData,
    pollingPersonnelLetterList,
    loading,
    activePage,
    totalPage,
  };
};
