import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';

import FormInput from '@components/inputs/FormInput';
import FormSelect from '@components/inputs/FormSelect';

import { useRMOs } from '@hooks/miscellaneous/master-hook/rmo/useRMOs';
import { useZillas } from '@hooks/miscellaneous/master-hook/zilla/useZillasRegion';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useVoterAreas } from '@hooks/candidate-info-management/controller-list/useVoterAreas';
import { useUnionsOrWards } from '@hooks/miscellaneous/master-hook/union-or-ward/useUnionsOrWards';
import { useCandidateTypes } from '@hooks/miscellaneous/master-hook/candidate-type/useCandidateTypes';
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
} from './constants';
import { GenericNominationFirstPartProps } from '../types';

const PROPOSER =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.FIRST_PART
    .PROPOSER;
const CANDIDATE_ELECTION_DETAILS =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.FIRST_PART
    .CANDIDATE_ELECTION_DETAILS;

const UpazillaElection = (props: GenericNominationFirstPartProps) => {
  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;
  const { watch } = useFormContext();
  const { candidateNominationFormFirstPart, zillaId } = props;

  // hooks
  const {
    constituencies,
    getElectionSchedulesCandidateTypeConstituenciesData,
  } = useElectionSchedulesCandidateTypeConstituencies();
  const { rmos } = useRMOs();
  const { municipalities, getUpazillasMunicipalitiesList } =
    useUpazillaMunicipalities();
  const { unionsOrWards, getUnionsOrWard } = useUnionsOrWards();
  const { voterArea, getVoterArea } = useVoterAreas();
  const { candidateTypeId, scheduleId: electionScheduleId } = useParams();

  const [resetData, setResetData] = useState({
    ...allSelectedData,
  });

  const emptyBelowData = (newData: { [name: string]: boolean }) => {
    setResetData((data: any) => ({
      ...data,
      ...newData,
    }));
  };

  // watches
  const watchConstituency = watch(`proposer.${PROPOSER.CONSTITUENCY_ID}`);
  const watchRmo = watch(`proposer.${PROPOSER.RMO_EN}`);
  const watchUnionOrWard = watch(`proposer.${PROPOSER.UNION_OR_WARD_ID}`);

  useEffect(() => {
    if (zillaId && electionScheduleId && candidateTypeId) {
      getElectionSchedulesCandidateTypeConstituenciesData({
        electionSchedulesId: electionScheduleId,
        electionSchedulesZillaId: zillaId as number,
        candidateTypeId: candidateTypeId,
        upazillaId:
          candidateNominationFormFirstPart?.candidateElectionAndPersonalDetails
            ?.constituency?.id,
        isActive: userType !== USER_TYPES.ADMIN ? true : undefined,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionScheduleId, candidateTypeId, zillaId]);

  useEffect(() => {
    if (watchConstituency && watchRmo) {
      getUpazillasMunicipalitiesList({
        upazilasId: watchConstituency as number,
        rmoEn: watchRmo as string,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchConstituency, watchRmo]);

  useEffect(() => {
    if (watchConstituency) {
      getUnionsOrWard({
        upazilaId: watchConstituency as number,
        rmoEn: watchRmo as string,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchConstituency, watchRmo]);

  useEffect(() => {
    if (zillaId && watchConstituency && watchUnionOrWard) {
      getVoterArea(
        zillaId as number,
        watchConstituency as number,
        watchUnionOrWard as number,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zillaId, watchConstituency, watchUnionOrWard]);

  // Edit
  useEffect(() => {
    if (candidateNominationFormFirstPart?.proposer) {
      const { zillaId, upazilaId, unionOrWardId, rmoEn } =
        candidateNominationFormFirstPart?.proposer;

      if (zillaId) {
        getElectionSchedulesCandidateTypeConstituenciesData({
          electionSchedulesId: electionScheduleId as unknown as number,
          electionSchedulesZillaId: zillaId as number,
          candidateTypeId: candidateTypeId as unknown as number,
          upazillaId:
            candidateNominationFormFirstPart
              ?.candidateElectionAndPersonalDetails?.constituency?.id,
          isActive: userType !== USER_TYPES.ADMIN ? true : undefined,
        });
      }
      if (upazilaId && rmoEn) {
        getUnionsOrWard({ upazilaId, rmoEn });
      }
      if (rmoEn) {
        getUpazillasMunicipalitiesList({
          upazilasId: upazilaId as number,
          rmoEn,
        });
      }
      if (zillaId && upazilaId && unionOrWardId) {
        getVoterArea(zillaId, upazilaId, unionOrWardId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    candidateNominationFormFirstPart?.proposer?.upazilaId,
    candidateNominationFormFirstPart?.proposer,
  ]);

  // candidate zilla
  const { zillas: candidateZillas, getZilla: getCandidateZillas } = useZillas();

  // candidate types (auxiliary-hook)
  const { candidateTypes, getCandidateType } = useCandidateTypes();

  // get candidate zilla
  useEffect(() => {
    getCandidateZillas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Edit - candidate
  useEffect(() => {
    if (candidateNominationFormFirstPart?.candidateElectionAndPersonalDetails) {
      const { zillaId } =
        candidateNominationFormFirstPart?.candidateElectionAndPersonalDetails;

      getElectionSchedulesCandidateTypeConstituenciesData({
        electionSchedulesId: electionScheduleId as unknown as number,
        electionSchedulesZillaId: zillaId as number,
        candidateTypeId: candidateTypeId as unknown as number,
        upazillaId:
          candidateNominationFormFirstPart?.candidateElectionAndPersonalDetails
            ?.constituency?.id,
        isActive: userType !== USER_TYPES.ADMIN ? true : undefined,
      });
    }
    if (candidateNominationFormFirstPart?.proposer) {
      getCandidateType();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidateNominationFormFirstPart?.proposer]);

  return (
    <>
      <FormSelect
        title="FIRST_PART.UPAZILA"
        subtitle="FIRST_PART.UPAZILA_SUBTITLE"
        name={`proposer.${PROPOSER.CONSTITUENCY_ID}`}
        disabled={zillaId ? false : true}
        options={constituencies}
        placeholder={t('PLACEHOLDER.SELECT')}
        isSearchable
        required
        clearValue={resetData?.constituency}
        resetData={() =>
          emptyBelowData &&
          emptyBelowData({
            ...optionConstituency,
            constituency: false,
            rmoOptions: false,
          })
        }
        clearOptions={resetData?.constituencyOption}
      />

      <FormSelect
        title="FIRST_PART.CITY_CORPORATION"
        subtitle="FIRST_PART.CITY_CORPORATION_SUBTITLE"
        name={`proposer.${PROPOSER.RMO_EN}`}
        disabled={watchConstituency ? false : true}
        options={rmos}
        placeholder={t('PLACEHOLDER.SELECT')}
        isSearchable
        required
        clearValue={resetData?.rmo}
        resetData={(data) =>
          emptyBelowData &&
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
        clearOptions={resetData?.rmoOptions}
      />

      {(watchRmo === RMO.MUNICIPALITY || watchRmo === RMO.CITY_CORPORATION) && (
        <FormSelect
          title="FIRST_PART.MUNICIPALITY"
          name={`proposer.${PROPOSER.MUNICIPALITY}`}
          options={municipalities}
          placeholder={t('PLACEHOLDER.SELECT')}
          isSearchable
          clearValue={resetData?.municipalities}
          resetData={() =>
            emptyBelowData &&
            emptyBelowData({
              ...optionMunicipalities,
              municipalities: false,
              unionWardOptions: false,
            })
          }
          clearOptions={resetData?.municipalitiesOptions}
        />
      )}

      <FormSelect
        title="FIRST_PART.UNION_WARD"
        subtitle="FIRST_PART.UNION_WARD_SUBTITLE"
        name={`proposer.${PROPOSER.UNION_OR_WARD_ID}`}
        disabled={watchConstituency && watchRmo ? false : true}
        options={unionsOrWards}
        placeholder={t('PLACEHOLDER.SELECT')}
        isSearchable
        required
        clearValue={resetData?.unionWard}
        resetData={() =>
          emptyBelowData &&
          emptyBelowData({
            ...optionUnionWard,
            unionWard: false,
            voterAreaOptions: false,
          })
        }
        clearOptions={resetData?.unionWardOptions}
      />

      <FormSelect
        title="FIRST_PART.CONSTITUENCY_AREA"
        subtitle="FIRST_PART.CONSTITUENCY_AREA_SUBTITLE"
        name={`proposer.${PROPOSER.VOTER_AREA_ID}`}
        disabled={
          zillaId && watchConstituency && watchUnionOrWard ? false : true
        }
        options={voterArea}
        placeholder={t('PLACEHOLDER.SELECT')}
        isSearchable
        required
        clearValue={resetData?.voterArea}
        resetData={() =>
          emptyBelowData &&
          emptyBelowData({
            voterArea: false,
          })
        }
        clearOptions={resetData?.voterAreaOptions}
      />

      {/* candidate info ------------------- */}
      <div className="border-top pt-9">
        <FormInput
          title="FIRST_PART.CANDIDATE_NAME"
          registerName={`candidateElectionAndPersonalDetails.${CANDIDATE_ELECTION_DETAILS.NAME}`}
          placeholder="PLACEHOLDER.SELECT"
          disabled
        />
      </div>
      <FormInput
        title="FIRST_PART.CANDIDATE_ADDRESS"
        registerName={`candidateElectionAndPersonalDetails.${CANDIDATE_ELECTION_DETAILS.ADDRESS}`}
        placeholder="PLACEHOLDER.SELECT"
        required
      />
      <FormInput
        title="FIRST_PART.CANDIDATE_VOTER_NUMBER"
        registerName={`candidateElectionAndPersonalDetails.${CANDIDATE_ELECTION_DETAILS.VOTER_NUMBER}`}
        placeholder="PLACEHOLDER.SELECT"
        disabled
      />
      <FormSelect
        title="FIRST_PART.CANDIDATE_DISTRICT_NAME"
        name={`candidateElectionAndPersonalDetails.${CANDIDATE_ELECTION_DETAILS.ZILLA_ID}`}
        placeholder={t('PLACEHOLDER.SELECT')}
        options={candidateZillas}
        isSearchable
        disabled
      />
      <FormSelect
        title="FIRST_PART.CANDIDATE_UPAZILLA"
        name={`candidateElectionAndPersonalDetails.${CANDIDATE_ELECTION_DETAILS.CONSTITUENCY_ID}`}
        options={constituencies}
        placeholder={t('PLACEHOLDER.SELECT')}
        isSearchable
        disabled
      />

      <FormSelect
        title="FIRST_PART.POST_NAME"
        name={`candidateElectionAndPersonalDetails.${CANDIDATE_ELECTION_DETAILS.CANDIDATE_ID}`}
        placeholder={t('PLACEHOLDER.SELECT')}
        options={candidateTypes}
        isSearchable
        disabled
      />
    </>
  );
};

export default UpazillaElection;
