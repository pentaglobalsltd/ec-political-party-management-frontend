import { useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { IconPlus } from '@pentabd/icons';
import { Button } from '@pentabd/ui';

import FormInput from '@components/inputs/FormInput';
import { EARNING_FROM_MISCELLANEOUS } from '@validations/candidate-info-management/operator/income-source-details/incomeSourceDetailsValidation';
import { useIncomeSourceDetails } from '@hooks/candidate-info-management/operator-view/candidate-management/income-source-details/useIncomeSourceDetails';
import {
  FUNDING_SOURCES,
  earningFromMiscellaneousDefaultValues,
} from '../constants';

export const Miscellaneous = ({ editHandler, deleteHandler }: any) => {
  const { t } = useTranslation();
  const [editButtonId, setEditButtonId] = useState<string>();
  const [deleteButtonId, setDeleteButtonId] = useState<any>();

  const {
    isUpdateOtherFundingRequested,
    isUpdateOtherFundingSuccess,
    isDeleteOtherFundingRequest,
  } = useIncomeSourceDetails({});

  const {
    fields: miscellaneousFields,
    append: miscellaneousAppend,
    remove: miscellaneousRemove,
  } = useFieldArray({
    name: 'miscellaneous',
  });

  const editButtonLoadingHandler = (id: string) => {
    if (editButtonId === id) return isUpdateOtherFundingRequested;
  };

  useEffect(() => {
    if (isUpdateOtherFundingSuccess) {
      setEditButtonId('');
    }
  }, [isUpdateOtherFundingSuccess]);

  const deleteButtonLoadingHandler = (id: number) => {
    if (deleteButtonId === id) return isDeleteOtherFundingRequest;
  };

  return (
    <>
      {miscellaneousFields.map((item: any, index) => {
        return (
          <div key={item.id}>
            <FormInput
              title="INCOME_SOURCE_DETAILS.POTENTIAL_AMOUNT"
              registerName={`miscellaneous.${index}.${EARNING_FROM_MISCELLANEOUS.POTENTIAL_AMOUNT}`}
              placeholder={t('PLACEHOLDER.ENTER')}
            />
            <FormInput
              title="INCOME_SOURCE_DETAILS.PERSON_OR_INSTITUTE_NAME"
              registerName={`miscellaneous.${index}.${EARNING_FROM_MISCELLANEOUS.PERSON_OR_INSTITUTE_NAME}`}
              placeholder={t('PLACEHOLDER.ENTER')}
            />
            <FormInput
              title="INCOME_SOURCE_DETAILS.PERSON_OR_INSTITUTE_ADDRESS"
              registerName={`miscellaneous.${index}.${EARNING_FROM_MISCELLANEOUS.PERSON_OR_INSTITUTE_ADDRESS}`}
              placeholder={t('PLACEHOLDER.ENTER')}
            />
            <FormInput
              title="INCOME_SOURCE_DETAILS.EARNING_SOURCE"
              registerName={`miscellaneous.${index}.${EARNING_FROM_MISCELLANEOUS.PERSON_OR_INSTITUTE_INCOME_SOURCE}`}
              placeholder={t('PLACEHOLDER.ENTER')}
            />

            <div className="col-12 col-lg-10 mb-6 d-flex justify-content-end gap-6">
              {item.idx && (
                <Button
                  key={`edit.ms.${item.id}`}
                  htmlType="button"
                  fill="fill"
                  type="success"
                  loading={editButtonLoadingHandler(item.id)}
                  onClick={() => {
                    setEditButtonId(item.id);
                    editHandler(index, item.idx, FUNDING_SOURCES.OTHER);
                  }}
                >
                  {t('INCOME_SOURCE_DETAILS.UPDATE')}
                </Button>
              )}
              <Button
                key={`delete.ms.${item.id}`}
                htmlType="button"
                fill="outline"
                type="danger"
                loading={deleteButtonLoadingHandler(item.id)}
                onClick={() => {
                  if (item.idx) {
                    setDeleteButtonId(item.id);
                    deleteHandler(index, item.idx, FUNDING_SOURCES.OTHER);
                  } else {
                    miscellaneousRemove(index);
                  }
                }}
              >
                {t('INCOME_SOURCE_DETAILS.DELETE')}
              </Button>
            </div>
          </div>
        );
      })}
      <div className="py-8 mb-8 rounded-4 bg-white ">
        <Button
          fill="outline"
          type="light"
          htmlType="button"
          onClick={() =>
            miscellaneousAppend({
              ...earningFromMiscellaneousDefaultValues,
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
