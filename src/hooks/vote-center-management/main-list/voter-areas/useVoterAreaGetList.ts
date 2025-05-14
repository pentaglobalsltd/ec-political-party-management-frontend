import { useState } from 'react';
import dayjs from 'dayjs';

import { fetchGetVoterArea } from '@api/vote-center-management/main-list/voter-area/get-voter-area-list';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { VoterAreaSearchProps } from '@type/search-types';
import { VoterAreaType } from '@type/vote-center-management/voter-area-type';
import { getDigitBanglaFromEnglish } from '@utils';

export interface ElectionDetailsListProps {
  searchItems: VoterAreaSearchProps;
  size?: number;
  page?: number;
}

interface Props {
  getVoterAreaListData: ({
    searchItems,
    size,
    page,
  }: ElectionDetailsListProps) => void;
  voterAreaList: VoterAreaType[];
  loading: boolean;
  activePage: number;
  totalPage: number;
  countSerial: number;
}

function mapVoterArea({
  data,
  lang,
  index,
  page = 0,
}: {
  data: VoterAreaType;
  lang: string | null;
  index: number;
  page?: number;
}) {
  return {
    ...data,
    idx: getDigitBanglaFromEnglish((index + 1 + page * 10).toString()),
    id: data?.id,
    zillaName:
      lang === LANGUAGE.BANGLA ? data?.zilla?.nameBn : data?.zilla?.nameEn,
    upazillaName:
      lang === LANGUAGE.BANGLA ? data?.upazila?.nameBn : data?.upazila?.nameEn,
    municipalityName:
      lang === LANGUAGE.BANGLA
        ? data?.municipality?.nameBn
        : data?.municipality?.nameEn,
    unionOrWardName:
      lang === LANGUAGE.BANGLA
        ? data?.unionOrWard?.nameBn
        : data?.unionOrWard?.nameEn,
    unionWardId: data?.unionWard?.id,
    unionWardName:
      lang === LANGUAGE.BANGLA
        ? data?.unionWard?.nameBn
        : data?.unionWard?.nameEn,
    areaCode: getDigitBanglaFromEnglish(data?.areaCode),
    maleVoter: getDigitBanglaFromEnglish(data?.maleVoter),
    femaleVoter: getDigitBanglaFromEnglish(data?.femaleVoter),
    thirdGenderVoter: getDigitBanglaFromEnglish(data?.thirdGenderVoter),
    updatedAt: getDigitBanglaFromEnglish(
      dayjs(data?.updatedAt).format('YYYY-MM-DD HH:mm'),
    ),
  };
}
export const useVoterAreaGetList = (): Props => {
  const [voterAreaList, setVoterAreaList] = useState<VoterAreaType[]>([]);
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [countSerial, setCountSerial] = useState(0);

  const getVoterAreaListData = async ({
    searchItems,
    size = 10,
    page = 0,
  }: ElectionDetailsListProps) => {
    try {
      setLoading(true);
      const response = await fetchGetVoterArea(searchItems, page, size);
      if (response?.data?.status === 200) {
        const data = response?.data?.data?.voterAreas?.map((item, index) => {
          return mapVoterArea({
            data: item,
            lang: language,
            index,
            page: response?.data?.data?.page,
          });
        });
        setVoterAreaList(data as VoterAreaType[]);

        setActivePage(
          (response?.data?.data?.page && response?.data?.data?.page + 1) || 1,
        );
        if (response?.data?.data?.total) {
          setTotalPage(Math.ceil(response?.data?.data?.total / size));
        }
        if (
          response?.data?.data.size &&
          (response?.data?.data?.page as number) >= 0
        )
          setCountSerial(
            (response?.data?.data?.page as number) * response?.data?.data.size,
          );
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    getVoterAreaListData,
    voterAreaList,
    loading,
    activePage,
    totalPage,
    countSerial,
  };
};
