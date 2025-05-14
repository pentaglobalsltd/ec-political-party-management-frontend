import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import { CenterOfficerContactDetailsSearchProps } from '@type/center-officer-management/center-officer-contact-details-types';
import { GetCenterOfficerContactDetailsProps } from '@type/center-officer-management/center-officer-contact-details-types';
import { pollingPersonnelApi } from '@helpers/interceptors/polling-personnel';

export const getCenterOfficerContactDetails = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    searchItems?: CenterOfficerContactDetailsSearchProps,
    page?: number,
    size?: number,
  ): Promise<{ data: GetCenterOfficerContactDetailsProps }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }
    const url = encodeQuery(URLS.GET_CENTER_OFFICER_CONTACT_DETAILS, {
      page: page as number,
      size: size as number,
      electionScheduleId: searchItems?.electionScheduleId as number,
      zillaId: searchItems?.zillaId as number,
      upazilaId: searchItems?.upazilaId as number,
      unionOrWardId: searchItems?.unionOrWardId as number,
      voterType: searchItems?.voterType as string,
      userTypeCode: searchItems?.userTypeCode as string,
      isPersonnelExists: searchItems?.isPersonnelExists as boolean,
      searchValue: searchItems?.searchValue as string,
    });

    isRequestInProcess = true;

    try {
      const response = await pollingPersonnelApi.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
