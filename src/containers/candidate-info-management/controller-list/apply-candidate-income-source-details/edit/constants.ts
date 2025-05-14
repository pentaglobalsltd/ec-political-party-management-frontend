import {
  ExpenseType,
  ExpenseValuesType,
} from '@type/candidate-info-management/operator-view/income-source-details/income-source-details-second-part';
import { OTHER_EXPENSE } from '@validations/candidate-info-management/operator/income-source-details/incomeSourceDetailsSecondPartValidation';
import {
  EARNING_FROM_OWN_INCOME,
  EARNING_FROM_RELATIVES,
  EARNING_FROM_DONATION_BY_RELATIVES,
  EARNING_FROM_OTHERS,
  EARNING_FROM_DONATION_BY_OTHERS,
  EARNING_FROM_MISCELLANEOUS,
} from '@validations/candidate-info-management/operator/income-source-details/incomeSourceDetailsValidation';
import { TFunction } from 'i18next';

export const ownEarningDefaultValues = {
  [EARNING_FROM_OWN_INCOME.POTENTIAL_AMOUNT]: '',
  [EARNING_FROM_OWN_INCOME.EARNING_SOURCE]: '',
};

export const earningFromRelativeDefaultValues = {
  [EARNING_FROM_RELATIVES.POTENTIAL_AMOUNT]: '',
  [EARNING_FROM_RELATIVES.RELATIVE_NAME]: '',
  [EARNING_FROM_RELATIVES.RELATIVE_ADDRESS]: '',
  [EARNING_FROM_RELATIVES.RELATION]: '',
  [EARNING_FROM_RELATIVES.RELATIVE_INCOME_SOURCE]: '',
};

export const donationByRelativeDefaultValues = {
  [EARNING_FROM_DONATION_BY_RELATIVES.POTENTIAL_AMOUNT]: '',
  [EARNING_FROM_DONATION_BY_RELATIVES.RELATIVE_NAME]: '',
  [EARNING_FROM_DONATION_BY_RELATIVES.RELATIVE_ADDRESS]: '',
  [EARNING_FROM_DONATION_BY_RELATIVES.RELATION]: '',
  [EARNING_FROM_DONATION_BY_RELATIVES.RELATIVE_INCOME_SOURCE]: '',
};

export const earningFromOthersDefaultValues = {
  [EARNING_FROM_OTHERS.POTENTIAL_AMOUNT]: '',
  [EARNING_FROM_OTHERS.PERSON_NAME]: '',
  [EARNING_FROM_OTHERS.PERSON_ADDRESS]: '',
};

export const donationByOthersDefaultValues = {
  [EARNING_FROM_DONATION_BY_OTHERS.POTENTIAL_AMOUNT]: '',
  [EARNING_FROM_DONATION_BY_OTHERS.PERSON_NAME]: '',
  [EARNING_FROM_DONATION_BY_OTHERS.PERSON_ADDRESS]: '',
};

export const earningFromMiscellaneousDefaultValues = {
  [EARNING_FROM_MISCELLANEOUS.POTENTIAL_AMOUNT]: '',
  [EARNING_FROM_MISCELLANEOUS.PERSON_OR_INSTITUTE_NAME]: '',
  [EARNING_FROM_MISCELLANEOUS.PERSON_OR_INSTITUTE_ADDRESS]: '',
  [EARNING_FROM_MISCELLANEOUS.PERSON_OR_INSTITUTE_INCOME_SOURCE]: '',
};

export enum FundingType {
  LOAN = 'LOAN',
  DONATION = 'DONATION',
  OTHER = 'OTHER',
}

export const FUNDING_SOURCES = {
  SELF: 'selfFundings',
  RELATIVE_LOAN: 'earningFromRelative',
  RELATIVE_DONATION: 'donationByRelative',
  OTHER_LOAN: 'earningFromOthers',
  OTHER_DONATION: 'donationByOthers',
  OTHER: 'miscellaneous',
};

export const progressStepsItems = (t: TFunction<'translation', undefined>) => {
  return [
    {
      title: t('FIRST_PART.PROGRESS_STEPS_FIRST_PART'),
    },
    {
      title: t('FIRST_PART.PROGRESS_STEPS_SECOND_PART'),
    },
  ];
};

export const assetsOtherExpenseDefaultValues = {
  [OTHER_EXPENSE.SECTOR_NAME]: '',
  [OTHER_EXPENSE.AMOUNT_OF_COST]: '',
  [OTHER_EXPENSE.TOTAL_POSSIBLE_COST]: '',
};

function cleanArray(arr: ExpenseValuesType[], size: number) {
  for (let i = arr.length - 1; i >= 2; i--) {
    const currentOrder = arr[i].order;

    if (currentOrder && currentOrder > size && currentOrder % size === 0) {
      const indexCurrent = i;
      const indexPrev1 = arr.findIndex((obj) => obj.order === currentOrder - 1);
      const indexPrev2 = arr.findIndex((obj) => obj.order === currentOrder - 2);

      if (
        indexPrev1 !== -1 &&
        indexPrev2 !== -1 &&
        !arr[indexCurrent].value &&
        !arr[indexPrev1].value &&
        !arr[indexPrev2].value
      ) {
        arr.splice(indexPrev2, size);

        i = Math.min(indexPrev2, indexPrev1, indexCurrent) - 1;
      }
    }
  }

  return arr;
}

export const updateSubmitData = (
  submittedData: any,
  apiData?: ExpenseType[],
) => {
  const updatedData = apiData?.map((item: ExpenseType) => {
    if (item.key && [item.key]) {
      let modifiedValues: any = [];

      modifiedValues = item?.values?.map((valueItem: ExpenseValuesType) => {
        const keyWithOrder = `${valueItem.key}${valueItem.order}`;
        if (item.key) {
          valueItem.value = submittedData[item.key][keyWithOrder];
        }
        return valueItem;
      });

      //only for multiple values
      if (item?.values && item?.multiple && item.size) {
        const uniqueElements = item?.values?.slice(-item?.size);
        const extractOrderNumber = (key: any) => {
          const match = key.match(/\d+$/);
          return parseInt(match[0], 10);
        };
        const maxOrder = Math.max(
          ...item.values?.map((item: any) => item.order),
        );

        const finalData =
          Object.entries(submittedData[item.key])
            ?.filter(([key, value]) => {
              return extractOrderNumber(key) > maxOrder;
            })
            .map(([key, value]) => {
              const baseKey = key.replace(/\d+$/, '');

              const matchingItem = uniqueElements.find(
                (item: any) => item.key === baseKey,
              );
              const order = extractOrderNumber(key);

              return {
                key: baseKey,
                label: matchingItem ? matchingItem.label : '',
                value: value,
                order: order,
              };
            }) || [];

        //removing undefined objects
        const cleanData = cleanArray(
          modifiedValues.concat(finalData),
          item.size,
        );

        item.values = cleanData;
      } else {
        item.values = modifiedValues;
      }
    }

    return item;
  });
  return updatedData;
};
