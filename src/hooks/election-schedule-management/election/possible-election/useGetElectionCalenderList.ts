import { useState } from 'react';
import { fetchElectionCalenderList } from '@api/election-schedule-management/election/possible-election/election-calender-list';
import {
  ElectionCalenderList,
  ElectionCalenderParams,
} from '@type/election-declaration-management/election/possible-election/possible-election';

export const useGetElectionCalenderList = () => {
  const [electionCalenderList, setElectionCalenderList] = useState<
    ElectionCalenderList[]
  >([]);

  const [listLoading, setListLoading] = useState(false);
  const [listActivePage, setListActivePage] = useState(1);
  const [listTotalPage, setListTotalPage] = useState(0);

  const getElectionCalenderList = async ({
    page = 0,
    size = 10,
    electionTypeId,
    candidateTypeId,
    regionId,
    zillaId,
    upazilaId,
    unionOrWardId,
    fromDate,
    toDate,
  }: ElectionCalenderParams) => {
    try {
      setListLoading(true);
      const response = await fetchElectionCalenderList({
        page,
        size,
        electionTypeId,
        candidateTypeId,
        unionOrWardId,
        upazilaId,
        zillaId,
        regionId,
        fromDate,
        toDate,
      });
      if (response?.data?.status === 200) {
        const data = response?.data?.data?.electionDetails;

        setElectionCalenderList(data ? data : []);
        setListActivePage(
          (response?.data?.data?.page && response?.data?.data?.page + 1) || 1,
        );
        if (response?.data?.data?.total && size) {
          setListTotalPage(Math.ceil(response?.data?.data?.total / size));
        }
        setListLoading(false);
      }
    } catch (error) {
      setListLoading(false);
    }
  };

  return {
    listActivePage,
    listTotalPage,
    listLoading,
    electionCalenderList,
    getElectionCalenderList,
  };
};
