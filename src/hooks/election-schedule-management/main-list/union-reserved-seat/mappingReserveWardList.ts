import { LANGUAGE } from '@hooks/miscellaneous/custom-hook/useLanguage';
import { GetUnionReservedSeat } from '@type/election-declaration-management/main-list/union-reserved-seat/get-union-reserved-seat-types';
import { getDigitBanglaFromEnglish } from '@utils';

interface Props {
  data: GetUnionReservedSeat[];
  language: string | null;
}

export const mappingReserveWardList = ({ data, language }: Props) => {
  const newData = data?.map((reserveWard) => {
    return {
      ...reserveWard,
      reservedSeatNumber:
        language === LANGUAGE.BANGLA
          ? getDigitBanglaFromEnglish(reserveWard.code)
          : reserveWard?.code,

      unionWardsName: reserveWard?.unionWards
        ?.map((item) =>
          language === LANGUAGE.BANGLA ? item?.nameBn : item?.nameEn,
        )
        .join(', '),
    };
  });

  return newData;
};
