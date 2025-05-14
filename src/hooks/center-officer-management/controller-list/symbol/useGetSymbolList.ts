import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { fetchSymbolList } from '@api/center-officer-management/controller-list/symbol/symbol';

interface Props {
  page?: number;
  size?: number;
  candidateTypeId?: number | string;
  nameBn?: string;
}

export const useGetSymbolList = () => {
  const { language } = useLanguage();
  const [symbolList, setSymbolList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const getSymbolList = async ({
    page = 0,
    size = 10,
    candidateTypeId,
    nameBn,
  }: Props) => {
    setLoading(true);
    let symbolsList = [] as any;
    try {
      const response = await fetchSymbolList({
        page,
        size,
        candidateTypeId,
        nameBn,
      });
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data?.symbols || [];
        dataArray?.forEach((item: any) => {
          const symbol =
            language === LANGUAGE.BANGLA ? item?.nameBn : item?.nameEn;
          const picture = item?.filePath;
          const modifiedCandidateTypes = item?.candidateTypes?.map(
            (item: any) => {
              return {
                ...item,
                candidateTypeName:
                  language === LANGUAGE.BANGLA ? item?.nameBn : item?.nameEn,
                electionTypeName:
                  language === LANGUAGE.BANGLA
                    ? item?.electionType?.nameBn
                    : item?.electionType?.nameEn,
              };
            },
          );
          const newSymbol = {
            ...item,
            symbol,
            picture,
            modifiedCandidateTypes,
          };
          symbolsList.push(newSymbol);
        });
        setSymbolList(symbolsList);

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
      setLoading(false);
    }
  };

  return {
    symbolList,
    getSymbolList,
    loading,
    activePage,
    totalPage,
  };
};
