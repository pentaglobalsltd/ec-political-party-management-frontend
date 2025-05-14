import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import { FileType } from '../../../candidate-info-management/nomination-list-type';

export interface ElectionSettingsAggregatedType {
  id: number;
  electionSettingsNameBn: string | null;
  electionSettingsNameEn: string | null;

  // 1
  electionSchedule?: string | null;
  electionScheduleId?: number | null;
  electionScheduleNameBn?: string | null;
  electionScheduleNameEn?: string | null;

  // 2
  candidateType?: string | null;
  candidateTypeId?: number | null;
  candidateTypeNameBn?: string | null;
  candidateTypeNameEn?: string | null;

  // 3
  zilla?: string | null;
  zillaId?: number | null;
  zillaNameBn?: string | null;
  zillaNameEn?: string | null;

  // 4
  upazila?: string | null;
  upazilaId?: number | null;
  upazilaNameBn?: string | null;
  upazilaNameEn?: string | null;

  // 5
  constituencyCode?: string | null;

  // not needed
  regionId?: number | null;
  regionNameBn?: string | null;
  regionNameEn?: string | null;

  // 6
  constituency?: string | null;
  constituencyId?: number | null;
  constituencyNameBn?: string | null;
  constituencyNameEn?: string | null;

  // 7
  municipalityName?: string | null;
  municipalityId?: number | null;
  municipalityNameBn?: string | null;
  municipalityNameEn?: string | null;
  municipalityWardId?: string | null;
  // 8
  unionWard?: string | null;
  unionWardId?: number | null;
  unionWardNameBn?: string | null;
  unionWardNameEn?: string | null;
  reservedWardId?: string;
  // 9
  isResultFromTab?: boolean | string | null;

  // 10
  votingType?: string | null;

  // 11
  unionOrWard?: string | null;
  unionOrWardId?: number | null;
  unionOrWardNameBn?: string | null;
  unionOrWardNameEn?: string | null;

  // 12
  dateOfNominationSubmission?: string | null;

  // 13
  scheduleFile?: FileType | null;
  electionSettingsDetailsId?: number;

  electionAreaReorganized?: string;

  electionAreaReorganizedBn?: string;
  electionAreaReorganizedEn?: string;
  // the followings are not necessary
  isVoterAreaDivided?: boolean | null;
  isActive?: boolean | null;
  createdBy?: string | null;
  updatedBy?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface ElectionSettingsSearchProps {
  electionTypeId?: number;
  electionScheduleId?: number;
  candidateTypeId?: number;
  zillaId?: number;
  constituencyId?: number;
  electionAreaReorganized?: string;
  isCaseAvailable?: string;
  isActive?: string;
}

export interface ElectionSettingsResponseType {
  data: {
    electionSettings: ElectionSettingsAggregatedType[];
    page: number;
    size: number;
    total: number;
  };

  status?: number;
  statusText?: string;
}

// --------------------

// 2
export interface GetElectionSettingsByIdResponseTypes {
  data: ElectionSettingsAggregatedType;
  status?: number;
  statusText?: string;
}

// 3
export interface GetElectionSettingsByIdTypes extends UrlIdTypes {
  data: ElectionSettingsAggregatedType;
}
