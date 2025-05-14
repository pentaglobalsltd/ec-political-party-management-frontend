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

const CityCorporationElection = ({
  candidateTypeId,
  politicalPartyId,
}: Props) => {
  return (
    <>
      {/* only visible for City Corporation Election -> Mayor user type */}
      {Number(candidateTypeId) === CANDIDATE_INFO.CITY_CORPORATION_MAYOR.ID ? (
        <FormInput
          title="CANDIDATE_CONFIRMATION.POLITICAL_GROUP"
          registerName={`candidatePoliticalInfo.${NOMINATED_CANDIDATE.POLITICAL_PARTY_NAME}`}
          disabled
        />
      ) : null}

      {/* only visible for City Corporation's Mayor Candidate -> only if স্বতন্ত্র party is not selected */}
      {Number(candidateTypeId) === CANDIDATE_INFO.CITY_CORPORATION_MAYOR.ID &&
      politicalPartyId !== INDEPENDENT_PARTY_ID ? (
        <FormInput
          title="CANDIDATE_CONFIRMATION.POLITICAL_GROUP_SYMBOL_PREVIEW"
          registerName={`candidatePoliticalInfo.${NOMINATED_CANDIDATE.POLITICAL_PARTY_SYMBOL_NAME}`}
          disabled
        />
      ) : null}

      {/* only visible for - 
              City Corporation -> Mayor only if স্বতন্ত্র party
              City Corporation -> all Councillor & Reserved Councillor */}

      {(Number(candidateTypeId) === CANDIDATE_INFO.CITY_CORPORATION_MAYOR.ID &&
        politicalPartyId === INDEPENDENT_PARTY_ID) ||
      Number(candidateTypeId) ===
        CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID ||
      Number(candidateTypeId) ===
        CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID ? (
        <FormInput
          title="CANDIDATE_CONFIRMATION.PREFERRED_SYMBOL_PREVIEW"
          registerName={`candidatePoliticalInfo.${NOMINATED_CANDIDATE.PREFERRED_SYMBOL_NAME}`}
          disabled
        />
      ) : null}
    </>
  );
};

export default CityCorporationElection;
