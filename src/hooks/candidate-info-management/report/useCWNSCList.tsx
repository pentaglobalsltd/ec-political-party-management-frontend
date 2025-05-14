import { useState } from 'react';
import {
  NominationListSearchProps,
  NominationStatusCountType,
} from '@type/candidate-info-management/nomination-list-type';
import { getCWNSCReport } from '@api/candidate-info-management/report/getCWNSCReport';
import { getDigitBanglaFromEnglish } from '@utils';

interface CWNSCProps {
  page?: number;
  size?: number;
  bengaliAlphabetOrder?: boolean;
  searchItems: NominationListSearchProps;
}

interface Props {
  getCWNSCListData: ({ page, searchItems, size }: CWNSCProps) => void;
  CWNSCList: NominationStatusCountType[];
  adminLoading: boolean;
  adminActivePage: number;
  adminTotalPage: number;
  adminCountSerial: number;
}

const mapDataFn = (data: NominationStatusCountType[]) => {
  const result = data?.map((item: NominationStatusCountType) => {
    return {
      ...item,

      total: getDigitBanglaFromEnglish(item?.total) ?? '',
      acceptance: getDigitBanglaFromEnglish(item?.acceptance) ?? '',
      selectionCancellation:
        getDigitBanglaFromEnglish(item?.selectionCancellation) ?? '',
      withdrawal: getDigitBanglaFromEnglish(item?.withdrawal) ?? '',
      appealValid: getDigitBanglaFromEnglish(item?.appealValid) ?? '',
      appealCancellation:
        getDigitBanglaFromEnglish(item?.appealCancellation) ?? '',
      symbolAllocated: getDigitBanglaFromEnglish(item?.symbolAllocated) ?? '',
    };
  });

  return result;
};

export const useCWNSCList = (): Props => {
  const [CWNSCList, setCWNSCList] = useState<NominationStatusCountType[]>([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminActivePage, setAdminActivePage] = useState(1);
  const [adminTotalPage, setAdminTotalPage] = useState(0);
  const [adminCountSerial, setAdminCountSerial] = useState(0);

  const getCWNSCListData = async ({
    page = 0,
    size = 10,
    searchItems,
    bengaliAlphabetOrder,
  }: CWNSCProps) => {
    try {
      setAdminLoading(true);
      const response = await getCWNSCReport({
        page,
        size,
        searchItems,
        bengaliAlphabetOrder,
      });
      if (response?.data?.status === 200) {
        const mappedData = response?.data?.data
          ?.nominationStatusCountsByConstituenciesDomainModels
          ? mapDataFn(
              response?.data?.data
                ?.nominationStatusCountsByConstituenciesDomainModels,
            )
          : [];

        setCWNSCList(mappedData);
        setAdminActivePage(
          (response?.data?.data?.page && response?.data?.data?.page + 1) || 1,
        );
        if (response?.data?.data?.total) {
          setAdminTotalPage(Math.ceil(response?.data?.data?.total / size));
        }
        if (
          response?.data?.data?.size &&
          (response?.data?.data?.page as number) >= 0
        )
          setAdminCountSerial(
            (response?.data?.data?.page as number) * response?.data?.data?.size,
          );
        setAdminLoading(false);
      } else {
        setAdminLoading(false);
      }
    } catch (error) {
      setAdminLoading(false);
    }
  };

  return {
    CWNSCList,
    getCWNSCListData,
    adminLoading,
    adminActivePage,
    adminTotalPage,
    adminCountSerial,
  };
};
