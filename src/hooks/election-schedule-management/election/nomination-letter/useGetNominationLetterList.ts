import { fetchNominationLetterList } from '@api/election-schedule-management/election/nomination-letter/get-nomination-letter';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import {
  NominationLetterListParams,
  NominationLetterType,
} from '@type/election-declaration-management/election/nomination-letter/nomination-letter';
import { useState } from 'react';

function mapNominationLetterList(data: any, lang: string | null) {
  return {
    ...data,
    candidateTypeName:
      lang === LANGUAGE.BANGLA
        ? data?.candidateType?.candidateTypeNameBn
        : data?.candidateType?.candidateTypeNameEn,
    electionTypeName:
      lang === LANGUAGE.BANGLA
        ? data?.electionType?.electionTypeNameBn
        : data?.electionType?.electionTypeNameEn,
  };
}

export const useGetNominationLetterList = () => {
  const [nominationLetterList, setNominationLetterList] = useState<
    NominationLetterType[]
  >([]);

  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const getNominationLetterList = async ({
    page = 0,
    size = 10,
    electionTypeId,
    candidateTypeId,
  }: NominationLetterListParams) => {
    try {
      setLoading(true);
      const response = await fetchNominationLetterList({
        page,
        size,
        electionTypeId,
        candidateTypeId,
      });
      if (response?.data?.status === 200) {
        const nominationLetterListResponse =
          response?.data?.data?.nominationForms;
        const __response: any = nominationLetterListResponse?.map(
          (item: any) => {
            return mapNominationLetterList(item, language);
          },
        );
        setNominationLetterList(__response);
        setActivePage(
          (response?.data?.data?.page && response?.data?.data?.page + 1) || 1,
        );
        if (response?.data?.data?.total) {
          setTotalPage(Math.ceil(response?.data?.data?.total / size));
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    activePage,
    totalPage,
    loading,
    nominationLetterList,
    getNominationLetterList,
  };
};
