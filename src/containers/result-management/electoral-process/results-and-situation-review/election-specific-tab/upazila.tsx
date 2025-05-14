import { getParams } from '@utils';
import { useSearchParams } from 'react-router-dom';
import useResult from '../components/result/useResult';
import { Result } from '../components';
import { useEffect } from 'react';
import useElectionSchedulesCandidateTypeConstituencies from '@hooks/miscellaneous/core-hook/constituency/useCandidateTypeConstituencies';
import { FormProvider, useForm } from 'react-hook-form';
import Select from '@components/inputs/Select';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';

export const Upazila = ({ candidateTypeId }: { candidateTypeId: number }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);
  const { electionScheduleId, zillaId } = params;
  const methods = useForm();
  const { watch } = methods;
  const electionSettingsId = watch(APPLICATION_SEARCH.ELECTION_SETTINGS_ID);

  const { resultDetails, getResult } = useResult();
  const {
    constituencies,
    getElectionSchedulesCandidateTypeConstituenciesData,
  } = useElectionSchedulesCandidateTypeConstituencies();

  useEffect(() => {
    if (electionScheduleId && electionSettingsId) {
      getResult({
        electionScheduleId,
        electionSettingsId,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionSettingsId, electionScheduleId]);

  useEffect(() => {
    if (electionScheduleId && candidateTypeId && zillaId) {
      getElectionSchedulesCandidateTypeConstituenciesData({
        electionSchedulesId: electionScheduleId,
        electionSchedulesZillaId: zillaId,
        candidateTypeId,
        getElectionSettings: true,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidateTypeId, zillaId]);

  return (
    <div>
      <FormProvider {...methods}>
        <div className="d-grid grid-cols-1 grid-cols-lg-12 mt-10">
          <div className="col-span-1 col-span-lg-3">
            <Select
              title="SUBMIT_RESULTS.UPAZILA"
              name={APPLICATION_SEARCH.ELECTION_SETTINGS_ID}
              options={constituencies}
              suffix={<IconChevronDown size="20" fill="subtitle2" />}
              resetData={(data) =>
                setSearchParams({
                  ...params,
                  electionSettingsId: data as string,
                })
              }
            />
          </div>
        </div>
      </FormProvider>
      <Result resultDetails={resultDetails} />
    </div>
  );
};
