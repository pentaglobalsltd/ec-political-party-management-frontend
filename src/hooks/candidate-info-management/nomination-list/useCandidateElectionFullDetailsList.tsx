import { useState } from 'react';
import {
  NominationListSearchProps,
  NominationType,
} from '@type/candidate-info-management/nomination-list-type';
import { getCandidateElectionFullDetailsListAdmin } from '@api/candidate-info-management/nomination-list/candidate-election-full-details-admin';
import { mappingCandidateElectionFullDetailsDataFn } from './helper/mapping';

interface CandidateElectionFullDetailsListAdminProps {
  page?: number;
  size?: number;
  searchItems: NominationListSearchProps;
}

interface Props {
  getCandidateElectionFullDetailsListAdminData: ({
    page,
    size,
    searchItems,
  }: CandidateElectionFullDetailsListAdminProps) => void;
  candidateElectionFullDetailsListAdminList: NominationType[];
  adminLoading: boolean;
  adminActivePage: number;
  adminTotalPage: number;
  adminCountSerial: number;
}

export const useCandidateElectionFullDetailsListAdmin = (): Props => {
  const [
    candidateElectionFullDetailsListAdminList,
    setCandidateElectionFullDetailsListAdmin,
  ] = useState<NominationType[]>([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminActivePage, setAdminActivePage] = useState(1);
  const [adminTotalPage, setAdminTotalPage] = useState(0);
  const [adminCountSerial, setAdminCountSerial] = useState(0);

  const getCandidateElectionFullDetailsListAdminData = async ({
    searchItems,
    page = 0,
    size = 10,
  }: CandidateElectionFullDetailsListAdminProps) => {
    try {
      setAdminLoading(true);
      const response = await getCandidateElectionFullDetailsListAdmin({
        searchItems,
        page,
        size,
      });
      if (response?.data?.status === 200) {
        const mappedData = response?.data?.data?.nominations
          ? mappingCandidateElectionFullDetailsDataFn({
              data: response?.data?.data?.nominations,
              page: response?.data?.data?.page || 0,
            })
          : [];

        setCandidateElectionFullDetailsListAdmin(mappedData);

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
    getCandidateElectionFullDetailsListAdminData,
    candidateElectionFullDetailsListAdminList,
    adminLoading,
    adminActivePage,
    adminTotalPage,
    adminCountSerial,
  };
};
