import { LANGUAGE } from '@hooks/miscellaneous/custom-hook/useLanguage';
import { UserProfiles } from '@type/user-management/user-profile-types';

interface FormMappedDataProps {
  data: UserProfiles;
  language: string | null;
  userId?: boolean;
}

// admin
export function adminFormMappedData({ data, language }: FormMappedDataProps) {
  const { name, userTypeCode, email, loginId, password } = data;

  return {
    userTypeCode,
    email,
    loginId,
    password,
    ...(language === LANGUAGE.BANGLA ? { nameBn: name } : { nameEn: name }),
  };
}

// upazilaThanaElectionOfficer
export function upazilaThanaElectionOfficerFormMappedData({
  data,
  language,
}: FormMappedDataProps) {
  const {
    name,
    userTypeCode,
    email,
    loginId,
    password,
    regionId,
    zillaId,
    upazilaIds,
  } = data;

  return {
    userTypeCode,
    email,
    loginId,
    password,
    ...(language === LANGUAGE.BANGLA ? { nameBn: name } : { nameEn: name }),
    regionId,
    zillaId,
    upazilaIds,
  };
}

// zillaElectionOfficer
export function zillaElectionOfficerFormMappedData({
  data,
  language,
}: FormMappedDataProps) {
  const { name, userTypeCode, email, loginId, password, regionId, zillaId } =
    data;

  return {
    userTypeCode,
    email,
    loginId,
    password,
    ...(language === LANGUAGE.BANGLA ? { nameBn: name } : { nameEn: name }),
    regionId,
    zillaId,
  };
}

// regional Election Officer
export function regionalElectionOfficerFormMappedData({
  data,
  language,
}: FormMappedDataProps) {
  const { name, userTypeCode, email, loginId, password, regionId } = data;

  return {
    userTypeCode,
    email,
    loginId,
    password,
    ...(language === LANGUAGE.BANGLA ? { nameBn: name } : { nameEn: name }),
    regionId,
  };
}
