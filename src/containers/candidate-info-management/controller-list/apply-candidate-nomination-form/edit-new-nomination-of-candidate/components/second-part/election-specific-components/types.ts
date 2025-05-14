import * as yup from 'yup';

export type typeSecondPartYupObjectSchema = yup.ObjectSchema<{
  [x: string]: string | number | null | undefined;
}>;

export interface GenericNominationSecondPartProps {
  zillaId: number | string;
  candidateNominationFormSecondPart: any; // TODO
}
