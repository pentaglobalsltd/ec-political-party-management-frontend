import dayjs from 'dayjs';
import { useState } from 'react';

import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { getElectionScheduleList } from '@api/election-schedule-management/election/election-schedule/schedule-declaration';
import { ElectionSearchProps } from '@type/search-types';
import { GetElectionDetailsList } from '@type/election-declaration-management/election/schedule-declaration-types';
import { getDigitBanglaFromEnglish } from '@utils';

interface ElectionDetailsListProps {
  searchItems: ElectionSearchProps;
  size?: number;
  page?: number;
}

interface Props {
  getElectionDetailsListData: ({
    searchItems,
    size,
    page,
  }: ElectionDetailsListProps) => void;
  electionDetailsList: GetElectionDetailsList[];
  loading: boolean;
  activePage: number;
  totalPage: number;
}

function mapScheduleDeclaration(
  data: GetElectionDetailsList,
  lang: string | null,
) {
  return {
    ...data,
    electionScheduleId: data.id,
    name: lang === LANGUAGE.BANGLA ? data?.nameBn : data?.nameEn,

    dateOfDeclaration: getDigitBanglaFromEnglish(
      dayjs(data?.dateOfDeclaration).format('YYYY-MM-DD HH:mm'),
    ),

    dateOfNominationSubmission: getDigitBanglaFromEnglish(
      dayjs(data?.dateOfNominationSubmission).format('YYYY-MM-DD HH:mm'),
    ),

    dateOfElection: getDigitBanglaFromEnglish(
      dayjs(data?.dateOfElection).format('YYYY-MM-DD HH:mm'),
    ),

    statusForDownload: data?.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়',
    statusNominationForDownload: data?.isOnlineNomination
      ? 'সক্রিয়'
      : 'নিষ্ক্রিয়',
  };
}
export const useElectionDetailsList = (): Props => {
  const [electionDetailsList, setElectionDetailsList] = useState<
    GetElectionDetailsList[]
  >([]);
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const getElectionDetailsListData = async ({
    searchItems,
    size = 10,
    page = 0,
  }: ElectionDetailsListProps) => {
    try {
      setLoading(true);
      const response = await getElectionScheduleList(searchItems, page, size);
      if (response?.data?.status === 200) {
        const data = response?.data?.data?.electionSchedules?.map((item) => {
          return mapScheduleDeclaration(item, language);
        });
        setElectionDetailsList(data);

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
    getElectionDetailsListData,
    electionDetailsList,
    loading,
    activePage,
    totalPage,
  };
};
