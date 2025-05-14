import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';

import FormSelect from '@components/inputs/FormSelect';

import { FORM_FIELDS } from '@constants/forms';
import useElectionSchedulesZillas from '@hooks/miscellaneous/core-hook/zilla/useElecionScheduleZillas';
import useUpazilasByZillas from '@hooks/miscellaneous/core-hook/upazila/useUpazilasByZillas';
import { CreateNewOpType } from './types';

const ELECTION_USER = FORM_FIELDS.USER_MANAGEMENT.CREATE_ELECTION_USER;

const UpazilaElection = (props: CreateNewOpType) => {
  const { electionTypeWatch, electionScheduleWatch, viewProfile } = props;
  const { t } = useTranslation();
  const { watch } = useFormContext();

  const { electionSchedulesZillas, getElectionSchedulesDistrictData } =
    useElectionSchedulesZillas();
  const { upazilas, getUpazilasByZillasData } = useUpazilasByZillas();

  const districtWatch = watch(ELECTION_USER.DATA_ENTRY_OPERATOR.DISTRICT);

  useEffect(() => {
    if (electionScheduleWatch) {
      getElectionSchedulesDistrictData(electionScheduleWatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionScheduleWatch]);

  useEffect(() => {
    if (electionTypeWatch && electionScheduleWatch && districtWatch) {
      getUpazilasByZillasData({
        electionTypeId: electionTypeWatch,
        electionScheduleId: electionScheduleWatch,
        zillaId: districtWatch,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionTypeWatch, electionScheduleWatch, districtWatch]);

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
        title={t('ELECTION_USER.DATA_ENTRY_OPERATOR.UPAZILA')}
        name={ELECTION_USER.DATA_ENTRY_OPERATOR.UPAZILA}
        disabled={(!electionScheduleWatch && !districtWatch) || viewProfile}
        options={upazilas}
        numberOfSelection={1}
        isSearchable
        isMulti
      />
    </>
  );
};

export default UpazilaElection;
