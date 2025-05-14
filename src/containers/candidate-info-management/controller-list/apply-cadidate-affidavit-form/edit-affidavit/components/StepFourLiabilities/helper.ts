import { ELECTION_INFO } from '@constants/election-info';
import { LiabilitiesType } from '@type/candidate-info-management/operator-view/affidavit-form/liabilities';
import { removeObjectsWithIdxAndDeleteId } from '@helpers/removeObjectsWithIdxAndDeleted';

export const electionSpecificSubmitData = ({
  postData,
  electionTypeId,
  liabilityLoanOath,
}: {
  postData: any;
  electionTypeId: number;
  liabilityLoanOath: LiabilitiesType;
}) => {
  switch (electionTypeId) {
    case ELECTION_INFO.NATIONAL.ID:
      if (
        postData?.notElectedBefore ||
        postData?.commitmentAchievements.length > 0
      )
        return mappedAffidavitStepFourSubmitData({
          postData,
          liabilityLoanOath,
        });
      return;

    case ELECTION_INFO.CITY_CORPORATION.ID:
      return mappedAffidavitStepFourSubmitData({ postData, liabilityLoanOath });

    case ELECTION_INFO.UPAZILLA.ID:
      return mappedAffidavitStepFourSubmitData({ postData, liabilityLoanOath });

    case ELECTION_INFO.MUNICIPALITY.ID:
      return mappedAffidavitStepFourSubmitData({ postData, liabilityLoanOath });

    case ELECTION_INFO.UNION_PARISHAD.ID:
      return mappedAffidavitStepFourSubmitData({ postData, liabilityLoanOath });

    default:
      return;
  }
};

export const mappedAffidavitStepFourSubmitData = ({
  postData,
  liabilityLoanOath,
}: {
  postData: any;
  liabilityLoanOath: LiabilitiesType;
}) => {
  const data: LiabilitiesType = {};
  if (postData.liabilities) {
    const mappedLiabilities = removeObjectsWithIdxAndDeleteId(
      postData.liabilities,
    );

    data.liabilities = mappedLiabilities;
  }

  if (postData.notElectedBefore === true) {
    data.commitmentAchievements = [];
  } else if (
    postData.notElectedBefore === false &&
    postData.commitmentAchievements
  ) {
    data.commitmentAchievements = removeObjectsWithIdxAndDeleteId(
      postData.commitmentAchievements,
    );
  }

  const mappedLoans = liabilityLoanOath.loans?.map((item: any) => ({
    serialNo: item.serialNo as number,
    loanType: item.loanType as string,
    FinancialInstitutionName: postData?.loans?.[
      `FinancialInstitutionName${item.serialNo}`
    ] as string,
    DefaultedLoanAmount:
      postData?.loans?.[`DefaultedLoanAmount${item.serialNo}`],
    LoanAmount: postData?.loans?.[`LoanAmount${item.serialNo}`],
    RescheduledLoanDate:
      postData?.loans?.[`RescheduledLoanDate${item.serialNo}`],
  }));

  data.notElectedBefore = postData.notElectedBefore;

  data.notReceivedLoans = postData.notReceivedLoans;

  if (postData.notReceivedLoans === true) {
    data.loans = [];
  } else {
    data.loans = mappedLoans;
  }

  if (postData.oath) {
    data.oath = postData.oath;
  }

  return data;
};
