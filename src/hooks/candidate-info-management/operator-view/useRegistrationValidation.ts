import { useEffect, useState } from 'react';

import { ELECTION_INFO } from '@constants/election-info';
import { CANDIDATE_INFO } from '@constants/candidate-info';
import {
  nationalElectionValidation,
  nominationFormCommonValidation,
  registrationFormValidation,
  upazillaElectionValidation,
  cityMayorElectionValidation,
  cityReservedCounselorValidation,
  cityCounselorElectionValidation,
  municipalityMayorElectionValidation,
  municipalityReservedCounselorValidation,
  municipalityCounselorElectionValidation,
  unionChairmanValidation,
  unionGeneralAndReservedValidation,
} from '@validations/candidate-info-management/operator/nominationForm/add-new-nomination-of-candidate/addNewNominationValidation';
import { typeYupObjectSchema } from '@containers/candidate-info-management/controller-list/apply-candidate-nomination-form/add-new-nomination-of-candidate/types';

export const useRegistrationValidation = (isRegistration: boolean = true) => {
  const [validation, setValidation] = useState<typeYupObjectSchema>(
    nominationFormCommonValidation,
  );

  const setRegistrationValidation = (
    yupValidationObject: typeYupObjectSchema,
  ) => {
    setValidation((prev: typeYupObjectSchema) =>
      prev.concat(yupValidationObject),
    );
  };

  const setUnionValidation = (candidateTypeId?: number | string) => {
    switch (candidateTypeId) {
      case CANDIDATE_INFO.UNION_PARISHAD_CHAIRMAN.ID:
        setRegistrationValidation(unionChairmanValidation);
        break;
      case CANDIDATE_INFO.UNION_PARISHAD_GENERAL_MEMBER.ID:
        setRegistrationValidation(unionGeneralAndReservedValidation);
        break;
      case CANDIDATE_INFO.UNION_PARISHAD_RESERVED_MEMBER.ID:
        setRegistrationValidation(unionGeneralAndReservedValidation);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (isRegistration) {
      setRegistrationValidation(registrationFormValidation);
    }
  }, [isRegistration]);

  const setElectionWiseValidation = (
    electionTypeId?: number | string,
    candidateTypeId?: number | string,
  ) => {
    switch (Number(electionTypeId)) {
      case ELECTION_INFO.NATIONAL.ID:
        setRegistrationValidation(nationalElectionValidation);
        break;

      case ELECTION_INFO.CITY_CORPORATION.ID:
        switch (Number(candidateTypeId)) {
          case CANDIDATE_INFO.CITY_CORPORATION_MAYOR.ID:
            setRegistrationValidation(cityMayorElectionValidation);
            break;

          case CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID:
            setRegistrationValidation(cityReservedCounselorValidation);
            break;

          case CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID:
            setRegistrationValidation(cityCounselorElectionValidation);
            break;
        }
        break;

      case ELECTION_INFO.UPAZILLA.ID:
        setRegistrationValidation(upazillaElectionValidation);
        break;

      case ELECTION_INFO.MUNICIPALITY.ID:
        switch (Number(candidateTypeId)) {
          case CANDIDATE_INFO.MUNICIPALITY_MAYOR.ID:
            setRegistrationValidation(municipalityMayorElectionValidation);
            break;

          case CANDIDATE_INFO.MUNICIPALITY_RESERVED_COUNCILLOR.ID:
            setRegistrationValidation(municipalityReservedCounselorValidation);
            break;

          case CANDIDATE_INFO.MUNICIPALITY_COUNCILLOR.ID:
            setRegistrationValidation(municipalityCounselorElectionValidation);
            break;
        }
        break;
      case ELECTION_INFO.UNION_PARISHAD.ID:
        setUnionValidation(candidateTypeId);
        break;
      default:
        break;
    }
  };

  return { validation, setElectionWiseValidation };
};
