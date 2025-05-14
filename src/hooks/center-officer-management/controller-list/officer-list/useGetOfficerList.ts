import { useState } from 'react';
import { fetchOfficerList } from '@api/center-officer-management/controller-list/officer-list/officer-list';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { getDigitBanglaFromEnglish } from '@utils';
export interface PollingPersonnelSearchProps {
  zillaId?: string | number;
  upazilaId?: string | number;
  rmoEn?: string | number;
  municipalityId?: string | number;
  unionOrWardId?: string | number;
  agencyId?: string | number;
  nameNidPhoneParameter?: string;
}
interface Props {
  page?: number;
  size?: number;
  searchItems: PollingPersonnelSearchProps;
}

const mapOfficerList = (
  data: any,
  language: string | null,
  countSerial: number,
) =>
  data?.map((item: any, index: number) => ({
    ...item,
    serial: getDigitBanglaFromEnglish(countSerial + index + 1),
    agencyName:
      language === LANGUAGE.BANGLA
        ? item?.agency?.nameBn
        : item?.agency?.nameEn,
    agencyUpazilaName: item?.agency?.upazilaNameBn,
    designation: item?.designation ? item?.designation : ' ',
    phone: item?.phone ? item?.phone : ' ',
    basicSalaryBn: getDigitBanglaFromEnglish(item?.basicSalary),
  }));

export const useGetOfficerList = () => {
  const { language } = useLanguage();
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const getOfficers = async ({ page = 0, size = 10, searchItems }: Props) => {
    setLoading(true);

    try {
      const response = await fetchOfficerList({
        searchItems,
        page,
        size,
      });
      if (response?.data?.status === 200) {
        const countSerial =
          (response?.data?.data?.page as number) * response?.data?.data?.size ||
          0;
        const dataArray = mapOfficerList(
          response?.data?.data?.pollingPersonnels,
          language,
          countSerial,
        );

        setOfficers(dataArray);

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
    officers,
    getOfficers,
    loading,
    activePage,
    totalPage,
  };
};
