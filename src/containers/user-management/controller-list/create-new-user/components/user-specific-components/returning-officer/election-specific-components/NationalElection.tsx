import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';

import FormSelect from '@components/inputs/FormSelect';

import { FORM_FIELDS } from '@constants/forms';
import useElectionSchedulesZillas from '@hooks/miscellaneous/core-hook/zilla/useElecionScheduleZillas';
import useElectionSchedulesConstituencies from '@hooks/miscellaneous/core-hook/constituency/useElectionScheduleConstituency';
import { CreateNewRoType } from './types';

const ELECTION_USER = FORM_FIELDS.USER_MANAGEMENT.CREATE_ELECTION_USER;

const NationalElection = (props: CreateNewRoType) => {
  const { t } = useTranslation();
  const { watch } = useFormContext();

  const { electionScheduleWatch, viewProfile } = props;

  const { electionSchedulesZillas, getElectionSchedulesDistrictData } =
    useElectionSchedulesZillas();
  const { constituencies, getElectionSchedulesConstituenciesData } =
    useElectionSchedulesConstituencies();

  const districtWatch = watch(ELECTION_USER.RETURNING_OFFICER.DISTRICT);

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
        title={t('ELECTION_USER.RETURNING_OFFICER.DISTRICT')}
        name={ELECTION_USER.RETURNING_OFFICER.DISTRICT}
        disabled={!electionScheduleWatch || viewProfile}
        options={electionSchedulesZillas}
        isSearchable
      />

      <FormSelect
        title={t('ELECTION_USER.RETURNING_OFFICER.ELECTION_SETTINGS')}
        name={ELECTION_USER.RETURNING_OFFICER.ELECTION_SETTINGS}
        disabled={(!electionScheduleWatch && !districtWatch) || viewProfile}
        options={constituencies}
        isMulti
        isSearchable
      />
    </>
  );
};

export default NationalElection;
