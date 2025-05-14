import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { updateNominationStatusApi } from '@api/candidate-info-management/nomination-list/updateNominationStatus';
import { NominationStatusUpdateValueType } from '@containers/candidate-info-management/controller-list/candidate-management/constants';
import { NominationListSearchProps } from '@type/candidate-info-management/nomination-list-type';

export interface UpdateNominationStatus {
  nominationStatusUpdate: NominationStatusUpdateValueType | null;
  getCandidateInformation: any;
  params: any;
  searchItems: NominationListSearchProps;
}

interface UseUpdateNominationStatus {
  updateNominationStatus: (obj: UpdateNominationStatus) => void;
  loading: boolean;
}

export const useUpdateNominationStatus = (): UseUpdateNominationStatus => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const updateNominationStatus = async ({
    nominationStatusUpdate,
    getCandidateInformation,
    params,
    searchItems,
  }: UpdateNominationStatus) => {
    if (nominationStatusUpdate) {
      try {
        setLoading(true);
        const response = await updateNominationStatusApi(
          nominationStatusUpdate,
        );
        setLoading(false);

        if (response?.data?.status === 200) {
          toast.success(t('TOAST_MESSAGE.UPDATE_SUCCESS_MESSAGE'));

          getCandidateInformation({
            page: params?.page ? parseInt(params.page, 10) : 0,
            searchItems: searchItems,
          });
        } else {
          toast.error(t('TOAST_MESSAGE.UPDATE_ERROR_MESSAGE'));
        }
      } catch (err) {
        setLoading(false);
        toast.error(t('TOAST_MESSAGE.UPDATE_ERROR_MESSAGE'));
      }
    }
  };

  return {
    updateNominationStatus,
    loading,
  };
};
