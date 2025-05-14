import FormInput from '@components/inputs/FormInput';
import { FORM_FIELDS } from '@constants/forms';
import { electionNameMapping } from '@helpers/election-type';
import { SectionHeader } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

const PROPOSER =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_CONFIRMATION
    .NOMINATION.PROPOSER;

const NationalElection = () => {
  const { t } = useTranslation();
  const { electionTypeId } = useParams();

  const electionTypeKey = electionNameMapping(Number(electionTypeId));

  return (
    <>
      <FormInput
        title="CANDIDATE_CONFIRMATION.CONSTITUENCY"
        registerName={`proposer.${PROPOSER.CONSTITUENCY}`}
        disabled
      />
      <FormInput
        title="CANDIDATE_CONFIRMATION.UPAZILA"
        registerName={`proposer.${PROPOSER.UPAZILA}`}
        disabled
      />
      <FormInput
        title="CANDIDATE_CONFIRMATION.RMO"
        registerName={`proposer.${PROPOSER.RMO}`}
        disabled
      />
      <FormInput
        title="CANDIDATE_CONFIRMATION.UNION_WARD"
        registerName={`proposer.${PROPOSER.UNION_OR_WARD}`}
        disabled
      />
      <FormInput
        title="CANDIDATE_CONFIRMATION.VOTER_AREA"
        registerName={`proposer.${PROPOSER.VOTER_AREA}`}
        disabled
      />
      <div className="py-12 border-top">
        <SectionHeader
          title={t('CANDIDATE_CONFIRMATION.CANDIDATE_PART')}
          subtitle={t('CANDIDATE_CONFIRMATION.PROPOSER_SUBTITLE')}
        />
      </div>
      <FormInput
        title={`CANDIDATE_CONFIRMATION.CANDIDATE_NAME.${electionTypeKey}`}
        registerName={`candidateElectionAndPersonalDetails.${PROPOSER.CANDIDATE_ELECTION_DETAILS.NAME}`}
        disabled
      />
      <FormInput
        title="CANDIDATE_CONFIRMATION.CANDIDATE_ADDRESS"
        registerName={`candidateElectionAndPersonalDetails.${PROPOSER.CANDIDATE_ELECTION_DETAILS.ADDRESS}`}
        disabled
      />
      <FormInput
        title="CANDIDATE_CONFIRMATION.CANDIDATE_ZILLA"
        registerName={`candidateElectionAndPersonalDetails.${PROPOSER.CANDIDATE_ELECTION_DETAILS.ZILLA}`}
        disabled
      />
      <FormInput
        title="CANDIDATE_CONFIRMATION.CANDIDATE_CONSTITUENCY_NAME"
        registerName={`candidateElectionAndPersonalDetails.${PROPOSER.CANDIDATE_ELECTION_DETAILS.CONSTITUENCY}`}
        disabled
      />
      <FormInput
        title="CANDIDATE_CONFIRMATION.CANDIDATE_TYPE"
        registerName={`candidateElectionAndPersonalDetails.${PROPOSER.CANDIDATE_ELECTION_DETAILS.CANDIDATE_TYPE}`}
        disabled
      />
      <FormInput
        title="CANDIDATE_CONFIRMATION.CANDIDATE_VOTER_NO"
        registerName={`candidateElectionAndPersonalDetails.${PROPOSER.CANDIDATE_ELECTION_DETAILS.VOTER_NUMBER}`}
        disabled
      />
    </>
  );
};

export default NationalElection;
