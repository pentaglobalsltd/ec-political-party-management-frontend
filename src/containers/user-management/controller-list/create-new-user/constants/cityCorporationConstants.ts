import { LANGUAGE } from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import { UserProfiles } from '@type/user-management/user-profile-types';

interface FormMappedDataProps {
  data: UserProfiles;
  language: string | null;
  userId?: boolean;
  constituencyFromContext?: SelectOptionArray[];
  electionSettingsFromContext?: number;
}

// Returning Officer
export function roCityCorporationFormMappedData({
  data,
  language,
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
    municipalityIds,
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

// Data Entry Operator
export function opCityCorporationFormMappedData({
  data,
  language,
  electionSettingsFromContext,
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
    municipalityIds,
    electionSettingsForMunicipalityExists,
  } = data;

  if (electionSettingsForMunicipalityExists && electionSettingsFromContext) {
    electionSettingsIds?.push(electionSettingsFromContext);
  }

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

// Assistant Returning Officer
export function aroCityCorporationFormMappedData({
  data,
  language,
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
    pollingCenterIds,
    municipalityIds,
  } = data;

  return {
    userTypeCode,
    email,
    loginId,
    password,
    electionTypeId,
    electionScheduleId,
    zillaId,
    upazilaId,
    pollingCenterIds,
    municipalityIds,
    isActive: true,
    ...(language === LANGUAGE.BANGLA ? { nameBn: name } : { nameEn: name }),
  };
}
