import { useState } from 'react';
import { useParams } from 'react-router-dom';
import FormSelect from '@components/inputs/FormSelect';
import { FORM_FIELDS } from '@constants/forms';
import useThirdPartFields, {
  thirdPartWatchType,
} from '../announcement/useThirdPartFields';
import { ThirdPartType } from '@type/candidate-info-management/operator-view/candidate-nomination-form/third-part';

import {
  allSelectedData,
  optionRegion,
  optionRmo,
  optionUnionWard,
  optionUpazilla,
  optionZilla,
  optionMunicipalities,
} from '../../../../constants';
import { ELECTION_INFO } from '@constants/election-info';

const CANDIDATE_PERSONAL_INFO =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.THIRD_PART
    .CANDIDATE_PERSONAL_INFO;

interface Props {
  watch: thirdPartWatchType;
  candidateNominationFormThirdPart: ThirdPartType;
}

const ThirdPartSelectFields = ({
  watch,
  candidateNominationFormThirdPart,
}: Props) => {
  const { electionTypeId } = useParams();

  const {
    regions,
    zillas,
    upazilas,
    unionsOrWards,
    voterArea,
    rmos,
    municipalities,
    upWards,
    isRmoValueMunicipalOrCityCorp,
    // disableFields,
  } = useThirdPartFields({ watch, candidateNominationFormThirdPart });

  const [resetData, setResetData] = useState({
    ...allSelectedData,
  });

  const emptyBelowData = (newData: { [name: string]: boolean }) => {
    setResetData((data: any) => ({
      ...data,
      ...newData,
    }));
  };

  const renderUnionParishadWardField = () => {
    if (Number(electionTypeId) === ELECTION_INFO.UNION_PARISHAD.ID) {
      return (
        <FormSelect
          title="THIRD_PART.WARD"
          subtitle="THIRD_PART.WARD_SUBTITLE"
          name={`candidatePersonalInfo.${CANDIDATE_PERSONAL_INFO.UP_WARD_ID}`}
          // disabled={disableFields.isUnionOrWardDisable}
          options={upWards}
          clearValue={resetData.upWard}
          resetData={() =>
            emptyBelowData({
              upWards: false,
            })
          }
          clearOptions={resetData.upWardOptions}
        />
      );
    }

    return null;
  };

  return (
    <>
      <FormSelect
        title="THIRD_PART.DIVISION_NAME"
        subtitle="THIRD_PART.DIVISION_NAME_SUBTITLE"
        name={`candidatePersonalInfo.${CANDIDATE_PERSONAL_INFO.REGION_ID}`}
        options={regions}
        clearValue={resetData.region}
        resetData={() =>
          emptyBelowData({
            ...optionRegion,
          })
        }
        clearOptions={resetData.regionOption}
        required
      />

      <FormSelect
        title="THIRD_PART.DISTRICT_NAME"
        subtitle="THIRD_PART.DISTRICT_NAME_SUBTITLE"
        name={`candidatePersonalInfo.${CANDIDATE_PERSONAL_INFO.ZILLA_ID}`}
        options={zillas}
        // disabled={disableFields.isZillaDisable}
        clearValue={resetData.zilla}
        resetData={() =>
          emptyBelowData({
            ...optionZilla,
            zilla: false,
            upazilaOptions: false,
          })
        }
        clearOptions={resetData.zillaOption}
        required
      />

      <FormSelect
        title="THIRD_PART.UPAZILA"
        subtitle="THIRD_PART.UPAZILA_SUBTITLE"
        name={`candidatePersonalInfo.${CANDIDATE_PERSONAL_INFO.UPAZILA_ID}`}
        // disabled={disableFields.isUpazillaDisable}
        options={upazilas}
        clearValue={resetData.upazila}
        resetData={() =>
          emptyBelowData({
            ...optionUpazilla,
            upazila: false,
            rmoOptions: false,
          })
        }
        clearOptions={resetData.upazilaOptions}
        required
      />

      {/* পৌরসভা/সিটি কর্পোরেশন/ক্যান্টনমেন্ট বোর্ড/ইউনিয়নের নাম & polli*/}
      {/* rmoChange */}
      <FormSelect
        title="THIRD_PART.CITY_CORPORATION"
        subtitle="THIRD_PART.CITY_CORPORATION_SUBTITLE"
        name={`candidatePersonalInfo.${CANDIDATE_PERSONAL_INFO.RMO_EN}`}
        options={rmos}
        clearValue={resetData.rmo}
        resetData={() =>
          emptyBelowData({
            ...optionRmo,
            rmo: false,
            municipalitiesOptions: false,
            unionWardOptions: false,
          })
        }
        clearOptions={resetData.rmoOptions}
        required
      />

      {/* পৌরসভা/সিটি কর্পোরেশন */}
      {/* muniCityCorpChange */}
      {isRmoValueMunicipalOrCityCorp && (
        <FormSelect
          title="FIRST_PART.MUNICIPALITY"
          name={`candidatePersonalInfo.${CANDIDATE_PERSONAL_INFO.MUNICIPALITY}`}
          options={municipalities}
          placeholder="PLACEHOLDER.SELECT"
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

      {/* ইউনিয়ন/ওয়ার্ড */}
      <FormSelect
        title="THIRD_PART.UNION_WARD"
        subtitle="THIRD_PART.UNION_WARD_SUBTITLE"
        name={`candidatePersonalInfo.${CANDIDATE_PERSONAL_INFO.UNION_OR_WARD_ID}`}
        // disabled={disableFields.isUnionOrWardDisable}
        options={unionsOrWards}
        clearValue={resetData.unionWard}
        resetData={() =>
          emptyBelowData({
            ...optionUnionWard,
            unionWard: false,
            upWardOptions: false,
            voterAreaOptions: false,
          })
        }
        clearOptions={resetData.unionWardOptions}
        required
      />

      {/* ইউনিয়ন পরিষদ ওয়ার্ড */}
      {renderUnionParishadWardField()}

      <FormSelect
        title="THIRD_PART.CONSTITUENCY_AREA"
        subtitle="THIRD_PART.CONSTITUENCY_AREA_SUBTITLE"
        name={`candidatePersonalInfo.${CANDIDATE_PERSONAL_INFO.VOTER_AREA_ID}`}
        // disabled={disableFields.isConstituencyAreaDisable}
        options={voterArea}
        clearValue={resetData.voterArea}
        resetData={() =>
          emptyBelowData({
            voterArea: false,
          })
        }
        clearOptions={resetData.voterAreaOptions}
        required
      />

      <span className="border-bottom pb-9"></span>
    </>
  );
};

export default ThirdPartSelectFields;
