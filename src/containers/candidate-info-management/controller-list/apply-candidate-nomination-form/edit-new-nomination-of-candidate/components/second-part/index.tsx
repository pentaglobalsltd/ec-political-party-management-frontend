import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation, Trans } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, SectionHeader, Text } from '@pentabd/ui';
import {
  IconCalendar,
  IconCheckCircleBroken,
  IconRefreshCcw01,
} from '@pentabd/icons';

import useElectionSchedulesRegions from '@hooks/miscellaneous/core-hook/region/useElectionSchedulesRegions';
import useElectionSchedulesCandidateTypeZillas from '@hooks/miscellaneous/core-hook/zilla/useCandiateTypeZillas';

import { FORM_FIELDS } from '@constants/forms';
import { ELECTION_INFO } from '@constants/election-info';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { useCandidateNominationFormSecondPart } from '@hooks/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/useCandidateNominationFormSecondParts';
import FormInput from '@components/inputs/FormInput';
import FormDate from '@components/inputs/FormDate';
import FormSelect from '@components/inputs/FormSelect';
import { secondPartValidationSchemaType } from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/second-part';
import { candidateNameMapping } from '@helpers/candidate-type';
import { electionNameMapping } from '@helpers/election-type';

import { useSecondPartValidation } from './useSecondPartValidation';
import { mapSecondPart, nidOptions } from '../../filterData';
import ElectionSpecificComponents from './election-specific-components';
import {
  ID_TYPE,
  allSelectedData,
  optionRegion,
  optionZilla,
} from '../../../constants';

type Props = {
  handleCurrent: (step: number) => void;
};
const SECOND_PART =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.SECOND_PART
    .SUPPORTER;

const SecondPart = ({ handleCurrent }: Props) => {
  const [idType, setIdType] = useState(ID_TYPE.NID);
  const { t } = useTranslation();
  const {
    electionSettingsId,
    candidateElectionDetailsId,
    candidateTypeId,
    electionTypeId,
    scheduleId,
  } = useParams();

  const electionTypeKey = electionNameMapping(Number(electionTypeId));
  const candidateTypeKey = candidateNameMapping(Number(candidateTypeId));

  const { electionSchedulesRegions, getElectionSchedulesRegionsData } =
    useElectionSchedulesRegions();
  const {
    candidateTypeDistrict,
    getElectionSchedulesCandidateTypeDistrictData,
  } = useElectionSchedulesCandidateTypeZillas();

  const { language } = useLanguage();
  const { validationSchema } = useSecondPartValidation();

  const {
    isCreateRequested,
    candidateNominationFormSecondPart,
    createCandidateNominationFormSecondPart,
    isCreateSuccess,
    createSecondPartInitialStateHandler,
    getSecondPartInitialStateHandler,
  } = useCandidateNominationFormSecondPart({
    electionSettingsId,
    candidateElectionDetailsId,
  });

  const [resetData, setResetData] = useState({
    ...allSelectedData,
  });

  const emptyBelowData = (newData: { [name: string]: boolean }) => {
    setResetData((data: any) => ({
      ...data,
      ...newData,
    }));
  };

  const methods = useForm<secondPartValidationSchemaType>({
    resolver: yupResolver(validationSchema),
    values: {
      supporter: candidateNominationFormSecondPart?.supporter,
    } as secondPartValidationSchemaType,
  });
  const {
    watch,
    reset,
    setValue,
    register,
    formState: { errors },
  } = methods;
  console.log({ errors });

  const regionChange = watch(`supporter.${SECOND_PART.REGION_ID}`);
  const zillaChange = watch(`supporter.${SECOND_PART.ZILLA_ID}`);
  const buttonDisabled = watch(`supporter.${SECOND_PART.IS_AGREE}`);

  useEffect(() => {
    getElectionSchedulesRegionsData(Number(scheduleId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (candidateNominationFormSecondPart?.supporter) {
      if (
        candidateNominationFormSecondPart?.supporter?.voterNo &&
        candidateNominationFormSecondPart?.supporter?.nid === ''
      ) {
        setIdType(ID_TYPE.VOTER_NO);
        setValue(
          `supporter.${SECOND_PART.VOTER_NUMBER}`,
          candidateNominationFormSecondPart?.supporter?.voterNo,
        );
      }
    }
  }, [
    candidateNominationFormSecondPart?.supporter,
    candidateNominationFormSecondPart?.supporter?.voterNo,
    setValue,
  ]);

  useEffect(() => {
    if (isCreateSuccess) {
      createSecondPartInitialStateHandler();
      methods.reset();
      handleCurrent(2);
    }

    return () => {
      getSecondPartInitialStateHandler();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreateSuccess, methods]);

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

  const onSubmit: SubmitHandler<any> = (postData: any) => {
    const data: any = {};

    postData.supporter.candidateType =
      candidateNominationFormSecondPart?.candidateElectionAndPersonalDetails?.candidateType;

    const mappedData = mapSecondPart(postData?.supporter, idType);
    data.supporter = { ...mappedData, image: '' };

    switch (Number(electionTypeId)) {
      case ELECTION_INFO.UPAZILLA.ID:
        data.supporter.upazilaId = mappedData?.constituencyId;
        break;

      default:
        break;
    }

    data.candidateElectionAndPersonalDetails =
      candidateNominationFormSecondPart?.candidateElectionAndPersonalDetails;

    createCandidateNominationFormSecondPart({
      electionSettingsId,
      candidateElectionDetailsId,
      data,
    });
  };

  return (
    <FormProvider {...methods}>
      <form className="container" onSubmit={methods.handleSubmit(onSubmit)}>
        <SectionHeader
          title={t('FIRST_PART.PROGRESS_STEPS_SECOND_PART')}
          subtitle={t('SECOND_PART.FORM_SUBTITLE')}
        />

        <div className="rounded-4 p-9 bg-light my-9">
          <Text weight="medium" size="lg" color="title">
            {t('NOMINATION_FORM_SECOND_PART.SUPPORTER_PART')}
          </Text>
        </div>

        <div className="d-flex flex-column gap-8 pt-9">
          <div className="border-bottom">
            <FormInput
              title="SECOND_PART.FIND_SUPPORTER"
              registerName={`supporter.${
                idType === ID_TYPE.NID
                  ? SECOND_PART.NID_NUMBER
                  : SECOND_PART.VOTER_NUMBER
              }`}
              placeholder="PLACEHOLDER.ENTER"
              key={
                idType === ID_TYPE.NID
                  ? SECOND_PART.NID_NUMBER
                  : SECOND_PART.VOTER_NUMBER
              }
              select
              selectValue={idType}
              selectOption={nidOptions}
              onSelectionChange={(e) => {
                setIdType(e.target.value);
                setValue(`supporter.${SECOND_PART.ID_TYPE}`, e.target.value);
              }}
              required
            />
            <input
              {...register(`supporter.${SECOND_PART.ID_TYPE}`)}
              value={idType}
              hidden
            />
            <FormInput
              title="SECOND_PART.SUPPORTER_NAME"
              registerName={`supporter.${SECOND_PART.NAME}`}
              placeholder={t('PLACEHOLDER.SUPPORTERS_NAME')}
              // disabled
            />
            <FormInput
              title="SECOND_PART.SERIAL_NUMBER"
              subtitle="SECOND_PART.SERIAL_NUMBER_SUBTITLE"
              registerName={`supporter.${SECOND_PART.SERIAL_NUMBER}`}
              placeholder="PLACEHOLDER.ENTER"
            />
            <FormDate
              name={SECOND_PART.BIRTH_DATE}
              title="SECOND_PART.BIRTH_DATE"
              subtitle="SECOND_PART.BIRTH_DATE_SUBTITLE"
              placeholder={t('PLACEHOLDER.SELECT')}
              registerName={`supporter.${SECOND_PART.BIRTH_DATE}`}
              prefix={<IconCalendar size="20" fill="subtitle2" />}
              maximumDate={dayjs()}
              required
            />
            <FormSelect
              title="SECOND_PART.DEPARTMENT"
              subtitle="SECOND_PART.DEPARTMENT_SUBTITLE"
              name={`supporter.${SECOND_PART.REGION_ID}`}
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
              title="SECOND_PART.DISTRICT_NAME"
              subtitle="SECOND_PART.DISTRICT_NAME_SUBTITLE"
              name={`supporter.${SECOND_PART.ZILLA_ID}`}
              options={candidateTypeDistrict}
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
              candidateNominationFormSecondPart={
                candidateNominationFormSecondPart
              }
            />
          </div>

          <div className="rounded-4 p-9 bg-light">
            <Text weight="medium" size="lg" color="title">
              {t('NOMINATION_FORM_SECOND_PART.CANDIDATE_PART')}
            </Text>
          </div>

          <div className="d-flex gap-9 bg-primary-50 p-9 rounded-4 align-items-center ">
            <input
              type="checkbox"
              {...methods.register(`supporter.${SECOND_PART.IS_AGREE}`)}
            />
            <div>
              <Text color="title" size="sm" weight="bold">
                <Trans
                  i18nKey={`SECOND_PART.CONSENT.${electionTypeKey}.${candidateTypeKey}`}
                  values={{
                    ELECTION_PLACE:
                      candidateNominationFormSecondPart
                        ?.candidateElectionAndPersonalDetails?.constituency?.[
                        language === LANGUAGE.BANGLA ? 'nameBn' : 'nameEn'
                      ],
                    ELECTION_NAME:
                      candidateNominationFormSecondPart
                        ?.candidateElectionAndPersonalDetails
                        ?.electionSchedule?.[
                        language === LANGUAGE.BANGLA ? 'nameBn' : 'nameEn'
                      ],
                    CANDIDATE_NAME:
                      candidateNominationFormSecondPart
                        ?.candidateElectionAndPersonalDetails?.name,
                    CANDIDATE_ADDRESS:
                      candidateNominationFormSecondPart
                        ?.candidateElectionAndPersonalDetails?.candidateAddress,
                    CANDIDATE_VOTER_NUMBER:
                      candidateNominationFormSecondPart
                        ?.candidateElectionAndPersonalDetails?.voterNo,
                    CANDIDATE_TYPE:
                      candidateNominationFormSecondPart
                        ?.candidateElectionAndPersonalDetails?.candidateType?.[
                        language === LANGUAGE.BANGLA ? 'nameBn' : 'nameEn'
                      ],
                  }}
                  components={{
                    div: <div className="pb-7"></div>,
                    text: <Text color="primary"></Text>,
                    span: <span className="text-danger"></span>,
                  }}
                ></Trans>
              </Text>
            </div>
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
                htmlType="submit"
                disabled={!buttonDisabled as boolean}
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

export default SecondPart;
