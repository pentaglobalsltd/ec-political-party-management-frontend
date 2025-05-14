import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import { Text } from '@pentabd/ui';

import FormInput from '@components/inputs/FormInput';
import FormSelect from '@components/inputs/FormSelect';

import { useRMOs } from '@hooks/miscellaneous/master-hook/rmo/useRMOs';
// import { useZillas } from '@hooks/auxiliary-hook/master-hook/zilla/useZillasRegion';
import { useZillas } from '@hooks/miscellaneous/master-hook/zilla/useZillasRegion';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useVoterAreas } from '@hooks/candidate-info-management/controller-list/useVoterAreas';
import { useCandidateTypes } from '@hooks/miscellaneous/master-hook/candidate-type/useCandidateTypes';
import { useConstituencyUpazila } from '@hooks/miscellaneous/master-hook/constituency/useConstituencyUpazilas';
import { useDistrictConstituencies } from '@hooks/miscellaneous/master-hook/constituency/useDistrictConstituencies';
import { useUpazillaMunicipalities } from '@hooks/miscellaneous/master-hook/upazilas/useUpazillasMunicipalities';

import { useUnionsOrWardsConstituencyUpazila } from '@hooks/miscellaneous/master-hook/union-or-ward/useUnionsOrWardsConstituencyUpazila';

import { RMO } from '@constants/rmo';
import { USER_TYPES } from '@constants/user-types';
import { FORM_FIELDS } from '@constants/forms';
import {
  allSelectedData,
  optionConstituency,
  optionMunicipalities,
  optionRmo,
  optionUnionWard,
  optionUpazilla,
} from '../../../../../constants';
import { GenericNominationFirstPartProps } from '../types';

const PROPOSER =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.FIRST_PART
    .PROPOSER;

const CANDIDATE_ELECTION_DETAILS =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.FIRST_PART
    .CANDIDATE_ELECTION_DETAILS;

const NationalElection = (props: GenericNominationFirstPartProps) => {
  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;
  const { watch } = useFormContext();
  const { zillaId, candidateNominationFormFirstPart } = props;

  const [resetData, setResetData] = useState({
    ...allSelectedData,
  });

  const emptyBelowData = (newData: { [name: string]: boolean }) => {
    setResetData((data: any) => ({
      ...data,
      ...newData,
    }));
  };

  // watches -------------------
  const rmoChange = watch(`proposer.${PROPOSER.RMO_EN}`);
  const constituencyChange = watch(`proposer.${PROPOSER.CONSTITUENCY_ID}`);
  const upazilaChange = watch(`proposer.${PROPOSER.UPAZILA_ID}`);
  const municipalityChange = watch(`proposer.${PROPOSER.MUNICIPALITY}`);
  const unionOrWardChange = watch(`proposer.${PROPOSER.UNION_OR_WARD_ID}`);

  // hooks -------------------
  const {
    constituencies: proposerConstituencies,
    getDistrictConstituenciesData: getProposerDistrictConstituenciesData,
  } = useDistrictConstituencies();
  const { upazilas, getConstituenciesUpazilaData } = useConstituencyUpazila();
  const { rmos } = useRMOs();
  const { municipalities, getUpazillasMunicipalitiesList } =
    useUpazillaMunicipalities();
  const {
    unionsOrWardsConstituencyUpazila,
    getUnionsOrWardConstituencyUpazila,
  } = useUnionsOrWardsConstituencyUpazila();
  const { voterArea, getVoterArea } = useVoterAreas();

  // useEffects -------------------
  useEffect(() => {
    if (zillaId) {
      getProposerDistrictConstituenciesData({
        zillaId: zillaId as string,
        isActive: userType !== USER_TYPES.ADMIN ? true : undefined,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zillaId]);

  useEffect(() => {
    if (constituencyChange) {
      getConstituenciesUpazilaData(constituencyChange as number);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [constituencyChange]);

  useEffect(() => {
    if (upazilaChange && rmoChange) {
      getUpazillasMunicipalitiesList({
        upazilasId: upazilaChange as number,
        rmoEn: rmoChange as string,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upazilaChange, rmoChange]);

  useEffect(() => {
    if (rmoChange) {
      if (
        rmoChange === RMO.MUNICIPALITY ||
        rmoChange === RMO.CITY_CORPORATION
      ) {
        if (municipalityChange) {
          getUnionsOrWardConstituencyUpazila(
            constituencyChange as number,
            upazilaChange as number,
            rmoChange as string,
            municipalityChange as number,
          );
        }
      } else {
        getUnionsOrWardConstituencyUpazila(
          constituencyChange as number,
          upazilaChange as number,
          rmoChange as string,
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rmoChange, municipalityChange]);

  useEffect(() => {
    if (zillaId && upazilaChange && unionOrWardChange) {
      getVoterArea(
        zillaId as number,
        upazilaChange as number,
        unionOrWardChange as number,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zillaId, upazilaChange, unionOrWardChange]);

  // Edit
  useEffect(() => {
    if (candidateNominationFormFirstPart?.proposer) {
      const { zilla, upazila, unionOrWard, rmo, constituency, municiaplity } =
        candidateNominationFormFirstPart?.proposer;

      const zillaId = zilla?.id;
      const upazilaId = upazila?.id;
      const unionOrWardId = unionOrWard?.id;
      const rmoEn = rmo?.nameEn;
      const constituencyId = constituency?.id;
      const municiaplityId = municiaplity?.id;

      if (zillaId) {
        getProposerDistrictConstituenciesData({
          zillaId,
          isActive: userType !== USER_TYPES.ADMIN ? true : undefined,
        });
      }
      if (constituencyChange) {
        getConstituenciesUpazilaData(constituencyChange);
      }
      if (
        constituencyId &&
        upazilaId &&
        rmoEn &&
        rmoEn !== RMO.MUNICIPALITY &&
        rmoEn !== RMO.CITY_CORPORATION
      ) {
        getUnionsOrWardConstituencyUpazila(constituencyId, upazilaId, rmoEn);
      }
      if (
        constituencyId &&
        upazilaId &&
        municiaplityId &&
        rmoEn &&
        (rmoEn === RMO.MUNICIPALITY || rmoEn === RMO.CITY_CORPORATION)
      ) {
        getUnionsOrWardConstituencyUpazila(
          constituencyId,
          upazilaId,
          rmoEn,
          municiaplityId,
        );
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
  }, [candidateNominationFormFirstPart?.proposer]);

  // candidate zilla
  const { zillas: candidateZillas, getZilla: getCandidateZillas } = useZillas();

  // candidate constituency
  const {
    constituencies: candidateConstituencies,
    getDistrictConstituenciesData: getCandidateConstituencies,
  } = useDistrictConstituencies();

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

      getCandidateConstituencies({
        zillaId: zillaId as number,
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
        title="FIRST_PART.CONSTITUENCY"
        subtitle="FIRST_PART.CONSTITUENCY_SUBTITLE"
        name={`proposer.${PROPOSER.CONSTITUENCY_ID}`}
        // disabled={zillaId ? false : true}
        options={proposerConstituencies}
        placeholder={t('PLACEHOLDER.ENTER')}
        clearValue={resetData.constituency}
        resetData={() =>
          emptyBelowData({
            ...optionConstituency,
            constituency: false,
            upazilaOptions: false,
          })
        }
        clearOptions={resetData.constituencyOption}
      />
      <FormSelect
        title="FIRST_PART.UPAZILA"
        subtitle="FIRST_PART.UPAZILA_SUBTITLE"
        name={`proposer.${PROPOSER.UPAZILA_ID}`}
        // disabled={constituencyChange ? false : true}
        options={upazilas}
        placeholder={t('PLACEHOLDER.ENTER')}
        clearValue={resetData.upazila}
        resetData={() =>
          emptyBelowData({
            ...optionUpazilla,
            upazila: false,
            rmoOptions: false,
          })
        }
        clearOptions={resetData.upazilaOptions}
      />
      <FormSelect
        title="FIRST_PART.CITY_CORPORATION"
        subtitle="FIRST_PART.CITY_CORPORATION_SUBTITLE"
        name={`proposer.${PROPOSER.RMO_EN}`}
        // disabled={upazilaChange ? false : true}
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
          title="FIRST_PART.MUNICIPALITY_CITY_CORPORATION"
          name={`proposer.${PROPOSER.MUNICIPALITY}`}
          options={municipalities}
          placeholder="PLACEHOLDER.SELECT"
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
        title="FIRST_PART.UNION_WARD"
        subtitle="FIRST_PART.UNION_WARD_SUBTITLE"
        name={`proposer.${PROPOSER.UNION_OR_WARD_ID}`}
        // disabled={upazilaChange && rmoChange ? false : true}
        options={unionsOrWardsConstituencyUpazila}
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
        title="FIRST_PART.CONSTITUENCY_AREA"
        subtitle="FIRST_PART.CONSTITUENCY_AREA_SUBTITLE"
        name={`proposer.${PROPOSER.VOTER_AREA_ID}`}
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

      {/* candidate info ----------------------- */}

      <div className="border-top">
        <div className="rounded-4 p-9 my-9 bg-light ">
          <Text weight="medium" size="lg" color="title">
            {t('NOMINATION_FORM_FIRST_PART.CANDIDATE_PART')}
          </Text>
        </div>

        <FormInput
          title="FIRST_PART.CANDIDATE_NAME"
          registerName={`candidateElectionAndPersonalDetails.${CANDIDATE_ELECTION_DETAILS.NAME}`}
          placeholder={t('PLACEHOLDER.ENTER')}
          disabled
        />
      </div>
      <FormInput
        title="FIRST_PART.CANDIDATE_ADDRESS"
        registerName={`candidateElectionAndPersonalDetails.${CANDIDATE_ELECTION_DETAILS.ADDRESS}`}
        placeholder={t('PLACEHOLDER.ENTER')}
      />
      <FormInput
        title="FIRST_PART.CANDIDATE_VOTER_NUMBER"
        registerName={`candidateElectionAndPersonalDetails.${CANDIDATE_ELECTION_DETAILS.VOTER_NUMBER}`}
        placeholder={t('PLACEHOLDER.ENTER')}
        disabled
      />
      <FormSelect
        title="FIRST_PART.CANDIDATE_DISTRICT_NAME"
        name={`candidateElectionAndPersonalDetails.${CANDIDATE_ELECTION_DETAILS.ZILLA_ID}`}
        options={candidateZillas}
        disabled
        placeholder={t('PLACEHOLDER.ENTER')}
      />
      <FormSelect
        title="FIRST_PART.CANDIDATE_CONSTITUENCY"
        name={`candidateElectionAndPersonalDetails.${CANDIDATE_ELECTION_DETAILS.CONSTITUENCY_ID}`}
        options={candidateConstituencies}
        disabled
        placeholder={t('PLACEHOLDER.ENTER')}
      />
      <FormSelect
        title="FIRST_PART.POST_NAME"
        name={`candidateElectionAndPersonalDetails.${CANDIDATE_ELECTION_DETAILS.CANDIDATE_ID}`}
        options={candidateTypes}
        disabled
        placeholder={t('PLACEHOLDER.ENTER')}
      />
    </>
  );
};

export default NationalElection;
