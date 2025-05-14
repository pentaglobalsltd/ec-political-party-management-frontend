import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';

import FormSelect from '@components/inputs/FormSelect';

import { useRMOs } from '@hooks/miscellaneous/master-hook/rmo/useRMOs';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useVoterAreas } from '@hooks/candidate-info-management/controller-list/useVoterAreas';
import { useConstituencyUpazila } from '@hooks/miscellaneous/master-hook/constituency/useConstituencyUpazilas';
import { useUpazillaMunicipalities } from '@hooks/miscellaneous/master-hook/upazilas/useUpazillasMunicipalities';

import { useDistrictConstituencies } from '@hooks/miscellaneous/master-hook/constituency/useDistrictConstituencies';
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
import { GenericNominationSecondPartProps } from '../types';

const SECOND_PART =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.SECOND_PART
    .SUPPORTER;

const NationalElection = (props: GenericNominationSecondPartProps) => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;
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
  const { constituencies, getDistrictConstituenciesData } =
    useDistrictConstituencies();
  const {
    unionsOrWardsConstituencyUpazila,
    getUnionsOrWardConstituencyUpazila,
  } = useUnionsOrWardsConstituencyUpazila();

  const { voterArea, getVoterArea } = useVoterAreas();
  const { rmos } = useRMOs();
  const { municipalities, getUpazillasMunicipalitiesList } =
    useUpazillaMunicipalities();
  const { upazilas, getConstituenciesUpazilaData } = useConstituencyUpazila();

  // watches  --------------------------
  const constituencyChange = watch(`supporter.${SECOND_PART.CONSTITUENCY_ID}`);
  const upazilaChange = watch(`supporter.${SECOND_PART.UPAZILA_ID}`);
  const municipalityChange = watch(`supporter.${SECOND_PART.MUNICIPALITY}`);
  const unionOrWardChange = watch(`supporter.${SECOND_PART.UNION_OR_WARD_ID}`);
  const rmoChange = watch(`supporter.${SECOND_PART.RMO_EN}`);

  // useEffects --------------------------
  useEffect(() => {
    if (zillaId) {
      getDistrictConstituenciesData({
        zillaId: zillaId as string,
        isActive: userType !== USER_TYPES.ADMIN ? true : undefined,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zillaId]);

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
        zillaId as string,
        upazilaChange as string,
        unionOrWardChange as string,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zillaId, upazilaChange, unionOrWardChange]);

  useEffect(() => {
    if (upazilaChange) {
      getUpazillasMunicipalitiesList({ upazilasId: Number(upazilaChange) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upazilaChange]);

  useEffect(() => {
    if (constituencyChange) {
      getConstituenciesUpazilaData(constituencyChange as number);
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

      if (zillaId) {
        getDistrictConstituenciesData({
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
        municipalityId &&
        (rmoEn === RMO.MUNICIPALITY || rmoEn === RMO.CITY_CORPORATION)
      ) {
        getUnionsOrWardConstituencyUpazila(
          constituencyId,
          upazilaId,
          rmoEn,
          municipalityId,
        );
      }
      if (rmoEn) {
        getUpazillasMunicipalitiesList({ upazilasId: upazilaId as number });
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
        title="SECOND_PART.CONSTITUENCY"
        subtitle="SECOND_PART.CONSTITUENCY_SUBTITLE"
        name={`supporter.${SECOND_PART.CONSTITUENCY_ID}`}
        // disabled={zillaId ? false : true}
        options={constituencies}
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
        title="SECOND_PART.UPAZILA"
        subtitle="SECOND_PART.UPAZILA_SUBTITLE"
        name={`supporter.${SECOND_PART.UPAZILA_ID}`}
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
        title="SECOND_PART.CITY_CORPORATION"
        subtitle="SECOND_PART.CITY_CORPORATION_SUBTITLE"
        name={`supporter.${SECOND_PART.RMO_EN}`}
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
          title="SECOND_PART.MUNICIPALITY_CITY_CORPORATION"
          name={`supporter.${SECOND_PART.MUNICIPALITY}`}
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
        title="SECOND_PART.UNION_WARD"
        subtitle="SECOND_PART.UNION_WARD_SUBTITLE"
        name={`supporter.${SECOND_PART.UNION_OR_WARD_ID}`}
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
        title="SECOND_PART.CONSTITUENCY_AREA"
        subtitle="SECOND_PART.CONSTITUENCY_AREA_SUBTITLE"
        name={`supporter.${SECOND_PART.VOTER_AREA_ID}`}
        // disabled={
        //   zillaId && upazilaChange && unionOrWardChange ? false : true
        // }
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
