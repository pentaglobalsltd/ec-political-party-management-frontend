import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  IconCalendar,
  IconCheckCircleBroken,
  IconTrash01,
} from '@pentabd/icons';
import { Button, ConfirmationModal, Header, Text } from '@pentabd/ui';
import FileComponent from '@components/inputs/FileComponent';
import FormDate from '@components/inputs/FormDate';

import {
  NewElectionSettingsDataType,
  newElectionSettingsValidation,
} from '@validations/election-declaration-management/election/electionSettingsValidation';
import useUpdateElectionSettingsById from '@hooks/election-schedule-management/election/election-settings/useUpdateElectionSettingsById';
import { FORM_FIELDS } from '@constants/forms';
import FormSelect from '@components/inputs/FormSelect';
import { editElectionSettingsBreadcrumbs } from './constants';
import useGetElectionSettingsById from '@hooks/election-schedule-management/election/election-settings/useGetElectionSettingsById';
import { VOTING_TYPE } from '../CreateElectionSettings/constants';
import { useNominationListSearch } from '@hooks/advanced-search-hook/useNominationListSearchHook';
import { useDeleteElectionSettings } from '@hooks/election-schedule-management/election/election-settings/useDeleteElectionSettings';
import { useEffect, useState } from 'react';
import { FILE_CATEGORY } from '@constants/file';

const ELECTION_SETTINGS =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.ELECTION.ELECTION_SETTINGS;

function EditElectionSettings() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deleteElectionSettings, isDeleteSuccess } =
    useDeleteElectionSettings();
  const { currentElectionSettings } = useGetElectionSettingsById(id);
  const { updateElectionSettingsById, success, loading } =
    useUpdateElectionSettingsById();
  const { t } = useTranslation();
  const [confirmModelOpen, setConfirmModelOpen] = useState(false);
  const [disableButton, setDisableButton] = useState<boolean>(false);

  const methods = useForm<NewElectionSettingsDataType>({
    resolver: yupResolver(newElectionSettingsValidation),
    values: currentElectionSettings as any,
  });

  useEffect(() => {
    if (isDeleteSuccess || success) {
      navigate(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteSuccess, success]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;
  console.log({ errors });

  const confirmDelete = () => {
    deleteElectionSettings(id as string);
  };

  const closeModal = () => {
    setConfirmModelOpen(false);
  };

  const electionTypeWatch = watch(ELECTION_SETTINGS.ELECTION_TYPE) as string;
  const electionScheduleWatch = watch(
    ELECTION_SETTINGS.ELECTION_NAME,
  ) as string;
  const { electionTypesMaster, electionSchedules, electionCandidateTypes } =
    useNominationListSearch({
      electionTypeWatch,
      electionScheduleWatch,
      inputs: {
        electionType: true,
        electionName: true,
        candidateType: true,
      },
    });

  const submitElectionSettingsForm = (data: any) => {
    data.electionScheduleId = parseInt(data.electionScheduleId);
    data.candidateTypeId = parseInt(data.candidateTypeId);

    let votingType;
    if (data.electionByEvm) {
      data.votingType = VOTING_TYPE.EVM;
    } else {
      data.votingType = VOTING_TYPE.BALLOT;
    }

    const formData = {
      electionScheduleId: parseInt(data.electionScheduleId),
      candidateTypeId: parseInt(data.candidateTypeId),
      votingType,
      ...data,
    };

    updateElectionSettingsById({ electionSettingsId: id, data: formData });
  };

  const handleButtonDisable = (value: boolean) => {
    setDisableButton(value);
  };

  return (
    <div className="container-96 mb-24 py-9">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submitElectionSettingsForm)}>
          <Header
            className="mb-10 pt-10"
            headerText={{
              // header: t('ELECTION_SETTINGS.NEW_ELECTION_SETTINGS'),
              header: `${currentElectionSettings?.electionSettingsNameBn}`,
            }}
            breadcrumbs={editElectionSettingsBreadcrumbs(t)}
          />

          <div className="d-flex flex-column gap-8 p-9 border rounded-5">
            {/* নির্বাচনের ধরন */}
            <FormSelect
              title={t('ELECTION_SETTINGS.ELECTION_TYPE')}
              name={ELECTION_SETTINGS.ELECTION_TYPE}
              options={electionTypesMaster}
              disabled
            />

            {/* নির্বাচনের নাম */}
            <FormSelect
              title={t('ELECTION_SETTINGS.ELECTION_NAME')}
              name={ELECTION_SETTINGS.ELECTION_NAME}
              options={electionSchedules}
              disabled
            />

            {/* প্রার্থীর ধরন */}
            <FormSelect
              title={t('ELECTION_SETTINGS.CANDIDATE_TYPE')}
              name={ELECTION_SETTINGS.CANDIDATE_TYPE}
              options={electionCandidateTypes}
              disabled
            />

            {/* Last Date of nomination submission */}
            <FormDate
              name={ELECTION_SETTINGS.NOMINATION_SUBMISSION_LAST_DATE}
              title="ELECTION_SETTINGS.NOMINATION_SUBMISSION_LAST_DATE"
              placeholder={t('PLACEHOLDER.SELECT')}
              registerName={ELECTION_SETTINGS.NOMINATION_SUBMISSION_LAST_DATE}
              prefix={<IconCalendar size="20" fill="subtitle2" />}
              isTimePicker
            />

            {/* schedule file upload */}
            <FileComponent
              title={t('ELECTION_SETTINGS.SCHEDULE_FILE_UPLOAD')}
              registerName={ELECTION_SETTINGS.SCHEDULE_FILE_UPLOAD}
              handleButtonDisable={handleButtonDisable}
              pathId={electionScheduleWatch}
              category={FILE_CATEGORY.SCHEDULES}
            />

            <div className="d-flex flex-column gap-8 pt-9 border-top">
              <div className="row">
                <div className="col-3">
                  <Text weight="bold" size="sm" color="title">
                    {t('ELECTION_SETTINGS.AREA_VOTE_CENTER')}
                  </Text>
                </div>
                <div className="col-9 col-lg-7">
                  <input
                    type="checkbox"
                    id={ELECTION_SETTINGS.AREA_VOTE_CENTER}
                    {...register(ELECTION_SETTINGS.AREA_VOTE_CENTER)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-3">
                  <Text weight="bold" size="sm" color="title">
                    {t('ELECTION_SETTINGS.ELECTION_BY_TAB')}
                  </Text>
                </div>
                <div className="col-9 col-lg-7">
                  <input
                    type="checkbox"
                    id={ELECTION_SETTINGS.ELECTION_BY_TAB}
                    {...register(ELECTION_SETTINGS.ELECTION_BY_TAB)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-3">
                  <Text weight="bold" size="sm" color="title">
                    {t('ELECTION_SETTINGS.ELECTION_BY_EVM')}
                  </Text>
                </div>
                <div className="col-9 col-lg-7">
                  <input
                    type="checkbox"
                    id={ELECTION_SETTINGS.ELECTION_BY_EVM}
                    {...register(ELECTION_SETTINGS.ELECTION_BY_EVM)}
                  />
                </div>
              </div>

              {/* সক্রিয় */}
              <div className="row">
                <div className="col-3">
                  <Text weight="bold" size="sm" color="title">
                    {t('ELECTION_SETTINGS.STATUS')}
                  </Text>
                </div>
                <div className="col-9 col-lg-7">
                  <input
                    type="checkbox"
                    id={ELECTION_SETTINGS.IS_ACTIVE}
                    {...register(ELECTION_SETTINGS.IS_ACTIVE)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end align-items-center gap-6 border-top pt-8">
            {/* লিস্ট থেকে মুছে ফেলুন  */}
            <Button
              fill="outline"
              key={1}
              htmlType="button"
              type="info"
              onClick={() => setConfirmModelOpen(true)}
            >
              {t('ELECTION_SETTINGS.REMOVE_FROM_LIST')}
              <IconTrash01 size="20" fill="info" />
            </Button>

            {/* সংরক্ষণ করুন */}
            <Button
              key={2}
              htmlType="submit"
              type="info"
              loading={loading}
              disabled={disableButton}
            >
              {t('ELECTION_SETTINGS.SAVE')}
              <IconCheckCircleBroken size="20" fill="light" />
            </Button>
          </div>
        </form>
      </FormProvider>
      <ConfirmationModal
        title={t('SCHEDULE_DECLARATION.DELETE')}
        cancelButton={{
          onClick: closeModal,
          fill: 'outline',
          type: 'primary',
          label: t('SCHEDULE_DECLARATION.MODAL_CANCEL'),
        }}
        confirmButton={{
          onClick: confirmDelete,
          fill: 'fill',
          type: 'danger',
          label: t('SCHEDULE_DECLARATION.MODAL_SUCCESS'),
        }}
        isOpen={confirmModelOpen}
        closeAble
        onClose={closeModal}
      />
    </div>
  );
}

export default EditElectionSettings;
