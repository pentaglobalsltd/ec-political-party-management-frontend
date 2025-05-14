import { useState } from 'react';

import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';

import { RESULT_POLLING_CENTER_DASHBOARD_OPTIONS_COLORS } from '@constants/polling-center-results';
import {
  CandidateTypeWisePollingCenterDetailsList,
  CandidateTypeWisePollingCenterDetails,
} from '@type/result-management/electoral-process/submit-results/submitResults';
import { fetchCandidateWisePolingCenterResult } from '@api/result-management/candidateWisePollingCentersResult';

const getBgColor = (status?: string) => {
  if (
    status &&
    RESULT_POLLING_CENTER_DASHBOARD_OPTIONS_COLORS.makeBgGreen.includes(status)
  )
    return 'bg-success';
  else if (
    status &&
    RESULT_POLLING_CENTER_DASHBOARD_OPTIONS_COLORS.makeBgGray.includes(status)
  )
    return 'bg-light';
  else if (
    status &&
    RESULT_POLLING_CENTER_DASHBOARD_OPTIONS_COLORS.makeBgRed.includes(status)
  )
    return 'bg-danger opacity-75';
  else return '';
};

const getTitleTextColor = (status?: string) => {
  if (
    status &&
    RESULT_POLLING_CENTER_DASHBOARD_OPTIONS_COLORS.makeBgGray.includes(status)
  )
    return '';
  else return 'light';
};

const getSubTextColor = (status?: string) => {
  if (
    status &&
    RESULT_POLLING_CENTER_DASHBOARD_OPTIONS_COLORS.makeBgGray.includes(status)
  )
    return '';
  else return 'light';
};

const mappedSortingDataArray = (dataArray: any) => {
  const grayItems: any[] = [];
  const greenItems: any[] = [];
  const redItems: any[] = [];

  dataArray?.forEach((item: any) => {
    if (
      RESULT_POLLING_CENTER_DASHBOARD_OPTIONS_COLORS.makeBgGray.includes(
        item?.status,
      )
    ) {
      grayItems.push(item);
    } else if (
      RESULT_POLLING_CENTER_DASHBOARD_OPTIONS_COLORS.makeBgGreen.includes(
        item?.status,
      )
    ) {
      greenItems.push(item);
    } else if (
      RESULT_POLLING_CENTER_DASHBOARD_OPTIONS_COLORS.makeBgRed.includes(
        item?.status,
      )
    ) {
      redItems.push(item);
    }
  });

  return [...grayItems, ...greenItems, ...redItems];
};

const mappedDataArray = (
  dataArray: CandidateTypeWisePollingCenterDetailsList,
  language: string | null,
) => {
  const mappedData = mappedSortingDataArray(
    dataArray?.pollingCenterResults,
  )?.map((item: CandidateTypeWisePollingCenterDetails) => {
    return {
      ...item,
      label:
        language === LANGUAGE.BANGLA
          ? `${item.serial} - ${item.nameBn}`
          : `${item.serial} - ${item.nameEn}`,
      bgClassName: getBgColor(item?.status),
      subTextClassName: getSubTextColor(item?.status),
      titleTextColor: getTitleTextColor(item?.status),
    };
  });

  return mappedData;
};

export const useCandidateWisePollingCentersDetailsListAroOp = () => {
  const [pollingCenters, setPollingCenters] = useState([]);
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const getCandidateWisePollingCentersList = async ({
    electionScheduleId,
    electionSettingsId,
    candidateTypeId,
    pollingCenterName,
    size = 12,
    page = 0,
    status,
    isActive,
  }: {
    electionScheduleId?: string | number;
    candidateTypeId?: string | number;
    electionSettingsId?: string | number;
    pollingCenterName?: string;
    status?: string[];
    page?: string | number;
    size?: number;
    isActive?: string;
  }) => {
    setLoading(true);
    try {
      const response = await fetchCandidateWisePolingCenterResult({
        electionScheduleId,
        electionSettingsId,
        candidateTypeId,
        pollingCenterName,
        size,
        page,
        status,
        isActive,
      });
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data;
        setLoading(false);
        const newData: any = mappedDataArray(dataArray, language);
        setPollingCenters(newData);

        setActivePage(
          (response?.data?.data?.page && response?.data?.data?.page + 1) || 1,
        );

        setTotalPage(Math.ceil(response?.data?.data?.total / size));
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
    }
  };

  return {
    pollingCenters,
    getCandidateWisePollingCentersList,
    loading,
    activePage,
    totalPage,
  };
};
