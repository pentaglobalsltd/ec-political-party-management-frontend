import { useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@pentabd/ui';
import { IconPlus } from '@pentabd/icons';

import FormInput from '@components/inputs/FormInput';
import { EARNING_FROM_RELATIVES } from '@validations/candidate-info-management/operator/income-source-details/incomeSourceDetailsValidation';
import { useIncomeSourceDetails } from '@hooks/candidate-info-management/operator-view/candidate-management/income-source-details/useIncomeSourceDetails';
import {
  FUNDING_SOURCES,
  earningFromRelativeDefaultValues,
} from '../constants';

export const EarningFromRelative = ({ editHandler, deleteHandler }: any) => {
  const { t } = useTranslation();
  const [editButtonId, setEditButtonId] = useState<string>();
  const [deleteButtonId, setDeleteButtonId] = useState<any>();

  const {
    isUpdateRelativeFundingRequested,
    isUpdateRelativeFundingSuccess,
    isDeleteRelativeRequest,
  } = useIncomeSourceDetails({});

  const {
    fields: earningFromRelativeFields,
    append: earningFromRelativeAppend,
    remove: earningFromRelativeRemove,
  } = useFieldArray({
    name: 'earningFromRelative',
  });

  const editButtonLoadingHandler = (id: string) => {
    if (editButtonId === id) return isUpdateRelativeFundingRequested;
  };

  useEffect(() => {
    if (isUpdateRelativeFundingSuccess) {
      setEditButtonId('');
    }
  }, [isUpdateRelativeFundingSuccess]);

  const deleteButtonLoadingHandler = (id: number) => {
    if (deleteButtonId === id) return isDeleteRelativeRequest;
  };

  return (
    <>
      {earningFromRelativeFields.map((item: any, index) => {
        return (
          <div key={item.id}>
            <FormInput
              title="INCOME_SOURCE_DETAILS.POTENTIAL_AMOUNT"
              registerName={`earningFromRelative.${index}.${EARNING_FROM_RELATIVES.POTENTIAL_AMOUNT}`}
              placeholder={t('PLACEHOLDER.ENTER')}
            />
            <FormInput
              title="INCOME_SOURCE_DETAILS.RELATIVE_NAME"
              registerName={`earningFromRelative.${index}.${EARNING_FROM_RELATIVES.RELATIVE_NAME}`}
              placeholder={t('PLACEHOLDER.ENTER')}
            />
            <FormInput
              title="INCOME_SOURCE_DETAILS.RELATIVE_ADDRESS"
              registerName={`earningFromRelative.${index}.${EARNING_FROM_RELATIVES.RELATIVE_ADDRESS}`}
              placeholder={t('PLACEHOLDER.ENTER')}
            />
            <FormInput
              title="INCOME_SOURCE_DETAILS.RELATION"
              registerName={`earningFromRelative.${index}.${EARNING_FROM_RELATIVES.RELATION}`}
              placeholder={t('PLACEHOLDER.ENTER')}
            />
            <FormInput
              title="INCOME_SOURCE_DETAILS.RELATIVE_INCOME_SOURCE"
              registerName={`earningFromRelative.${index}.${EARNING_FROM_RELATIVES.RELATIVE_INCOME_SOURCE}`}
              placeholder={t('PLACEHOLDER.ENTER')}
            />
            <div className="col-12 col-lg-10 mb-6 d-flex justify-content-end gap-6">
              {item.idx && (
                <Button
                  key={`edit.er.${item.id}`}
                  htmlType="button"
                  fill="fill"
                  type="success"
                  loading={editButtonLoadingHandler(item.id)}
                  onClick={() => {
                    setEditButtonId(item.id);
                    editHandler(index, item.idx, FUNDING_SOURCES.RELATIVE_LOAN);
                  }}
                >
                  {t('INCOME_SOURCE_DETAILS.UPDATE')}
                </Button>
              )}
              <Button
                key={`delete.er.${item.id}`}
                htmlType="button"
                fill="outline"
                type="danger"
                loading={deleteButtonLoadingHandler(item.id)}
                onClick={() => {
                  if (item.idx) {
                    setDeleteButtonId(item.id);
                    deleteHandler(
                      index,
                      item.idx,
                      FUNDING_SOURCES.RELATIVE_LOAN,
                    );
                  } else {
                    earningFromRelativeRemove(index);
                  }
                }}
              >
                {t('INCOME_SOURCE_DETAILS.DELETE')}
              </Button>
            </div>
          </div>
        );
      })}
      <div className="py-8 mb-8 rounded-4 bg-white">
        <Button
          fill="outline"
          type="light"
          htmlType="button"
          onClick={() =>
            earningFromRelativeAppend({
              ...earningFromRelativeDefaultValues,
            })
          }
        >
          <IconPlus size="16" fill="dark" />
          {t('INCOME_SOURCE_DETAILS.ADD_NEW_BUTTON')}
        </Button>
      </div>
    </>
  );
};
