import { useState } from 'react';
import { getMunicipalities } from '@api/miscellaneous/master-api/municipality/municipalities-master-auth';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
interface Props {
  zillaId?: string | number;
  regionId?: string | number;
  rmoEn?: string;
}
export const useMunicipalities = () => {
  const [municipalities, setMunicipalities] = useState([]);
  const { language } = useLanguage();

  const getMunicipalitiesData = async ({ zillaId, regionId, rmoEn }: Props) => {
    getMunicipalities({ zillaId, regionId, rmoEn }).then((response) => {
      if (response?.data?.status === 200) {
        const dataArray = response.data?.data?.municipalities?.map(
          (item: { nameBn: string; nameEn: string; id: string }) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.id,
          }),
        );
        setMunicipalities(dataArray);
      }
    });
  };

  return {
    municipalities,
    getMunicipalitiesData,
  };
};
