import { useState } from 'react';
import dayjs from 'dayjs';

import { PollingCenterTypes } from '@type/center-officer-management/center-officer-contact-details-types';
import { getCenterOfficerContactDetails } from '@api/center-officer-management/controller-list/center-officer-contact-details/get-center-officer-contact-details';
import { CenterOfficerContactDetailsSearchProps } from '@type/center-officer-management/center-officer-contact-details-types';
import { getDigitBanglaFromEnglish } from '@utils';

interface CenterOfficerContactDetailsProps {
  searchItems?: CenterOfficerContactDetailsSearchProps;
  page?: number;
  size?: number;
}

interface PropsReturnType {
  getCenterOfficerContactDetailsListData: ({
    searchItems,
    size,
    page,
  }: CenterOfficerContactDetailsProps) => void;
  centerOfficerContactDetailsList: PollingCenterTypes[];
  loading: boolean;
  activePage: number;
  totalPage: number;
  totalCount: number;
}

const mapCenterOfficerContactDetails = (
  data: PollingCenterTypes,
  index: number,
  page: number,
) => {
  return {
    ...data,
    idx: getDigitBanglaFromEnglish(index + 1 + page * 10),
    pollingCenterName: `${data?.pollingCenterName}, ${data?.pollingCenterDescription}`,
    pollingCenterSerial: getDigitBanglaFromEnglish(data?.pollingCenterSerial),
    pollingPersonnelNID: getDigitBanglaFromEnglish(data?.pollingPersonnelNID),
    createdAt: data?.createdAt
      ? getDigitBanglaFromEnglish(
          dayjs(data?.createdAt?.split('.')?.[0]).format('YYYY-MM-DD HH:mm'),
        )
      : '',
  };
};

export const useGetCenterOfficerContactDetailsList = (): PropsReturnType => {
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [centerOfficerContactDetailsList, setCenterOfficerContactDetailsList] =
    useState<PollingCenterTypes[]>([]);

  const getCenterOfficerContactDetailsListData = async ({
    searchItems,
    size = 10,
    page = 0,
  }: CenterOfficerContactDetailsProps) => {
    try {
      setLoading(true);
      const response = await getCenterOfficerContactDetails(
        searchItems,
        page,
        size,
      );
      if (response?.data?.status === 200) {
        const page = response?.data?.data?.page || 0;
        const data = response?.data?.data?.pollingCenters?.map(
          (item, index) => {
            return mapCenterOfficerContactDetails(item, index, page);
          },
        );

        setCenterOfficerContactDetailsList(data);

        setActivePage(
          (response?.data?.data?.page && response?.data?.data?.page + 1) || 1,
        );
        if (response?.data?.data?.total) {
          setTotalPage(Math.ceil(response?.data?.data?.total / size));
        }

        if (response?.data?.data?.total) {
          setTotalCount(response?.data?.data?.total);
        } else {
          setTotalCount(0);
        }

        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return {
    getCenterOfficerContactDetailsListData,
    centerOfficerContactDetailsList,
    loading,
    activePage,
    totalPage,
    totalCount,
  };
};
