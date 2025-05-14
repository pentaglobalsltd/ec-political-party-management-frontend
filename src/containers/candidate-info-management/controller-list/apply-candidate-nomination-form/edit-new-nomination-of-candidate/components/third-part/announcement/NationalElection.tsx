import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

import { Text } from '@pentabd/ui';

import FormInput from '@components/inputs/FormInput';
import FormSelect from '@components/inputs/FormSelect';

import { useBanks } from '@hooks/miscellaneous/master-hook/bank/useBanks';
import { usePoliticalParties } from '@hooks/miscellaneous/master-hook/political-party/usePoliticalParties';
import { useCandidateNominationFormThirdPart } from '@hooks/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/useCandidateNominationFormThirdPart';

import { FORM_FIELDS } from '@constants/forms';
import { INDEPENDENT_PARTY_ID } from '@constants/political-party-info';
import { electionNameMapping } from '@helpers/election-type';

const CANDIDATE_PERSONAL_INFO =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.THIRD_PART
    .CANDIDATE_PERSONAL_INFO;

const CANDIDATE_POLITICAL_INFO =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.THIRD_PART
    .CANDIDATE_POLITICAL_INFO;

const NationalElection = () => {
  const [candidateName, setCandidateName] = useState('');
  const [politicalPartyId, setPoliticalPartyId] = useState<number>();

  const { t } = useTranslation();
  const { watch, setValue, register } = useFormContext();
  const { candidateElectionDetailsId, electionSettingsId, electionTypeId } =
    useParams();

  const { banks } = useBanks();
  const { politicalParties } = usePoliticalParties(true);
  const { candidateNominationFormThirdPart } =
    useCandidateNominationFormThirdPart({
      electionSettingsId,
      candidateElectionDetailsId,
    });

  const electionTypeKey = electionNameMapping(Number(electionTypeId));

  const isIndependentPartyChecked = watch(
    `candidatePoliticalInfo.${CANDIDATE_POLITICAL_INFO.POLITICAL_PARTY_CHECKBOX}`,
  );

  // setting candidateName and politicalPartyId
  useEffect(() => {
    if (candidateNominationFormThirdPart?.candidatePersonalInfo?.name) {
      setCandidateName(
        candidateNominationFormThirdPart.candidatePersonalInfo.name,
      );
    }
    if (
      candidateNominationFormThirdPart?.candidatePoliticalInfo?.politicalParty
        ?.id
    ) {
      setPoliticalPartyId(
        candidateNominationFormThirdPart.candidatePoliticalInfo.politicalParty
          .id,
      );
    }
  }, [candidateNominationFormThirdPart]);

  // for রাজনৈতিক দল
  useEffect(() => {
    if (isIndependentPartyChecked) {
      setValue(
        `candidatePoliticalInfo.${CANDIDATE_POLITICAL_INFO.POLITICAL_PARTY_ID}`,
        null,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIndependentPartyChecked, politicalPartyId]);

  // for স্বতন্ত্র প্রার্থী checkbox
  useEffect(() => {
    if (politicalPartyId === INDEPENDENT_PARTY_ID) {
      setValue(
        `candidatePoliticalInfo.${CANDIDATE_POLITICAL_INFO.POLITICAL_PARTY_CHECKBOX}`,
        true,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [politicalPartyId]);

  return (
    <div className="rounded-4 bg-info-50 px-9 py-9 my-9">
      <Text size="lg" color="title" weight="semibold">
        {t('THIRD_PART.ANNOUNCEMENT')}
      </Text>
      <div className="pt-7">
        <Text size="sm" color="title" weight="medium">
          <Trans
            i18nKey={`THIRD_PART.ANNOUNCEMENT_FIRST_PART.${electionTypeKey}`}
            components={{
              d: <div className="pb-7"></div>,
            }}
          ></Trans>
        </Text>
      </div>
      <FormInput
        title="THIRD_PART.BANK_ACCOUNT_NO.NATIONAL_ELECTION"
        registerName={`candidatePersonalInfo.${CANDIDATE_PERSONAL_INFO.BANK_ACCOUNT_NO}`}
        placeholder="PLACEHOLDER.ENTER"
        required
      />
      <FormSelect
        title="THIRD_PART.BANK_NAME.NATIONAL_ELECTION"
        name={`candidatePersonalInfo.${CANDIDATE_PERSONAL_INFO.BANK_ID}`}
        options={banks}
        placeholder="PLACEHOLDER.SELECT"
        required
      />
      <FormInput
        title="THIRD_PART.BRANCH_NAME.NATIONAL_ELECTION"
        registerName={`candidatePersonalInfo.${CANDIDATE_PERSONAL_INFO.BANK_BRANCH_NAME}`}
        placeholder="PLACEHOLDER.ENTER"
        required
      />

      <div className="pb-5">
        <FormInput
          title="THIRD_PART.TIN_NO.NATIONAL_ELECTION"
          registerName={`candidatePersonalInfo.${CANDIDATE_PERSONAL_INFO.TIN_NUMBER}`}
          placeholder="PLACEHOLDER.ENTER"
          required
        />

        <Text size="sm" color="title" weight="medium">
          <Trans
            i18nKey="THIRD_PART.TIN_NO_EXTRA.NATIONAL_ELECTION"
            components={{
              d: <div className="pb-7"></div>,
            }}
          ></Trans>
        </Text>
      </div>

      <Text size="sm" color="title" weight="medium">
        <Trans
          i18nKey={`THIRD_PART.ANNOUNCEMENT_SECOND_PART.${electionTypeKey}`}
          components={{
            d: <div className="pb-7"></div>,
          }}
        ></Trans>
      </Text>

      <div className="py-3 mb-6 ">
        <Text size="sm" weight="medium" color="title">
          {t('THIRD_PART.ME.NATIONAL_ELECTION')} {candidateName}
        </Text>
      </div>

      {/* checkbox */}
      <div className="d-grid grid-cols-12 mb-6">
        <div className="col-span-3">
          <Text size="sm" weight="medium" color="title">
            {t('THIRD_PART.POLITICAL_GROUP_CHECKBOX.NATIONAL_ELECTION')}
          </Text>
        </div>
        <div className="col-span-9 p-1">
          <input
            type="checkbox"
            id={`candidatePoliticalInfo.${CANDIDATE_POLITICAL_INFO.POLITICAL_PARTY_CHECKBOX}`}
            {...register(
              `candidatePoliticalInfo.${CANDIDATE_POLITICAL_INFO.POLITICAL_PARTY_CHECKBOX}`,
            )}
          />
        </div>
      </div>

      <FormSelect
        title="THIRD_PART.POLITICAL_GROUP"
        name={`candidatePoliticalInfo.${CANDIDATE_POLITICAL_INFO.POLITICAL_PARTY_ID}`}
        options={politicalParties}
        placeholder={isIndependentPartyChecked ? ' ' : 'PLACEHOLDER.SELECT'}
        disabled={isIndependentPartyChecked}
        required={!isIndependentPartyChecked}
        isSearchable
      />

      <Text size="sm" color="title" weight="medium">
        <Trans
          i18nKey={`THIRD_PART.ANNOUNCEMENT_THIRD_PART.${electionTypeKey}`}
          components={{
            d: <div className="pb-7"></div>,
          }}
        ></Trans>
      </Text>
    </div>
  );
};

export default NationalElection;
