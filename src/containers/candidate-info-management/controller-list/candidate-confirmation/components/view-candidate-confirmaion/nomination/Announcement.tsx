import { useParams } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';

import { RadioGroup, Text } from '@pentabd/ui';

import FormInput from '@components/inputs/FormInput';

import { useCandidateNominationFormFourthPart } from '@hooks/candidate-info-management/controller-list/candidate-confirmation/candidate-nomination-form/useCandidateNominationFormFourthPart';
import { useCandidateNominationFormThirdPart } from '@hooks/candidate-info-management/controller-list/candidate-confirmation/candidate-nomination-form/useCandidateNominationFormThirdPart';

import { FORM_FIELDS } from '@constants/forms';
import { INDEPENDENT_PARTY_ID } from '@constants/political-party-info';

const ANNOUNCEMENT =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_CONFIRMATION
    .NOMINATION.ANNOUNCEMENT;

const Announcement = () => {
  const { t } = useTranslation();
  const { electionSettingsId, candidateElectionDetailsId } = useParams();

  const { candidateNominationFormThirdPartData } =
    useCandidateNominationFormThirdPart({
      electionSettingsId,
      candidateElectionDetailsId,
    });

  const { candidateNominationFormFourthPartData } =
    useCandidateNominationFormFourthPart({
      electionSettingsId,
      candidateElectionDetailsId,
    });
  const methods = useForm({
    values: candidateNominationFormFourthPartData,
  });

  const { getValues, register } = methods;
  if (
    candidateNominationFormThirdPartData?.candidatePoliticalInfo
      ?.politicalPartyId === INDEPENDENT_PARTY_ID
  ) {
    const selectedRadioValue = getValues('isElectedBefore');
    const selectYes = 'yes';
    const selectNo = 'no';
    const SelectedYes = () => {
      return (
        <div className="mb-9">
          <div className="rounded-4 p-9 bg-info-50 mb-9">
            <Text weight="medium" size="sm" color="title">
              {t('CANDIDATE_CONFIRMATION.SELECTED_YES_TITLE')}
            </Text>
          </div>
          <div className="p-7 bg-info-50 rounded-4">
            <div className="pb-9">
              <Text size="lg" color="title" weight="semibold">
                {t('CANDIDATE_CONFIRMATION.ANNOUNCEMENT')}
              </Text>
            </div>
            <div className="pb-9">
              <Text weight="medium" size="sm" color="title">
                {t(
                  'CANDIDATE_CONFIRMATION.SELECTED_YES_ANNOUNCEMENT_FIRST_PART',
                  {
                    CANDIDATE_NAME:
                      candidateNominationFormFourthPartData?.candidateName,
                  },
                )}
              </Text>
            </div>
            <FormInput
              title="CANDIDATE_CONFIRMATION.ELECTION_NAME"
              registerName={
                ANNOUNCEMENT.CANDIDATE_PAST_ELECTION_INFO.PAST_ELECTION_NAME
              }
              disabled
            />
            <FormInput
              title="CANDIDATE_CONFIRMATION.ELECTION_AREA_NAME_NUMBER"
              registerName={
                ANNOUNCEMENT.CANDIDATE_PAST_ELECTION_INFO.PAST_ELECTION_INFO
              }
              disabled
            />
            <Text weight="medium" size="sm" color="title">
              {t('CANDIDATE_CONFIRMATION.SELECTED_YES_ANNOUNCEMENT_LAST_PART')}
            </Text>
          </div>
        </div>
      );
    };
    const SelectedNo = () => {
      return (
        <div className="mb-9">
          <div className="rounded-4 p-9 bg-info-50 mb-9">
            <Text weight="medium" size="sm" color="title">
              {t('CANDIDATE_CONFIRMATION.SELECTED_NO_TITLE')}
            </Text>
          </div>
          <div className="p-7 bg-info-50 rounded-4">
            <div className="pb-9">
              <Text size="lg" color="title" weight="semibold">
                {t('CANDIDATE_CONFIRMATION.ANNOUNCEMENT')}
              </Text>
            </div>
            <div className="pb-9">
              <Text weight="medium" size="sm" color="title">
                {t(
                  'CANDIDATE_CONFIRMATION.SELECTED_NO_ANNOUNCEMENT_FIRST_PART',
                  {
                    CANDIDATE_NAME:
                      candidateNominationFormFourthPartData?.candidateName,
                  },
                )}
              </Text>
            </div>
            <FormInput
              title="CANDIDATE_CONFIRMATION.ELECTION_AREA"
              registerName={
                ANNOUNCEMENT.CANDIDATE_PRESENT_ELECTION_INFO.CONSTITUENCY
              }
              disabled
            />
            <Text weight="medium" size="sm" color="title">
              <Trans i18nKey="CANDIDATE_CONFIRMATION.SELECTED_NO_ANNOUNCEMENT_LAST_PART"></Trans>
            </Text>
          </div>
        </div>
      );
    };
    return (
      <FormProvider {...methods}>
        <form className="container">
          <div className="d-flex flex-column gap-8 py-9">
            <div className="d-flex gap-9">
              <div>
                <Text weight="medium" size="sm" color="title">
                  {t('CANDIDATE_CONFIRMATION.SELECTED_BEFORE')}
                </Text>
              </div>
              <div>
                <RadioGroup
                  {...register('isElectedBefore')}
                  disabled
                  id={ANNOUNCEMENT.IS_ELECTED_BEFORE}
                  options={[
                    {
                      id: 'yes',
                      value: 'yes',
                      label: `${t('CANDIDATE_CONFIRMATION.RADIO_YES')}`,
                    },
                    {
                      id: 'no',
                      value: 'no',
                      label: `${t('CANDIDATE_CONFIRMATION.RADIO_NO')}`,
                    },
                  ]}
                />
              </div>
            </div>
          </div>
          {selectedRadioValue === selectYes ? (
            <SelectedYes />
          ) : selectedRadioValue === selectNo ? (
            <SelectedNo />
          ) : null}
        </form>
      </FormProvider>
    );
  } else {
    return null;
  }
};
export default Announcement;
