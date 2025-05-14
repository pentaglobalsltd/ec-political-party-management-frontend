export interface SelectOptionArray {
  filePath?: string;
  label: string;
  value: string | number;
  id?: number;
  isSelected?: boolean;
  extra?: {
    constituencyId?: string | number;
    electionSettingsId?: string | number;
    candidateTypeId?: string | number;
    unionOrWardId?: number;
    electionSettingsIds?: number[];
    dateOfElection?: string;
  };
}
