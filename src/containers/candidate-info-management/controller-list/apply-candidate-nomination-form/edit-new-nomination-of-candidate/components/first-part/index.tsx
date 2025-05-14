import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  IconCalendar,
  IconCheckCircleBroken,
  IconRefreshCcw01,
} from '@pentabd/icons';
import { Button, SectionHeader, Text } from '@pentabd/ui';

import {
  mapFirstPartCandidate,
  mapFirstPartProposer,
  nidOptions,
} from '../../filterData';
import { FORM_FIELDS } from '@constants/forms';
import { ELECTION_INFO } from '@constants/election-info';
import { FirstPartType } from '@type/candidate-info-management/operator-view/candidate-nomination-form/first-part';

import FormSelect from '@components/inputs/FormSelect';
import { useCandidateNominationFormFirstPart } from '@hooks/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/useCandidateNominationFormFirstPart';

import FormInput from '@components/inputs/FormInput';
import FormDate from '@components/inputs/FormDate';

import { firstPartValidationSchemaType } from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/first-part';
import {
  ID_TYPE,
  allSelectedData,
  optionRegion,
  optionZilla,
} from '../../../constants';
import ElectionSpecificComponents from './election-specific-components';
import { useFirstPartValidation } from './validation-hook/useFirstPartValidation';
import useElectionSchedulesRegions from '@hooks/miscellaneous/core-hook/region/useElectionSchedulesRegions';
import useElectionSchedulesCandidateTypeZillas from '@hooks/miscellaneous/core-hook/zilla/useCandiateTypeZillas';

type Props = {
  handleCurrent: (step: number) => void;
};

const PROPOSER =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.FIRST_PART
    .PROPOSER;

const FirstPart = ({ handleCurrent }: Props) => {
  const [idType, setIdType] = useState(ID_TYPE.NID);
  const { t } = useTranslation();
  const {
    electionSettingsId,
    candidateElectionDetailsId,
    electionTypeId,
    scheduleId,
    candidateTypeId,
  } = useParams();

  const {
    isCreateSuccess,
    isCreateRequested,
    createCandidateNominationFormFirstPartInfo,
    candidateNominationFormFirstPart,
    createFirstPartInitialStateHandler,
    getFirstPartInitialStateHandler,
  } = useCandidateNominationFormFirstPart({
    electionSettingsId,
    candidateElectionDetailsId,
  });

  const { validationSchema } = useFirstPartValidation();

  // ons
  const methods = useForm<firstPartValidationSchemaType>({
    resolver: yupResolver(validationSchema),
    values: candidateNominationFormFirstPart as firstPartValidationSchemaType,
  });

  const { watch, reset, register, setValue } = methods;

  const regionChange = watch(`proposer.${PROPOSER.REGION_ID}`);
  const zillaChange = watch(`proposer.${PROPOSER.ZILLA_ID}`);

  const { electionSchedulesRegions, getElectionSchedulesRegionsData } =
    useElectionSchedulesRegions();
  const {
    candidateTypeDistrict,
    getElectionSchedulesCandidateTypeDistrictData,
  } = useElectionSchedulesCandidateTypeZillas();

  const [resetData, setResetData] = useState({
    ...allSelectedData,
  });

  const emptyBelowData = (newData: { [name: string]: boolean }) => {
    setResetData((data: any) => ({
      ...data,
      ...newData,
    }));
  };

  useEffect(() => {
    getElectionSchedulesRegionsData(Number(scheduleId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (candidateNominationFormFirstPart?.proposer) {
      if (
        candidateNominationFormFirstPart?.proposer?.voterNo &&
        candidateNominationFormFirstPart?.proposer?.nid === ''
      ) {
        setIdType(ID_TYPE.VOTER_NO);
        setValue(
          `proposer.${PROPOSER.VOTER_NUMBER}`,
          candidateNominationFormFirstPart?.proposer?.voterNo,
        );
      }
    }
  }, [
    candidateNominationFormFirstPart?.proposer,
    candidateNominationFormFirstPart?.proposer?.voterNo,
    setValue,
  ]);

  useEffect(() => {
    if (isCreateSuccess) {
      createFirstPartInitialStateHandler();
      methods.reset();
      handleCurrent(1);
    }
    return () => {
      getFirstPartInitialStateHandler();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreateSuccess, methods]);

  // Edit
  useEffect(() => {
    if (candidateNominationFormFirstPart?.proposer) {
      const { region } = candidateNominationFormFirstPart.proposer;

      const regionId = region?.id;

      if (regionId) {
        getElectionSchedulesCandidateTypeDistrictData(
          Number(scheduleId),
          Number(candidateTypeId),
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    candidateNominationFormFirstPart?.proposer?.upazilaId,
    candidateNominationFormFirstPart?.proposer,
  ]);

  useEffect(() => {
    if (regionChange) {
      getElectionSchedulesCandidateTypeDistrictData(
        Number(scheduleId),
        Number(candidateTypeId),
        Number(regionChange),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionChange]);

  const onSubmit: SubmitHandler<firstPartValidationSchemaType> = (
    postData: FirstPartType,
  ) => {
    const data: any = {};
    const mappedDataProposer = mapFirstPartProposer(postData?.proposer, idType);
    const mappedDataCandidate = mapFirstPartCandidate(
      postData?.candidateElectionAndPersonalDetails,
    );
    data.proposer = {
      ...mappedDataProposer,
      image: '',
    };

    switch (Number(electionTypeId)) {
      case ELECTION_INFO.UPAZILLA.ID:
        data.proposer.upazilaId = mappedDataProposer?.constituencyId;
        break;

      default:
        break;
    }
    data.candidateElectionAndPersonalDetails = mappedDataCandidate;
    createCandidateNominationFormFirstPartInfo({
      electionSettingsId,
      candidateElectionDetailsId,
      data,
    });
  };
  const buttonDisabled = methods.watch(`proposer.${PROPOSER.IS_AGREE}`);

  return (
    <FormProvider {...methods}>
      <form className="container" onSubmit={methods.handleSubmit(onSubmit)}>
        <SectionHeader
          title={t('FIRST_PART.PROGRESS_STEPS_FIRST_PART')}
          subtitle={t('FIRST_PART.FORM_SUBTITLE')}
        />

        <div className="rounded-4 p-9 bg-light my-9">
          <Text weight="medium" size="lg" color="title">
            {t('NOMINATION_FORM_FIRST_PART.SUPPORTER_PART')}
          </Text>
        </div>

        <div className="d-flex flex-column gap-8 pt-9">
          <FormInput
            title="FIRST_PART.FIND_CANDIDATE"
            registerName={`proposer.${
              idType === ID_TYPE.NID
                ? PROPOSER.NID_NUMBER
                : PROPOSER.VOTER_NUMBER
            }`}
            key={
              idType === ID_TYPE.NID
                ? PROPOSER.NID_NUMBER
                : PROPOSER.VOTER_NUMBER
            }
            placeholder="PLACEHOLDER.ENTER"
            select
            selectValue={idType}
            selectOption={nidOptions}
            onSelectionChange={(e) => {
              setIdType(e.target.value);
              setValue(`proposer.${PROPOSER.ID_TYPE}`, e.target.value);
            }}
            required
          />
          <input
            {...register(`proposer.${PROPOSER.ID_TYPE}`)}
            value={idType}
            hidden
          />
          <FormInput
            title="FIRST_PART.ME"
            registerName={`proposer.${PROPOSER.NAME}`}
            placeholder={t('PLACEHOLDER.PROPOSERS_NAME')}
          />
          <FormInput
            title="FIRST_PART.SERIAL_NUMBER"
            subtitle="FIRST_PART.SERIAL_NUMBER_SUBTITLE"
            registerName={`proposer.${PROPOSER.SERIAL_NUMBER}`}
            placeholder={t('PLACEHOLDER.ENTER')}
          />
          <FormDate
            name={PROPOSER.BIRTH_DATE}
            title="FIRST_PART.BIRTH_DATE"
            subtitle="FIRST_PART.BIRTH_DATE_SUBTITLE"
            placeholder={t('PLACEHOLDER.SELECT')}
            registerName={`proposer.${PROPOSER.BIRTH_DATE}`}
            prefix={<IconCalendar size="20" fill="subtitle2" />}
            maximumDate={dayjs()}
            required
          />
          <FormSelect
            title="FIRST_PART.DEPARTMENT"
            subtitle="FIRST_PART.DEPARTMENT_SUBTITLE"
            name={`proposer.${PROPOSER.REGION_ID}`}
            options={electionSchedulesRegions}
            placeholder={t('PLACEHOLDER.SELECT')}
            clearValue={resetData.region}
            resetData={() =>
              emptyBelowData({
                ...optionRegion,
              })
            }
            clearOptions={resetData.regionOption}
          />
          <FormSelect
            title="FIRST_PART.DISTRICT_NAME"
            subtitle="FIRST_PART.DISTRICT_NAME_SUBTITLE"
            name={`proposer.${PROPOSER.ZILLA_ID}`}
            options={candidateTypeDistrict}
            // disabled={regionChange ? false : true}
            placeholder={t('PLACEHOLDER.ENTER')}
            clearValue={resetData.zilla}
            resetData={() =>
              emptyBelowData({
                ...optionZilla,
                zilla: false,
                constituencyOption: false,
              })
            }
            clearOptions={resetData.zillaOption}
            required
          />

          <ElectionSpecificComponents
            zillaId={zillaChange as number}
            candidateNominationFormFirstPart={candidateNominationFormFirstPart}
          />

          <div className="d-flex gap-9 bg-primary-50 p-9 rounded-4 align-items-center">
            <input
              type="checkbox"
              {...methods.register(`proposer.${PROPOSER.IS_AGREE}`)}
            />

            <Text color="title" size="sm" weight="medium">
              {t('FIRST_PART.CONSENT')}
            </Text>
          </div>

          <div className="border-top pt-8">
            <div className="col-12 d-flex justify-content-end gap-6">
              <Button
                fill="outline"
                className="border-info"
                type="info"
                onClick={() => reset()}
              >
                {t('NOMINATION_FORM_FIRST_PART.RESET_BUTTON')}
                <IconRefreshCcw01 size="20" fill="info" />
              </Button>
              <Button
                fill="fill"
                className="border-primary"
                type="success"
                loading={isCreateRequested}
                disabled={!buttonDisabled as boolean}
                htmlType="submit"
              >
                {t('NOMINATION_FORM_FIRST_PART.SUBMIT_BUTTON')}
                <IconCheckCircleBroken size="20" fill="white" />
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default FirstPart;
