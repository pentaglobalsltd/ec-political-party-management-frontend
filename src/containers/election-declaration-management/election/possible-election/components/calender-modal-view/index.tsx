import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Text } from '@pentabd/ui';
import { ElectionCalenderEventDetails } from '@type/election-declaration-management/election/possible-election/possible-election';

const CalenderModalView = ({
  data,
  handleCloseModal,
}: {
  data: {
    date: number;
    title: string;
    type: number;
    eventDetails?: ElectionCalenderEventDetails;
    eventName?: string;
  };
  handleCloseModal: () => void;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/election-declaration-management/election-settings');
  };

  return (
    <div className="p-12">
      <div className="d-flex justify-content-center">
        <Text weight="semibold" size="md">
          {data?.eventName}
        </Text>
      </div>
      <div className="col-span-lg-4">
        <div className="d-grid grid-cols-lg-1 mt-16 gap-3">
          <div className="d-flex flex-row justify-content-between">
            <Text>
              {t(
                'SCHEDULE_DECLARATION.SCHEDULE_INFORMATION_FORM.NOMINATION_SUBMISSION_LAST_DATE',
              )}
            </Text>
            <Text weight="semibold">
              {data?.eventDetails?.nominationSubmissionDate}
            </Text>
          </div>
          <div className="d-flex flex-row justify-content-between">
            <Text>
              {t(
                'SCHEDULE_DECLARATION.SCHEDULE_INFORMATION_FORM.NOMINATION_SELECTION_DATE',
              )}
            </Text>
            <Text weight="semibold">
              {data?.eventDetails?.nominationSelectionStartDate}
            </Text>
          </div>
          <div className="d-flex flex-row justify-content-between">
            <Text>
              {t('SCHEDULE_DECLARATION.SCHEDULE_INFORMATION_FORM.APPEAL_DATE')}
            </Text>
            <Text weight="semibold">
              {data?.eventDetails?.appealSubmissionDate}
            </Text>
          </div>
          <div className="d-flex flex-row justify-content-between">
            <Text>
              {t(
                'SCHEDULE_DECLARATION.SCHEDULE_INFORMATION_FORM.APPEAL_JUDGEMENT_DATE',
              )}
            </Text>
            <Text weight="semibold">
              {data?.eventDetails?.appealJudgementDate}
            </Text>
          </div>
          <div className="d-flex flex-row justify-content-between">
            <Text>
              {t(
                'SCHEDULE_DECLARATION.SCHEDULE_INFORMATION_FORM.CANDIDACY_WITHDRAWAL_LAST_DATE',
              )}
            </Text>
            <Text weight="semibold">
              {data?.eventDetails?.nominationWithdrawalDate}
            </Text>
          </div>
          <div className="d-flex flex-row justify-content-between">
            <Text>
              {t(
                'SCHEDULE_DECLARATION.SCHEDULE_INFORMATION_FORM.SYMBOL_ALLOCATION_DATE',
              )}
            </Text>
            <Text weight="semibold">
              {data?.eventDetails?.symbolAssignationDate}
            </Text>
          </div>
          <div className="d-flex flex-row justify-content-between">
            <Text>
              {t('SCHEDULE_DECLARATION.SCHEDULE_INFORMATION_FORM.POLLING_DATE')}
            </Text>
            <Text weight="semibold">{data?.eventDetails?.electionDate}</Text>
          </div>
          <div className="d-flex flex-row justify-content-between">
            <Text>
              {t('SCHEDULE_DECLARATION.SCHEDULE_INFORMATION_FORM.POLLING_TIME')}
            </Text>
            <Text weight="semibold">
              {data?.eventDetails?.voteCastingStartTime} -{' '}
              {data?.eventDetails?.voteCastingEndTime}
            </Text>
          </div>
        </div>
        <div className="d-grid grid-cols-2 gap-5 pt-10">
          <Button htmlType="submit" type="light" onClick={handleCloseModal}>
            {t('POSSIBLE_ELECTION.MODAL.CANCEL_BUTTON')}
          </Button>
          <Button htmlType="button" type="primary" onClick={handleNavigate}>
            {t('POSSIBLE_ELECTION.MODAL.OPEN_SETTINGS_BUTTON')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalenderModalView;
