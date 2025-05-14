import { useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@pentabd/ui';
import { IconPlus } from '@pentabd/icons';

import FormInput from '@components/inputs/FormInput';
import { EARNING_FROM_OTHERS } from '@validations/candidate-info-management/operator/income-source-details/incomeSourceDetailsValidation';
import { useIncomeSourceDetails } from '@hooks/candidate-info-management/operator-view/candidate-management/income-source-details/useIncomeSourceDetails';
import { FUNDING_SOURCES, donationByOthersDefaultValues } from '../constants';

export const DonationByOthers = ({ editHandler, deleteHandler }: any) => {
  const { t } = useTranslation();
  const [editButtonId, setEditButtonId] = useState<string>();
  const [deleteButtonId, setDeleteButtonId] = useState<any>();

  const {
    isUpdateOtherFundingRequested,
    isUpdateOtherFundingSuccess,
    isDeleteOtherFundingRequest,
  } = useIncomeSourceDetails({});

  const {
    fields: donationByOthersFields,
    append: donationByOthersAppend,
    remove: donationByOthersRemove,
  } = useFieldArray({
    name: 'donationByOthers',
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
      {donationByOthersFields.map((item: any, index) => {
        return (
          <div key={item.id}>
            <FormInput
              title="INCOME_SOURCE_DETAILS.POTENTIAL_AMOUNT"
              registerName={`donationByOthers.${index}.${EARNING_FROM_OTHERS.POTENTIAL_AMOUNT}`}
              placeholder={t('PLACEHOLDER.ENTER')}
            />
            <FormInput
              title="INCOME_SOURCE_DETAILS.PERSON_NAME"
              registerName={`donationByOthers.${index}.${EARNING_FROM_OTHERS.PERSON_NAME}`}
              placeholder={t('PLACEHOLDER.ENTER')}
            />
            <FormInput
              title="INCOME_SOURCE_DETAILS.PERSON_ADDRESS"
              registerName={`donationByOthers.${index}.${EARNING_FROM_OTHERS.PERSON_ADDRESS}`}
              placeholder={t('PLACEHOLDER.ENTER')}
            />
            <div className="col-12 col-lg-10 mb-6 d-flex justify-content-end gap-6">
              {item.idx && (
                <Button
                  key={`edit.do.${item.id}`}
                  htmlType="button"
                  fill="fill"
                  type="success"
                  loading={editButtonLoadingHandler(item.id)}
                  onClick={() => {
                    setEditButtonId(item.id);
                    editHandler(
                      index,
                      item.idx,
                      FUNDING_SOURCES.OTHER_DONATION,
                    );
                  }}
                >
                  {t('INCOME_SOURCE_DETAILS.UPDATE')}
                </Button>
              )}
              <Button
                key={`delete.do.${item.id}`}
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
                      FUNDING_SOURCES.OTHER_DONATION,
                    );
                  } else {
                    donationByOthersRemove(index);
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
            donationByOthersAppend({
              ...donationByOthersDefaultValues,
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
