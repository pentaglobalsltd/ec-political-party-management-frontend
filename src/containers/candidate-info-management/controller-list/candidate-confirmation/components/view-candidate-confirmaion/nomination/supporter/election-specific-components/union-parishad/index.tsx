import FormInput from '@components/inputs/FormInput';
import { ELECTION_INFO } from '@constants/election-info';
import { FORM_FIELDS } from '@constants/forms';
import { electionNameMapping } from '@helpers/election-type';
import { SectionHeader } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

const SUPPORTER =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_CONFIRMATION
    .NOMINATION.SUPPORTER;

const UnionParishadElection = () => {
  const { t } = useTranslation();
  const { electionTypeId } = useParams();

  const electionTypeKey = electionNameMapping(Number(electionTypeId));

  return (
    <>
      <FormInput
        title="CANDIDATE_CONFIRMATION.UPAZILA"
        registerName={`supporter.${SUPPORTER.UPAZILA}`}
        disabled
      />

      {Number(electionTypeId) === ELECTION_INFO.UNION_PARISHAD.ID && (
        <FormInput
        title="CANDIDATE_CONFIRMATION.RMO"
        registerName={`supporter.${SUPPORTER.RMO}`}
        disabled
        />
      )}

      <FormInput
        title="CANDIDATE_CONFIRMATION.UNION_WARD"
        registerName={`supporter.${SUPPORTER.UNION_OR_WARD}`}
        disabled
      />
      {Number(electionTypeId) === ELECTION_INFO.UNION_PARISHAD.ID && (
        <FormInput
          title="CANDIDATE_CONFIRMATION.WARD"
          registerName={`supporter.${SUPPORTER.UP_WARD}`}
          disabled
        />
      )}
      <FormInput
        title="CANDIDATE_CONFIRMATION.VOTER_AREA"
        registerName={`supporter.${SUPPORTER.VOTER_AREA}`}
        disabled
      />
      <div className="py-12 border-top">
        <SectionHeader
          title={t('CANDIDATE_CONFIRMATION.CANDIDATE_PART')}
          subtitle={t('CANDIDATE_CONFIRMATION.SUPPORTER_SUBTITLE')}
        />
      </div>
      <FormInput
        title={`CANDIDATE_CONFIRMATION.CANDIDATE_NAME.${electionTypeKey}`}
        registerName={`candidateElectionAndPersonalDetails.${SUPPORTER.CANDIDATE_ELECTION_DETAILS.NAME}`}
        disabled
      />
      <FormInput
        title="CANDIDATE_CONFIRMATION.CANDIDATE_ADDRESS"
        registerName={`candidateElectionAndPersonalDetails.${SUPPORTER.CANDIDATE_ELECTION_DETAILS.ADDRESS}`}
        disabled
      />
      <FormInput
        title="CANDIDATE_CONFIRMATION.CANDIDATE_UNION"
        registerName={`candidateElectionAndPersonalDetails.${SUPPORTER.CANDIDATE_ELECTION_DETAILS.CONSTITUENCY}`}
        disabled
      />
      <FormInput
        title="CANDIDATE_CONFIRMATION.CANDIDATE_TYPE"
        registerName={`candidateElectionAndPersonalDetails.${SUPPORTER.CANDIDATE_ELECTION_DETAILS.CANDIDATE_TYPE}`}
        disabled
      />
      <FormInput
        title="CANDIDATE_CONFIRMATION.CANDIDATE_VOTER_NO"
        registerName={`candidateElectionAndPersonalDetails.${SUPPORTER.CANDIDATE_ELECTION_DETAILS.VOTER_NUMBER}`}
        disabled
      />
    </>
  );
};

export default UnionParishadElection;
