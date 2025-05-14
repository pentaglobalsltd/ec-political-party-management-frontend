import { useEffect, useState } from 'react';
import { getAssetIncomeExpenditure } from '@api/candidate-info-management/candidate-confirmation/asset-income-expenditure';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import {
  AssetsType,
  YearlyIncomesAndExpendituresType,
} from '@type/candidate-info-management/candidate-confirmation/asset-income-expenditure-types';

const IMMOVABLE_ASSET_TYPE = 'IMMOVABLE';
const HOME_ASSET_TYPE = 'HOME';
const OTHER_ASSET_TYPE = 'OTHER';

interface AssetIncomeExpenditureTableType {
  assets: {
    immovableTableRows: AssetsType[];
    homeTableRows: AssetsType[];
    othersTableRows: AssetsType[];
  };
  yearlyIncomeExpenditure: YearlyIncomesAndExpendituresType[];
}

interface HookReturnType {
  electionExpense: AssetIncomeExpenditureTableType | undefined;
}

export const useAssetIncomeExpenditure = ({
  electionSettingsId,
  candidateElectionDetailsId,
}: UrlIdTypes): HookReturnType => {
  const [electionExpense, setElectionExpense] =
    useState<AssetIncomeExpenditureTableType>();

  useEffect(() => {
    if (electionSettingsId && candidateElectionDetailsId) {
      getAssetIncomeExpenditure({
        electionSettingsId,
        candidateElectionDetailsId,
      }).then((response) => {
        const resData = response?.data?.data;

        if (response?.data?.status === 200) {
          const immovableAsset = resData?.assets
            .filter((item) => item.assetType === IMMOVABLE_ASSET_TYPE)
            .map((item, index) => ({ ...item, idx: index + 1 }));

          const homeAsset = resData?.assets
            .filter((item) => item.assetType === HOME_ASSET_TYPE)
            .map((item, index) => ({ ...item, idx: index + 1 }));

          const otherAsset = resData?.assets
            .filter((item) => item.assetType === OTHER_ASSET_TYPE)
            .map((item, index) => ({ ...item, idx: index + 1 }));

          const yearlyIncomeExpenditure =
            resData?.yearlyIncomesAndExpenditures.map((item, index) => ({
              ...item,
              idx: index + 1,
            }));

          setElectionExpense({
            assets: {
              immovableTableRows: immovableAsset,
              homeTableRows: homeAsset,
              othersTableRows: otherAsset,
            },
            yearlyIncomeExpenditure,
          });
        }
      });
    }
  }, [electionSettingsId, candidateElectionDetailsId]);

  return { electionExpense };
};
