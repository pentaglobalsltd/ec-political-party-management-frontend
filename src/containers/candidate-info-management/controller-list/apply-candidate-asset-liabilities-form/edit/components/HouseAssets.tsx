import { useState, useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Text } from '@pentabd/ui';
import { IconPlus } from '@pentabd/icons';

import FormInput from '@components/inputs/FormInput';

import { FORM_FIELDS } from '@constants/forms';
import { houseAssetDefaultValues, FIELD_ARRAY_TYPE } from '../constants';
import { useAssetLiabilityDetails } from '@hooks/candidate-info-management/operator-view/candidate-management/asset-liability-details/useAssetLiabilityDetails';

const ASSET_LIABILITIES =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.ASSET_LIABILITIES;

export const HouseAssets = ({ editHandler, deleteHandler }: any) => {
  const { t } = useTranslation();
  const [editButtonId, setEditButtonId] = useState<string>();
  const [deleteButtonId, setDeleteButtonId] = useState<any>();

  const {
    isDeleteAssetRequested,
    isUpdateAssetsRequested,
    isUpdateAssetsSuccess,
  } = useAssetLiabilityDetails({});

  const {
    fields: houseAssetsFields,
    append: houseAssetsAppend,
    remove: houseAssetsRemove,
  } = useFieldArray({
    name: FIELD_ARRAY_TYPE.HOUSE_ASSETS,
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
        <Text size="lg" weight="medium">
          {t('ASSET_LIABILITIES.PART_B_SUBTITLE')}
        </Text>

        {houseAssetsFields.map((item: any, index) => {
          return (
            <div key={`div.${item.id}`} className="d-flex flex-column pt-9">
              <FormInput
                title="ASSET_LIABILITIES.HOUSE_TYPE_NUMBER"
                registerName={`${FIELD_ARRAY_TYPE.HOUSE_ASSETS}.${index}.${ASSET_LIABILITIES.HOUSE_NATURE_AND_NUMBER}`}
                placeholder={t('PLACEHOLDER.ENTER')}
              />

              <FormInput
                title="ASSET_LIABILITIES.HOUSE_LOCATION"
                registerName={`${FIELD_ARRAY_TYPE.HOUSE_ASSETS}.${index}.${ASSET_LIABILITIES.HOUSE_LOCATION}`}
                placeholder={t('PLACEHOLDER.ENTER')}
              />

              <FormInput
                title="ASSET_LIABILITIES.HOUSE_ESTIMATED_VALUE"
                registerName={`${FIELD_ARRAY_TYPE.HOUSE_ASSETS}.${index}.${ASSET_LIABILITIES.HOUSE_ESTIMATED_VALUE}`}
                placeholder={t('PLACEHOLDER.ENTER')}
              />
              <div className="col-12 col-lg-10 d-flex justify-content-end gap-6">
                {item.idx && (
                  <Button
                    key={`edit.hs.${item.id}`}
                    htmlType="button"
                    fill="fill"
                    type="success"
                    loading={editButtonLoadingHandler(item.id)}
                    onClick={() => {
                      setEditButtonId(item.id);
                      editHandler(
                        index,
                        item.idx,
                        FIELD_ARRAY_TYPE.HOUSE_ASSETS,
                      );
                    }}
                  >
                    {t('ASSET_LIABILITIES.UPDATE')}
                  </Button>
                )}
                <Button
                  key={`delete.hs.${item.id}`}
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
                        FIELD_ARRAY_TYPE.HOUSE_ASSETS,
                      );
                    } else {
                      houseAssetsRemove(index);
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
            key={3}
            fill="outline"
            type="light"
            size="xs"
            htmlType="button"
            onClick={() => {
              houseAssetsAppend({
                ...houseAssetDefaultValues,
              });
            }}
          >
            <IconPlus size="16" fill="dark" />
            {t('ASSET_LIABILITIES.ADD_ANOTHER_BUTTON')}
          </Button>
        </div>
      </div>
    </>
  );
};
