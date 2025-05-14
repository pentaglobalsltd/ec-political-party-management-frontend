import { useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@pentabd/ui';
import { IconPlus } from '@pentabd/icons';

import FormInput from '@components/inputs/FormInput';
import { EARNING_FROM_OWN_INCOME } from '@validations/candidate-info-management/operator/income-source-details/incomeSourceDetailsValidation';
import { useIncomeSourceDetails } from '@hooks/candidate-info-management/operator-view/candidate-management/income-source-details/useIncomeSourceDetails';
import { FUNDING_SOURCES, ownEarningDefaultValues } from '../constants';

export const OwnEarning = ({ editHandler, deleteHandler }: any) => {
  const { t } = useTranslation();
  const [editButtonId, setEditButtonId] = useState<string>();
  const [deleteButtonId, setDeleteButtonId] = useState<any | string>();

  const {
    isUpdateSelfFundingSuccess,
    isUpdateSelfFundingRequested,
    isDeleteSelfFundingRequest,
  } = useIncomeSourceDetails({});

  const {
    fields: ownEarningFields,
    append: ownEarningAppend,
    remove: ownEarningRemove,
  } = useFieldArray({
    name: 'selfFundings',
  });

  const editButtonLoadingHandler = (id: string) => {
    if (editButtonId === id) return isUpdateSelfFundingRequested;
  };

  useEffect(() => {
    if (isUpdateSelfFundingSuccess) {
      setEditButtonId('');
    }
  }, [isUpdateSelfFundingSuccess]);

  const deleteButtonLoadingHandler = (id: number) => {
    if (deleteButtonId === id) return isDeleteSelfFundingRequest;
  };

  return (
    <>
      {ownEarningFields.map((item: any, index) => {
        return (
          <div key={item.id}>
            <FormInput
              title="INCOME_SOURCE_DETAILS.POTENTIAL_AMOUNT"
              registerName={`selfFundings.${index}.${EARNING_FROM_OWN_INCOME.POTENTIAL_AMOUNT}`}
              placeholder={t('PLACEHOLDER.ENTER')}
            />
            <FormInput
              title="INCOME_SOURCE_DETAILS.EARNING_SOURCE"
              registerName={`selfFundings.${index}.${EARNING_FROM_OWN_INCOME.EARNING_SOURCE}`}
              placeholder={t('PLACEHOLDER.ENTER')}
            />
            <div className="col-12 col-lg-10 mb-6 d-flex justify-content-end gap-6">
              {item.idx && (
                <Button
                  key={`edit.ow.${item.id}`}
                  htmlType="button"
                  fill="fill"
                  type="success"
                  loading={editButtonLoadingHandler(item.id)}
                  onClick={() => {
                    setEditButtonId(item.id);
                    editHandler(index, item.idx, FUNDING_SOURCES.SELF);
                  }}
                >
                  {t('INCOME_SOURCE_DETAILS.UPDATE')}
                </Button>
              )}
              <Button
                key={`delete.oe.${item.id}`}
                htmlType="button"
                fill="outline"
                type="danger"
                loading={deleteButtonLoadingHandler(item.id)}
                onClick={() => {
                  if (item.idx) {
                    setDeleteButtonId(item.id);
                    deleteHandler(index, item.idx, FUNDING_SOURCES.SELF);
                  } else {
                    ownEarningRemove(index);
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
            ownEarningAppend({
              ...ownEarningDefaultValues,
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
