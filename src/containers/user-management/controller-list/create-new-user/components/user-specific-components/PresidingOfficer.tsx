import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';

import FormSelect from '@components/inputs/FormSelect';

import { FORM_FIELDS } from '@constants/forms';
import useElectionSchedules from '@hooks/miscellaneous/core-hook/election-schedule/useElectionSchedules';
import { useUnionsOrWards } from '@hooks/miscellaneous/master-hook/union-or-ward/useUnionsOrWardsSelect';

import useElectionTypesMaster from '@hooks/miscellaneous/master-hook/election-type/useElectionTypesMaster';
import { useConstituencyUpazila } from '@hooks/miscellaneous/master-hook/constituency/useConstituencyUpazilas';
import useElectionSchedulesZillas from '@hooks/miscellaneous/core-hook/zilla/useElecionScheduleZillas';
import useElectionSchedulesConstituencies from '@hooks/miscellaneous/core-hook/constituency/useElectionScheduleConstituency';
import { usePollingCenterAggregatedSelect } from '@hooks/vote-center-management/center-management/polling-center/usePollingCenterAggregatedSelect';
import { ELECTION_TYPE } from '../../../constants';

const ELECTION_USER = FORM_FIELDS.USER_MANAGEMENT.CREATE_ELECTION_USER;

export const PresidingOfficer = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();

  const { electionTypesMaster, getElectionTypesMasterData } =
    useElectionTypesMaster();
  const { electionSchedules, getElectionSchedulesData } =
    useElectionSchedules();
  const { electionSchedulesZillas, getElectionSchedulesDistrictData } =
    useElectionSchedulesZillas();
  const { constituencies, getElectionSchedulesConstituenciesData } =
    useElectionSchedulesConstituencies();
  const { upazilas, getConstituenciesUpazilaData } = useConstituencyUpazila();
  const { unionsOrWards, getUnionsOrWardsData } = useUnionsOrWards();
  const { pollingCenterAggregated, getPollingCenterAggregatedData } =
    usePollingCenterAggregatedSelect();

  const { NATIONAL_ELECTION } = ELECTION_TYPE;

  const electionTypeWatch = watch(
    ELECTION_USER.PRESIDING_OFFICER.TYPE_OF_ELECTION,
  );
  const electionScheduleWatch = watch(
    ELECTION_USER.PRESIDING_OFFICER.ELECTION_NAME,
  );
  const districtWatch = watch(ELECTION_USER.PRESIDING_OFFICER.DISTRICT);
  const subDistrictWatch = watch(ELECTION_USER.PRESIDING_OFFICER.UPAZILA);
  const unionWatch = watch(ELECTION_USER.PRESIDING_OFFICER.UNION);
  const constituencyWatch = watch(
    ELECTION_USER.PRESIDING_OFFICER.ELECTION_SETTINGS,
  );

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

  useEffect(() => {
    if (constituencyWatch) {
      getConstituenciesUpazilaData(constituencyWatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [constituencyWatch]);

  useEffect(() => {
    if (subDistrictWatch) {
      getUnionsOrWardsData({ upazilaIds: subDistrictWatch });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subDistrictWatch]);

  useEffect(() => {
    if (unionWatch) {
      getPollingCenterAggregatedData({
        unionOrWardIds: unionWatch,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unionWatch]);

  return (
    <div>
      <div className="border mb-9"></div>
      <FormSelect
        title={t('ELECTION_USER.PRESIDING_OFFICER.TYPE_OF_ELECTION')}
        name={ELECTION_USER.PRESIDING_OFFICER.TYPE_OF_ELECTION}
        options={electionTypesMaster}
      />

      <FormSelect
        title={t('ELECTION_USER.PRESIDING_OFFICER.ELECTION_NAME')}
        name={ELECTION_USER.PRESIDING_OFFICER.ELECTION_NAME}
        disabled={!electionTypeWatch}
        options={electionSchedules}
        isSearchable
      />

      <FormSelect
        title={t('ELECTION_USER.PRESIDING_OFFICER.DISTRICT')}
        name={ELECTION_USER.PRESIDING_OFFICER.DISTRICT}
        disabled={!electionScheduleWatch}
        options={electionSchedulesZillas}
        isSearchable
      />

      <FormSelect
        title={t('ELECTION_USER.PRESIDING_OFFICER.ELECTION_SETTINGS')}
        name={ELECTION_USER.PRESIDING_OFFICER.ELECTION_SETTINGS}
        disabled={!electionScheduleWatch && !districtWatch}
        options={constituencies}
        isMulti={electionTypeWatch === NATIONAL_ELECTION ? true : false}
        isSearchable
      />

      <FormSelect
        title={t('ELECTION_USER.PRESIDING_OFFICER.UPAZILA')}
        name={ELECTION_USER.PRESIDING_OFFICER.UPAZILA}
        options={upazilas}
        disabled={!constituencyWatch}
        isMulti={electionTypeWatch === NATIONAL_ELECTION ? true : false}
        isSearchable
      />

      <FormSelect
        title={t('ELECTION_USER.PRESIDING_OFFICER.UNION')}
        name={ELECTION_USER.PRESIDING_OFFICER.UNION}
        options={unionsOrWards}
        disabled={!subDistrictWatch}
        isMulti={electionTypeWatch === NATIONAL_ELECTION ? true : false}
        isSearchable
      />

      <FormSelect
        title={t('ELECTION_USER.PRESIDING_OFFICER.CENTER')}
        name={ELECTION_USER.PRESIDING_OFFICER.CENTER}
        options={pollingCenterAggregated}
        disabled={!unionWatch}
        isMulti={electionTypeWatch === NATIONAL_ELECTION ? true : false}
        isSearchable
      />
    </div>
  );
};
