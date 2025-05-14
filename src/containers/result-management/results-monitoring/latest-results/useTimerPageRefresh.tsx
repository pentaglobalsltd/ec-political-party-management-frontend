import { useCallback, useEffect } from 'react';
import { LatestResultsPathParams } from '@type/result-management/result-monitoring/latest-results-obtained/latest-results-obtained-types';
import { SLIDE_REFRESH_TIME } from './constants/page-refresh-timer';

interface Props {
  params: any;
  getLatestResultsData: (obj: LatestResultsPathParams) => void;
}

const useTimerPageRefresh = (props: Props) => {
  const { params, getLatestResultsData } = props;

  // when timer runs out
  const refreshPage = useCallback(() => {
    const { electionScheduleId, constituencyId, candidateTypeId } = params;

    if (electionScheduleId && constituencyId) {
      getLatestResultsData({
        electionScheduleId,
        electionSettingsId: constituencyId,
        candidateTypeId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    params?.electionScheduleId,
    params?.constituencyId,
    params?.candidateTypeId,
  ]);

  // when timer runs out
  useEffect(() => {
    let maxTime: any;

    if (params?.electionScheduleId) {
      maxTime = setInterval(async () => {
        refreshPage();
      }, SLIDE_REFRESH_TIME);
    }

    return () => {
      clearInterval(maxTime);
    };
  }, [refreshPage, params?.electionScheduleId]);
};

export default useTimerPageRefresh;
