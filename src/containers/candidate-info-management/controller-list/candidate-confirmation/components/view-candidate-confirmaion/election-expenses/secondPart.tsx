import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { Text } from '@pentabd/ui';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { useIncomeSourceDetailsSecondPart } from '@hooks/candidate-info-management/operator-view/candidate-management/income-source-details/useIncomeSourceDetailsSecondPart';
import { SecondPartLoading } from '@containers/candidate-info-management/controller-list/apply-candidate-income-source-details/edit/components/second-part/SecondPartLoading';
import {
  ExpenseType,
  ExpenseValuesType,
} from '@type/candidate-info-management/operator-view/income-source-details/income-source-details-second-part';
import FormInput from '@components/inputs/FormInput';

export const ElectionExpenseSecondPart = () => {
  const { t } = useTranslation();
  const { electionSettingsId, candidateElectionDetailsId } = useParams();
  const {
    incomeSourceDetailsSecondPart,
    secondPartDataModified,
    isGetRequested,
  } = useIncomeSourceDetailsSecondPart({
    electionSettingsId,
    candidateElectionDetailId: candidateElectionDetailsId,
    getOnMount: true,
  });

  const methods = useForm({
    values: secondPartDataModified,
  });

  return (
    <div className="pt-10">
      <div className="py-10 border-bottom">
        <Text size="lg" weight="semibold" color="title">
          {t('CANDIDATE_CONFIRMATION.PROGRESS_STEPS_SECOND_PART')}
        </Text>
      </div>
      <FormProvider {...methods}>
        {isGetRequested
          ? Array.from({ length: 4 })?.map((_, index: number) => (
              <SecondPartLoading key={index} />
            ))
          : incomeSourceDetailsSecondPart?.expenses?.map(
              (expense: ExpenseType) => (
                <div className="d-flex flex-column py-9 ">
                  <Text size="md" weight="semibold">
                    {expense.label}
                  </Text>
                  <div className="d-flex flex-column pt-9">
                    {expense?.values?.map((item: ExpenseValuesType) => {
                      return (
                        <>
                          <div
                            className={classNames({
                              'pb-9':
                                expense?.size &&
                                item.order &&
                                item.order % expense.size === 0,
                            })}
                          >
                            <FormInput
                              key={item.order}
                              title={item.label || ''}
                              registerName={`${expense.key}.${item.key}${item.order}`}
                              placeholder={t('PLACEHOLDER.ENTER')}
                              disabled
                            />
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              ),
            )}
      </FormProvider>
    </div>
  );
};
