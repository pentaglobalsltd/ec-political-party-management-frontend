import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';

import FormSelect from '@components/inputs/FormSelect';
import ElectionSpecificComponents from './election-specific-components';

import { FORM_FIELDS } from '@constants/forms';
import useElectionSchedules from '@hooks/miscellaneous/core-hook/election-schedule/useElectionSchedules';
import useElectionTypesMaster from '@hooks/miscellaneous/master-hook/election-type/useElectionTypesMaster';
import { UserSpecificComponentProps } from '../../types';

const ELECTION_USER = FORM_FIELDS.USER_MANAGEMENT.CREATE_ELECTION_USER;

export const DataEntryOperator = ({
  userId,
  userRoleWatch,
  reeditNomination,
  postReeditNominationPermission,
  setUserRoleValidation,
  userProfileById,
  viewProfile = false,
}: UserSpecificComponentProps) => {
  const { t } = useTranslation();
  const { watch, clearErrors } = useFormContext();

  const { electionTypesMaster, getElectionTypesMasterData } =
    useElectionTypesMaster();
  const { electionSchedules, getElectionSchedulesData } =
    useElectionSchedules();

  const electionTypeWatch = watch(
    ELECTION_USER.ASSISTANT_RETURNING_OFFICER.TYPE_OF_ELECTION,
  );
  const electionScheduleWatch = watch(
    ELECTION_USER.ASSISTANT_RETURNING_OFFICER.ELECTION_NAME,
  );

  useEffect(() => {
    if (userRoleWatch && electionTypeWatch) {
      clearErrors();
      setUserRoleValidation({ userRoleWatch, electionTypeWatch });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRoleWatch, electionTypeWatch]);

  useEffect(() => {
    getElectionTypesMasterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (electionTypeWatch) {
      getElectionSchedulesData(electionTypeWatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionTypeWatch]);

  return (
    <div>
      <div className="border mb-9"></div>
      <FormSelect
        title={t('ELECTION_USER.DATA_ENTRY_OPERATOR.TYPE_OF_ELECTION')}
        name={ELECTION_USER.DATA_ENTRY_OPERATOR.TYPE_OF_ELECTION}
        options={electionTypesMaster}
        disabled={viewProfile}
        isSearchable
      />

      <FormSelect
        title={t('ELECTION_USER.DATA_ENTRY_OPERATOR.ELECTION_NAME')}
        name={ELECTION_USER.DATA_ENTRY_OPERATOR.ELECTION_NAME}
        disabled={!electionTypeWatch || viewProfile}
        options={electionSchedules}
        isSearchable
      />

      <ElectionSpecificComponents
        electionScheduleWatch={electionScheduleWatch}
        electionTypeWatch={electionTypeWatch}
        userRoleWatch={userRoleWatch}
        viewProfile={viewProfile}
        userId={userId}
        userProfileById={userProfileById}
        reeditNomination={reeditNomination}
        setUserRoleValidation={setUserRoleValidation}
        postReeditNominationPermission={postReeditNominationPermission}
      />
    </div>
  );
};
