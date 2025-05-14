import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { getDigitBanglaFromEnglish } from '@utils';
import { apiGetElectionSettingsAggregated } from '@api/election-schedule-management/election/election-settings/election-settings';
import {
  ElectionSettingsSearchProps,
  ElectionSettingsAggregatedType,
} from '@type/election-declaration-management/election/election-settings/election-settings-types';

interface ElectionSettingsHookProps {
  searchItems: ElectionSettingsSearchProps;
  page?: number;
  size?: number;
}

interface HookReturnType {
  getElectionSettingsData: ({
    searchItems,
    page,
    size,
  }: ElectionSettingsHookProps) => void;
  electionSettingsList: ElectionSettingsAggregatedType[];
  loading: boolean;
  activePage: number;
  totalPage: number;
  totalSettings: number;
}

export const mapElectionSettings = (
  data: ElectionSettingsAggregatedType,
  lang: string | null,
) => {
  return {
    ...data,

    // 1
    electionSchedule:
      lang === LANGUAGE.BANGLA
        ? data?.electionScheduleNameBn
        : data?.electionScheduleNameEn,

    // 2
    candidateType:
      lang === LANGUAGE.BANGLA
        ? data?.candidateTypeNameBn
        : data?.candidateTypeNameEn,

    // 3
    zilla: lang === LANGUAGE.BANGLA ? data?.zillaNameBn : data?.zillaNameEn,

    // 4
    upazila:
      lang === LANGUAGE.BANGLA ? data?.upazilaNameBn : data?.upazilaNameEn,

    // 5
    // constituencyCode: data?.constituencyCode, // bangla & english hobe
    constituencyCode:
      lang === LANGUAGE.BANGLA
        ? getDigitBanglaFromEnglish(data?.constituencyCode?.toString())
        : data?.constituencyCode,

    // 6
    constituency:
      lang === LANGUAGE.BANGLA
        ? data?.constituencyNameBn
        : data?.constituencyNameEn,

    // 7
    municipalityName:
      lang === LANGUAGE.BANGLA
        ? data?.municipalityNameBn
        : data?.municipalityNameEn,

    // 8
    unionWard:
      lang === LANGUAGE.BANGLA ? data?.unionWardNameBn : data?.unionWardNameEn,

    // 9 -> isResultFromTab

    // 10 -> votingType
    electionByEvm: data?.votingType === 'ই.ভি.এম' ? true : false,

    isResultFromTabForDownload: data?.isResultFromTab ? 'হ্যাঁ' : 'না',
    isActiveForDownload: data?.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়',

    votingType: data?.votingType === 'BALLOT' ? 'ব্যালট' : 'ই.ভি.এম',

    // 11
    unionOrWard:
      lang === LANGUAGE.BANGLA
        ? data?.unionOrWardNameBn
        : data?.unionOrWardNameEn,

    // 12 -> dateOfNominationSubmission

    // 13 -> scheduleFile

    electionAreaReorganized:
      lang === LANGUAGE.BANGLA
        ? data?.electionAreaReorganizedBn
        : data?.electionAreaReorganizedEn,
  };
};

const useGetElectionSettingsAggregated = (): HookReturnType => {
  const { language } = useLanguage();

  const [electionSettingsList, setElectionSettingsList] = useState<
    ElectionSettingsAggregatedType[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalSettings, setTotalSettings] = useState(0);

  const getElectionSettingsData = async ({
    page = 0,
    searchItems,
    size = 10,
  }: ElectionSettingsHookProps) => {
    try {
      setLoading(true);

      const response = await apiGetElectionSettingsAggregated({
        searchItems,
        page,
        size,
      });
      const dataArray: any[] = response.data?.data?.electionSettings.map(
        (item: any) => mapElectionSettings(item, language),
      );

      if (response?.data?.status === 200) {
        setElectionSettingsList(dataArray);

        setActivePage(
          (response?.data?.data?.page && response?.data?.data?.page + 1) || 1,
        );
        if (response?.data?.data?.total) {
          setTotalPage(Math.ceil(response?.data?.data?.total / size));
        }
        setTotalSettings(response?.data?.data?.total);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    getElectionSettingsData,
    electionSettingsList,
    loading,
    activePage,
    totalPage,
    totalSettings,
  };
};

export default useGetElectionSettingsAggregated;
