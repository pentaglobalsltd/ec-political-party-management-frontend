import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Header } from '@pentabd/ui';

import { Button, Text } from '@pentabd/ui';
import { yupResolver } from '@hookform/resolvers/yup';

import FileComponent from '@components/inputs/FileComponent';
import FormDate from '@components/inputs/FormDate';
import FormSelect from '@components/inputs/FormSelect';
import { FORM_FIELDS } from '@constants/forms';

import {
  IconCalendar,
  IconCheckCircleBroken,
  IconChevronDown,
} from '@pentabd/icons';
import {
  CreateElectionInfoDataType,
  createElectionInfoValidation,
} from '@validations/election-declaration-management/election-process/add-schedule-info/createElectionInfoValidation';
import FormTextArea from '@components/inputs/FormTextArea';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useElectionAreaReorganized } from '@hooks/election-schedule-management/election-process/election-area-reorganized/useElectionAreaReorganized';
import { useCreateElectionSettingsDetails } from '@hooks/election-schedule-management/election-process/data-provider-info/add-schedule-info/useCreateElectionSettingsDetails';
import { ElectionSettingsDetailsById } from '@type/election-declaration-management/election-process/election-settings-details';
import useGetElectionSettingsDetailsById from '@hooks/election-schedule-management/election-process/data-provider-info/add-schedule-info/useGetElectionSettingsDetailsById';
import useUpdateElectionSettingsDetailsById from '@hooks/election-schedule-management/election-process/data-provider-info/add-schedule-info/useUpdateElectionSettingsDetails';
import { FILE_CATEGORY } from '@constants/file';
import { getBreadcrumbs } from '../constants';

const tCreateElectionForm = 'ADD_SCHEDULE_INFO.CREATE_ELECTION_INFO';
const { ELECTION_SCHEDULE_MANAGEMENT } = FORM_FIELDS;
const { CREATE_ELECTION_INFO } = ELECTION_SCHEDULE_MANAGEMENT;

const CreateElectionInfo = () => {
  const { t } = useTranslation();
  const { electionSettingsId, electionSettingsDetailsId } = useParams();

  const navigate = useNavigate();
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const { electionAreaReorganized, getElectionAreaReorganizedData } =
    useElectionAreaReorganized();
  const { createElectionSettingsDetailsData, loading, success } =
    useCreateElectionSettingsDetails();
  const { getElectionSettingsDetailsByIdData, electionSettingsDetails } =
    useGetElectionSettingsDetailsById();
  const { updateElectionSettingsDetailsById, updateLoading, updateSuccess } =
    useUpdateElectionSettingsDetailsById();

  useEffect(() => {
    if (electionSettingsDetailsId) {
      getElectionSettingsDetailsByIdData(electionSettingsDetailsId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionSettingsDetailsId]);

  useEffect(() => {
    getElectionAreaReorganizedData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (success || updateSuccess) {
      navigate(-1);
    }
  }, [navigate, success, updateSuccess]);

  const methods = useForm<CreateElectionInfoDataType>({
    resolver: yupResolver(createElectionInfoValidation),
    values: electionSettingsDetails as any,
  });

  const { handleSubmit, watch, setValue } = methods;

  const firstMeetingDateWatch = watch(CREATE_ELECTION_INFO.FIRST_MEETING_DATE);

  const handleButtonDisable = (value: boolean) => {
    setDisableButton(value);
  };

  const submitForm = (data: ElectionSettingsDetailsById) => {
    const formData = {
      ...data,
      isCaseAvailable:
        data?.caseLastInfoFile != null &&
        Object.keys(data?.caseLastInfoFile).length > 0,
    };

    if (electionSettingsId) {
      createElectionSettingsDetailsData({
        ...formData,
        electionSettingsId: Number(electionSettingsId),
      });
    } else if (electionSettingsDetailsId) {
      updateElectionSettingsDetailsById({
        data: { ...formData },
        electionSettingsDetailsId,
      });
    }
  };

  useEffect(() => {
    if (firstMeetingDateWatch) {
      const nextElectionDate = dayjs(firstMeetingDateWatch?.toString())
        .add(5, 'year')
        .format('YYYY-MM-DD');
      setValue(CREATE_ELECTION_INFO.NEXT_ELECTION_DATE, nextElectionDate);
    } else {
      setValue(CREATE_ELECTION_INFO.NEXT_ELECTION_DATE, undefined);
    }
  }, [firstMeetingDateWatch]);

  return (
    <div className="container-96 mb-24">
      <div className="my-5">
        <Header breadcrumbs={getBreadcrumbs(t)} />
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="d-flex flex-column gap-8 p-10 border rounded-8 ">
            {/* ফলাফল গেজেটের তারিখ */}
            <FormDate
              title={`${tCreateElectionForm}.RESULT_GAZETTE_DATE`}
              name={CREATE_ELECTION_INFO.RESULT_GAZETTE_DATE}
              registerName={CREATE_ELECTION_INFO.RESULT_GAZETTE_DATE}
              prefix={<IconCalendar size="20" fill="subtitle2" />}
              required
            />

            {/* ফলাফল গেজেটের ফাইল */}
            <FileComponent
              title={t(`${tCreateElectionForm}.RESULT_GAZETTE_FILE`)}
              registerName={CREATE_ELECTION_INFO.RESULT_GAZETTE_FILE}
              handleButtonDisable={handleButtonDisable}
              category={FILE_CATEGORY.SCHEDULES}
            />

            {/* শপথ গ্রহণের তারিখ */}
            <FormDate
              title={`${tCreateElectionForm}.OATH_DATE`}
              name={CREATE_ELECTION_INFO.SWEAR_DATE}
              registerName={CREATE_ELECTION_INFO.SWEAR_DATE}
              prefix={<IconCalendar size="20" fill="subtitle2" />}
              required
            />

            {/* শপথ গ্রহণের ফাইল */}
            <FileComponent
              title={t(`${tCreateElectionForm}.OATH_FILE`)}
              registerName={CREATE_ELECTION_INFO.SWEAR_FILE}
              handleButtonDisable={handleButtonDisable}
              category={FILE_CATEGORY.SCHEDULES}
            />

            {/* প্রথম সভার তারিখ */}
            <FormDate
              title={`${tCreateElectionForm}.FIRST_MEETING_DATE`}
              name={CREATE_ELECTION_INFO.FIRST_MEETING_DATE}
              registerName={CREATE_ELECTION_INFO.FIRST_MEETING_DATE}
              prefix={<IconCalendar size="20" fill="subtitle2" />}
              required
            />

            {/* প্রথম সভার ফাইল */}
            <FileComponent
              title={t(`${tCreateElectionForm}.FIRST_MEETING_FILE`)}
              registerName={CREATE_ELECTION_INFO.FIRST_MEETING_FILE}
              handleButtonDisable={handleButtonDisable}
              category={FILE_CATEGORY.SCHEDULES}
            />

            {/* সর্বশেষ মামলা সংকান্ত তথ্য */}
            <FormTextArea
              title={`${tCreateElectionForm}.LATEST_CASE_DETAIL`}
              registerName={CREATE_ELECTION_INFO.LATEST_CASE_DETAIL}
            />

            {/* সর্বশেষ মামলা সংকান্ত তথ্য ফাইল */}
            <FileComponent
              title={t(`${tCreateElectionForm}.LATEST_CASE_FILE`)}
              registerName={CREATE_ELECTION_INFO.LATEST_CASE_FILE}
              handleButtonDisable={handleButtonDisable}
              category={FILE_CATEGORY.SCHEDULES}
            />

            {/* নির্বাচনী আসন পুনর্বিন্যাস */}
            <FormSelect
              title={`${tCreateElectionForm}.ELECTORAL_SEAT_FULL_CONFIG`}
              name={CREATE_ELECTION_INFO.ELECTORAL_AREA_REORGANIZED}
              options={electionAreaReorganized}
              suffix={<IconChevronDown size="20" fill="subtitle2" />}
              placeholder="PLACEHOLDER.SELECT"
            />

            {/* পরবর্তী নির্বাচন অনুষ্ঠানের তারিখ */}
            <FormDate
              title={`${tCreateElectionForm}.NEXT_ELECTION_DATE`}
              name={CREATE_ELECTION_INFO.NEXT_ELECTION_DATE}
              registerName={CREATE_ELECTION_INFO.NEXT_ELECTION_DATE}
              prefix={<IconCalendar size="20" fill="subtitle2" />}
              disabled
            />

            {/* পরবর্তী পুনঃনির্বাচন তারিখ */}
            <FormDate
              title={`${tCreateElectionForm}.NEXT_GENERAL_ELECTION_DATE`}
              name={CREATE_ELECTION_INFO.NEXT_GENERAL_ELECTION_DATE}
              registerName={CREATE_ELECTION_INFO.NEXT_GENERAL_ELECTION_DATE}
              prefix={<IconCalendar size="20" fill="subtitle2" />}
            />
          </div>

          {/* buttons */}
          <div className="d-flex flex-row justify-content-end border-top my-10 pt-10">
            {/* save button */}
            <Button
              key={2}
              htmlType="submit"
              type="success"
              className="mx-5"
              disabled={disableButton}
              loading={loading || updateLoading}
            >
              <Text size="sm" weight="bold">
                {t(`${tCreateElectionForm}.SAVE_BUTTON`)}
              </Text>
              <IconCheckCircleBroken size="20" fill="white" />
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateElectionInfo;
