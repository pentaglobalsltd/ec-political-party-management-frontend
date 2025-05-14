import FormInput from '@components/inputs/FormInput';

import { FORM_FIELDS } from '@constants/forms';
import { CANDIDATE_INFO } from '@constants/candidate-info';
import { INDEPENDENT_PARTY_ID } from '@constants/political-party-info';

const CANDIDATE_MANAGEMENT =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_MANAGEMENT
    .CANDIDATE_NOMINATION_DASHBOARD_FORM.NOMINATED_CANDIDATE;

interface Props {
  electionTypeKey?: string;
  candidateTypeId?: number | string;
  politicalPartyId?: number | string;
}

const MunicipalityElection = ({ candidateTypeId, politicalPartyId }: Props) => {
  const isMayor =
    Number(candidateTypeId) === CANDIDATE_INFO.MUNICIPALITY_MAYOR.ID;
  const isCouncillor =
    Number(candidateTypeId) === CANDIDATE_INFO.MUNICIPALITY_COUNCILLOR.ID;
  const isReservedCouncillor =
    Number(candidateTypeId) ===
    CANDIDATE_INFO.MUNICIPALITY_RESERVED_COUNCILLOR.ID;

  return (
    <>
      {/* only visible for Mayor user type */}
      {isMayor ? (
        <FormInput
          title="CANDIDATE_MANAGEMENT.POLITICAL_GROUP"
          registerName={`candidatePoliticalInfo.${CANDIDATE_MANAGEMENT.POLITICAL_PARTY_NAME}`}
          disabled
        />
      ) : null}

      {/* only visible for Mayor Candidate -> only if স্বতন্ত্র party is not selected */}
      {isMayor && politicalPartyId !== INDEPENDENT_PARTY_ID ? (
        <FormInput
          title="CANDIDATE_MANAGEMENT.POLITICAL_GROUP_SYMBOL_PREVIEW"
          registerName={`candidatePoliticalInfo.${CANDIDATE_MANAGEMENT.POLITICAL_PARTY_SYMBOL_NAME}`}
          disabled
        />
      ) : null}

      {/* only visible for
            - Mayor only if স্বতন্ত্র party
            - all Councillor & Reserved Councillor */}
      {(isMayor && politicalPartyId === INDEPENDENT_PARTY_ID) ||
      isCouncillor ||
      isReservedCouncillor ? (
        <FormInput
          title="CANDIDATE_MANAGEMENT.PREFERRED_SYMBOL_PREVIEW"
          registerName={`candidatePoliticalInfo.${CANDIDATE_MANAGEMENT.PREFERRED_SYMBOL_NAME}`}
          disabled
        />
      ) : null}
    </>
  );
};

export default MunicipalityElection;
