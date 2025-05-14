import { useState } from 'react';
import { fetchSymbol } from '@api/center-officer-management/controller-list/symbol/symbol';

export const useGetSymbol = () => {
  const [symbol, setSymbol] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const getSymbol = async (id: string | number) => {
    let modifiedSymbol = {} as any;
    try {
      setLoading(true);
      const response = await fetchSymbol(id);
      if (response?.data?.status === 200) {
        const data = response?.data?.data || {};
        if (Object.keys(data).length !== 0) {
          modifiedSymbol = {
            ...data,
            candidateTypeIds: data.candidateTypes.map((item: any) => item.id),
          };
        }

        setSymbol(modifiedSymbol);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return {
    loading,
    symbol,
    getSymbol,
  };
};
