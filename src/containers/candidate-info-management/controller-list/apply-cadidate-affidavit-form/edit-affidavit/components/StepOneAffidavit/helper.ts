import { postDataProps } from '.';
import AffidavitStepOneType from '@type/candidate-info-management/operator-view/affidavit-form/affidavit-step-one';
import { removeObjectsWithIdxAndDeleteId } from '@helpers/removeObjectsWithIdxAndDeleted';

export const mappedAffidavitStepOneSubmitData = ({
  postData,
  affidavitFormStepOne,
}: {
  postData: postDataProps;
  affidavitFormStepOne: AffidavitStepOneType;
}) => {
  const data: AffidavitStepOneType = {};

  if (postData.pastCases) {
    data.pastCases = removeObjectsWithIdxAndDeleteId(postData.pastCases);
  }
  if (postData.presentCases) {
    data.presentCases = removeObjectsWithIdxAndDeleteId(postData.presentCases);
  }

  const mappedIncomeSources = affidavitFormStepOne?.incomeSources?.map(
    (item: any) => ({
      id: item.id,
      serialNo: item.serialNo,
      label: item.label,
      selfIncome: postData?.incomeSourcePostData?.[
        `selfIncome_${item.serialNo}`
      ] as string,
      dependentIncome: postData?.incomeSourcePostData?.[
        `dependentIncome_${item.serialNo}`
      ] as string,
    }),
  );

  data.incomeSources = mappedIncomeSources;
  data.candidatePersonalInfo = postData.candidatePersonalInfo;

  return data;
};
