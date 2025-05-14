export interface DataProviderSearchProps {
    electionTypeId?: number;
    electionScheduleId?: number;
    regionId?:number;
  }


  interface ProviderHistory {
    id: number;
    electionScheduleId: number;
    electionSettingsId: number | null;
    moduleName: string;
    status: string;
    statusCode: number;
    rowInserted: number;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
  }
  
  interface ModuleUpdated {
    moduleName: string;
    updatedAt: string;
  }
  
  export interface DataProviderType {
    page: number;
    size: number;
    total: number;
    providerHistories: ProviderHistory[];
    alreadyPublishedModuleNames: string[];
    moduleUpdated: ModuleUpdated[];
  }

  export interface DataProviderResponse {
    data?: DataProviderType;
    status?: number;
    statusText?: string;
  }
  