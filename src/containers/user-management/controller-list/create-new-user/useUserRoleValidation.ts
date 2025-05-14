import { useState } from 'react';

import {
  systemUserLogInIdValidation,
  systemUserLogInIdValidationARO,
  systemUserPasswordValidation,
  systemUserValidation,
} from '@validations/user-management/SystemUserValidation';
import {
  assistantReturningOfficerNationalValidation,
  dataEntryOperatorNationalValidation,
  presidingOfficerNationalValidation,
  returningOfficerNationalValidation,
} from '@validations/user-management/election-users/national-election';
import {
  returningOfficerCityCorpValidation,
  dataEntryOperatorCityCorpValidation,
  dataEntryOperatorCityCorpMayorValidation,
  assistantReturningOfficerCityCorpValidation,
} from '@validations/user-management/election-users/city-corporation';
import {
  returningOfficerUpazilaValidation,
  dataEntryOperatorUpazilaValidation,
  assistantReturningOfficerUpazilaValidation,
} from '@validations/user-management/election-users/upazila-election';
import {
  returningOfficerMunicipalityValidation,
  dataEntryOperatorMunicipalityValidation,
  assistantReturningOfficerMunicipalityValidation,
} from '@validations/user-management/election-users/municipality-election';

import { USER_TYPES } from '@constants/user-types';
import { ELECTION_INFO } from '@constants/election-info';
import {
  USER_ACTION,
  USER_PROFILE_LIST_TYPE,
  USER_ROLE_TYPE,
} from '../constants';

import { zillaElectionOfficerValidation } from '@validations/user-management/system-users/ZillaElectionOfficer';
import { regionalElectionOfficerValidation } from '@validations/user-management/system-users/RegionalElectionOfficer';
import { electionUserElectionTypeValidation } from '@validations/user-management/election-users/ElectionUserValidation';
import { upazilaThanaElectionOfficerValidation } from '@validations/user-management/system-users/UpazilaThanaElectionOfficer';

const {
  RETURNING_OFFICER,
  ASSISTANT_RETURNING_OFFICER,
  ASSISTANT_RETURNING_OFFICER_OPERATOR,
  PRESIDING_OFFICER,
  DATA_ENTRY_OFFICER,
  UPAZILA_THANA_ELECTION_OFFICER,
  ZILLA_ELECTION_OFFICER,
  REGIONAL_ELECTION_OFFICER,
} = USER_ROLE_TYPE;

const { NATIONAL, CITY_CORPORATION, UPAZILLA, MUNICIPALITY, UNION_PARISHAD } =
  ELECTION_INFO;

interface Props {
  userRoleWatch?: string;
  electionTypeWatch?: number;
  hasElectionSettingsMunicipalitySelected?: boolean;
}

export const useUserRoleValidation = (userId: string, params?: any) => {
  const [validationSchema, setValidationSchema] =
    useState<any>(systemUserValidation);

  const setUserRoleValidation = ({
    userRoleWatch,
    electionTypeWatch,
    hasElectionSettingsMunicipalitySelected,
  }: Props) => {
    const validationSetter = (additionalValidation: any) => {
      // password required for new users create, optional for edit
      if (!userId) {
        if (params?.type === USER_PROFILE_LIST_TYPE.SYSTEM) {
          setValidationSchema(
            systemUserValidation
              .concat(systemUserPasswordValidation)
              .concat(systemUserLogInIdValidation),
          );
        } else {
          setValidationSchema(
            systemUserValidation
              .concat(systemUserPasswordValidation)
              .concat(systemUserLogInIdValidation)
              .concat(electionUserElectionTypeValidation),
          );
        }
      }

      // password also required for ARO-OP creation from modal (when ui shows aro edit view)
      if (
        params?.userType === USER_TYPES.ARO_OP &&
        params?.action !== USER_ACTION.EDIT
      ) {
        setValidationSchema(
          systemUserValidation.concat(systemUserPasswordValidation),
        );
      }

      // loginId is optional for ARO and ARO-OP, required for others
      if (
        userRoleWatch === ASSISTANT_RETURNING_OFFICER ||
        userRoleWatch === ASSISTANT_RETURNING_OFFICER_OPERATOR
      ) {
        setValidationSchema((prev: any) =>
          prev
            .concat(systemUserLogInIdValidationARO)
            .concat(additionalValidation),
        );
      } else {
        setValidationSchema((prev: any) =>
          prev.concat(systemUserLogInIdValidation).concat(additionalValidation),
        );
      }

      // only for City-Corp election, Mayor user types
      if (hasElectionSettingsMunicipalitySelected) {
        setValidationSchema((prev: any) =>
          prev.concat(dataEntryOperatorCityCorpMayorValidation),
        );
      }
    };

    switch (userRoleWatch) {
      // election users
      case RETURNING_OFFICER:
        switch (electionTypeWatch) {
          case NATIONAL.ID:
            return validationSetter(returningOfficerNationalValidation);
          case CITY_CORPORATION.ID:
            return validationSetter(returningOfficerCityCorpValidation);
          case UPAZILLA.ID:
            return validationSetter(returningOfficerUpazilaValidation);
          case MUNICIPALITY.ID:
            return validationSetter(returningOfficerMunicipalityValidation);
          case UNION_PARISHAD.ID:
            return validationSetter(returningOfficerUpazilaValidation);

          default:
            return validationSetter(systemUserValidation);
        }

      case DATA_ENTRY_OFFICER:
        switch (electionTypeWatch) {
          case NATIONAL.ID:
            return validationSetter(dataEntryOperatorNationalValidation);
          case CITY_CORPORATION.ID:
            return validationSetter(dataEntryOperatorCityCorpValidation);
          case UPAZILLA.ID:
            return validationSetter(dataEntryOperatorUpazilaValidation);

          case MUNICIPALITY.ID:
            return validationSetter(dataEntryOperatorMunicipalityValidation);

          case UNION_PARISHAD.ID:
            return validationSetter(dataEntryOperatorUpazilaValidation);

          default:
            return validationSetter(systemUserValidation);
        }

      case ASSISTANT_RETURNING_OFFICER:
        if (electionTypeWatch === NATIONAL.ID)
          return validationSetter(assistantReturningOfficerNationalValidation);
        if (electionTypeWatch === CITY_CORPORATION.ID)
          return validationSetter(assistantReturningOfficerCityCorpValidation);
        if (electionTypeWatch === UPAZILLA.ID)
          return validationSetter(assistantReturningOfficerUpazilaValidation);
        if (electionTypeWatch === MUNICIPALITY.ID)
          return validationSetter(
            assistantReturningOfficerMunicipalityValidation,
          );
        return validationSetter(systemUserValidation);

      case ASSISTANT_RETURNING_OFFICER_OPERATOR:
        if (electionTypeWatch === NATIONAL.ID)
          return validationSetter(assistantReturningOfficerNationalValidation);
        if (electionTypeWatch === CITY_CORPORATION.ID)
          return validationSetter(assistantReturningOfficerCityCorpValidation);
        if (electionTypeWatch === UPAZILLA.ID)
          return validationSetter(assistantReturningOfficerUpazilaValidation);
        if (electionTypeWatch === MUNICIPALITY.ID)
          return validationSetter(
            assistantReturningOfficerMunicipalityValidation,
          );
        return validationSetter(systemUserValidation);

      case PRESIDING_OFFICER:
        return validationSetter(presidingOfficerNationalValidation);

      // system users
      case UPAZILA_THANA_ELECTION_OFFICER:
        return validationSetter(upazilaThanaElectionOfficerValidation);
      case ZILLA_ELECTION_OFFICER:
        return validationSetter(zillaElectionOfficerValidation);

      case REGIONAL_ELECTION_OFFICER:
        return validationSetter(regionalElectionOfficerValidation);
      default:
        return validationSetter(systemUserValidation);
    }
  };

  return {
    validationSchema,
    setUserRoleValidation,
  };
};
