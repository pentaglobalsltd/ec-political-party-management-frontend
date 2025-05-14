import CommitmentAchievement from '../../components/CommitmentAchievement';
import Liabilities from '../../components/Liabilities';
import Loan from '../../components/Loan';
import Oath from '../../components/Oath';

import { GenericAffidavitFourthPartProps } from '../GenericAffidavitFourthPartProps';

const NationalElection = ({
  openLiabilityEditModal,
  handleButtonDisable,
  openCommitmentAchievementEditModal,
  submitData,
  loans,
}: GenericAffidavitFourthPartProps) => {
  return (
    <>
      <Liabilities
        openLiabilityEditModal={openLiabilityEditModal}
        parentHandleButtonDisabled={handleButtonDisable}
      />

      <CommitmentAchievement
        openCommitmentAchievementEditModal={openCommitmentAchievementEditModal}
        submitData={submitData}
      />

      <Loan loans={loans} />

      <Oath />
    </>
  );
};

export default NationalElection;
