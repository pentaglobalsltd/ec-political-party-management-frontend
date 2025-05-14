import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { IconChevronDown } from '@pentabd/icons';
import { getParams } from '@utils';
import useResult from '../../components/result/useResult';
import { Result } from '../../components';
import Select from '@components/inputs/Select';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { useUnionOrWardsByElectionScheduleCandidateTypesZillaUpazilas } from '@hooks/miscellaneous/core-hook/upazila/useUnionOrWardsByElectionScheduleCandidateTypesZillaUpazilas';
import { useConstituenciesByElectionScheduleCandidateTypeZillaUpazilaUnionOrWards } from '@hooks/miscellaneous/core-hook/constituency/useConstituenciesByElectionScheduleCandidateTypeZillaUpazilaUnionOrWards';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { getUnionOrWardsForMembers } from '@helpers/get-union-or-wards-for-members';
import { getWardsForMembers } from '@helpers/get-wards-for-members';

export const MembersUnionParidshad = ({
  candidateTypeId,
}: {
  candidateTypeId: number;
}) => {
  const {
    isAdmin,
    electionSettings,
    unionOrWards: unionOrWardsFromRedux,
  } = useFiltersRedux();
  const [unionFromRedux, setUnionFromRedux] = useState<any>();
  const [electionSettingsFromRedux, setElectionSettingsFromRedux] =
    useState<any>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);
  const { electionScheduleId, zillaId, upazilaId, unionOrWardId } = params;
  const methods = useForm();
  const { watch } = methods;
  const electionSettingsId = watch(APPLICATION_SEARCH.ELECTION_SETTINGS_ID);

  const { resultDetails, getResult } = useResult();

  const {
    unionsOrWards,
    getUnionOrWardsByElectionScheduleCandidateTypesZillaUpazilas,
  } = useUnionOrWardsByElectionScheduleCandidateTypesZillaUpazilas();

  const {
    constituencies,
    getConstituenciesByElectionScheduleCandidateTypeZillaUpazilaUnionOrWards,
  } =
    useConstituenciesByElectionScheduleCandidateTypeZillaUpazilaUnionOrWards();

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
    if (
      electionScheduleId &&
      candidateTypeId &&
      upazilaId &&
      zillaId &&
      isAdmin
    ) {
      getUnionOrWardsByElectionScheduleCandidateTypesZillaUpazilas({
        electionScheduleId,
        zillaId,
        candidateTypeId,
        upazilaId,
      });
    }
  }, [electionScheduleId, candidateTypeId, zillaId, upazilaId, isAdmin]);

  useEffect(() => {
    if (
      electionScheduleId &&
      candidateTypeId &&
      upazilaId &&
      zillaId &&
      unionOrWardId &&
      isAdmin
    ) {
      getConstituenciesByElectionScheduleCandidateTypeZillaUpazilaUnionOrWards({
        electionScheduleId,
        zillaId,
        candidateTypeId,
        upazilaId,
        unionOrWardsId: unionOrWardId,
        isActive: true,
        getElectionSettings: true,
      });
    }
  }, [
    electionScheduleId,
    candidateTypeId,
    zillaId,
    upazilaId,
    unionOrWardId,
    isAdmin,
  ]);

  useEffect(() => {
    if (!isAdmin && electionSettings?.length) {
      setUnionFromRedux(
        getUnionOrWardsForMembers({
          electionSettings,
          candidateType: candidateTypeId,
          unionOrWardsRedux: unionOrWardsFromRedux,
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, electionSettings, candidateTypeId, unionOrWardsFromRedux]);

  useEffect(() => {
    if (!isAdmin && unionOrWardId) {
      setElectionSettingsFromRedux(
        getWardsForMembers({
          electionSettings,
          candidateType: candidateTypeId,
          unionOrWardId: Number(unionOrWardId),
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, candidateTypeId, unionOrWardId]);

  return (
    <div>
      <FormProvider {...methods}>
        <div className="d-grid grid-cols-1 grid-cols-lg-12 mt-10 gap-10">
          <div className="col-span-1 col-span-lg-3">
            <Select
              title="SUBMIT_RESULTS.UNION_OR_WARD"
              name={APPLICATION_SEARCH.UNION_OR_WARD}
              options={isAdmin ? unionsOrWards : unionFromRedux}
              suffix={<IconChevronDown size="20" fill="subtitle2" />}
              resetData={(data) =>
                setSearchParams({
                  ...params,
                  unionOrWardId: data as string,
                })
              }
            />
          </div>
          <div className="col-span-1 col-span-lg-3">
            <Select
              title="SUBMIT_RESULTS.UNION_PARISHAD_WARD"
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
