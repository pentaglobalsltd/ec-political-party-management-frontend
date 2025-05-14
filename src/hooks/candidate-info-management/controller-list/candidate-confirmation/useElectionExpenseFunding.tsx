import { useEffect, useState } from 'react';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import { getElectionExpensesFunding } from '@api/candidate-info-management/candidate-confirmation/election-expenses-funding';
import {
  OtherFundingType,
  RelativeFundingType,
  SelfFundingType,
} from '@type/candidate-info-management/candidate-confirmation/election-expenses-funding-types';

interface FundingTableType {
  selfFundingTableRows: SelfFundingType[];
  relativeLoanTableRows: RelativeFundingType[];
  relativeDonationTableRows: RelativeFundingType[];
  otherLoanTableRows: OtherFundingType[];
  otherDonationTableRows: OtherFundingType[];
  otherFundingTableRows: OtherFundingType[];
}

interface HookReturnType {
  electionExpense: FundingTableType | undefined;
}

const LOAN_TYPE = 'LOAN';
const DONATION_TYPE = 'DONATION';

export const useElectionExpenseFunding = ({
  electionSettingsId,
  candidateElectionDetailsId,
}: UrlIdTypes): HookReturnType => {
  const [electionExpense, setElectionExpense] = useState<FundingTableType>();

  useEffect(() => {
    if (electionSettingsId && candidateElectionDetailsId) {
      getElectionExpensesFunding({
        electionSettingsId,
        candidateElectionDetailsId,
      }).then((response) => {
        const resData = response?.data?.data;

        if (response?.data?.status === 200) {
          const selfFundingTableRows = resData?.selfFundings.map(
            (item, index) => ({
              ...item,
              idx: index + 1,
            }),
          );

          const relativeLoan = resData?.relativeFundings
            .filter((item) => item.relativeFundingType === LOAN_TYPE)
            .map((item, index) => ({ ...item, idx: index + 1 }));

          const relativeDonation = resData?.relativeFundings
            .filter((item) => item.relativeFundingType === DONATION_TYPE)
            .map((item, index) => ({ ...item, idx: index + 1 }));

          const otherLoan = resData?.otherFundings
            .filter((item) => item.otherFundingType === LOAN_TYPE)
            .map((item, index) => ({ ...item, idx: index + 1 }));

          const otherDonation = resData?.otherFundings
            .filter((item) => item.otherFundingType === DONATION_TYPE)
            .map((item, index) => ({ ...item, idx: index + 1 }));

          const otherFunding = resData?.otherFundings
            .filter(
              (item) =>
                item.otherFundingType !== DONATION_TYPE &&
                item.otherFundingType !== LOAN_TYPE,
            )
            .map((item, index) => ({ ...item, idx: index + 1 }));

          setElectionExpense({
            selfFundingTableRows,
            relativeLoanTableRows: relativeLoan,
            relativeDonationTableRows: relativeDonation,
            otherLoanTableRows: otherLoan,
            otherDonationTableRows: otherDonation,
            otherFundingTableRows: otherFunding,
          });
        }
      });
    }
  }, [electionSettingsId, candidateElectionDetailsId]);

  return { electionExpense };
};
