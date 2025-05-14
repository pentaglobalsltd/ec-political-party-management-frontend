import { useEffect } from 'react';
import useElectionTypesCore from '@hooks/miscellaneous/core-hook/election-type/useElectionTypesCore';
import useElectionSchedules from '@hooks/miscellaneous/core-hook/election-schedule/useElectionSchedules';

interface Props {
  electionTypeWatch: string | undefined;
}

interface HookReturnType {
  electionTypesCore: any[];
  electionSchedules: any[];
}

const useFormSendSMS = ({ electionTypeWatch }: Props): HookReturnType => {
  const { electionTypesCore, getElectionTypesCoreData } =
    useElectionTypesCore();

  const { electionSchedules, getElectionSchedulesData } =
    useElectionSchedules(true);

  useEffect(() => {
    getElectionTypesCoreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (electionTypeWatch) {
      getElectionSchedulesData(electionTypeWatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionTypeWatch]);

  return {
    electionTypesCore,
    electionSchedules,
  };
};

export default useFormSendSMS;
