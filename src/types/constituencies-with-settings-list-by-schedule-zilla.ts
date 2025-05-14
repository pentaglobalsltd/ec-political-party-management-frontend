import { Pagination } from '@api/miscellaneous/types';

export interface ElectionSettings {
  electionSettingsId: number;
  candidateTypeId: number;
  isActive: boolean;
}

export interface SingleConstituencyTypeByScheduleZilla {
  id: number;
  electionTypeId?: number;
  nameBn: string;
  nameEn: string;
  electionSettings: ElectionSettings[];
}

export interface ConstituenciesWithSettingsListByScheduleZilla
  extends Pagination {
  constituencies: SingleConstituencyTypeByScheduleZilla[];
}

export interface ConstituenciesWithSettingsListByScheduleZillaRes {
  data: ConstituenciesWithSettingsListByScheduleZilla;
  status?: number;
  statusText?: string;
}
