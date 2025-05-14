import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { SectionHeader } from '@pentabd/ui';
import FormInput from '@components/inputs/FormInput';
import { FORM_FIELDS } from '@constants/forms';
import { useCandidateNominationFormFirstPart } from '@hooks/candidate-info-management/controller-list/candidate-confirmation/candidate-nomination-form/useCandidateNominationFormFirstPart';
import { electionNameMapping } from '@helpers/election-type';
import ElectionSpecificComponentsProposer from './election-specific-components';

const PROPOSER =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_CONFIRMATION
    .NOMINATION.PROPOSER;

const Proposer = () => {
  const { t } = useTranslation();
  const { electionSettingsId, candidateElectionDetailsId, electionTypeId } =
    useParams();

  const electionTypeKey = electionNameMapping(Number(electionTypeId));

  const { candidateNominationFormFirstPartData } =
    useCandidateNominationFormFirstPart({
      electionSettingsId,
      candidateElectionDetailsId,
    });
  const methods = useForm({
    values: candidateNominationFormFirstPartData,
  });

  return (
    <FormProvider {...methods}>
      <form className="container">
        <div className="pt-12 ">
          <div className="py-12 border-top">
            <SectionHeader
              title={t('CANDIDATE_CONFIRMATION.PROPOSER_PART')}
              subtitle={t('CANDIDATE_CONFIRMATION.PROPOSER_SUBTITLE')}
            />
          </div>
          <FormInput
            title={`CANDIDATE_CONFIRMATION.NAME.${electionTypeKey}`}
            registerName={`proposer.${PROPOSER.NAME}`}
            placeholder={t('PLACEHOLDER.PROPOSERS_NAME')}
            disabled
          />
          <FormInput
            title="CANDIDATE_CONFIRMATION.NID_NO"
            registerName={`proposer.${PROPOSER.NID_NUMBER}`}
            disabled
          />
          <FormInput
            title="CANDIDATE_CONFIRMATION.VOTER_NO"
            registerName={`proposer.${PROPOSER.VOTER_NUMBER}`}
            disabled
          />
          <FormInput
            title="CANDIDATE_CONFIRMATION.SERIAL_NUMBER"
            registerName={`proposer.${PROPOSER.SERIAL_NUMBER}`}
            disabled
          />
          <FormInput
            title="CANDIDATE_CONFIRMATION.ZILLA"
            registerName={`proposer.${PROPOSER.ZILLA}`}
            disabled
          />
          <ElectionSpecificComponentsProposer />
        </div>
      </form>
    </FormProvider>
  );
};
export default Proposer;
