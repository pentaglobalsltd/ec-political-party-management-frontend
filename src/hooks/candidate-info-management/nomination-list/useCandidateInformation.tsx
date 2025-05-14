import { useState } from 'react';
import {
  NominationListSearchProps,
  NominationType,
} from '@type/candidate-info-management/nomination-list-type';
import { mappingCandidateElectionFullDetailsDataFn } from './helper/mapping';
import { getCandidateInformationApi } from '@api/candidate-info-management/nomination-list/candidate-information';

export interface CandidateElectionFullDetailsListAdminProps {
  page?: number;
  size?: number;
  searchItems: NominationListSearchProps;
}

interface Props {
  getCandidateInformation: ({
    page,
    size,
    searchItems,
  }: CandidateElectionFullDetailsListAdminProps) => void;
  candidateInformation: NominationType[];
  adminLoading: boolean;
  adminActivePage: number;
  adminTotalPage: number;
  adminTotalCount: number;
  adminCountSerial: number;
}

export const useCandidateInformation = (): Props => {
  const [candidateInformation, setCandidateInformation] = useState<
    NominationType[]
  >([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminActivePage, setAdminActivePage] = useState(1);
  const [adminTotalPage, setAdminTotalPage] = useState(0);
  const [adminTotalCount, setAdminTotalCount] = useState(0);
  const [adminCountSerial, setAdminCountSerial] = useState(0);

  const getCandidateInformation = async ({
    searchItems,
    page = 0,
    size = 10,
  }: CandidateElectionFullDetailsListAdminProps) => {
    try {
      setAdminLoading(true);

      const response = await getCandidateInformationApi({
        searchItems,
        page,
        size,
      });
      if (response?.data?.status === 200) {
        const mappedData = response?.data?.data?.candidateInformation
          ? mappingCandidateElectionFullDetailsDataFn({
              data: response?.data?.data?.candidateInformation,
              page: response?.data?.data?.page as number,
            })
          : [];

        setCandidateInformation(mappedData);

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
        if (response?.data?.data?.total && response?.data?.data?.total > 0) {
          setAdminTotalCount(response?.data?.data?.total);
        } else setAdminTotalCount(0);

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
    getCandidateInformation,
    candidateInformation,
    adminLoading,
    adminActivePage,
    adminTotalPage,
    adminTotalCount,
    adminCountSerial,
  };
};
