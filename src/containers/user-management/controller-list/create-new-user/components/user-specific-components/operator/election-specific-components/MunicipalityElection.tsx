import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';

import FormSelect from '@components/inputs/FormSelect';

import useElectionSchedulesZillas from '@hooks/miscellaneous/core-hook/zilla/useElecionScheduleZillas';
import useMunicipalitiesBySchedulesZillas from '@hooks/miscellaneous/core-hook/municipality/useMunicipalitiesBySchedulesZillas';

import { FORM_FIELDS } from '@constants/forms';
import { CreateNewOpType } from './types';

const ELECTION_USER = FORM_FIELDS.USER_MANAGEMENT.CREATE_ELECTION_USER;

const MunicipalityElection = (props: CreateNewOpType) => {
  const { t } = useTranslation();
  const { watch } = useFormContext();

  const { electionScheduleWatch, viewProfile } = props;

  const { electionSchedulesZillas, getElectionSchedulesDistrictData } =
    useElectionSchedulesZillas();
  const { municipalities, getMunicipalityBySchedulesZillasData } =
    useMunicipalitiesBySchedulesZillas();

  const districtWatch = watch(ELECTION_USER.DATA_ENTRY_OPERATOR.DISTRICT);

  useEffect(() => {
    if (electionScheduleWatch) {
      getElectionSchedulesDistrictData(electionScheduleWatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionScheduleWatch]);

  useEffect(() => {
    if (electionScheduleWatch && districtWatch) {
      getMunicipalityBySchedulesZillasData({
        electionScheduleId: electionScheduleWatch,
        zillaId: districtWatch,
      });
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
        title={t('ELECTION_USER.DATA_ENTRY_OPERATOR.MUNICIPALITY_ONLY')}
        name={ELECTION_USER.DATA_ENTRY_OPERATOR.MUNICIPALITY}
        disabled={(!electionScheduleWatch && !districtWatch) || viewProfile}
        options={municipalities}
        numberOfSelection={1}
        isMulti
        isSearchable
      />
    </>
  );
};

export default MunicipalityElection;
