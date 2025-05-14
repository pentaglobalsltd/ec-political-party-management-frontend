import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';

import FormSelect from '@components/inputs/FormSelect';

import { useRMOs } from '@hooks/miscellaneous/master-hook/rmo/useRMOs';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useVoterAreas } from '@hooks/candidate-info-management/controller-list/useVoterAreas';
import { useUnionsOrWards } from '@hooks/miscellaneous/master-hook/union-or-ward/useUnionsOrWardsSelect';
import { useUpazillaMunicipalities } from '@hooks/miscellaneous/master-hook/upazilas/useUpazillasMunicipalities';

import useElectionSchedulesCandidateTypeConstituencies from '@hooks/miscellaneous/core-hook/constituency/useCandidateTypeConstituencies';

import { RMO } from '@constants/rmo';
import { USER_TYPES } from '@constants/user-types';
import { FORM_FIELDS } from '@constants/forms';
import {
  optionUnionWard,
  optionMunicipalities,
  optionRmo,
  optionConstituency,
  allSelectedData,
} from '../../../first-part/election-specific-components/upazilla-election/constants';
import { GenericNominationSecondPartProps } from '../types';

const SECOND_PART =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.SECOND_PART
    .SUPPORTER;

const NationalElection = (props: GenericNominationSecondPartProps) => {
  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;
  const { watch } = useFormContext();
  const { zillaId, candidateNominationFormSecondPart } = props;

  const [resetData, setResetData] = useState({
    ...allSelectedData,
  });

  const emptyBelowData = (newData: { [name: string]: boolean }) => {
    setResetData((data: any) => ({
      ...data,
      ...newData,
    }));
  };

  // hooks  --------------------------
  const {
    constituencies,
    getElectionSchedulesCandidateTypeConstituenciesData,
  } = useElectionSchedulesCandidateTypeConstituencies();
  const { unionsOrWards, getUnionsOrWardsData } = useUnionsOrWards();

  const { voterArea, getVoterArea } = useVoterAreas();
  const { rmos } = useRMOs();
  const { municipalities, getUpazillasMunicipalitiesList } =
    useUpazillaMunicipalities();

  const { candidateTypeId, scheduleId: electionScheduleId } = useParams();

  // watches  --------------------------
  const constituencyChange = watch(`supporter.${SECOND_PART.CONSTITUENCY_ID}`);
  const municipalityChange = watch(`supporter.${SECOND_PART.MUNICIPALITY}`);
  const unionOrWardChange = watch(`supporter.${SECOND_PART.UNION_OR_WARD_ID}`);
  const rmoChange = watch(`supporter.${SECOND_PART.RMO_EN}`);

  // useEffects --------------------------
  useEffect(() => {
    if (zillaId && electionScheduleId && candidateTypeId) {
      getElectionSchedulesCandidateTypeConstituenciesData({
        electionSchedulesId: electionScheduleId,
        electionSchedulesZillaId: zillaId as number,
        candidateTypeId: candidateTypeId,
        upazillaId:
          candidateNominationFormSecondPart?.candidateElectionAndPersonalDetails
            ?.constituency?.id,
        isActive: userType !== USER_TYPES.ADMIN ? true : undefined,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionScheduleId, candidateTypeId, zillaId]);

  useEffect(() => {
    if (rmoChange) {
      if (
        rmoChange === RMO.MUNICIPALITY ||
        rmoChange === RMO.CITY_CORPORATION
      ) {
        if (municipalityChange) {
          getUnionsOrWardsData({
            upazilaId: constituencyChange as string,
            municipalityId: municipalityChange as string,
            rmoEn: rmoChange as string,
          });
        }
      } else {
        getUnionsOrWardsData({
          upazilaId: constituencyChange as string,
          rmoEn: rmoChange as string,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rmoChange, municipalityChange]);

  useEffect(() => {
    if (zillaId && constituencyChange && unionOrWardChange) {
      getVoterArea(
        zillaId as string,
        constituencyChange as string,
        unionOrWardChange as string,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zillaId, constituencyChange, unionOrWardChange]);

  useEffect(() => {
    if (constituencyChange) {
      getUpazillasMunicipalitiesList({
        upazilasId: Number(constituencyChange),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [constituencyChange]);

  // EDIT
  useEffect(() => {
    if (candidateNominationFormSecondPart?.supporter) {
      const {
        zillaId,
        upazilaId,
        unionOrWardId,
        rmoEn,
        constituencyId,
        municipalityId,
      } = candidateNominationFormSecondPart?.supporter;

      if (zillaId && electionScheduleId && candidateTypeId) {
        getElectionSchedulesCandidateTypeConstituenciesData({
          electionSchedulesId: electionScheduleId,
          electionSchedulesZillaId: zillaId as number,
          candidateTypeId: candidateTypeId,
          upazillaId:
            candidateNominationFormSecondPart
              ?.candidateElectionAndPersonalDetails?.constituency?.id,
          isActive: userType !== USER_TYPES.ADMIN ? true : undefined,
        });
      }
      if (
        constituencyId &&
        upazilaId &&
        rmoEn &&
        rmoEn !== RMO.MUNICIPALITY &&
        rmoEn !== RMO.CITY_CORPORATION
      ) {
        getUnionsOrWardsData({
          upazilaId: upazilaId as string,
          rmoEn: rmoChange as string,
        });
      }
      if (
        constituencyId &&
        upazilaId &&
        municipalityId &&
        (rmoEn === RMO.MUNICIPALITY || rmoEn === RMO.CITY_CORPORATION)
      ) {
        getUnionsOrWardsData({
          upazilaId: upazilaId as string,
          municipalityId: municipalityChange as string,
          rmoEn: rmoChange as string,
        });
      }
      if (rmoEn) {
        getUpazillasMunicipalitiesList({
          upazilasId: upazilaId as number,
        });
      }
      if (zillaId && upazilaId && unionOrWardId) {
        getVoterArea(zillaId, upazilaId, unionOrWardId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidateNominationFormSecondPart?.supporter]);

  return (
    <>
      <FormSelect
        title="SECOND_PART.UPAZILA"
        subtitle="SECOND_PART.UPAZILA_SUBTITLE"
        name={`supporter.${SECOND_PART.CONSTITUENCY_ID}`}
        disabled={zillaId ? false : true}
        options={constituencies}
        placeholder={t('PLACEHOLDER.ENTER')}
        clearValue={resetData.constituency}
        resetData={() =>
          emptyBelowData({
            ...optionConstituency,
            constituency: false,
            rmoOptions: false,
          })
        }
        clearOptions={resetData.constituencyOption}
      />
      <FormSelect
        title="SECOND_PART.CITY_CORPORATION"
        subtitle="SECOND_PART.CITY_CORPORATION_SUBTITLE"
        name={`supporter.${SECOND_PART.RMO_EN}`}
        disabled={constituencyChange ? false : true}
        options={rmos}
        placeholder={t('PLACEHOLDER.ENTER')}
        clearValue={resetData.rmo}
        resetData={(data) =>
          emptyBelowData({
            ...optionRmo,
            rmo: false,
            municipalitiesOptions: false,
            unionWardOptions:
              data === RMO.MUNICIPALITY || data === RMO.CITY_CORPORATION
                ? true
                : false,
          })
        }
        clearOptions={resetData.rmoOptions}
      />

      {(rmoChange === RMO.MUNICIPALITY ||
        rmoChange === RMO.CITY_CORPORATION) && (
        <FormSelect
          title="SECOND_PART.MUNICIPALITY_CITY_CORPORATION"
          name={`supporter.${SECOND_PART.MUNICIPALITY}`}
          options={municipalities}
          placeholder={t('PLACEHOLDER.SELECT')}
          clearValue={resetData.municipalities}
          resetData={() =>
            emptyBelowData({
              ...optionMunicipalities,
              municipalities: false,
              unionWardOptions: false,
            })
          }
          clearOptions={resetData.municipalitiesOptions}
        />
      )}

      <FormSelect
        title="SECOND_PART.UNION_WARD"
        subtitle="SECOND_PART.UNION_WARD_SUBTITLE"
        name={`supporter.${SECOND_PART.UNION_OR_WARD_ID}`}
        disabled={constituencyChange && rmoChange ? false : true}
        options={unionsOrWards}
        placeholder={t('PLACEHOLDER.ENTER')}
        clearValue={resetData.unionWard}
        resetData={() =>
          emptyBelowData({
            ...optionUnionWard,
            unionWard: false,
            voterAreaOptions: false,
          })
        }
        clearOptions={resetData.unionWardOptions}
      />
      <FormSelect
        title="SECOND_PART.CONSTITUENCY_AREA"
        subtitle="SECOND_PART.CONSTITUENCY_AREA_SUBTITLE"
        name={`supporter.${SECOND_PART.VOTER_AREA_ID}`}
        disabled={
          zillaId && constituencyChange && unionOrWardChange ? false : true
        }
        options={voterArea}
        placeholder={t('PLACEHOLDER.ENTER')}
        clearValue={resetData.voterArea}
        resetData={() =>
          emptyBelowData({
            voterArea: false,
          })
        }
        clearOptions={resetData.voterAreaOptions}
      />
    </>
  );
};

export default NationalElection;
