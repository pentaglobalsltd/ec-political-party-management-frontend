import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { SectionHeader } from '@pentabd/ui';
import FormInput from '@components/inputs/FormInput';
import { FORM_FIELDS } from '@constants/forms';
import { useCandidateNominationFormSecondPart } from '@hooks/candidate-info-management/controller-list/candidate-confirmation/candidate-nomination-form/useCandidateNominationFormSecondPart';
import { electionNameMapping } from '@helpers/election-type';
import ElectionSpecificComponentsSupporter from './election-specific-components';

const SUPPORTER =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_CONFIRMATION
    .NOMINATION.SUPPORTER;

const Supporter = () => {
  const { t } = useTranslation();
  const { electionSettingsId, candidateElectionDetailsId, electionTypeId } =
    useParams();

  const electionTypeKey = electionNameMapping(Number(electionTypeId));

  const { candidateNominationFormSecondPartData } =
    useCandidateNominationFormSecondPart({
      electionSettingsId,
      candidateElectionDetailsId,
    });
  const methods = useForm({
    values: candidateNominationFormSecondPartData,
  });
  return (
    <FormProvider {...methods}>
      <form className="container">
        <div className="py-12 border-top">
          <SectionHeader
            title={t('CANDIDATE_CONFIRMATION.SUPPORTER_PART')}
            subtitle={t('CANDIDATE_CONFIRMATION.SUPPORTER_SUBTITLE')}
          />
        </div>
        <FormInput
          title={`CANDIDATE_CONFIRMATION.NAME.${electionTypeKey}`}
          registerName={`supporter.${SUPPORTER.NAME}`}
          placeholder={t('PLACEHOLDER.SUPPORTERS_NAME')}
          disabled
        />
        <FormInput
          title="CANDIDATE_CONFIRMATION.NID_NO"
          registerName={`supporter.${SUPPORTER.NID_NUMBER}`}
          disabled
        />
        <FormInput
          title="CANDIDATE_CONFIRMATION.VOTER_NO"
          registerName={`supporter.${SUPPORTER.VOTER_NUMBER}`}
          disabled
        />
        <FormInput
          title="CANDIDATE_CONFIRMATION.SERIAL_NUMBER"
          registerName={`supporter.${SUPPORTER.SERIAL_NUMBER}`}
          disabled
        />
        <FormInput
          title="CANDIDATE_CONFIRMATION.ZILLA"
          registerName={`supporter.${SUPPORTER.ZILLA}`}
          disabled
        />
        <ElectionSpecificComponentsSupporter />
      </form>
    </FormProvider>
  );
};
export default Supporter;
