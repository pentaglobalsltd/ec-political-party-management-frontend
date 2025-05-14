import { getParams } from '@utils';
import { useSearchParams } from 'react-router-dom';
import useResult from '../../components/result/useResult';
import { Result } from '../../components';
import { useEffect } from 'react';

export const Mayor = () => {
  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);
  const { electionScheduleId, electionSettingsId } = params;

  const { resultDetails, getResult } = useResult();

  useEffect(() => {
    if (electionScheduleId && electionSettingsId) {
      getResult({
        electionScheduleId,
        electionSettingsId,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionSettingsId, electionScheduleId]);

  return <Result resultDetails={resultDetails} />;
};
