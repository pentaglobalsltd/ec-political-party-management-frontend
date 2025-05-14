import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { fetchPayScales } from '@api/center-officer-management/controller-list/officer-list/pay-scales';

const useGetPayScales = () => {
  const { language } = useLanguage();
  const [payScales, setPayScales] = useState([]);

  const getPayScales = async () => {
    try {
      const response = await fetchPayScales();
      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.payScales?.map((item: any) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.id,
          })) || [];
        setPayScales(dataArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    payScales,
    getPayScales,
  };
};

export default useGetPayScales;
