import dayjs from 'dayjs';
import { useState } from 'react';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

import { USER_TYPES } from '@constants/user-types';
import { CANDIDATE_INFO } from '@constants/candidate-info';
import { voterTypeLabel } from '@constants/polling-center-results';

import useRoReportFiltersNew from '@hooks/candidate-info-management/report/useRoReportFiltersNew';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { PollingCentersAggregatedType } from '@type/vote-center-management/polling-centers-aggregated-types';
import { getDigitBanglaFromEnglish } from '@utils';
import {
  GetPollingCenterAggregated,
  getPollingCenterAggregatedApi,
} from '@api/vote-center-management/center-management/polling-center-list/polling-centers-aggregated';

interface HookReturnType {
  pollingCentersAggregated: PollingCentersAggregatedType[];
  getPollingCenterAggregatedData: (obj: GetPollingCenterAggregated) => void;
  loading: boolean;
  activePage: number;
  totalPage: number;
  totalCount: number;
}

const mapPollingCenterAggregatedData = (
  t: TFunction<'translation', undefined>,
  data: PollingCentersAggregatedType,
  lang: string | null,
  idx: number,
  countSerial: number,
) => {
  return {
    ...data,
    idx: getDigitBanglaFromEnglish(countSerial + idx + 1),
    serialNo: getDigitBanglaFromEnglish(countSerial + idx + 1),
    serial: getDigitBanglaFromEnglish(data?.serial),
    zillaName: lang === LANGUAGE.BANGLA ? data?.zillaNameBn : data?.zillaNameEn,

    upazilaName:
      lang === LANGUAGE.BANGLA ? data?.upazilaNameBn : data?.upazilaNameEn,

    unionOrWardName:
      lang === LANGUAGE.BANGLA
        ? data?.unionOrWardNameBn
        : data?.unionOrWardNameEn,

    isActiveStatus: data?.isActive
      ? t('VOTE_CENTER_ADDITION.ACTIVE')
      : t('VOTE_CENTER_ADDITION.INACTIVE'),

    // এলাকা নাম্বার missing
    voterAreaName:
      lang === LANGUAGE.BANGLA ? data?.voterAreaNameBn : data?.voterAreaNameEn,

    pollingInstituteName:
      lang === LANGUAGE.BANGLA
        ? `${data?.centerInstituteNameBn}, ${data?.descriptionBn}`
        : `${data?.centerInstituteNameEn}, ${data?.descriptionEn}`,

    description:
      lang === LANGUAGE.BANGLA ? data?.descriptionBn : data?.descriptionEn,

    numberOfBooth:
      lang === LANGUAGE.BANGLA
        ? getDigitBanglaFromEnglish(data?.numberOfBooth)
        : data?.numberOfBooth,

    voterType: voterTypeLabel(data?.voterType),

    totalMaleVoter:
      lang === LANGUAGE.BANGLA
        ? getDigitBanglaFromEnglish(data?.totalMaleVoter)
        : data?.totalMaleVoter,

    totalFemaleVoter:
      lang === LANGUAGE.BANGLA
        ? getDigitBanglaFromEnglish(data?.totalFemaleVoter)
        : data?.totalFemaleVoter,

    totalThirdGenderVoter:
      lang === LANGUAGE.BANGLA
        ? getDigitBanglaFromEnglish(data?.totalThirdGenderVoter)
        : data?.totalThirdGenderVoter,

    totalVoter:
      lang === LANGUAGE.BANGLA
        ? getDigitBanglaFromEnglish(data?.totalVoter)
        : data?.totalVoter,

    isTemporaryCenter: data.isTemporary
      ? t('VOTE_CENTER_ADDITION.TEMPORARY_CENTER')
      : t('VOTE_CENTER_ADDITION.PERMANENT_CENTER'),
    numberOfTemporaryBooth:
      lang === LANGUAGE.BANGLA
        ? getDigitBanglaFromEnglish(data?.numberOfTemporaryBooth)
        : data?.numberOfTemporaryBooth,

    createdAt: getDigitBanglaFromEnglish(
      dayjs(data?.createdAt).format('YYYY-MM-DD HH:mm'),
    ),

    className: data?.pollingInstituteLat ? '' : 'bg-danger-lighter',
  };
};

const usePollingCentersAggregated = (): HookReturnType => {
  const { language } = useLanguage();
  const { userType } = useRoReportFiltersNew();
  const { t } = useTranslation();

  const [pollingCentersAggregated, setPollingCentersAggregated] = useState<
    PollingCentersAggregatedType[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  const getPollingCenterAggregatedData = async ({
    page = 0,
    size = 10,
    queryParams,
  }: GetPollingCenterAggregated) => {
    try {
      setLoading(true);
      if (queryParams?.unionOrWardId) {
        queryParams.unionOrWardIds = queryParams?.unionOrWardId;
      }
      const { unionOrWardIds, ...rest } = { ...queryParams };

      const isReserveCouncillorElection =
        CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID ===
          Number(queryParams?.candidateTypeId) ||
        CANDIDATE_INFO.MUNICIPALITY_RESERVED_COUNCILLOR.ID ===
          Number(queryParams?.candidateTypeId);

      const updatedQueryParams = {
        ...rest,

        ...(isReserveCouncillorElection && userType === USER_TYPES.ADMIN
          ? { reservedWardIds: unionOrWardIds }
          : { unionOrWardIds }),
      };

      const response = await getPollingCenterAggregatedApi({
        page,
        size,
        queryParams: updatedQueryParams,
      });
      if (response?.data?.status === 200) {
        let countSerial = 0;
        if (
          response?.data?.data?.size &&
          (response?.data?.data?.page as number) >= 0
        ) {
          countSerial =
            (response?.data?.data?.page as number) * response?.data?.data?.size;
        }

        const dataArray = response?.data?.data?.pollingCenters?.map(
          (item, idx) =>
            mapPollingCenterAggregatedData(t, item, language, idx, countSerial),
        );

        setPollingCentersAggregated(dataArray || []);

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
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return {
    pollingCentersAggregated,
    getPollingCenterAggregatedData,
    loading,
    activePage,
    totalPage,
    totalCount,
  };
};

export default usePollingCentersAggregated;
