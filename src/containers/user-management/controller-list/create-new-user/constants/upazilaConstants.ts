import { LANGUAGE } from '@hooks/miscellaneous/custom-hook/useLanguage';
import { UserProfiles } from '@type/user-management/user-profile-types';

interface FormMappedDataProps {
  data: UserProfiles;
  language: string | null;
  userId?: boolean;
}

// Returning Officer
export function roUpazilaFormMappedData({
  data,
  language,
}: FormMappedDataProps) {
  const {
    userTypeCode,
    email,
    loginId,
    electionScheduleId,
    password,
    electionTypeId,
    upazilaIds,
    name,
  } = data;

  return {
    userTypeCode,
    email,
    loginId,
    electionScheduleId,
    password,
    electionTypeId,
    upazilaIds,
    ...(language === LANGUAGE.BANGLA ? { nameBn: name } : { nameEn: name }),
  };
}

// Data Entry Operator
export function opUpazilaFormMappedData({
  data,
  language,
}: FormMappedDataProps) {
  const {
    userTypeCode,
    email,
    loginId,
    electionScheduleId,
    password,
    electionTypeId,
    upazilaIds,
    name,
  } = data;

  return {
    userTypeCode,
    email,
    loginId,
    electionScheduleId,
    password,
    electionTypeId,
    upazilaIds,
    ...(language === LANGUAGE.BANGLA ? { nameBn: name } : { nameEn: name }),
  };
}

// Assistant Returning Officer
export function aroUpazilaFormMappedData({
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
    upazilaIds,
    pollingCenterIds,
  } = data;

  return {
    userTypeCode,
    email,
    loginId,
    password,
    electionTypeId,
    electionScheduleId,
    zillaId,
    upazilaIds,
    pollingCenterIds,
    isActive: true,
    ...(language === LANGUAGE.BANGLA ? { nameBn: name } : { nameEn: name }),
  };
}
