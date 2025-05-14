import FormInput from '@components/inputs/FormInput';
import { FORM_FIELDS } from '@constants/forms';

const NOMINATED_CANDIDATE =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_CONFIRMATION
    .NOMINATION.NOMINATED_CANDIDATE;

const NationalElection = () => {
  return (
    <>
      <FormInput
        title="CANDIDATE_CONFIRMATION.POLITICAL_GROUP"
        registerName={`candidatePoliticalInfo.${NOMINATED_CANDIDATE.POLITICAL_PARTY_NAME}`}
        disabled
      />
    </>
  );
};

export default NationalElection;
