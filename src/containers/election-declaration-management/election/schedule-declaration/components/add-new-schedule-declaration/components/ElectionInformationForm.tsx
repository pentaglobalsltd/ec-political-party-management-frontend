import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { IconArrowRight, IconCalendar, IconRefreshCcw01 } from '@pentabd/icons';
import { Button } from '@pentabd/ui';

import {
  ElectionInfoDataType,
  electionInfoValidation,
} from '@validations/election-declaration-management/election/add-new-schedule/electionInfoValidation';

import FormInput from '@components/inputs/FormInput';
import { FORM_FIELDS } from '@constants/forms';
import { createElectionSchedule } from '@reducers/election-schedule-management/create-election-schedule';
import { useGetElectionScheduleById } from '@hooks/election-schedule-management/election/election-schedule/useGetElectionScheduleById';
import { updateElectionSchedule } from '@reducers/election-schedule-management/update-election-schedule';
import { ElectionScheduleType } from '@type/election-declaration-management/election/election-schedule/election-schedule';
import FormDate from '@components/inputs/FormDate';
import { electionInformationMappedData } from '../../../constants';
import { PropsScheduleInfoForm } from '..';

const SCHEDULE_DECLARATION =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.ELECTION.SCHEDULE_DECLARATION;

const ElectionInformationForm = ({
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
  const methods = useForm<ElectionInfoDataType>({
    resolver: yupResolver(electionInfoValidation),
    values: electionSchedule as ElectionInfoDataType,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<ElectionInfoDataType> = (
    data: ElectionScheduleType,
  ) => {
    if (data.minimumAge) data.minimumAge = parseInt(data.minimumAge as string);
    if (data.totalRegion)
      data.totalRegion = parseInt(data.totalRegion as string);
    if (data.totalDistrict)
      data.totalDistrict = parseInt(data.totalDistrict as string);
    if (data.totalPollingCenter)
      data.totalPollingCenter = parseInt(data.totalPollingCenter as string);
    if (data.totalPollingBooth)
      data.totalPollingBooth = parseInt(data.totalPollingBooth as string);
    if (data.totalSeat) data.totalSeat = parseInt(data.totalSeat as string);

    if (id) {
      const updatedData = electionInformationMappedData(data);

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
              title="SCHEDULE_DECLARATION.MINIMUM_AGE"
              placeholder={t('PLACEHOLDER.ENTER')}
              registerName={SCHEDULE_DECLARATION.MINIMUM_AGE}
              required
            />

            <FormDate
              title="SCHEDULE_DECLARATION.DATE_UPTO_WHICH_AGE_WILL_BE_CALCULATED"
              name={SCHEDULE_DECLARATION.DATE_UPTO_WHICH_AGE_WILL_BE_CALCULATED}
              placeholder={t('PLACEHOLDER.SELECT')}
              registerName={
                SCHEDULE_DECLARATION.DATE_UPTO_WHICH_AGE_WILL_BE_CALCULATED
              }
              prefix={<IconCalendar size="20" fill="subtitle2" />}
              required
            />

            <FormInput
              title="SCHEDULE_DECLARATION.TOTAL_DIVISIONS"
              placeholder={t('PLACEHOLDER.ENTER')}
              registerName={SCHEDULE_DECLARATION.TOTAL_REGIONS}
            />
            <FormInput
              title="SCHEDULE_DECLARATION.TOTAL_DISTRICTS"
              placeholder={t('PLACEHOLDER.ENTER')}
              registerName={SCHEDULE_DECLARATION.TOTAL_DISTRICTS}
            />
            <FormInput
              title="SCHEDULE_DECLARATION.VOTE_CENTER"
              placeholder={t('PLACEHOLDER.ENTER')}
              registerName={SCHEDULE_DECLARATION.POLLING_CENTER}
            />
            <FormInput
              title="SCHEDULE_DECLARATION.POLLING_BOOTH"
              placeholder={t('PLACEHOLDER.ENTER')}
              registerName={SCHEDULE_DECLARATION.POLLING_BOOTH}
            />
            <FormInput
              title="SCHEDULE_DECLARATION.SEAT_NUMBERS"
              placeholder={t('PLACEHOLDER.ENTER')}
              registerName={SCHEDULE_DECLARATION.SEAT_NUMBERS}
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

export default ElectionInformationForm;
