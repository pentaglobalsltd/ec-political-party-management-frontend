import FormInput from '@components/inputs/FormInput';
import { IconPlus } from '@pentabd/icons';
import { Button, Text } from '@pentabd/ui';
import {
  ExpenseType,
  ExpenseValuesType,
} from '@type/candidate-info-management/operator-view/income-source-details/income-source-details-second-part';
import classNames from 'classnames';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export const ExpenseGroup = ({
  expense,
  setSecondPartDataModified,
}: {
  expense: ExpenseType;
  setSecondPartDataModified: (data: {
    [key: string]: { [key: string]: string };
  }) => void;
}) => {
  const [modifiedExpense, setModifiedExpense] = useState(expense);
  const { t } = useTranslation();
  const { getValues } = useFormContext();
  const handleAppend = () => {
    if (modifiedExpense?.size && modifiedExpense?.values) {
      const uniqueElements = modifiedExpense?.values?.slice(
        -modifiedExpense.size,
      );
      const maxId = Math.max(
        ...modifiedExpense?.values?.map((item: any) => item.order),
      );

      const modifiedData = uniqueElements.map(
        (item: ExpenseValuesType, index: number) => ({
          ...item,
          order: maxId + index + 1,
          value: '',
        }),
      );
      const [...rest] = modifiedData;
      setModifiedExpense((prev: any) => ({
        ...prev,
        values: [...prev.values, ...rest],
      }));
    }
  };

  const handleDelete = (order: number) => {
    let deletedUpdatedData = [...(modifiedExpense.values || [])];
    let deletedData: ExpenseValuesType[] = [];
    const index = deletedUpdatedData?.findIndex((obj) => obj.order === order);
    if (index && index !== -1 && modifiedExpense.size) {
      deletedData =
        modifiedExpense.values?.slice(
          index + 1 - modifiedExpense.size,
          index + 1,
        ) || [];
      deletedUpdatedData.splice(
        index + 1 - modifiedExpense.size,
        modifiedExpense.size,
      );
    }
    setModifiedExpense((prev) => ({ ...prev, values: deletedUpdatedData }));
    const updateFormValue = getValues();
    deletedData.forEach((item: any) => {
      const keyToDelete = item.key + item.order;

      if (
        modifiedExpense.key &&
        keyToDelete in updateFormValue[modifiedExpense.key]
      ) {
        delete updateFormValue[modifiedExpense.key][keyToDelete];
      }
    });

    setSecondPartDataModified(updateFormValue);
  };

  return (
    <>
      <Text size="md" weight="semibold">
        {modifiedExpense.label}
      </Text>
      <div className="d-flex flex-column pt-9">
        {modifiedExpense?.values?.map((item: ExpenseValuesType) => {
          return (
            <>
              <div
                className={classNames({
                  'pb-9':
                    modifiedExpense?.size &&
                    item.order &&
                    item.order % modifiedExpense.size === 0,
                })}
              >
                <FormInput
                  key={item.order}
                  title={item.label || ''}
                  registerName={`${modifiedExpense.key}.${item.key}${item.order}`}
                  placeholder={t('PLACEHOLDER.ENTER')}
                />
              </div>
              {modifiedExpense.multiple &&
              item.order &&
              modifiedExpense.size &&
              item.order / modifiedExpense.size !== 1 &&
              item.order % modifiedExpense.size === 0 ? (
                <div className="d-flex justify-content-end">
                  <Button
                    htmlType="button"
                    fill="outline"
                    type="danger"
                    onClick={() => item.order && handleDelete(item.order)}
                  >
                    {t('INCOME_SOURCE_DETAILS.DELETE')}
                  </Button>
                </div>
              ) : (
                <></>
              )}
            </>
          );
        })}

        {modifiedExpense.multiple ? (
          <div className="py-9 rounded-4 bg-white ">
            <Button
              key={2}
              fill="outline"
              type="light"
              size="xs"
              htmlType="button"
              onClick={() => handleAppend()}
            >
              <IconPlus size="16" fill="dark" />
              {t('ASSET_LIABILITIES.ADD_ANOTHER_BUTTON')}
            </Button>
          </div>
        ) : null}
      </div>
    </>
  );
};
