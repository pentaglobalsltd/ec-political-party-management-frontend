import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Header } from '@pentabd/ui';

import {
  CandidateDetails,
  AssetsExceptHouse,
  HouseAssets,
  OtherAssets,
  YearlyIncomeSpending,
} from './components';

import { useAssetLiabilityDetails } from '@hooks/candidate-info-management/operator-view/candidate-management/asset-liability-details/useAssetLiabilityDetails';

import {
  assetLiabilitiesValidation,
  AssetLiabilitiesValidationType,
} from '@validations/candidate-info-management/operator/assetLiabilities/assetLiabilitiesValidation';

import { FIELD_ARRAY_TYPE } from './constants';
import { createAssetLiabilityDetailsInitialState } from '@actions/candidate-info-management/operator-view/candidate-management/asset-liabilities-form/asset-liabilities-actions';

const EditAssetLiabilitiesForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { electionSettingsId, candidateElectionDetailsId } = useParams();

  const {
    isCreateRequested,
    isCreateSuccess,
    assetLiabilityDetails,
    createAssetLiabilityDetails,
    updateAssetsHandler,
    updateYearlyIncomeHandler,
    deleteAssetHandler,
    deleteYearlyIncomeHandler,
  } = useAssetLiabilityDetails({
    electionSettingsId,
    candidateElectionDetailId: candidateElectionDetailsId,
    getOnMount: true,
  });

  const methods = useForm<AssetLiabilitiesValidationType>({
    resolver: yupResolver(assetLiabilitiesValidation),
    values: assetLiabilityDetails as AssetLiabilitiesValidationType,
  });

  const {
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<AssetLiabilitiesValidationType> = (
    data: AssetLiabilitiesValidationType,
  ) =>
    createAssetLiabilityDetails({
      electionSettingsId,
      candidateElectionDetailId: candidateElectionDetailsId,
      data,
    });
  const editHandler = (index: number, idx: string, name: string) => {
    const formValues: any = getValues();
    let editedData = {};

    switch (name) {
      case FIELD_ARRAY_TYPE.ASSETS_EXCEPT_HOUSE:
        editedData = formValues?.assetsExceptHouse[index];
        break;
      case FIELD_ARRAY_TYPE.HOUSE_ASSETS:
        editedData = formValues?.houseAssets[index];
        break;
      case FIELD_ARRAY_TYPE.OTHERS_ASSETS:
        editedData = formValues?.othersAssets[index];
        break;
      case FIELD_ARRAY_TYPE.YEARLY_INCOME:
        editedData = formValues?.yearlyIncomesAndExpenditures[index];
        break;
    }

    if (
      Object.keys(editedData).length !== 0 &&
      (name === FIELD_ARRAY_TYPE.ASSETS_EXCEPT_HOUSE ||
        name === FIELD_ARRAY_TYPE.HOUSE_ASSETS ||
        name === FIELD_ARRAY_TYPE.OTHERS_ASSETS)
    ) {
      updateAssetsHandler({
        electionSettingsId,
        candidateElectionDetailId: candidateElectionDetailsId,
        personalAssetId: idx,
        data: editedData,
      });
    } else if (
      Object.keys(editedData).length !== 0 &&
      name === FIELD_ARRAY_TYPE.YEARLY_INCOME
    )
      updateYearlyIncomeHandler({
        electionSettingsId,
        candidateElectionDetailId: candidateElectionDetailsId,
        yearlyIncomeExpenditureId: idx,
        data: editedData,
      });
  };

  const deleteHandler = (index: number, idx: string, name: string) => {
    if (
      idx &&
      (name === FIELD_ARRAY_TYPE.ASSETS_EXCEPT_HOUSE ||
        name === FIELD_ARRAY_TYPE.HOUSE_ASSETS ||
        name === FIELD_ARRAY_TYPE.OTHERS_ASSETS)
    ) {
      deleteAssetHandler({
        electionSettingsId,
        candidateElectionDetailId: candidateElectionDetailsId,
        personalAssetId: idx,
      });
    } else if (idx && name === FIELD_ARRAY_TYPE.YEARLY_INCOME)
      deleteYearlyIncomeHandler({
        electionSettingsId,
        candidateElectionDetailId: candidateElectionDetailsId,
        yearlyIncomeExpenditureId: idx,
      });
  };

  useEffect(() => {
    if (isCreateSuccess) {
      dispatch(createAssetLiabilityDetailsInitialState());
      navigate(-1);
    }
  }, [isCreateSuccess, navigate, dispatch]);

  return (
    <div className="container-96 mb-24">
      <Header
        headerText={{
          header: t('ASSET_LIABILITIES.TITLE'),
          subHeader: t('ASSET_LIABILITIES.SUBTITLE'),
        }}
      />
      <FormProvider {...methods}>
        <form className="container mt-10" onSubmit={handleSubmit(onSubmit)}>
          <CandidateDetails />
          <AssetsExceptHouse
            editHandler={editHandler}
            deleteHandler={deleteHandler}
          />
          <HouseAssets
            editHandler={editHandler}
            deleteHandler={deleteHandler}
          />
          <OtherAssets
            editHandler={editHandler}
            deleteHandler={deleteHandler}
          />
          <YearlyIncomeSpending
            editHandler={editHandler}
            deleteHandler={deleteHandler}
            getValues={getValues}
            trigger={trigger}
            errors={errors}
          />

          <div className="border-top py-8">
            <div className="col-12 d-flex justify-content-end gap-6">
              <Button
                key={1}
                fill="fill"
                type="primary"
                loading={isCreateRequested}
                htmlType="submit"
              >
                {t('ASSET_LIABILITIES.SAVE_NEXT_BUTTON')}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditAssetLiabilitiesForm;
