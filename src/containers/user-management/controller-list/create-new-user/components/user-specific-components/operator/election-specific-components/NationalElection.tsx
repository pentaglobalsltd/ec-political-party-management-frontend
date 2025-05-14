import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';

import FormSelect from '@components/inputs/FormSelect';
import FormSwitch from '@components/inputs/FormSwitch';

import { FORM_FIELDS } from '@constants/forms';
import useElectionSchedulesZillas from '@hooks/miscellaneous/core-hook/zilla/useElecionScheduleZillas';
import useElectionSchedulesConstituencies from '@hooks/miscellaneous/core-hook/constituency/useElectionScheduleConstituency';
import { CreateNewOpType } from './types';

const ELECTION_USER = FORM_FIELDS.USER_MANAGEMENT.CREATE_ELECTION_USER;

const NationalElection = (props: CreateNewOpType) => {
  const { t } = useTranslation();
  const { watch } = useFormContext();

  const {
    electionScheduleWatch,
    userId,
    viewProfile,
    reeditNomination,
    postReeditNominationPermission,
  } = props;

  const { electionSchedulesZillas, getElectionSchedulesDistrictData } =
    useElectionSchedulesZillas();
  const { constituencies, getElectionSchedulesConstituenciesData } =
    useElectionSchedulesConstituencies();

  const districtWatch = watch(
    ELECTION_USER.ASSISTANT_RETURNING_OFFICER.DISTRICT,
  );

  useEffect(() => {
    if (electionScheduleWatch) {
      getElectionSchedulesDistrictData(electionScheduleWatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionScheduleWatch]);

  useEffect(() => {
    if (electionScheduleWatch && districtWatch) {
      const electionSettingsValue = true;
      getElectionSchedulesConstituenciesData(
        electionScheduleWatch,
        districtWatch,
        electionSettingsValue,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionScheduleWatch, districtWatch]);

  return (
    <>
      <FormSelect
        title={t('ELECTION_USER.DATA_ENTRY_OPERATOR.DISTRICT')}
        name={ELECTION_USER.DATA_ENTRY_OPERATOR.DISTRICT}
        disabled={!electionScheduleWatch || viewProfile}
        options={electionSchedulesZillas}
        isSearchable
      />

      <FormSelect
        title={t('ELECTION_USER.DATA_ENTRY_OPERATOR.CONSTITUENCY')}
        name={ELECTION_USER.DATA_ENTRY_OPERATOR.ELECTION_SETTINGS}
        disabled={(!electionScheduleWatch && !districtWatch) || viewProfile}
        options={constituencies}
        isSearchable
        isMulti
      />

      <FormSwitch
        title={t('ELECTION_USER.DATA_ENTRY_OPERATOR.RE_EDIT')}
        id="permission"
        name="permission"
        checked={reeditNomination}
        controlling
        onChange={(e) => {
          if (userId) {
            postReeditNominationPermission({
              userId: userId,
              isActive: e.target.checked,
            });
          }
        }}
      />
    </>
  );
};

export default NationalElection;
