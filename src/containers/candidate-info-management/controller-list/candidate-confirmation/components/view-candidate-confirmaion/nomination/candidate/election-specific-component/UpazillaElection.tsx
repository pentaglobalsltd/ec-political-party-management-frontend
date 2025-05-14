import FormInput from '@components/inputs/FormInput';
import { FORM_FIELDS } from '@constants/forms';

const NOMINATED_CANDIDATE =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_CONFIRMATION
    .NOMINATION.NOMINATED_CANDIDATE;

const UpazillaElection = () => {
  return (
    <>
      <FormInput
        title="CANDIDATE_CONFIRMATION.POLITICAL_GROUP"
        registerName={`candidatePoliticalInfo.${NOMINATED_CANDIDATE.POLITICAL_PARTY_NAME}`}
        disabled
      />

      <FormInput
        title="CANDIDATE_CONFIRMATION.POLITICAL_GROUP_SYMBOL_PREVIEW"
        registerName={`candidatePoliticalInfo.${NOMINATED_CANDIDATE.POLITICAL_PARTY_SYMBOL_NAME}`}
        disabled
      />
      <FormInput
        title="CANDIDATE_CONFIRMATION.PREFERRED_SYMBOL_PREVIEW"
        registerName={`candidatePoliticalInfo.${NOMINATED_CANDIDATE.PREFERRED_SYMBOL_NAME}`}
        disabled
      />
    </>
  );
};

export default UpazillaElection;
