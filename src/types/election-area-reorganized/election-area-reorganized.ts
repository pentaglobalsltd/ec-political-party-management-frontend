export interface ElectionAreaReorganizedType {
  nameEn: string;
  nameBn: string;
}
export interface ElectionAreaReorganized {
  electionAreaReorganized: ElectionAreaReorganizedType[];
}

export interface ElectionAreaReorganizedProps {
  data?: ElectionAreaReorganized;
  status?: number;
  statusText?: number;
}
