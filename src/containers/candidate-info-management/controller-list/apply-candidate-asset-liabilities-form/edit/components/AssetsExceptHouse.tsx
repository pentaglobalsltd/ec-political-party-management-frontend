import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFieldArray } from 'react-hook-form';

import { Button, Text } from '@pentabd/ui';
import { IconPlus } from '@pentabd/icons';

import FormInput from '@components/inputs/FormInput';

import { FORM_FIELDS } from '@constants/forms';
import { assetsExceptHouseDefaultValues, FIELD_ARRAY_TYPE } from '../constants';
import { useAssetLiabilityDetails } from '@hooks/candidate-info-management/operator-view/candidate-management/asset-liability-details/useAssetLiabilityDetails';

const ASSET_LIABILITIES =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.ASSET_LIABILITIES;

export const AssetsExceptHouse = ({ editHandler, deleteHandler }: any) => {
  const { t } = useTranslation();
  const [editButtonId, setEditButtonId] = useState<string>();
  const [deleteButtonId, setDeleteButtonId] = useState<any>();

  const {
    isUpdateAssetsRequested,
    isUpdateAssetsSuccess,
    isDeleteAssetRequested,
  } = useAssetLiabilityDetails({});

  const {
    fields: assetsExceptHouseFields,
    append: assetsExceptHouseAppend,
    remove: assetsExceptHouseRemove,
  } = useFieldArray({
    name: FIELD_ARRAY_TYPE.ASSETS_EXCEPT_HOUSE,
  });

  const editButtonLoadingHandler = (id: string) => {
    if (editButtonId === id) return isUpdateAssetsRequested;
  };

  useEffect(() => {
    if (isUpdateAssetsSuccess) {
      setEditButtonId('');
    }
  }, [isUpdateAssetsSuccess]);

  const deleteButtonLoadingHandler = (id: number) => {
    if (deleteButtonId === id) return isDeleteAssetRequested;
  };

  return (
    <>
      <div className="d-flex flex-column pt-9">
        <Text size="xl" weight="semibold">
          {t('ASSET_LIABILITIES.PART_A_TITLE')}
        </Text>

        <Text size="lg" weight="medium">
          {t('ASSET_LIABILITIES.PART_A_SUBTITLE')}
        </Text>
      </div>
      {assetsExceptHouseFields.map((item: any, index) => {
        return (
          <div key={`div.${item.id}`} className="d-flex flex-column pt-9">
            <FormInput
              title="ASSET_LIABILITIES.TOTAL_AMOUNT"
              registerName={`${FIELD_ARRAY_TYPE.ASSETS_EXCEPT_HOUSE}.${index}.${ASSET_LIABILITIES.TOTAL_AMOUNT}`}
              placeholder={t('PLACEHOLDER.ENTER')}
            />

            <FormInput
              title="ASSET_LIABILITIES.OTHER_LOCATION"
              registerName={`${FIELD_ARRAY_TYPE.ASSETS_EXCEPT_HOUSE}.${index}.${ASSET_LIABILITIES.OTHER_LOCATION}`}
              placeholder={t('PLACEHOLDER.ENTER')}
            />

            <FormInput
              title="ASSET_LIABILITIES.OTHER_ESTIMATED_VALUE"
              registerName={`${FIELD_ARRAY_TYPE.ASSETS_EXCEPT_HOUSE}.${index}.${ASSET_LIABILITIES.OTHER_ESTIMATED_VALUE}`}
              placeholder={t('PLACEHOLDER.ENTER')}
            />
            <div className="col-12 col-lg-10 d-flex justify-content-end gap-6">
              {item.idx && (
                <Button
                  key={`edit.ae.${item.id}`}
                  htmlType="button"
                  fill="fill"
                  type="success"
                  loading={editButtonLoadingHandler(item.id)}
                  onClick={() => {
                    setEditButtonId(item.id);
                    editHandler(
                      index,
                      item.idx,
                      FIELD_ARRAY_TYPE.ASSETS_EXCEPT_HOUSE,
                    );
                  }}
                >
                  {t('ASSET_LIABILITIES.UPDATE')}
                </Button>
              )}
              <Button
                key={`delete.ae.${item.id}`}
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
                      FIELD_ARRAY_TYPE.ASSETS_EXCEPT_HOUSE,
                    );
                  } else {
                    assetsExceptHouseRemove(index);
                  }
                }}
              >
                {t('ASSET_LIABILITIES.DELETE')}
              </Button>
            </div>
          </div>
        );
      })}
      <div className="py-9 rounded-4 bg-white border-bottom">
        <Button
          key={2}
          fill="outline"
          type="light"
          size="xs"
          htmlType="button"
          onClick={() => {
            assetsExceptHouseAppend({
              ...assetsExceptHouseDefaultValues,
            });
          }}
        >
          <IconPlus size="16" fill="dark" />{' '}
          {t('ASSET_LIABILITIES.ADD_ANOTHER_BUTTON')}
        </Button>
      </div>
    </>
  );
};
