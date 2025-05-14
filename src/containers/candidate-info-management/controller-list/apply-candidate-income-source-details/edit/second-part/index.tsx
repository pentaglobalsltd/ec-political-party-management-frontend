import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button } from '@pentabd/ui';
import { useNavigate, useParams } from 'react-router-dom';
import { useIncomeSourceDetailsSecondPart } from '@hooks/candidate-info-management/operator-view/candidate-management/income-source-details/useIncomeSourceDetailsSecondPart';
import { updateSubmitData } from '../constants';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { createIncomeSourceDetailsSecondPartInitialState } from '@actions/candidate-info-management/operator-view/candidate-management/income-source-details/income-source-details-second-part-actions';
import { SecondPartLoading } from '../components/second-part/SecondPartLoading';
import { ExpenseType } from '@type/candidate-info-management/operator-view/income-source-details/income-source-details-second-part';
import { ExpenseGroup } from '../components/second-part/ExpenseGroup';

export const EditIncomeSourceDetailsSecondPartForm = () => {
  const { electionSettingsId, candidateElectionDetailsId } = useParams();

  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    incomeSourceDetailsSecondPart,
    createIncomeDetailsSecondPart,
    secondPartDataModified,
    setSecondPartDataModified,
    getIncomeSourceDetailsSecondPartInitialStateHandler,
    isCreateSuccess,
    isGetRequested,
    isCreateRequested,
    isGetSuccess,
  } = useIncomeSourceDetailsSecondPart({
    electionSettingsId,
    candidateElectionDetailId: candidateElectionDetailsId,
    getOnMount: true,
  });

  const methods = useForm({
    values: secondPartDataModified,
  });

  const { handleSubmit } = methods;
  const onSubmit = (data: any) => {
    const updatedData = updateSubmitData(
      data,
      incomeSourceDetailsSecondPart?.expenses,
    );

    createIncomeDetailsSecondPart({
      electionSettingsId,
      candidateElectionDetailId: candidateElectionDetailsId,
      data: {
        ...incomeSourceDetailsSecondPart,
        expenses: updatedData,
      },
    });
  };

  useEffect(() => {
    if (isCreateSuccess) {
      dispatch(createIncomeSourceDetailsSecondPartInitialState());
      navigate(-1);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreateSuccess]);

  useEffect(() => {
    return () => {
      getIncomeSourceDetailsSecondPartInitialStateHandler();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isGetRequested
          ? Array.from({ length: 4 })?.map((_, index: number) => (
              <SecondPartLoading key={index} />
            ))
          : incomeSourceDetailsSecondPart?.expenses?.map(
              (expense: ExpenseType) => (
                <div className="d-flex flex-column py-9 ">
                  <ExpenseGroup
                    expense={expense}
                    key={expense.order}
                    setSecondPartDataModified={setSecondPartDataModified}
                  />
                </div>
              ),
            )}
        {isGetSuccess ? (
          <div className="col-12 d-flex justify-content-end py-8">
            <Button
              fill="fill"
              type="primary"
              htmlType="submit"
              loading={isCreateRequested}
            >
              {t('INCOME_SOURCE_DETAILS.SUBMIT')}
            </Button>
          </div>
        ) : null}
      </form>
    </FormProvider>
  );
};
