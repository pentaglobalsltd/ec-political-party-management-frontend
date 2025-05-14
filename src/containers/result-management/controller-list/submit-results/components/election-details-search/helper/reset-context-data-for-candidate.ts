import { USER_PROFILE_DETAILS_KEYS } from '@hooks/candidate-info-management/report/useRoReportFiltersNew';
import { TypeResetContextDataForCandidate } from '../../../context/submitResultContext';
import { SelectOptionArray } from '@type/selection-option-type';

interface resetParams {
  candidateType: number;
  setContextData: TypeResetContextDataForCandidate;
  [USER_PROFILE_DETAILS_KEYS.ELECTION_SETTINGS]?: SelectOptionArray[];
}

export const resetSubmitResultContextDataForCandidate = ({
  candidateType,
  setContextData,
  electionSettings,
}: resetParams) => {
  setContextData((prev: any) => {
    return {
      ...prev,
      candidateType: candidateType,
      contextPollingCenters: [],
      selectedCenterId: null,
      selectedCandidateSettings: electionSettings?.find(
        (item) => item?.extra?.candidateTypeId === candidateType,
      ),

      contextResultByCandidates: {},
    };
  });
};
