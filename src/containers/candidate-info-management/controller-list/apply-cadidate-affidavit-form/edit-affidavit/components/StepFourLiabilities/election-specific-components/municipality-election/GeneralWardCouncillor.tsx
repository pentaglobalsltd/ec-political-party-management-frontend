import Liabilities from '../../components/Liabilities';
import Loan from '../../components/Loan';
import Oath from '../../components/Oath';

import { GenericAffidavitFourthPartProps } from '../GenericAffidavitFourthPartProps';

const GeneralWardCouncillor = ({
  openLiabilityEditModal,
  handleButtonDisable,
  loans,
}: GenericAffidavitFourthPartProps) => {
  return (
    <>
      <Liabilities
        openLiabilityEditModal={openLiabilityEditModal}
        parentHandleButtonDisabled={handleButtonDisable}
      />

      <Loan loans={loans} />

      <Oath />
    </>
  );
};

export default GeneralWardCouncillor;
