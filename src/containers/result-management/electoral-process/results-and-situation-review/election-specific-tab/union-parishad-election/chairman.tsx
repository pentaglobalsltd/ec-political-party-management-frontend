import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { IconChevronDown } from '@pentabd/icons';
import { getParams } from '@utils';
import useResult from '../../components/result/useResult';
import { Result } from '../../components';
import useElectionSchedulesCandidateTypeConstituencies from '@hooks/miscellaneous/core-hook/constituency/useCandidateTypeConstituencies';
import Select from '@components/inputs/Select';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { getUnionOrWardsForChairman } from '@helpers/get-union-or-wards-for-chairman';

export const ChairmanUnionParidshad = ({
  candidateTypeId,
}: {
  candidateTypeId: number;
}) => {
  const { isAdmin, electionSettings } = useFiltersRedux();
  const [electionSettingsFromRedux, setElectionSettingsFromRedux] =
    useState<any>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);
  const { electionScheduleId, zillaId, upazilaId } = params;
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
    if (electionScheduleId && candidateTypeId && zillaId && isAdmin) {
      getElectionSchedulesCandidateTypeConstituenciesData({
        electionSchedulesId: electionScheduleId,
        electionSchedulesZillaId: zillaId,
        candidateTypeId,
        upazillaId: upazilaId,
        getElectionSettings: true,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidateTypeId, zillaId, upazilaId, isAdmin]);
  useEffect(() => {
    if (!isAdmin && electionSettings?.length) {
      setElectionSettingsFromRedux(
        getUnionOrWardsForChairman({
          electionSettings,
          candidateType: candidateTypeId,
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, candidateTypeId, isAdmin]);

  return (
    <div>
      <FormProvider {...methods}>
        <div className="d-grid grid-cols-1 grid-cols-lg-12 mt-10">
          <div className="col-span-1 col-span-lg-3">
            <Select
              title="SUBMIT_RESULTS.UNION_OR_WARD"
              name={APPLICATION_SEARCH.ELECTION_SETTINGS_ID}
              options={isAdmin ? constituencies : electionSettingsFromRedux}
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
