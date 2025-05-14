import { useState } from 'react';
import { toast } from 'react-toastify';

import { fetchResultByCandidates } from '@api/result-management/submit-results/result-by-candidates';
import { POLLING_CENTER_RESULT_STATUS } from '@constants/polling-center-results';
import { FORM_FIELDS } from '@constants/forms';
import { ButtonStates } from '@containers/result-management/controller-list/submit-results/components/submit-form/modals/types';

const SUBMIT_RESULTS = FORM_FIELDS.RESULT_MANAGEMENT.SUBMIT_RESULTS;

const mappedDataArray = (dataArray: any) => {
  const isStatusInvalid =
    dataArray?.status === POLLING_CENTER_RESULT_STATUS.RETURNED_BY_ADMIN ||
    dataArray?.status === POLLING_CENTER_RESULT_STATUS.RETURNED_BY_ARO;

  const updatedCandidateVoteCounts = dataArray?.candidateVoteCounts?.map(
    (item: any) => {
      if (isStatusInvalid) {
        return {
          ...item,
          [SUBMIT_RESULTS.LEGAL_VOTE_COUNT]: 0,
          [SUBMIT_RESULTS.CHALLENGED_LEGAL_VOTE_COUNT]: 0,
          [SUBMIT_RESULTS.TOTAL_ROW_VOTE_COUNT]: 0,
        };
      } else {
        return {
          ...item,
          legalVoteCount: item?.legalVoteCount || 0,
          challengedLegalVoteCount: item?.challengedLegalVoteCount || 0,
          totalLegalVoteCount: item?.totalLegalVoteCount || 0,
        };
      }
    },
  );

  let updatedObject = {
    ...dataArray,
    candidateVoteCounts: updatedCandidateVoteCounts,
  };

  if (isStatusInvalid || updatedObject?.totalIllegalVoteCount === null) {
    updatedObject = {
      ...updatedObject,
      totalIllegalVoteCount: 0,
    };
  }

  return updatedObject;
};

type typeSetContextData = (x: any) => void;
type typeUpdateButtonStates = (x: ButtonStates) => void;

export const useResultByCandidates = (
  setContextData?: typeSetContextData,
  updateButtonStates?: typeUpdateButtonStates,
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [resultByCandidates, setResultByCandidates] = useState<any>({});

  const getResultByCandidates = async ({
    scheduleId,
    candidateTypeId,
    centerId,
  }: any) => {
    setLoading(true);
    setIsSuccess(false);
    try {
      const response = await fetchResultByCandidates({
        scheduleId,
        candidateTypeId,
        centerId,
      });
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data;

        const newData: any = mappedDataArray(dataArray);

        setResultByCandidates(newData);

        if (setContextData) {
          setContextData((prev: any) => {
            return {
              ...prev,
              contextResultByCandidates: newData,
              isSuccessResult: true,
            };
          });
        }

        setIsSuccess(true);
        setLoading(false);

        if (updateButtonStates) {
          updateButtonStates({ isSubmitBtnLoading: false });
        }
      } else {
        setLoading(false);
        setResultByCandidates({});
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      setResultByCandidates({});
      setLoading(false);
    }
  };

  const resetResultByCandidates = () => {
    setResultByCandidates({});
  };

  return {
    loading,
    isSuccess,
    resultByCandidates,
    getResultByCandidates,
    resetResultByCandidates,
  };
};
