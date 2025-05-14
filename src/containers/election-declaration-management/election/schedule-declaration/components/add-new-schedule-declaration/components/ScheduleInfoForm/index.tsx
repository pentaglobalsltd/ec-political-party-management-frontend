import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  IconArrowNarrowRight,
  IconCalendar,
  IconChevronDown,
  IconRefreshCcw01,
} from '@pentabd/icons';
import { Button, Text } from '@pentabd/ui';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { yupResolver } from '@hookform/resolvers/yup';
import FileComponent from '@components/inputs/FileComponent';

import {
  ScheduleInfoDataType,
  scheduleInfoValidation,
} from '@validations/election-declaration-management/election/add-new-schedule/scheduleInfoValidation';
import FormDate from '@components/inputs/FormDate';
import FormDateDouble from '@components/inputs/FormDateDouble';
import FormSelect from '@components/inputs/FormSelect';
import FormInputDouble from '@components/inputs/FormInputDouble';
import { PropsScheduleInfoForm } from '../..';
import FormTextArea from '@components/inputs/FormTextArea';
import FormRadio from '@components/inputs/FormRadio';
import { FORM_FIELDS } from '@constants/forms';
import FormTimeDouble from '@components/inputs/FormTimeDouble';
import { createElectionSchedule } from '@reducers/election-schedule-management/create-election-schedule';
import useElectionTypesMaster from '@hooks/miscellaneous/master-hook/election-type/useElectionTypesMaster';
import { useGetElectionScheduleById } from '@hooks/election-schedule-management/election/election-schedule/useGetElectionScheduleById';
import { updateElectionSchedule } from '@reducers/election-schedule-management/update-election-schedule';
import { scheduleFormMappedData } from '../../../../constants';
import { ElectionScheduleType } from '@type/election-declaration-management/election/election-schedule/election-schedule';
import { Convert12HrTo24Hr } from '@utils/time-converter';
import {
  addTimeInDate,
  addTimeInDateOfElection,
  FORMAT_END,
  FORMAT_START,
} from '@utils/date-converter';
import {
  isActiveOption,
  isOnlineNomination,
  tScheduleInfoForm,
} from './constants';
import { FILE_CATEGORY } from '@constants/file';

const SCHEDULE_DECLARATION =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.ELECTION.SCHEDULE_DECLARATION;

const ScheduleInfoForm = ({ handleGoToNextForm }: PropsScheduleInfoForm) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { electionTypesMaster, getElectionTypesMasterData } =
    useElectionTypesMaster();
  const [disableButton, setDisableButton] = useState<boolean>(false);

  const { electionSchedule, getElectionScheduleData } =
    useGetElectionScheduleById();

  useEffect(() => {
    getElectionTypesMasterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (id) {
      getElectionScheduleData(id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const methods = useForm<ScheduleInfoDataType>({
    resolver: yupResolver(scheduleInfoValidation),
    values: electionSchedule as ScheduleInfoDataType,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data: ElectionScheduleType) => {
    const mappedData = { ...data };

    if (data.voteCastingStartTime) {
      mappedData.voteCastingStartTime = Convert12HrTo24Hr(
        data.voteCastingStartTime as string,
      );
    } else delete mappedData.voteCastingStartTime;

    if (data.voteCastingEndTime) {
      mappedData.voteCastingEndTime = Convert12HrTo24Hr(
        data.voteCastingEndTime as string,
      );
    } else delete mappedData.voteCastingEndTime;

    if (data.dateOfDeclaration) {
      mappedData.dateOfDeclaration = addTimeInDate({
        dateFormat: data.dateOfDeclaration as string,
        format: FORMAT_START,
      });
    } else delete mappedData.dateOfDeclaration;

    if (data.dateOfNominationSubmission) {
      mappedData.dateOfNominationSubmission = addTimeInDate({
        dateFormat: data.dateOfNominationSubmission as string,
        format: FORMAT_END,
      });
    } else delete mappedData.dateOfNominationSubmission;

    if (data.dateOfNominationSelectionStart) {
      mappedData.dateOfNominationSelectionStart = addTimeInDate({
        dateFormat: data.dateOfNominationSelectionStart as string,
        format: FORMAT_START,
      });
    } else delete mappedData.dateOfNominationSelectionStart;

    if (data.dateOfNominationSelectionEnd) {
      mappedData.dateOfNominationSelectionEnd = addTimeInDate({
        dateFormat: data.dateOfNominationSelectionEnd as string,
        format: FORMAT_END,
      });
    } else delete mappedData.dateOfNominationSelectionEnd;

    if (data.dateOfAppealSubmission) {
      mappedData.dateOfAppealSubmission = addTimeInDate({
        dateFormat: data.dateOfAppealSubmission as string,
        format: FORMAT_START,
      });
    } else delete mappedData.dateOfAppealSubmission;

    if (data.dateOfAppealJudgement) {
      mappedData.dateOfAppealJudgement = addTimeInDate({
        dateFormat: data.dateOfAppealJudgement as string,
        format: FORMAT_START,
      });
    } else delete mappedData.dateOfAppealJudgement;

    if (data.dateOfNominationWithdrawal) {
      mappedData.dateOfNominationWithdrawal = addTimeInDate({
        dateFormat: data.dateOfNominationWithdrawal as string,
        format: FORMAT_END,
      });
    } else delete mappedData.dateOfNominationWithdrawal;

    if (data.dateOfElection) {
      mappedData.dateOfElection = addTimeInDateOfElection({
        dateFormat: data.dateOfElection as string,
        format: FORMAT_START,
      });
    } else delete mappedData.dateOfElection;

    if (data.dateOfAssignedSymbol) {
      mappedData.dateOfAssignedSymbol = addTimeInDate({
        dateFormat: data.dateOfAssignedSymbol as string,
        format: FORMAT_START,
      });
    } else delete mappedData.dateOfAssignedSymbol;

    if (data.dateOfGazette) {
      mappedData.dateOfGazette = addTimeInDate({
        dateFormat: data.dateOfGazette as string,
        format: FORMAT_START,
      });
    } else delete mappedData.dateOfGazette;

    if (id) {
      const updatedData = scheduleFormMappedData(mappedData);
      dispatch(updateElectionSchedule(updatedData));
    } else {
      dispatch(createElectionSchedule(mappedData));
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    handleGoToNextForm && handleGoToNextForm();
  };

  const handleResetForm = () => {
    reset();
  };

  const handleButtonDisable = (value: boolean) => {
    setDisableButton(value);
  };

  return (
    <div className="my-10">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex flex-column gap-8 p-10 border rounded-8 ">
            {/* নির্বাচনের নাম || নির্বাচনের ধরণ  || বিজ্ঞপ্তি তারিখ */}
            <div className="border-bottom">
              {/* নির্বাচনের ধরণ */}
              <FormSelect
                title={`${tScheduleInfoForm}.ELECTION_TYPE`}
                name={SCHEDULE_DECLARATION.ELECTION_TYPE}
                options={electionTypesMaster}
                suffix={<IconChevronDown size="20" fill="subtitle2" />}
                required
              />
              {/* নির্বাচনের নাম  */}
              <FormInputDouble
                title={`${tScheduleInfoForm}.ELECTION_NAME`}
                placeholder={t('PLACEHOLDER.ENTER')}
                registerName={{
                  type1: SCHEDULE_DECLARATION.ELECTION_NAME_BANGLA,
                  type2: SCHEDULE_DECLARATION.ELECTION_NAME_ENGLISH,
                }}
                inputLabel1={`${tScheduleInfoForm}.ELECTION_NAME_2.IN_BANGLA`}
                inputLabel2={`${tScheduleInfoForm}.ELECTION_NAME_2.IN_ENGLISH`}
                required1
              />
              {/* বিজ্ঞপ্তি তারিখ */}
              <FormDate
                title={`${tScheduleInfoForm}.CIRCULAR_DATE`}
                name={SCHEDULE_DECLARATION.DATE_OF_DECLARATION}
                placeholder={t('PLACEHOLDER.SELECT')}
                registerName={SCHEDULE_DECLARATION.DATE_OF_DECLARATION}
                prefix={<IconCalendar size="20" fill="subtitle2" />}
                isTimePicker
                required
              />
            </div>

            {/* মনোনয়নপত্র দাখিলের শেষ তারিখ || মনোনয়নপত্র বাছাইয়ের তারিখ */}
            <div className="border-bottom">
              {/* মনোনয়নপত্র বাছাইয়ের তারিখ */}
              <FormDate
                title={`${tScheduleInfoForm}.NOMINATION_SUBMISSION_LAST_DATE`}
                name={SCHEDULE_DECLARATION.NOMINATION_SUBMISSION_LAST_DATE}
                placeholder={t('PLACEHOLDER.SELECT')}
                registerName={
                  SCHEDULE_DECLARATION.NOMINATION_SUBMISSION_LAST_DATE
                }
                prefix={<IconCalendar size="20" fill="subtitle2" />}
                isTimePicker
                required
              />

              {/* মনোনয়নপত্র বাছাইয়ের তারিখ */}
              <FormDateDouble
                title={`${tScheduleInfoForm}.NOMINATION_SELECTION_DATE`}
                name={
                  SCHEDULE_DECLARATION.NOMINATION_SELECTION_DATE_RANGE_START
                }
                placeholder={t('PLACEHOLDER.SELECT')}
                registerName={{
                  type1:
                    SCHEDULE_DECLARATION.NOMINATION_SELECTION_DATE_RANGE_START,
                  type2:
                    SCHEDULE_DECLARATION.NOMINATION_SELECTION_DATE_RANGE_END,
                }}
                inputLabel1={`${tScheduleInfoForm}.NOMINATION_SELECTION_DATE_RANGE.START`}
                inputLabel2={`${tScheduleInfoForm}.NOMINATION_SELECTION_DATE_RANGE.END`}
                prefix={<IconCalendar size="20" fill="subtitle2" />}
                isTimePicker
              />
            </div>

            {/* আপিলের তারিখ || আপিলের রায় প্রদানের তারিখ*/}
            <div className="border-bottom">
              {/* আপিলের তারিখ */}
              <FormDate
                title={`${tScheduleInfoForm}.APPEAL_DATE`}
                name={SCHEDULE_DECLARATION.APPEAL_DATE}
                placeholder={t('PLACEHOLDER.SELECT')}
                registerName={SCHEDULE_DECLARATION.APPEAL_DATE}
                prefix={<IconCalendar size="20" fill="subtitle2" />}
                isTimePicker
              />

              {/* আপিলের রায় প্রদানের তারিখ */}
              <FormDate
                title={`${tScheduleInfoForm}.APPEAL_JUDGEMENT_DATE`}
                name={SCHEDULE_DECLARATION.APPEAL_JUDGEMENT_DATE}
                placeholder={t('PLACEHOLDER.SELECT')}
                registerName={SCHEDULE_DECLARATION.APPEAL_JUDGEMENT_DATE}
                prefix={<IconCalendar size="20" fill="subtitle2" />}
                isTimePicker
              />
            </div>

            {/* প্রার্থিতা প্রত্যাহারের শেষ তারিখ || প্রতীক বরাদ্দের তারিখ */}
            <div className="border-bottom">
              {/* প্রার্থিতা প্রত্যাহারের শেষ তারিখ */}
              <FormDate
                title={`${tScheduleInfoForm}.CANDIDACY_WITHDRAWAL_LAST_DATE`}
                name={SCHEDULE_DECLARATION.NOMINATION_WITHDRAWAL_LAST_DATE}
                placeholder={t('PLACEHOLDER.SELECT')}
                registerName={
                  SCHEDULE_DECLARATION.NOMINATION_WITHDRAWAL_LAST_DATE
                }
                prefix={<IconCalendar size="20" fill="subtitle2" />}
                isTimePicker
              />

              {/* প্রতীক বরাদ্দের তারিখ  */}
              <FormDate
                title={`${tScheduleInfoForm}.SYMBOL_ALLOCATION_DATE`}
                name={SCHEDULE_DECLARATION.SYMBOL_ALLOCATION_DATE}
                placeholder={t('PLACEHOLDER.SELECT')}
                registerName={SCHEDULE_DECLARATION.SYMBOL_ALLOCATION_DATE}
                prefix={<IconCalendar size="20" fill="subtitle2" />}
                isTimePicker
              />
            </div>

            {/* ভোট গ্রহণের তারিখ || প্রজ্ঞাপন জারির তারিখ || ভোট গ্রহণের সময়সূচী */}
            <div className="border-bottom">
              {/* ভোট গ্রহণের তারিখ  */}
              <FormDate
                title={`${tScheduleInfoForm}.POLLING_DATE`}
                name={SCHEDULE_DECLARATION.DATE_OF_ELECTION}
                placeholder={t('PLACEHOLDER.SELECT')}
                registerName={SCHEDULE_DECLARATION.DATE_OF_ELECTION}
                prefix={<IconCalendar size="20" fill="subtitle2" />}
                required
              />

              {/* প্রজ্ঞাপন জারির তারিখ */}
              <FormDate
                title={`${tScheduleInfoForm}.NOTIFICATION_ISSUE_DATE`}
                name={SCHEDULE_DECLARATION.DATE_OF_GAZETTE}
                placeholder={t('PLACEHOLDER.SELECT')}
                registerName={SCHEDULE_DECLARATION.DATE_OF_GAZETTE}
                prefix={<IconCalendar size="20" fill="subtitle2" />}
                isTimePicker
              />

              {/* ভোট গ্রহণের সময়সূচী  */}
              <FormTimeDouble
                title={`${tScheduleInfoForm}.POLLING_TIME`}
                name={SCHEDULE_DECLARATION.VOTE_CASTING_START_TIME}
                placeholder={t('PLACEHOLDER.SELECT')}
                registerName={{
                  type1: SCHEDULE_DECLARATION.VOTE_CASTING_START_TIME,
                  type2: SCHEDULE_DECLARATION.VOTE_CASTING_END_TIME,
                }}
                inputLabel1={`${tScheduleInfoForm}.POLLING_TIME_RANGE.START`}
                inputLabel2={`${tScheduleInfoForm}.POLLING_TIME_RANGE.END`}
                prefix={<IconCalendar size="20" fill="subtitle2" />}
                required
              />
            </div>

            {/* তফসিল কপি আপলোড করুন || অন্যান্য ফাইল আপলোড */}
            <div className="border-bottom">
              {/* তফসিল কপি আপলোড করুন  */}
              <FileComponent
                title={t(`${tScheduleInfoForm}.UPLOAD_SCHEDULE_COPY`)}
                registerName={SCHEDULE_DECLARATION.UPLOAD_SCHEDULE_COPY}
                handleButtonDisable={handleButtonDisable}
                required
                maxFileSize={25}
                category={FILE_CATEGORY.SCHEDULES}
              />

              {/* অন্যান্য ফাইল আপলোড */}
              <FileComponent
                title={t(`${tScheduleInfoForm}.UPLOAD_OTHER_FILES`)}
                registerName={SCHEDULE_DECLARATION.UPLOAD_OTHER_FILES}
                handleButtonDisable={handleButtonDisable}
                maxFileSize={25}
                category={FILE_CATEGORY.SCHEDULES}
              />
            </div>

            {/* অবস্থা  */}
            {id ? (
              <FormRadio
                options={isActiveOption(t)}
                title={`${tScheduleInfoForm}.IS_ACTIVE`}
                name={SCHEDULE_DECLARATION.IN_ACTIVE}
                id={SCHEDULE_DECLARATION.IN_ACTIVE}
                required
              />
            ) : null}

            {/* অনলাইন নমিনেশন  */}
            <FormRadio
              options={isOnlineNomination(t)}
              title={`${tScheduleInfoForm}.ONLINE_NOMINATION`}
              name={SCHEDULE_DECLARATION.ONLINE_NOMINATION}
              id={SCHEDULE_DECLARATION.ONLINE_NOMINATION}
              required
            />

            {/* তফসিল মন্তব্য  */}
            <FormTextArea
              title={`${tScheduleInfoForm}.REMARKS_ON_SCHEDULE`}
              registerName={SCHEDULE_DECLARATION.REMARKS_ON_SCHEDULE}
            />
          </div>

          {/* buttons & copyright */}
          <div className="d-flex flex-row justify-content-between border-top mt-10 pt-10">
            {/* copyright */}
            <div className="py-3 my-auto">
              <Text weight="semibold" size="sm" color="subtitle2">
                {t(`${tScheduleInfoForm}.FOOTER_COPYRIGHT`)}
              </Text>
            </div>

            {/* btns */}
            <div>
              {/* reset */}
              <Button
                fill="outline"
                key={1}
                htmlType="button"
                type="info"
                className="mx-5"
                onClick={handleResetForm}
              >
                <Text size="sm" weight="semibold">
                  {t(`${tScheduleInfoForm}.RESET_BUTTON`)}
                </Text>
                <IconRefreshCcw01 size="20" fill="info" />
              </Button>

              {/* next tab */}
              <Button
                key={2}
                htmlType="submit"
                type="info"
                className="mx-5"
                disabled={disableButton}
              >
                <Text size="sm" weight="semibold">
                  {t(`${tScheduleInfoForm}.NEXT_TAB`)}
                </Text>
                <IconArrowNarrowRight size="20" fill="white" />
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ScheduleInfoForm;
