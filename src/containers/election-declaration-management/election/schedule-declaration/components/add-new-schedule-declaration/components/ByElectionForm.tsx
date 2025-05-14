import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import classnames from 'classnames';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  IconArrowLeft,
  IconCalendar,
  IconCheckCircleBroken,
  IconRefreshCcw01,
} from '@pentabd/icons';
import { Button, Text } from '@pentabd/ui';

import FormDate from '@components/inputs/FormDate';
import FormTextArea from '@components/inputs/FormTextArea';
import { FORM_FIELDS } from '@constants/forms';

import {
  ByElectionDataType,
  byElectionValidation,
} from '@validations/election-declaration-management/election/add-new-schedule/byElectionValidation';

import { PropsScheduleInfoForm } from '..';
import { useAppSelector } from '@helpers/redux';
import { getElectionSchedule } from '@selectors/election-schedule-management/election-schedule';
import { useCreateScheduleDeclaration } from '@hooks/election-schedule-management/election/election-schedule/useCreateScheduleDeclaration';
import { useGetElectionScheduleById } from '@hooks/election-schedule-management/election/election-schedule/useGetElectionScheduleById';
import { useUpdateScheduleDeclaration } from '@hooks/election-schedule-management/election/election-schedule/useUpdateScheduleDeclaration';

const SCHEDULE_DECLARATION =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.ELECTION.SCHEDULE_DECLARATION;

const ByElectionForm = ({ handleGoToPreviousForm }: PropsScheduleInfoForm) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { createElectionSchedule, updateElectionSchedule } =
    useAppSelector<any>(getElectionSchedule);
  const { scheduleDeclarationCreate, loading, success } =
    useCreateScheduleDeclaration();
  const { scheduleDeclarationUpdate, updateSuccess } =
    useUpdateScheduleDeclaration();
  const { electionSchedule, getElectionScheduleData } =
    useGetElectionScheduleById();

  useEffect(() => {
    if (id) {
      getElectionScheduleData(id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const methods = useForm<ByElectionDataType>({
    resolver: yupResolver(byElectionValidation),
    values: electionSchedule as ByElectionDataType,
  });
  const { handleSubmit, reset, register, watch } = methods;
  const showForm = watch(SCHEDULE_DECLARATION.BY_ELECTION);
  useEffect(() => {
    if (success || updateSuccess) {
      navigate(-1);
    }
  }, [success, navigate, updateSuccess]);

  const onSubmit: SubmitHandler<ByElectionDataType> = (postData: any) => {
    let data;
    if (id) {
      data = {
        ...postData,
        ...updateElectionSchedule,
      };
    } else {
      data = {
        ...postData,
        ...createElectionSchedule,
      };
    }

    if (id) {
      if (data?.isActive === 'isActive') {
        data.isActive = true;
      } else {
        data.isActive = false;
      }
    }

    if (data?.isOnlineNomination === 'active') {
      data.isOnlineNomination = true;
    } else {
      data.isOnlineNomination = false;
    }

    if (id) {
      scheduleDeclarationUpdate(data, id);
    } else {
      scheduleDeclarationCreate(data);
    }
  };

  const goToPreviousForm = () => {
    handleGoToPreviousForm && handleGoToPreviousForm();
  };

  return (
    <div className="container-90 vh-100">
      <FormProvider {...methods}>
        <form
          className="d-flex flex-column justify-content-between h-75"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="border rounded-8 px-md-12 pt-md-18 mb-12">
            <div
              className={classnames(`d-grid grid-cols-12 mb-12 pb-16 pt-7`, {
                'border-bottom': showForm,
              })}
            >
              <div className="col-span-3">
                <Text weight="semibold" size="sm" color="title" component="p">
                  {t('SCHEDULE_DECLARATION.PROGRESS_STEP.BY_ELECTION')}
                </Text>
              </div>
              <div className="col-span-9 col-span-lg-6">
                <input
                  type="checkbox"
                  id={SCHEDULE_DECLARATION.BY_ELECTION}
                  {...register(SCHEDULE_DECLARATION.BY_ELECTION)}
                />
              </div>
            </div>

            {showForm && (
              <>
                <FormDate
                  title="SCHEDULE_DECLARATION.SEAT_VACANCY_DATE"
                  name={SCHEDULE_DECLARATION.SEAT_VACANCY_DATE}
                  placeholder={t('PLACEHOLDER.SELECT')}
                  registerName={SCHEDULE_DECLARATION.SEAT_VACANCY_DATE}
                  prefix={<IconCalendar size="20" fill="subtitle2" />}
                />
                <FormTextArea
                  title="SCHEDULE_DECLARATION.REASON_OF_BY_ELECTION"
                  registerName={SCHEDULE_DECLARATION.REASON_OF_BY_ELECTION}
                />
                <FormTextArea
                  title="SCHEDULE_DECLARATION.REMARK_ON_BY_ELECTION"
                  registerName={SCHEDULE_DECLARATION.REMARK_ON_BY_ELECTION}
                />
              </>
            )}
          </div>

          <div className="d-flex justify-content-end gap-6 border-top py-12">
            <Button
              fill="transparent"
              className="border"
              type="light"
              onClick={goToPreviousForm}
            >
              <IconArrowLeft size="20" fill="title" />
              {t('SCHEDULE_DECLARATION.PREVIOUS_TAB')}
            </Button>
            <Button
              fill="outline"
              className="border-info"
              type="info"
              onClick={() => reset()}
            >
              {t('SCHEDULE_DECLARATION.RESET')}
              <IconRefreshCcw01 size="20" fill="info" />
            </Button>
            <Button
              fill="fill"
              className="border-primary"
              type="success"
              htmlType="submit"
              loading={loading}
            >
              {t('SCHEDULE_DECLARATION.SUBMIT')}
              <IconCheckCircleBroken size="20" fill="white" />
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ByElectionForm;
