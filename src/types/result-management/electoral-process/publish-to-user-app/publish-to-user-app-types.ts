export interface PublishToUserAppRequestType {
  electionScheduleId?: string | number;
  electionSettingsId?: string | number;
  data?: {};
}

export interface PublishToUserAppResponseType {
  data?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
}
