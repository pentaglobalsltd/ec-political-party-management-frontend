import { useState, useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Text } from '@pentabd/ui';
import { IconPlus } from '@pentabd/icons';

import FormInput from '@components/inputs/FormInput';

import { FORM_FIELDS } from '@constants/forms';
import {
  yearlyIncomeSpendingDefaultValues,
  FIELD_ARRAY_TYPE,
} from '../constants';
import { useAssetLiabilityDetails } from '@hooks/candidate-info-management/operator-view/candidate-management/asset-liability-details/useAssetLiabilityDetails';

const ASSET_LIABILITIES =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.ASSET_LIABILITIES;

export const YearlyIncomeSpending = ({
  editHandler,
  deleteHandler,
  trigger,
  errors,
  getValues,
}: any) => {
  const { t } = useTranslation();
  const [editButtonId, setEditButtonId] = useState<string>();
  const [deleteButtonId, setDeleteButtonId] = useState<any>();

  const {
    isUpdateYearlyIncomeRequested,
    isUpdateYearlyIncomeSuccess,
    isDeleteYearlyIncomeRequested,
  } = useAssetLiabilityDetails({});

  const {
    fields: yearlyIncomeSpendingFields,
    append: yearlyIncomeSpendingAppend,
    remove: yearlyIncomeSpendingRemove,
  } = useFieldArray({
    name: FIELD_ARRAY_TYPE.YEARLY_INCOME,
  });

  const editButtonLoadingHandler = (id: string) => {
    if (editButtonId === id) return isUpdateYearlyIncomeRequested;
  };

  useEffect(() => {
    if (isUpdateYearlyIncomeSuccess) {
      setEditButtonId('');
    }
  }, [isUpdateYearlyIncomeSuccess]);

  const deleteButtonLoadingHandler = (id: number) => {
    if (deleteButtonId === id) return isDeleteYearlyIncomeRequested;
  };

  const editHandlerButton = async (item: any, index: number) => {
    await trigger([
      `${FIELD_ARRAY_TYPE.YEARLY_INCOME}.${index}.${ASSET_LIABILITIES.TOTAL_ESTIMATED_ANNUAL_INCOME}`,
      `${FIELD_ARRAY_TYPE.YEARLY_INCOME}.${index}.${ASSET_LIABILITIES.TOTAL_ESTIMATED_ANNUAL_COST}`,
    ]);
    if (Object.keys(errors).length === 0) {
      setEditButtonId(item.id);
      editHandler(index, item.idx, FIELD_ARRAY_TYPE.YEARLY_INCOME);
    }
  };

  return (
    <>
      <div className="d-flex flex-column pt-9">
        <Text size="xl" weight="semibold">
          {t('ASSET_LIABILITIES.PART_C_TITLE')}
        </Text>

        {yearlyIncomeSpendingFields?.map((item: any, index) => {
          return (
            <div key={`div.${item.id}`} className="d-flex flex-column pt-9">
              <FormInput
                title="ASSET_LIABILITIES.TOTAL_ESTIMATED_ANNUAL_INCOME"
                registerName={`${FIELD_ARRAY_TYPE.YEARLY_INCOME}.${index}.${ASSET_LIABILITIES.TOTAL_ESTIMATED_ANNUAL_INCOME}`}
                placeholder={t('PLACEHOLDER.ENTER')}
                required
              />

              <FormInput
                title="ASSET_LIABILITIES.TOTAL_ESTIMATED_ANNUAL_COST"
                registerName={`${FIELD_ARRAY_TYPE.YEARLY_INCOME}.${index}.${ASSET_LIABILITIES.TOTAL_ESTIMATED_ANNUAL_COST}`}
                placeholder={t('PLACEHOLDER.ENTER')}
                required
              />
              <div className="col-12 col-lg-10 d-flex justify-content-end gap-6">
                {item.idx && (
                  <Button
                    key={`edit.yi.${item.id}`}
                    htmlType="button"
                    fill="fill"
                    type="success"
                    loading={editButtonLoadingHandler(item.id)}
                    onClick={() => editHandlerButton(item, index)}
                  >
                    {t('ASSET_LIABILITIES.UPDATE')}
                  </Button>
                )}
                {getValues(FIELD_ARRAY_TYPE.YEARLY_INCOME)?.length > 1 ? (
                  <Button
                    key={`delete.yi.${item.id}`}
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
                          FIELD_ARRAY_TYPE.YEARLY_INCOME,
                        );
                      } else {
                        yearlyIncomeSpendingRemove(index);
                      }
                    }}
                  >
                    {t('ASSET_LIABILITIES.DELETE')}
                  </Button>
                ) : null}
              </div>
            </div>
          );
        })}

        <div className="py-9 rounded-4 bg-white border-bottom">
          <Button
            key={6}
            fill="outline"
            type="light"
            size="xs"
            htmlType="button"
            onClick={() => {
              yearlyIncomeSpendingAppend({
                ...yearlyIncomeSpendingDefaultValues,
              });
            }}
          >
            <IconPlus size="16" fill="dark" />{' '}
            {t('ASSET_LIABILITIES.ADD_ANOTHER_BUTTON')}
          </Button>
        </div>
      </div>
    </>
  );
};
