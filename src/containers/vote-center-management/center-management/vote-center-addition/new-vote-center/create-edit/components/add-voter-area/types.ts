import { UseFormResetField, UseFormWatch } from 'react-hook-form';

export type watchType = UseFormWatch<{
  [x: string]: number | undefined;
}>;

export type resetFieldType = UseFormResetField<{
  [x: string]: number | undefined;
}>;

export interface VoterCount {
  male: number;
  female: number;
  thirdGender: number;
  total: number;
}
