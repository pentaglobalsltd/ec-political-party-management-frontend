import { USER_ROLE_TYPE } from '../../constants';
import { ASSISTANT_RETURNING_OFFICER } from '@containers/result-management/electoral-process/results-summary/constants';
import { LANGUAGE } from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import { UserProfiles } from '@type/user-management/user-profile-types';

interface FormMappedDataProps {
  data: UserProfiles;
  language: string | null;
  userId?: boolean;
  constituencyFromContext?: SelectOptionArray[];
  municipalityIds?: number;
}

// Returning Officer and Data Entry Operator
export function roAndOpNationalElectionFormMappedData({
  data,
  language,
  municipalityIds,
}: FormMappedDataProps) {
  const {
    name,
    userTypeCode,
    email,
    loginId,
    electionScheduleId,
    electionSettingsIds,
    password,
    electionTypeId,
    zillaId,
  } = data;

  return {
    userTypeCode,
    email,
    loginId,
    electionScheduleId,
    password,
    electionTypeId,
    zillaId,
    electionSettingsIds,
    municipalityIds,
    ...(language === LANGUAGE.BANGLA ? { nameBn: name } : { nameEn: name }),
  };
}

// Presiding Officer
export function poNationalElectionFormMappedData({
  data,
  language,
  constituencyFromContext,
}: FormMappedDataProps) {
  const {
    name,
    userTypeCode,
    email,
    loginId,
    password,
    electionTypeId,
    electionScheduleId,
    electionSettingsIds,
    zillaId,
    upazilaId,
    unionOrWardIds,
    pollingCenterIds,
  } = data;

  const constituency = constituencyFromContext?.find(
    (item) => item.value === electionSettingsIds?.[0],
  );

  return {
    userTypeCode,
    email,
    loginId,
    password,
    electionTypeId,
    electionScheduleId,
    electionSettingsIds,
    zillaId,
    upazilaId,
    unionOrWardIds,
    pollingCenterIds,
    ...(language === LANGUAGE.BANGLA ? { nameBn: name } : { nameEn: name }),
    ...(userTypeCode === USER_ROLE_TYPE.ASSISTANT_RETURNING_OFFICER ||
    userTypeCode === USER_ROLE_TYPE.ASSISTANT_RETURNING_OFFICER_OPERATOR
      ? { electionSettingsIdentifierId: constituency?.id }
      : {}),
  };
}

// Assistant Returning Officer
export function aroNationalElectionFormMappedData({
  data,
  language,
  constituencyFromContext,
}: FormMappedDataProps) {
  const {
    name,
    userTypeCode,
    email,
    loginId,
    password,
    electionTypeId,
    electionScheduleId,
    zillaId,
    upazilaId,
    unionOrWardIds,
    pollingCenterIds,
    electionSettingsIds,
  } = data;

  const constituency = constituencyFromContext?.find(
    (item) => item.value === electionSettingsIds?.[0],
  );

  return {
    userTypeCode,
    email,
    loginId,
    password,
    electionTypeId,
    electionScheduleId,
    zillaId,
    upazilaId,
    unionOrWardIds,
    pollingCenterIds,
    ...(electionTypeId === 1 ? { electionSettingsIds } : {}), // its only for national election
    isActive: true,
    ...(language === LANGUAGE.BANGLA ? { nameBn: name } : { nameEn: name }),
    ...(userTypeCode === ASSISTANT_RETURNING_OFFICER
      ? { electionSettingsIdentifierId: constituency?.id }
      : {}),
  };
}

// ARO-OP when entering through ARO-Modal
export function aroOpModalNationalElectionFormMappedData({
  data,
  language,
  constituencyFromContext,
}: FormMappedDataProps) {
  const {
    name,
    userTypeCode,
    email,
    loginId,
    password,
    electionTypeId,
    electionScheduleId,
    electionSettingsIds,
    zillaId,
    upazilaId,
    unionOrWardIds,
    pollingCenterIds,
  } = data;

  const constituency = constituencyFromContext?.find(
    (item) => item.value === electionSettingsIds?.[0],
  );

  return {
    userTypeCode,
    email,
    loginId,
    password,
    electionTypeId,
    electionScheduleId,
    electionSettingsIds,
    zillaId,
    upazilaId,
    unionOrWardIds,
    pollingCenterIds,
    ...(language === LANGUAGE.BANGLA ? { nameBn: name } : { nameEn: name }),
    ...(userTypeCode === USER_ROLE_TYPE.ASSISTANT_RETURNING_OFFICER ||
    userTypeCode === USER_ROLE_TYPE.ASSISTANT_RETURNING_OFFICER_OPERATOR
      ? { electionSettingsIdentifierId: constituency?.id }
      : {}),
  };
}
