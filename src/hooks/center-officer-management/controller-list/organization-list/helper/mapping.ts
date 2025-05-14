import { LANGUAGE } from '@hooks/miscellaneous/custom-hook/useLanguage';
import { GetAgencyProps } from '@type/center-officer-management/organization-list';
import { getDigitBanglaFromEnglish } from '@utils';

interface MapAgencyListProps {
  index: number;
  data: GetAgencyProps;
  lang: string | null;
  page: number;
}

export const mapAgencyList = ({
  index,
  data,
  lang,
  page,
}: MapAgencyListProps) => {
  return {
    ...data,
    serial: getDigitBanglaFromEnglish(page * 10 + index + 1),

    agencyTypeName:
      lang === LANGUAGE.BANGLA
        ? data?.agencyType?.nameBn
        : data?.agencyType?.nameEn,
    address: lang === LANGUAGE.BANGLA ? data?.addressBn : data?.addressEn,
  };
};
