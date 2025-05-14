import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { SectionHeader } from '@pentabd/ui';
import FormInput from '@components/inputs/FormInput';
import { FORM_FIELDS } from '@constants/forms';
import { useCandidateNominationFormThirdPart } from '@hooks/candidate-info-management/controller-list/candidate-confirmation/candidate-nomination-form/useCandidateNominationFormThirdPart';
import { electionNameMapping } from '@helpers/election-type';
import ElectionSpecificComponent from './election-specific-component';
import { ELECTION_INFO } from '@constants/election-info';

const NOMINATED_CANDIDATE =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_CONFIRMATION
    .NOMINATION.NOMINATED_CANDIDATE;

const Candidate = () => {
  const { t } = useTranslation();
  const {
    electionSettingsId,
    candidateElectionDetailsId,
    electionTypeId,
    candidateTypeId,
  } = useParams();

  const electionTypeKey = electionNameMapping(Number(electionTypeId));

  const { candidateNominationFormThirdPartData } =
    useCandidateNominationFormThirdPart({
      electionSettingsId,
      candidateElectionDetailsId,
    });

  const politicalPartyId =
    candidateNominationFormThirdPartData?.candidatePoliticalInfo
      ?.politicalPartyId;

  const methods = useForm({
    values: candidateNominationFormThirdPartData,
  });

  return (
    <FormProvider {...methods}>
      <form className="container">
        <div className="py-12 border-top">
          <SectionHeader
            title={t('CANDIDATE_CONFIRMATION.NOMINATED_CANDIDATE')}
            subtitle={t('CANDIDATE_CONFIRMATION.NOMINATED_CANDIDATE_SUBTITLE')}
          />
        </div>
        <FormInput
          title={`CANDIDATE_CONFIRMATION.CANDIDATE_NAME.${electionTypeKey}`}
          registerName={`candidatePersonalInfo.${NOMINATED_CANDIDATE.NAME}`}
          disabled
        />
        <FormInput
          title="CANDIDATE_CONFIRMATION.NID_NO"
          registerName={`candidatePersonalInfo.${NOMINATED_CANDIDATE.NID_NO}`}
          disabled
        />
        <FormInput
          title="CANDIDATE_CONFIRMATION.FATHER_OR_HUSBAND_NAME"
          registerName={`candidatePersonalInfo.${NOMINATED_CANDIDATE.FATHER_OR_HUSBAND_NAME}`}
          disabled
        />
        <FormInput
          title="CANDIDATE_CONFIRMATION.MOTHER_NAME"
          registerName={`candidatePersonalInfo.${NOMINATED_CANDIDATE.MOTHER_NAME}`}
          disabled
        />
        <FormInput
          title="CANDIDATE_CONFIRMATION.SERIAL_NUMBER"
          registerName={`candidatePersonalInfo.${NOMINATED_CANDIDATE.SERIAL_NUMBER}`}
          disabled
        />
        <FormInput
          title="CANDIDATE_CONFIRMATION.REGION"
          registerName={`candidatePersonalInfo.${NOMINATED_CANDIDATE.REGION}`}
          disabled
        />
        <FormInput
          title="CANDIDATE_CONFIRMATION.ZILLA"
          registerName={`candidatePersonalInfo.${NOMINATED_CANDIDATE.ZILLA}`}
          disabled
        />
        <FormInput
          title="CANDIDATE_CONFIRMATION.UPAZILA"
          registerName={`candidatePersonalInfo.${NOMINATED_CANDIDATE.UPAZILA}`}
          disabled
        />
        <FormInput
          title="CANDIDATE_CONFIRMATION.RMO"
          registerName={`candidatePersonalInfo.${NOMINATED_CANDIDATE.RMO}`}
          disabled
        />
        <FormInput
          title="CANDIDATE_CONFIRMATION.UNION_WARD"
          registerName={`candidatePersonalInfo.${NOMINATED_CANDIDATE.UNION_OR_WARD}`}
          disabled
        />
        {Number(electionTypeId) === ELECTION_INFO.UNION_PARISHAD.ID && (
          <FormInput
            title="CANDIDATE_CONFIRMATION.WARD"
            registerName={`candidatePersonalInfo.${NOMINATED_CANDIDATE.UP_WARD}`}
            disabled
          />
        )}
        <FormInput
          title="CANDIDATE_CONFIRMATION.VOTER_AREA"
          registerName={`candidatePersonalInfo.${NOMINATED_CANDIDATE.VOTER_AREA}`}
          disabled
        />
        <FormInput
          title="CANDIDATE_CONFIRMATION.ADDRESS"
          registerName={`candidatePersonalInfo.${NOMINATED_CANDIDATE.PERMANENT_ADDRESS}`}
          disabled
        />
        <FormInput
          title="CANDIDATE_CONFIRMATION.VOTER_NO"
          registerName={`candidatePersonalInfo.${NOMINATED_CANDIDATE.VOTER_NO}`}
          disabled
        />
        <FormInput
          title="CANDIDATE_CONFIRMATION.BANK_ACCOUNT_NO"
          registerName={`candidatePersonalInfo.${NOMINATED_CANDIDATE.BANK_ACCOUNT_NO}`}
          disabled
        />
        <FormInput
          title={`CANDIDATE_CONFIRMATION.BANK_NAME.${electionTypeKey}`}
          registerName={`candidatePersonalInfo.${NOMINATED_CANDIDATE.BANK}`}
          disabled
        />
        <FormInput
          title={`CANDIDATE_CONFIRMATION.BRANCH_NAME.${electionTypeKey}`}
          registerName={`candidatePersonalInfo.${NOMINATED_CANDIDATE.BANK_BRANCH_NAME}`}
          disabled
        />
        <FormInput
          title="CANDIDATE_CONFIRMATION.CANDIDATE_TIN_NUMBER"
          registerName={`candidatePersonalInfo.${NOMINATED_CANDIDATE.TIN}`}
          disabled
        />
        <ElectionSpecificComponent
          electionTypeId={Number(electionTypeId)}
          candidateTypeId={candidateTypeId}
          politicalPartyId={politicalPartyId}
        />
      </form>
    </FormProvider>
  );
};
export default Candidate;
