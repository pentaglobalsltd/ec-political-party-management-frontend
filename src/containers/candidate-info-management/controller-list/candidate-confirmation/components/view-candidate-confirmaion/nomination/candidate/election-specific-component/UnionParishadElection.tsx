import FormInput from '@components/inputs/FormInput';

import { FORM_FIELDS } from '@constants/forms';
import { CANDIDATE_INFO } from '@constants/candidate-info';
import { INDEPENDENT_PARTY_ID } from '@constants/political-party-info';

const NOMINATED_CANDIDATE =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_CONFIRMATION
    .NOMINATION.NOMINATED_CANDIDATE;

interface Props {
  candidateTypeId?: number | string;
  politicalPartyId?: number | string;
}

const UnionParishadElection = ({
  candidateTypeId,
  politicalPartyId,
}: Props) => {
  const isChairman =
    Number(candidateTypeId) === CANDIDATE_INFO.UNION_PARISHAD_CHAIRMAN.ID;

  const isIndependentCandidate = politicalPartyId === INDEPENDENT_PARTY_ID;

  return (
    <>
      {/* only visible for chairman */}
      {isChairman ? (
        <FormInput
          title="CANDIDATE_CONFIRMATION.POLITICAL_GROUP"
          registerName={`candidatePoliticalInfo.${NOMINATED_CANDIDATE.POLITICAL_PARTY_NAME}`}
          disabled
        />
      ) : null}

      {/* only visible for chairman -> only if স্বতন্ত্র party is not selected */}
      {isChairman && !isIndependentCandidate ? (
        <FormInput
          title="CANDIDATE_CONFIRMATION.POLITICAL_GROUP_SYMBOL_PREVIEW"
          registerName={`candidatePoliticalInfo.${NOMINATED_CANDIDATE.POLITICAL_PARTY_SYMBOL_NAME}`}
          disabled
        />
      ) : null}

      {/* only visible for chairman -> only if স্বতন্ত্র party */}
      {isChairman && isIndependentCandidate ? (
        <FormInput
          title="CANDIDATE_CONFIRMATION.PREFERRED_SYMBOL_PREVIEW"
          registerName={`candidatePoliticalInfo.${NOMINATED_CANDIDATE.PREFERRED_SYMBOL_NAME}`}
          disabled
        />
      ) : null}
    </>
  );
};

export default UnionParishadElection;
