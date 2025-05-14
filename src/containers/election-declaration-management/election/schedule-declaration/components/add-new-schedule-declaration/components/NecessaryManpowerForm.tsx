import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IconArrowRight, IconRefreshCcw01 } from '@pentabd/icons';
import { Button } from '@pentabd/ui';

import { createElectionSchedule } from '@reducers/election-schedule-management/create-election-schedule';
import {
  NecessaryManpowerDataType,
  necessaryManpowerValidation,
} from '@validations/election-declaration-management/election/add-new-schedule/necessaryManpowerValidation';
import FormInput from '@components/inputs/FormInput';
import { FORM_FIELDS } from '@constants/forms';
import { useGetElectionScheduleById } from '@hooks/election-schedule-management/election/election-schedule/useGetElectionScheduleById';
import { updateElectionSchedule } from '@reducers/election-schedule-management/update-election-schedule';
import { ElectionScheduleType } from '@type/election-declaration-management/election/election-schedule/election-schedule';
import { necessaryManpowerMappedData } from '../../../constants';
import { PropsScheduleInfoForm } from '..';

const SCHEDULE_DECLARATION =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.ELECTION.SCHEDULE_DECLARATION;

const NecessaryManpowerForm = ({
  handleGoToNextForm,
}: PropsScheduleInfoForm) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { electionSchedule, getElectionScheduleData } =
    useGetElectionScheduleById();

  useEffect(() => {
    if (id) {
      getElectionScheduleData(id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const methods = useForm<NecessaryManpowerDataType>({
    resolver: yupResolver(necessaryManpowerValidation),
    values: electionSchedule as NecessaryManpowerDataType,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<NecessaryManpowerDataType> = (
    data: ElectionScheduleType,
  ) => {
    if (data.totalReturningOfficer)
      data.totalReturningOfficer = parseInt(
        data.totalReturningOfficer as string,
      );

    if (data.totalAssistantReturningOfficer)
      data.totalAssistantReturningOfficer = parseInt(
        data.totalAssistantReturningOfficer as string,
      );

    if (data.totalPresidingOfficer)
      data.totalPresidingOfficer = parseInt(
        data.totalPresidingOfficer as string,
      );

    if (data.totalAssistantPresidingOfficer)
      data.totalAssistantPresidingOfficer = parseInt(
        data.totalAssistantPresidingOfficer as string,
      );

    if (data.totalPollingOfficer)
      data.totalPollingOfficer = parseInt(data.totalPollingOfficer as string);

    if (id) {
      const updatedData = necessaryManpowerMappedData(data);
      dispatch(updateElectionSchedule(updatedData));
    } else {
      dispatch(createElectionSchedule(data));
    }
    handleGoToNextForm && handleGoToNextForm();
  };

  return (
    <div className="container-90 my-10">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="border rounded-8 ps-md-12 pt-md-18 mb-16">
            <FormInput
              title="SCHEDULE_DECLARATION.RETURNING_OFFICER"
              placeholder={t('PLACEHOLDER.ENTER')}
              registerName={SCHEDULE_DECLARATION.RETURNING_OFFICER}
            />
            <FormInput
              title="SCHEDULE_DECLARATION.ASSISTANT_RETURNING_OFFICER"
              placeholder={t('PLACEHOLDER.ENTER')}
              registerName={SCHEDULE_DECLARATION.ASSISTANT_RETURNING_OFFICER}
            />
            <FormInput
              title="SCHEDULE_DECLARATION.PRESIDING_OFFICER"
              placeholder={t('PLACEHOLDER.ENTER')}
              registerName={SCHEDULE_DECLARATION.PRESIDING_OFFICER}
            />
            <FormInput
              title="SCHEDULE_DECLARATION.ASSISTANT_PRESIDING_OFFICER"
              placeholder={t('PLACEHOLDER.ENTER')}
              registerName={SCHEDULE_DECLARATION.ASSISTANT_PRESIDING_OFFICER}
            />
            <FormInput
              title="SCHEDULE_DECLARATION.POLLING_OFFICER"
              placeholder={t('PLACEHOLDER.ENTER')}
              registerName={SCHEDULE_DECLARATION.POLLING_OFFICER}
            />
          </div>
          <div className="d-flex justify-content-end gap-6">
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
              className="border-info"
              type="info"
              htmlType="submit"
            >
              {t('SCHEDULE_DECLARATION.NEXT_TAB')}
              <IconArrowRight size="20" fill="white" />
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default NecessaryManpowerForm;
