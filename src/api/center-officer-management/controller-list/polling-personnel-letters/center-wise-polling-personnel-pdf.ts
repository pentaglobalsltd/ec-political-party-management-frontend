import axios from 'axios';
import { URLS } from '@constants/urls';
import { CenterOfficerManagementSearchProps } from '@type/search-types';

export interface CenterWisePollingPersonnelPdfProps {
  searchItems: CenterOfficerManagementSearchProps;
  token?: string;
}
export const createCenterWisePollingPersonnelPdfApi = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    searchItems,
    token,
  }: CenterWisePollingPersonnelPdfProps): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }
    const url = `${import.meta.env.VITE_PDF_GENERATOR_URL}${
      URLS.GET_PDF_DATA
    }${URLS.CREATE_CENTER_WISE_POLLING_PERSONNEL_DETAILS(
      Number(searchItems?.electionScheduleId),
    )}`;

    isRequestInProcess = true;

    try {
      const response = await axios.post(
        url,
        {
          electionTypeId: Number(searchItems?.electionTypeId),
          pollingCenterIds: searchItems?.pollingCenterIds?.toString(),
          upazillaId: searchItems?.upazilaId,
          zillaId: searchItems?.zillaId,
          unionOrWardId: searchItems?.unionOrWardId,
          trainingDateTime: searchItems?.trainingDateTime,
          trainingPlace: searchItems?.trainingPlace,

          goodsReceiptDateTime: searchItems?.goodsReceiptDateTime,
          name: searchItems?.name,
          designation: searchItems?.designation,
          trainingRoom: searchItems?.trainingRoom,
          goodsDistributionDateTime: searchItems?.goodsDistributionDateTime,
        },
        {
          responseType: 'blob',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
