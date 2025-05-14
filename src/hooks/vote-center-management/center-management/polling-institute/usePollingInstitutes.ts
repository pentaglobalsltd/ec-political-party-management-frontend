import { useState } from 'react';

import { PollingInstitutesType } from '@type/vote-center-management/polling-institutes-types';
import { getDigitBanglaFromEnglish } from '@utils';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';

import {
  GetPollingPollingInstitutes,
  getPollingInstitutesApi,
} from '@api/vote-center-management/center-management/polling-institute/polling-institutes';
import { CANDIDATE_INFO } from '@constants/candidate-info';
import useRoReportFiltersNew from '@hooks/candidate-info-management/report/useRoReportFiltersNew';
import { USER_TYPES } from '@constants/user-types';

interface HookReturnType {
  pollingInstitutes: PollingInstitutesType[];
  getPollingInstitutesList: (obj: GetPollingPollingInstitutes) => void;
  loading: boolean;
  activePage: number;
  totalPage: number;
}

const mapPollingInstitutesData = (
  data: PollingInstitutesType,
  lang: string | null,
  countSerialInstitute: number,
  index: number,
) => {
  return {
    ...data,
    serialNo: getDigitBanglaFromEnglish(countSerialInstitute + index + 1),
    name: lang === LANGUAGE.BANGLA ? data?.nameBn : data?.nameEn,
    address: lang === LANGUAGE.BANGLA ? data?.addressBn : data?.addressEn,
    headName: lang === LANGUAGE.BANGLA ? data?.headName : data?.headName,

    zillaName:
      lang === LANGUAGE.BANGLA ? data?.zilla?.nameBn : data?.zilla?.nameEn,
    upazilaName:
      lang === LANGUAGE.BANGLA ? data?.upazila?.nameBn : data?.upazila?.nameEn,

    upazilaNameWithCode:
      lang === LANGUAGE.BANGLA
        ? `${data?.upazila?.nameBn} (${getDigitBanglaFromEnglish(
            data?.upazila?.code,
          )})`
        : `${data?.upazila?.nameEn} (${data?.upazila?.code})`,

    unionOrWardName:
      lang === LANGUAGE.BANGLA
        ? data?.unionOrWard?.nameBn
        : data?.unionOrWard?.nameEn,

    unionOrWardNameWithCode:
      lang === LANGUAGE.BANGLA
        ? `${data?.unionOrWard?.nameBn} (${getDigitBanglaFromEnglish(
            data?.unionOrWard?.code,
          )})`
        : `${data?.unionOrWard?.nameEn} (${data?.unionOrWard?.code})`,

    idFrontend:
      lang === LANGUAGE.BANGLA ? getDigitBanglaFromEnglish(data?.id) : data?.id,
    className: data?.lat ? '' : 'bg-danger-lighter',
  };
};

const usePollingInstitutes = (): HookReturnType => {
  const { language } = useLanguage();
  const { userType } = useRoReportFiltersNew();

  const [pollingInstitutes, setPollingInstitutes] = useState<
    PollingInstitutesType[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const getPollingInstitutesList = async ({
    page = 0,
    size = 10,
    queryParams,
  }: GetPollingPollingInstitutes) => {
    try {
      setLoading(true);

      const { unionOrWardId, ...rest } = { ...queryParams };

      const isReserveCouncillorElection =
        CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID ===
          Number(queryParams?.candidateTypeId) ||
        CANDIDATE_INFO.MUNICIPALITY_RESERVED_COUNCILLOR.ID ===
          Number(queryParams?.candidateTypeId);

      const updatedQueryParams = {
        ...rest,

        ...(isReserveCouncillorElection && userType === USER_TYPES.ADMIN
          ? { reservedWardId: unionOrWardId }
          : { unionOrWardId }),
      };

      const response = await getPollingInstitutesApi({
        page,
        size,
        queryParams: updatedQueryParams,
      });

      if (response?.data?.status === 200) {
        const count =
          response?.data?.data?.size &&
          (response?.data?.data?.page as number) >= 0
            ? (response?.data?.data?.page as number) *
              response?.data?.data?.size
            : 0;
        const dataArray = response?.data?.data?.pollingInstitute?.map(
          (item, index) =>
            mapPollingInstitutesData(item, language, count, index),
        );

        setPollingInstitutes(dataArray || []);

        setActivePage(
          (response?.data?.data?.page && response?.data?.data?.page + 1) || 1,
        );
        if (response?.data?.data?.total) {
          setTotalPage(Math.ceil(response?.data?.data?.total / size));
        }

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
    pollingInstitutes,
    getPollingInstitutesList,
    activePage,
    loading,
    totalPage,
  };
};

export default usePollingInstitutes;
