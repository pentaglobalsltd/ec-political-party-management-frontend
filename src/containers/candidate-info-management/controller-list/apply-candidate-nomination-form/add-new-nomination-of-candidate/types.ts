import { UseFormWatch } from 'react-hook-form';
import * as yup from 'yup';

type typeWatch = UseFormWatch<{
  [x: string]: string | undefined;
  [x: number]: string | undefined;
}>;

export type typeYupObjectSchema = yup.ObjectSchema<{
  [x: string]: string | undefined;
}>;

export interface GenericProps {
  watch: typeWatch;
  electionId?: number | string;
  electionScheduleId?: number | string;
  zillaId?: number | string;
  candidateTypeId?: number | string;
}
