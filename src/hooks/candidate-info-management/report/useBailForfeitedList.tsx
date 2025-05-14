import { useState } from 'react';

import { getBailForfeitedList } from '@api/candidate-info-management/report/getBailForfeitedList';
import {
  BailForfeitedSearchPropsType,
  BailForfeitedItemType,
} from '@type/candidate-info-management/report/get-bail-forfeited-list-types';
import { getDigitBanglaFromEnglish } from '@utils';

interface HookReturnType {
  getBailForfeitedListData: ({
    page,
    size,
    electionScheduleId,
    candidateTypeId,
    zillaId,
    constituencyId,
  }: BailForfeitedSearchPropsType) => void;
  bailForfeitedList: BailForfeitedItemType[];
  isLoading: boolean;
  activePage: number;
  totalPage: number;
}

const mappingBailForfeitedListData = ({
  data,
  page,
}: {
  data: BailForfeitedItemType[];
  page: number;
}) => {
  const mappedData = data?.map((item: BailForfeitedItemType, index) => {
    return {
      ...item,
      idx: getDigitBanglaFromEnglish(page * 10 + index + 1),
      totalCastedVote: getDigitBanglaFromEnglish(item?.totalCastedVote),
      candidateVoteCount: getDigitBanglaFromEnglish(item?.candidateVoteCount),
      candidateVoteCountPercentage: `${getDigitBanglaFromEnglish(
        item?.candidateVoteCountPercentage,
      )}%`,
    };
  });

  return mappedData;
};

export const useBailForfeitedList = (): HookReturnType => {
  const [bailForfeitedList, setBailForfeitedList] = useState<
    BailForfeitedItemType[]
  >([]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [activePage, setActivePage] = useState(1);

  const getBailForfeitedListData = async ({
    page = 0,
    size = 10,
    electionScheduleId,
    candidateTypeId,
    zillaId,
    constituencyId,
  }: BailForfeitedSearchPropsType) => {
    try {
      setIsLoading(true);
      const response = await getBailForfeitedList({
        page,
        size,
        electionScheduleId,
        candidateTypeId,
        zillaId,
        constituencyId,
      });
      if (response?.data?.status === 200) {
        const mappedResponseData = response?.data?.data?.bailForfeitedList
          ? mappingBailForfeitedListData({
              data: response?.data?.data.bailForfeitedList,
              page: response?.data?.data?.page || 0,
            })
          : [];

        setBailForfeitedList(mappedResponseData);
        setActivePage(
          (response?.data?.data?.page && response?.data?.data?.page + 1) || 1,
        );
        if (response?.data?.data?.total)
          setTotalPage(Math.ceil(response?.data?.data?.total / size));

        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return {
    getBailForfeitedListData,
    bailForfeitedList,
    isLoading,
    activePage,
    totalPage,
  };
};
