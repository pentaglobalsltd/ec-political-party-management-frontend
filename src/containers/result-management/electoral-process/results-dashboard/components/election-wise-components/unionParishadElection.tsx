import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import Select from '@components/inputs/Select';
import { IconChevronDown } from '@pentabd/icons';
import { OptionType } from '@pentabd/ui/build/atoms/select/types';
import { RESULTS } from '../../candidateWiseComponent';
import { useUnionOrWardsByElectionScheduleCandidateTypesZillaUpazilas } from '@hooks/miscellaneous/core-hook/upazila/useUnionOrWardsByElectionScheduleCandidateTypesZillaUpazilas';
import { useConstituenciesByElectionScheduleCandidateTypeZillaUpazilaUnionOrWards } from '@hooks/miscellaneous/core-hook/constituency/useConstituenciesByElectionScheduleCandidateTypeZillaUpazilaUnionOrWards';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { CANDIDATE_INFO } from '@constants/candidate-info';
import { SelectOptionArray } from '@type/selection-option-type';

export const UnionParishadElection = ({
  handleQueryParams,
  candidateTypeId,
  electionSettings,
}: {
  candidateTypeId?: string | number;
  electionSettings?: SelectOptionArray[];
  handleQueryParams: ({
    key,
    page,
    checkboxValue,
    electionSettings,
    pollingCenter,
  }: {
    key: string;
    page?: number;
    checkboxValue?: string;
    electionSettings?: number | string | null;
    pollingCenter?: string;
  }) => void;
}) => {
  const { watch } = useFormContext();
  const unionWatch = watch(RESULTS.UNION_OR_WARD);
  const { electionSchedules, upazilas, zillas } = useFiltersRedux();
  const {
    unionsOrWards,
    getUnionOrWardsByElectionScheduleCandidateTypesZillaUpazilas,
  } = useUnionOrWardsByElectionScheduleCandidateTypesZillaUpazilas();

  const {
    constituencies,
    getConstituenciesByElectionScheduleCandidateTypeZillaUpazilaUnionOrWards,
  } =
    useConstituenciesByElectionScheduleCandidateTypeZillaUpazilaUnionOrWards();

  const electionScheduleId = electionSchedules?.[0]?.value;
  const zillaId = zillas?.[0]?.value;
  const upazilaId = upazilas?.[0]?.value;
  const isChairman =
    candidateTypeId === CANDIDATE_INFO.UNION_PARISHAD_CHAIRMAN.ID;
  const isGeneralMember =
    candidateTypeId === CANDIDATE_INFO.UNION_PARISHAD_GENERAL_MEMBER.ID;
  const isReservedMember =
    candidateTypeId === CANDIDATE_INFO.UNION_PARISHAD_RESERVED_MEMBER.ID;

  useEffect(() => {
    if (electionScheduleId && candidateTypeId && upazilaId && zillaId) {
      getUnionOrWardsByElectionScheduleCandidateTypesZillaUpazilas({
        electionScheduleId,
        zillaId,
        candidateTypeId,
        upazilaId,
      });
    }
  }, [electionScheduleId, candidateTypeId, zillaId, upazilaId]);

  useEffect(() => {
    if (
      (isGeneralMember || isReservedMember) &&
      electionScheduleId &&
      candidateTypeId &&
      upazilaId &&
      zillaId &&
      unionWatch
    ) {
      getConstituenciesByElectionScheduleCandidateTypeZillaUpazilaUnionOrWards({
        electionScheduleId,
        zillaId,
        candidateTypeId,
        upazilaId,
        unionOrWardsId: unionWatch,
        isActive: true,
        getElectionSettings: true,
      });
    }
  }, [electionScheduleId, candidateTypeId, zillaId, upazilaId, unionWatch]);

  return (
    <>
      {isChairman ? (
        <form className="w-25">
          <Select
            title="SEARCH.UNION"
            name={RESULTS.ELECTION_SETTINGS}
            onSelectItem={(data) => {
              handleQueryParams({
                key: RESULTS.ELECTION_SETTINGS,
                electionSettings: data as number,
              });
            }}
            options={electionSettings as OptionType[]}
            suffix={<IconChevronDown size="20" fill="subtitle2" />}
            isSearchable
          />
        </form>
      ) : (
        <form className="w-50 d-flex justify-content-around gap-5 mx-12">
          <div className="w-50">
            <Select
              title="SEARCH.UNION"
              name={RESULTS.UNION_OR_WARD}
              options={unionsOrWards as OptionType[]}
              suffix={<IconChevronDown size="20" fill="subtitle2" />}
              isSearchable
            />
          </div>
          <div className="w-50">
            <Select
              title="REGISTRATION.UNION_PARISHAD_WARD"
              name={RESULTS.ELECTION_SETTINGS}
              onSelectItem={(data) => {
                handleQueryParams({
                  key: RESULTS.ELECTION_SETTINGS,
                  electionSettings: data as number,
                });
              }}
              options={constituencies as OptionType[]}
              suffix={<IconChevronDown size="20" fill="subtitle2" />}
              isSearchable
            />
          </div>
        </form>
      )}
    </>
  );
};
