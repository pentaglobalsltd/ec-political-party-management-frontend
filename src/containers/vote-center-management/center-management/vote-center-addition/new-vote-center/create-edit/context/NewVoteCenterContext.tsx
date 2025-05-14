import { Dispatch, SetStateAction, createContext } from 'react';
import {
  PotentialPollingCenterType,
  PotentialPollingInstituteType,
  PotentialVoterAreasType,
} from '@type/vote-center-management/potential-polling-centers-types';

export interface ContextData {
  potentialPollingInstitute: PotentialPollingInstituteType | undefined;
  potentialPollingCenter: PotentialPollingCenterType | undefined;
  potentialVoterAreas: PotentialVoterAreasType[] | undefined;
  upUnionWardId?: number;
}

export type SetContextData = Dispatch<SetStateAction<ContextData | undefined>>;

interface NewVoteCenterContextType {
  contextData: ContextData | undefined;
  setContextData: SetContextData;
}

export const NewVoteCenterContext = createContext<
  NewVoteCenterContextType | undefined
>(undefined);
