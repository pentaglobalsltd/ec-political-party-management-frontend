import { useState } from 'react';
import {
  NominationListSearchProps,
  NominationType,
} from '@type/candidate-info-management/nomination-list-type';
import { getNominationList } from '@api/candidate-info-management/nomination-list/nomination-list';
import { mappingCandidateElectionFullDetailsDataFn } from './helper/mapping';

export interface NominationListProps {
  searchItems: NominationListSearchProps;
  page?: number;
  size?: number;
  isNominationComplete?: boolean;
  isPersonalInfoComplete?: boolean;
  isHolofnamaComplete?: boolean;
  isAttachmentComplete?: boolean;
  isCandidateElectionExpenseComplete?: boolean;
  isAssetIncomeExpenditureComplete?: boolean;
  candidateSerialOrder?: boolean;
  bengaliAlphabetOrder?: boolean;
}

interface Props {
  getNominationListData: ({
    page,
    searchItems,
    size,
  }: NominationListProps) => void;
  nominationList: NominationType[];
  loading: boolean;
  activePage: number;
  totalPage: number;
  countSerial: number;
}

export const useNominationList = (): Props => {
  const [nominationList, setNominationList] = useState<NominationType[]>([]);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [countSerial, setCountSerial] = useState(0);

  const getNominationListData = async ({
    page = 0,
    size = 10,
    searchItems,
    isNominationComplete,
    isPersonalInfoComplete,
    isHolofnamaComplete,
    isAttachmentComplete,
    isCandidateElectionExpenseComplete,
    isAssetIncomeExpenditureComplete,
    candidateSerialOrder,
    bengaliAlphabetOrder,
  }: NominationListProps) => {
    try {
      setLoading(true);
      const response = await getNominationList({
        searchItems,
        page,
        size,
        isNominationComplete,
        isPersonalInfoComplete,
        isHolofnamaComplete,
        isAttachmentComplete,
        isCandidateElectionExpenseComplete,
        isAssetIncomeExpenditureComplete,
        candidateSerialOrder,
        bengaliAlphabetOrder,
      });

      if (response?.data?.status === 200) {
        const mappedData = response?.data?.data?.nominations
          ? mappingCandidateElectionFullDetailsDataFn({
              data: response?.data?.data?.nominations,
              page: response?.data?.data?.page || 0,
            })
          : [];
        setNominationList(mappedData);

        setActivePage(
          (response?.data?.data?.page && response?.data?.data?.page + 1) || 1,
        );
        if (response?.data?.data?.total) {
          setTotalPage(Math.ceil(response?.data?.data?.total / size));
        }
        if (
          response?.data?.data?.size &&
          (response?.data?.data?.page as number) >= 0
        )
          setCountSerial(
            (response?.data?.data?.page as number) * response?.data?.data?.size,
          );
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return {
    getNominationListData,
    nominationList,
    loading,
    activePage,
    totalPage,
    countSerial,
  };
};
