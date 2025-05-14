import * as yup from 'yup';
import { UseFormWatch } from 'react-hook-form';
import { FirstPartType } from '@type/candidate-info-management/operator-view/candidate-nomination-form/first-part';

export type typeWatch = UseFormWatch<{
  [x: string | number]: string;
}>;

export type typeFirstPartYupObjectSchema = yup.ObjectSchema<{
  [x: string]: string | number | null | undefined;
}>;

export interface SetFirstPartValidation {
  proposerAdditionalValidation: typeFirstPartYupObjectSchema | null;
  candidateAdditionalValidation: typeFirstPartYupObjectSchema | null;
}

export interface GenericNominationFirstPartProps {
  zillaId: number | string;
  candidateNominationFormFirstPart: FirstPartType;
}
