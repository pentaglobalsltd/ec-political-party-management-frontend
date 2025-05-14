import { Text } from '@pentabd/ui';
import { LatestResultsPathParams } from '@type/result-management/result-monitoring/latest-results-obtained/latest-results-obtained-types';
import { SelectOptionArray } from '@type/selection-option-type';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SetURLSearchParams } from 'react-router-dom';

interface Props {
  electionCandidateTypes: SelectOptionArray[];
  params: any;

  setSearchParams: SetURLSearchParams;

  getLatestResultsData: (obj: LatestResultsPathParams) => void;
  isLoading: boolean;
}

const CandidateTypeCheckbox = (props: Props) => {
  const {
    electionCandidateTypes,
    params,

    setSearchParams,

    getLatestResultsData,
    isLoading,
  } = props;

  const { t } = useTranslation();

  const [candidateTypeFilter, setCandidateTypeFilter] = useState<string>('');

  const handleCandidateTypeFilter = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { electionScheduleId, constituencyId } = params;

    // for adding a new candidate type filter by checking the checkbox
    if (e.target.checked) {
      const updatedFilter = candidateTypeFilter
        ? `${candidateTypeFilter},${e.target.id}`
        : e.target.id;

      setCandidateTypeFilter(updatedFilter);
      setSearchParams({
        ...params,
        candidateTypeId: updatedFilter,
      });

      if (electionScheduleId && constituencyId) {
        getLatestResultsData({
          electionScheduleId,
          electionSettingsId: constituencyId,
          candidateTypeId: updatedFilter,
        });
      }
    }
    // for removing a candidate type filter by unchecking the checkbox
    else {
      const updatedFilter = candidateTypeFilter
        ?.split(',')
        ?.filter((id) => id !== e.target.id)
        ?.join(',');

      setCandidateTypeFilter(updatedFilter);
      // for removing a single value from candidateTypeId url-param
      if (updatedFilter !== '') {
        setSearchParams({
          ...params,
          candidateTypeId: updatedFilter,
        });
      } else {
        // for removing candidateTypeId from the url-params, when none is checked

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { candidateTypeId, ...rest } = params;
        setSearchParams({
          ...rest,
        });
      }

      if (electionScheduleId && constituencyId) {
        getLatestResultsData({
          electionScheduleId,
          electionSettingsId: constituencyId,
          candidateTypeId: updatedFilter,
        });
      }
    }
  };

  // initially setting candidateTypeIds in url-params
  useEffect(() => {
    if (
      Array.isArray(electionCandidateTypes) &&
      electionCandidateTypes?.length > 0
    ) {
      const candidateTypeIds = electionCandidateTypes?.map((candidate) =>
        candidate?.value?.toString(),
      );
      const candidateTypeIdsString = candidateTypeIds?.join(',');

      if (params?.candidateTypeId === undefined) {
        setSearchParams({
          ...params,
          candidateTypeId: candidateTypeIdsString,
        });

        setCandidateTypeFilter(candidateTypeIdsString);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionCandidateTypes]);

  return (
    <>
      {Array.isArray(electionCandidateTypes) &&
      electionCandidateTypes?.length > 1 ? (
        <div className="d-flex gap-12 bg-white px-10 py-8 mb-10 rounded-4">
          <Text color="primary" size="md" weight="semibold" className="text">
            {t('LATEST_RESULTS_OBTAINED.CANDIDATE_TYPE_FILTER')}
          </Text>

          {electionCandidateTypes?.map((candidate) => (
            <div className="d-flex align-items-center gap-4">
              <input
                type="checkbox"
                key={JSON.stringify(
                  candidate?.value + params?.electionScheduleId,
                )}
                id={JSON.stringify(candidate?.value)}
                onChange={handleCandidateTypeFilter}
                defaultChecked={true}
                disabled={isLoading}
              />
              <Text>{candidate?.label}</Text>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default CandidateTypeCheckbox;
