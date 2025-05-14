import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import { candidateManagementServiceApi } from '@helpers/interceptors/cms';
import {
  NominationListResponseType,
  NominationListSearchProps,
} from '@type/candidate-info-management/nomination-list-type';
import { ELECTION_INFO } from '@constants/election-info';

export interface Props {
  searchItems: NominationListSearchProps;
  page?: number;
  size?: number;
}

export const getCandidateInformationApi = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    searchItems,
    page,
    size,
  }: Props): Promise<{ data: NominationListResponseType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(URLS.GET_CANDIDATE_INFORMATION, {
      page: page as number,
      size: size as number,
      electionTypeId: searchItems?.electionTypeId as number,
      electionScheduleId: searchItems?.electionScheduleId as number,
      candidateTypeId: searchItems?.candidateTypeId as number,
      zillaId: searchItems?.zillaId as number,
      constituencyId: searchItems?.constituencyId as number,

      ...(Number(searchItems?.electionTypeId) === ELECTION_INFO.MUNICIPALITY.ID
        ? {}
        : { upazilaId: searchItems?.upazilaId as number }),

      municipalityId: searchItems?.municipalityId as number,
      unionsOrWardsId: searchItems?.unionOrWardId as number,
      nominationStatusCodes: searchItems?.nominationStatusCodes as number,
      isSelfNomination: searchItems?.isSelfNomination as boolean,
      paymentType: searchItems?.paymentType as string,

      isNominationComplete: searchItems?.isNominationComplete as boolean,
      isPersonalInfoComplete: searchItems?.isPersonalInfoComplete as boolean,
      isHolofnamaComplete: searchItems?.isHolofnamaComplete as boolean,
      isAttachmentComplete: searchItems?.isAttachmentComplete as boolean,
      isCandidateElectionExpenseComplete:
        searchItems?.isCandidateElectionExpenseComplete as boolean,
      isAssetIncomeExpenditureComplete:
        searchItems?.isAssetIncomeExpenditureComplete as boolean,
      candidateSerialOrder: searchItems?.candidateSerialOrder as boolean,
      bengaliAlphabetOrder: searchItems?.bengaliAlphabetOrder as boolean,
      candidateNameOrNid: searchItems?.candidateNameOrNid as string,
    });

    isRequestInProcess = true;

    try {
      const response = await candidateManagementServiceApi.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
