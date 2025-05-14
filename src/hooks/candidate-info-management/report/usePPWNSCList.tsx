import { useState } from 'react';

import { getPPWNSCReport } from '@api/candidate-info-management/report/getPPWNSCReport';
import {
  NominationListSearchProps,
  NominationStatusCountType,
} from '@type/candidate-info-management/nomination-list-type';
import { getDigitBanglaFromEnglish } from '@utils';

interface PPWNSCProps {
  page?: number;
  size?: number;
  bengaliAlphabetOrder?: boolean;
  searchItems: NominationListSearchProps;
}

interface Props {
  getPPWNSCListData: ({ page, searchItems, size }: PPWNSCProps) => void;
  PPWNSCList: NominationStatusCountType[];
  adminLoading: boolean;
  adminActivePage: number;
  adminTotalPage: number;
  adminCountSerial: number;
}

const mapDataFn = (data: NominationStatusCountType[]) => {
  const result = data?.map((item: NominationStatusCountType) => {
    let totalAcceptanceAppealValid = 0;

    totalAcceptanceAppealValid =
      Number(item?.acceptance) + Number(item?.appealValid);

    const totalCancellation =
      Number(item?.selectionCancellation) + Number(item?.appealCancellation);

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
      totalAcceptanceAppealValid:
        getDigitBanglaFromEnglish(totalAcceptanceAppealValid) ?? '',

      allCancelSum: getDigitBanglaFromEnglish(totalCancellation) ?? '',
    };
  });

  return result;
};

export const usePPWNSCList = (): Props => {
  const [PPWNSCList, setPPWNSCList] = useState<NominationStatusCountType[]>([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminActivePage, setAdminActivePage] = useState(1);
  const [adminTotalPage, setAdminTotalPage] = useState(0);
  const [adminCountSerial, setAdminCountSerial] = useState(0);

  const getPPWNSCListData = async ({
    page = 0,
    size = 10,
    searchItems,
    bengaliAlphabetOrder,
  }: PPWNSCProps) => {
    try {
      setAdminLoading(true);
      const response = await getPPWNSCReport({
        page,
        size,
        searchItems,
        bengaliAlphabetOrder,
      });

      if (response?.data?.status === 200) {
        const mappedData = response?.data?.data
          ?.nominationStatusCountsByPoliticalPartiesDomainModels
          ? mapDataFn(
              response?.data?.data
                ?.nominationStatusCountsByPoliticalPartiesDomainModels,
            )
          : [];

        setPPWNSCList(mappedData);
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
      console.log(error);
      setAdminLoading(false);
    }
  };

  return {
    PPWNSCList,
    getPPWNSCListData,
    adminLoading,
    adminActivePage,
    adminTotalPage,
    adminCountSerial,
  };
};
