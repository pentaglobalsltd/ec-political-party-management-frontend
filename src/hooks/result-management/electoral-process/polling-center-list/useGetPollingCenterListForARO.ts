import { useState } from 'react';

import { voterTypeLabel } from '@constants/polling-center-results';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { fetchPollingCenterListForARO } from '@api/result-management/electoral-process/polling-center-list/get-polling-center-list-for-aro';
import {
  PollingCenterListParamsForARO,
  PollingCenterType,
} from '@type/result-management/electoral-process/polling-center-list/polling-center-list-type';
import { removeTimeInDate } from '@utils/date-converter';
import { getDigitBanglaFromEnglish } from '@utils';

function mapPollingCenterList(data: any, index: number, lang: string | null) {
  return {
    ...data,
    idx: getDigitBanglaFromEnglish(index + 1),
    serial: getDigitBanglaFromEnglish(data?.serial),
    pollingInstituteName:
      lang === LANGUAGE.BANGLA ? data?.nameBn : data?.nameEn,
    description:
      lang === LANGUAGE.BANGLA ? data?.descriptionBn : data?.descriptionEn,
    numberOfBooth: getDigitBanglaFromEnglish(data?.numberOfBooth),
    totalMaleVoter: getDigitBanglaFromEnglish(data?.totalMaleVoter),
    totalFemaleVoter: getDigitBanglaFromEnglish(data?.totalFemaleVoter),
    totalThirdGenderVoter: getDigitBanglaFromEnglish(
      data?.totalThirdGenderVoter,
    ),
    totalVoter: getDigitBanglaFromEnglish(data?.totalVoter),
    voterTypeForDownload: voterTypeLabel(data?.voterType),
    formattedCreatedAt: removeTimeInDate({ dateFormat: data?.createdAt }),
    zillaName: lang === LANGUAGE.BANGLA ? data?.zillaNameBn : data?.zillaNameEn,
    upazilaName:
      lang === LANGUAGE.BANGLA ? data?.upazilaNameBn : data?.upazilaNameEn,
    unionOrWardName:
      lang === LANGUAGE.BANGLA
        ? data?.unionOrWardNameBn
        : data?.unionOrWardNameEn,
    unionWardName:
      lang === LANGUAGE.BANGLA ? data?.unionWardNameBn : data?.unionWardNameEn,
    voterAreaName:
      lang === LANGUAGE.BANGLA ? data?.voterAreaNameBn : data?.voterAreaNameEn,
    pollingInstituteNameAndDesc:
      lang === LANGUAGE.BANGLA
        ? `${data?.nameBn}, ${data?.descriptionBn}`
        : `${data?.nameEn}, ${data?.descriptionEn}`,
    className: !data.isActive ? 'bg-danger-lighter' : '',
  };
}

export const useGetPollingCenterListForARO = () => {
  const [pollingCenterList, setPollingCenterList] = useState<
    PollingCenterType[]
  >([]);

  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [countSerial, setCountSerial] = useState(0);

  const getPollingCenterList = async ({
    page = 0,
    size = 10,
    electionSettingsIds,
    electionTypeId,
    electionScheduleId,
    unionOrWardId,
    unionWardId,
    zillaId,
    isActive,
  }: PollingCenterListParamsForARO) => {
    try {
      setLoading(true);
      const response = await fetchPollingCenterListForARO({
        page,
        size,
        electionSettingsIds,
        electionTypeId,
        electionScheduleId,
        unionOrWardId,
        unionWardId,
        zillaId,
        isActive,
      });
      if (response?.data?.status === 200) {
        const pollingCenterResultsResponse =
          response?.data?.data?.pollingCenters;
        const __response: any = pollingCenterResultsResponse?.map(
          (item: any, index: number) => {
            return mapPollingCenterList(item, index, language);
          },
        );
        setPollingCenterList(__response);
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
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    activePage,
    totalPage,
    countSerial,
    loading,
    pollingCenterList,
    getPollingCenterList,
  };
};
