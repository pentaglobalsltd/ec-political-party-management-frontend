import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@helpers/redux';
import { IncomeSourceDetailsSecondPartState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/income-source-details/income-source-details-second-step-state';
import { getIncomeSourceDetailsSecondPartState } from '@selectors/candidate-info-management/operator-view/candidate-management/income-source-details/income-source-details-second-part-selector';
import { UrlType } from '@type/url-type';
import {
  createIncomeSourceDetailsSecondPartRequest,
  getIncomeSourceDetailsSecondPartInitialState,
  getIncomeSourceDetailsSecondPartRequest,
} from '@actions/candidate-info-management/operator-view/candidate-management/income-source-details/income-source-details-second-part-actions';
import {
  ExpenseType,
  ExpenseValuesType,
  IncomeSourceDetailsSecondPart,
  IncomeSourceDetailsSecondPartPropsType,
} from '@type/candidate-info-management/operator-view/income-source-details/income-source-details-second-part';

interface UseIncomeSourceDetailsSecondPart {
  isCreateRequested: boolean;
  isCreateSuccess: boolean;
  isGetRequested: boolean;
  isGetSuccess: boolean;
  incomeSourceDetailsSecondPart: IncomeSourceDetailsSecondPart;
  createIncomeDetailsSecondPart: ({
    electionSettingsId,
    candidateElectionDetailId,
    data,
  }: IncomeSourceDetailsSecondPartPropsType) => void;

  getIncomeSourceDetailsSecondPartInitialStateHandler: () => void;
  secondPartDataModified: { [key: string]: { [key: string]: string } };
  setSecondPartDataModified: (data: {
    [key: string]: { [key: string]: string };
  }) => void;
}

export const useIncomeSourceDetailsSecondPart = ({
  electionSettingsId,
  candidateElectionDetailId,
  getOnMount,
}: UrlType): UseIncomeSourceDetailsSecondPart => {
  const dispatch = useDispatch();
  const [secondPartDataModified, setSecondPartDataModified] = useState<{
    [key: string]: { [key: string]: string };
  }>({});
  const {
    createIncomeSourceDetailsSecondPartDetails,
    getIncomeSourceDetailsSecondPartDetails,
  } = useAppSelector<IncomeSourceDetailsSecondPartState>(
    getIncomeSourceDetailsSecondPartState,
  );

  const isCreateRequested = Boolean(
    createIncomeSourceDetailsSecondPartDetails.request,
  );
  const isCreateSuccess = Boolean(
    createIncomeSourceDetailsSecondPartDetails.success,
  );
  const isGetRequested = Boolean(
    getIncomeSourceDetailsSecondPartDetails.request,
  );
  const isGetSuccess = Boolean(getIncomeSourceDetailsSecondPartDetails.success);

  const incomeSourceDetailsSecondPart =
    getIncomeSourceDetailsSecondPartDetails.data || {};

  useEffect(() => {
    if (getOnMount) {
      dispatch(
        getIncomeSourceDetailsSecondPartRequest({
          electionSettingsId,
          candidateElectionDetailId,
        }),
      );
    }
  }, [candidateElectionDetailId, electionSettingsId, dispatch, getOnMount]);

  const createIncomeDetailsSecondPart = ({
    electionSettingsId,
    candidateElectionDetailId,
    data,
  }: IncomeSourceDetailsSecondPartPropsType) => {
    dispatch(
      createIncomeSourceDetailsSecondPartRequest({
        electionSettingsId,
        candidateElectionDetailId,
        data,
      }),
    );
  };

  const getIncomeSourceDetailsSecondPartInitialStateHandler = () => {
    dispatch(getIncomeSourceDetailsSecondPartInitialState());
  };

  useEffect(() => {
    if (getOnMount) {
      const modifiedData: any = {};
      incomeSourceDetailsSecondPart?.expenses?.forEach((item: ExpenseType) => {
        const valuesObject: any = {};

        item?.values?.forEach((valueItem: ExpenseValuesType) => {
          const key = `${valueItem.key}${valueItem.order}`;
          valuesObject[key] = valueItem.value;
        });
        if (item.key) modifiedData[item.key] = valuesObject;
      });
      setSecondPartDataModified(modifiedData);
    }
  }, [getOnMount, incomeSourceDetailsSecondPart?.expenses]);

  return {
    isCreateRequested,
    isCreateSuccess,
    isGetRequested,
    isGetSuccess,
    incomeSourceDetailsSecondPart,
    setSecondPartDataModified,
    createIncomeDetailsSecondPart,

    getIncomeSourceDetailsSecondPartInitialStateHandler,
    secondPartDataModified,
  };
};
