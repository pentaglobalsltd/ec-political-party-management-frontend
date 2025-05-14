import { candidateNameMapping } from '@helpers/candidate-type';
import { CandidatePaymentStats } from '@type/candidate-info-management/candidate-nomination-payment-table-types';

import { getDigitBanglaFromEnglish } from '@utils';
import { mappingPaymentMethod } from './mappingPaymentMethod';

interface Props {
  data: CandidatePaymentStats[] | undefined;
}

export const mappingPaymentTable = ({ data }: Props) => {
  if (!data) return [];

  const result = data?.map((obj, indx) => {
    const allCandidateInfo = obj?.candidateTypeWiseCounts || [];

    let newObj = {};

    allCandidateInfo?.forEach((item, indx) => {
      newObj = {
        ...newObj,
        [candidateNameMapping(item?.candidateTypeId) as string]:
          getDigitBanglaFromEnglish(item?.count),
      };
    });

    const totalCounts = allCandidateInfo?.reduce((prev, curr) => {
      return prev + (curr?.count || 0);
    }, 0);

    return {
      ...obj,
      ...newObj,
      id: indx + 1,
      paymentMethod: mappingPaymentMethod(obj.paymentMethod),
      totalCounts: getDigitBanglaFromEnglish(totalCounts),
    };
  });

  return result;
};
