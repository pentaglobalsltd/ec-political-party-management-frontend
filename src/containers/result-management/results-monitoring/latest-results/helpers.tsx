import {
  searchStruct,
  searchStructNational,
} from './constants/search-constants';
import { ELECTION_INFO } from '@constants/election-info';

export const ElectionSpecificSearch = (searchWatch: any) => {
  if (searchWatch) {
    switch (Number(searchWatch?.electionTypeId)) {
      case ELECTION_INFO.NATIONAL.ID:
        return searchStructNational;
      default:
        return searchStruct;
    }
  } else {
    return searchStruct;
  }
};
