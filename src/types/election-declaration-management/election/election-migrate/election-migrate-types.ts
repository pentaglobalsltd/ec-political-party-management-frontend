export interface MigratedElectionSettingsTypes {
  electionSettingId?: number;
  newElectionSettingId?: number;
  candidateTypeId?: number;
}

export interface ElectionMigrateCreateTypes {
  migratedElectionSettings?: MigratedElectionSettingsTypes[];
  electionScheduleId?: number;
  isCandidate?: boolean;
  isPollingCenter?: boolean;
  isPollingPersonnel?: boolean;
}

export interface ElectionMigrateCreateResponseTypes {
  data: ElectionMigrateCreateTypes;
  status?: number;
}
