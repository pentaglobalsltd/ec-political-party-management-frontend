import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

import { Text } from '@pentabd/ui';

import FormInput from '@components/inputs/FormInput';
import FormSelect from '@components/inputs/FormSelect';

import { useBanks } from '@hooks/miscellaneous/master-hook/bank/useBanks';
import { usePoliticalParties } from '@hooks/miscellaneous/master-hook/political-party/usePoliticalParties';
import { useAllocatedSymbolList } from '@hooks/candidate-info-management/controller-list/candidate-symbol-allocation/useAllocatedSymbolList';
import { useCandidateNominationFormThirdPart } from '@hooks/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/useCandidateNominationFormThirdPart';

import { FORM_FIELDS } from '@constants/forms';
import { CANDIDATE_INFO } from '@constants/candidate-info';
import { INDEPENDENT_PARTY_ID } from '@constants/political-party-info';
import { electionNameMapping } from '@helpers/election-type';
import { candidateNameMapping } from '@helpers/candidate-type';

const CANDIDATE_PERSONAL_INFO =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.THIRD_PART
    .CANDIDATE_PERSONAL_INFO;

const CANDIDATE_POLITICAL_INFO =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.THIRD_PART
    .CANDIDATE_POLITICAL_INFO;

const MunicipalityElection = () => {
  const [candidateName, setCandidateName] = useState('');
  const [politicalPartyId, setPoliticalPartyId] = useState<number>();

  const { t } = useTranslation();
  const { watch, setValue, register } = useFormContext();
  const {
    candidateElectionDetailsId,
    electionSettingsId,
    candidateTypeId,
    electionTypeId,
  } = useParams();

  const { banks } = useBanks();
  const { politicalParties } = usePoliticalParties(true);
  const { allocatedSymbol } = useAllocatedSymbolList({
    candidateTypeId: Number(candidateTypeId),
  });
  const { candidateNominationFormThirdPart } =
    useCandidateNominationFormThirdPart({
      electionSettingsId,
      candidateElectionDetailsId,
    });

  const electionTypeKey = electionNameMapping(Number(electionTypeId));
  const candidateTypeKey = candidateNameMapping(Number(candidateTypeId));

  const politicalPartyChange = watch(
    `candidatePoliticalInfo.${CANDIDATE_POLITICAL_INFO.POLITICAL_PARTY_ID}`,
  );
  const isIndependentPartyChecked = watch(
    `candidatePoliticalInfo.${CANDIDATE_POLITICAL_INFO.POLITICAL_PARTY_CHECKBOX}`,
  );

  const shouldRenderPreferredSymbolSelect =
    (Number(candidateTypeId) === CANDIDATE_INFO.MUNICIPALITY_MAYOR.ID &&
      isIndependentPartyChecked) ||
    Number(candidateTypeId) !== CANDIDATE_INFO.MUNICIPALITY_MAYOR.ID;

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

  // for রাজনৈতিক দল
  useEffect(() => {
    if (isIndependentPartyChecked) {
      setValue(
        `candidatePoliticalInfo.${CANDIDATE_POLITICAL_INFO.POLITICAL_PARTY_ID}`,
        null,
      );
    } else if (politicalPartyId && politicalPartyId !== INDEPENDENT_PARTY_ID) {
      setValue(
        `candidatePoliticalInfo.${CANDIDATE_POLITICAL_INFO.POLITICAL_PARTY_ID}`,
        politicalPartyId,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIndependentPartyChecked]);

  // for সংরক্ষিত প্রতীক (দলীয় প্রার্থীর ক্ষেত্রে)
  useEffect(() => {
    const selectedPartySymbol: any = politicalParties.find(
      (item) => item?.value === politicalPartyChange,
    );

    if (selectedPartySymbol && !isIndependentPartyChecked) {
      setValue(
        `candidatePoliticalInfo.${CANDIDATE_POLITICAL_INFO.POLITICAL_PARTY_SYMBOL_NAME}`,
        selectedPartySymbol?.symbolNameBn
          ? selectedPartySymbol?.symbolNameBn
          : '',
      );
    } else {
      setValue(
        `candidatePoliticalInfo.${CANDIDATE_POLITICAL_INFO.POLITICAL_PARTY_SYMBOL_NAME}`,
        '',
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIndependentPartyChecked, politicalParties, politicalPartyChange]);

  return (
    <div className="rounded-4 bg-info-50 px-9 py-9 my-9">
      <Text size="lg" color="title" weight="semibold">
        {t('THIRD_PART.ANNOUNCEMENT')}
      </Text>

      {/* ১) - ৩) */}
      <div className="pt-7">
        <Text size="sm" color="title" weight="medium">
          <Trans
            i18nKey={`THIRD_PART.ANNOUNCEMENT_FIRST_PART.MUNICIPALITY_ELECTION`}
            components={{
              d: <div className="pb-7"></div>,
            }}
            values={{
              CANDIDATE_TYPE: t(
                `THIRD_PART.CANDIDATE_TYPE.${electionTypeKey}.${candidateTypeKey}`,
              ),
            }}
          ></Trans>
        </Text>
      </div>

      {/* ৪) */}
      <FormInput
        title="THIRD_PART.TIN_NO.MUNICIPALITY_ELECTION"
        registerName={`candidatePersonalInfo.${CANDIDATE_PERSONAL_INFO.TIN_NUMBER}`}
        placeholder="PLACEHOLDER.ENTER"
      />

      {/* ৪) */}
      <div className="pb-7">
        <Text size="sm" color="title" weight="medium">
          <Trans
            i18nKey={`THIRD_PART.ANNOUNCEMENT_SECOND_PART.MUNICIPALITY_ELECTION`}
            components={{
              d: <div className="pb-7"></div>,
            }}
          ></Trans>
        </Text>
      </div>

      {/* only for mayor candidate ৫) ক) */}
      {Number(candidateTypeId) === CANDIDATE_INFO.MUNICIPALITY_MAYOR.ID ? (
        <>
          <div className="py-3 mb-6">
            <Text weight="semibold" color="title">
              {t('THIRD_PART.ME.MUNICIPALITY_ELECTION')} {candidateName}
            </Text>
          </div>

          <div className="d-grid grid-cols-12">
            <div className="col-span-3">
              <Text size="sm" weight="medium" color="title">
                {t('THIRD_PART.POLITICAL_GROUP_CHECKBOX.MUNICIPALITY_ELECTION')}
              </Text>
            </div>
            <div className="col-span-9 p-3 my-3">
              <input
                type="checkbox"
                id={`candidatePoliticalInfo.${CANDIDATE_POLITICAL_INFO.POLITICAL_PARTY_CHECKBOX}`}
                {...register(
                  `candidatePoliticalInfo.${CANDIDATE_POLITICAL_INFO.POLITICAL_PARTY_CHECKBOX}`,
                )}
              />
            </div>
          </div>

          {/* ৫) ক) */}
          <FormSelect
            title="THIRD_PART.POLITICAL_GROUP"
            name={`candidatePoliticalInfo.${CANDIDATE_POLITICAL_INFO.POLITICAL_PARTY_ID}`}
            options={politicalParties}
            placeholder={isIndependentPartyChecked ? ' ' : 'PLACEHOLDER.SELECT'}
            required={!isIndependentPartyChecked}
            disabled={isIndependentPartyChecked}
            isSearchable
          />

          {/* ৫) ক) খ) */}
          <Text size="sm" color="title" weight="medium">
            <Trans
              i18nKey={`THIRD_PART.ANNOUNCEMENT_THIRD_PART.MUNICIPALITY_ELECTION`}
              components={{
                d: <div className="pb-7"></div>,
              }}
            ></Trans>
          </Text>

          {/* ৬) ক) only for mayor candidate */}
          <FormInput
            title="THIRD_PART.POLITICAL_GROUP_SYMBOL"
            registerName={`candidatePoliticalInfo.${CANDIDATE_POLITICAL_INFO.POLITICAL_PARTY_SYMBOL_NAME}`}
            placeholder=" "
            disabled
          />
        </>
      ) : null}

      {/* ৬) খ) for mayor with স্বতন্ত্র party selected only */}
      {/* ৫) for councillor and reserved councillor only */}
      {shouldRenderPreferredSymbolSelect ? (
        <FormSelect
          title={`THIRD_PART.PREFERRED_SYMBOL.${electionTypeKey}.${candidateTypeKey}`}
          name={`candidatePoliticalInfo.${CANDIDATE_POLITICAL_INFO.PREFERRED_SYMBOL_ID}`}
          options={allocatedSymbol}
          placeholder="PLACEHOLDER.SELECT"
          required={isIndependentPartyChecked}
          isSearchable
        />
      ) : null}

      {/* ৭) for mayor and ৬) for councillor and reserved councillor */}
      <FormInput
        title={`THIRD_PART.BANK_ACCOUNT_NO.MUNICIPALITY_ELECTION.${candidateTypeKey}`}
        registerName={`candidatePersonalInfo.${CANDIDATE_PERSONAL_INFO.BANK_ACCOUNT_NO}`}
        placeholder="PLACEHOLDER.ENTER"
        required
      />

      {/* ৭) for mayor and ৬) for councillor and reserved councillor */}
      <FormSelect
        title="THIRD_PART.BANK_NAME.MUNICIPALITY_ELECTION"
        name={`candidatePersonalInfo.${CANDIDATE_PERSONAL_INFO.BANK_ID}`}
        options={banks}
        placeholder="PLACEHOLDER.SELECT"
        required
      />

      {/* ৭) for mayor and ৬) for councillor and reserved councillor */}
      <FormInput
        title="THIRD_PART.BRANCH_NAME.MUNICIPALITY_ELECTION"
        registerName={`candidatePersonalInfo.${CANDIDATE_PERSONAL_INFO.BANK_BRANCH_NAME}`}
        placeholder="PLACEHOLDER.ENTER"
        required
      />

      {/* ৮) for mayor and ৭) for councillor and reserved councillor */}
      <Text size="sm" color="title" weight="medium">
        <Trans
          i18nKey={`THIRD_PART.ANNOUNCEMENT_FORTH_PART.MUNICIPALITY_ELECTION.${candidateTypeKey}`}
          components={{
            d: <div className="pb-7"></div>,
          }}
        ></Trans>
      </Text>
    </div>
  );
};

export default MunicipalityElection;
