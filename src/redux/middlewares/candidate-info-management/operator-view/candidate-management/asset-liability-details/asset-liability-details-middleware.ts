import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { toast } from 'react-toastify';

import {
  AssetLiabilityDetailActions,
  createAssetLiabilityDetailsSuccess,
  createAssetLiabilityDetailsFailed,
  getAssetLiabilityDetailsSuccess,
  getAssetLiabilityDetailsFailed,
  updateAssetsSuccess,
  updateAssetsFailed,
  updateYearlyIncomeSuccess,
  updateYearlyIncomeFailed,
  deleteAssetSuccess,
  deleteAssetFailed,
  deleteYearlyIncomeSuccess,
  deleteYearlyIncomeFailed,
  getAssetLiabilityDetailsRequest,
} from '@actions/candidate-info-management/operator-view/candidate-management/asset-liabilities-form/asset-liabilities-actions';

import {
  CREATE_ASSET_LIABILITY_DETAILS,
  GET_ASSET_LIABILITY_DETAILS,
  UPDATE_ASSET,
  UPDATE_YEARLY_INCOME,
  DELETE_ASSET,
  DELETE_YEARLY_INCOME,
} from '@actions/candidate-info-management/operator-view/candidate-management/asset-liabilities-form/types';

import {
  createAssetLiabilityDetails,
  getAssetLiabilityDetails,
  updateAssets,
  updateYearlyIncome,
  deleteAsset,
  deleteYearlyIncome,
} from '@api/candidate-info-management/operator-view/candidate-management/asset-liability-details/asset-liability-details';

import { StoreType } from '@reducers/types';
import { isRequestCancelled } from '@helpers/routing';

import {
  AssetsType,
  YearlyIncomesAndExpendituresType,
  GetAssetLiabilityPropsType,
} from '@type/candidate-info-management/operator-view/asset-liabilities-form/asset-liabilities-form';

import { ASSET_TYPE } from '@containers/candidate-info-management/controller-list/apply-candidate-asset-liabilities-form/edit/constants';

export const assetLiabilityDetailsMiddleware: Middleware<
  Record<string, unknown>,
  StoreType
> = ({ dispatch }: MiddlewareAPI) => {
  return (next: Dispatch<AnyAction>) => {
    return async (action: AssetLiabilityDetailActions) => {
      const nextAction = next(action);
      switch (action.type) {
        case CREATE_ASSET_LIABILITY_DETAILS.CREATE_ASSET_LIABILITY_DETAILS_REQUEST: {
          try {
            const { payload } = action as any;

            const mappedData: GetAssetLiabilityPropsType = {};
            const assets: AssetsType[] = [];
            const yearlyIncomesAndExpenditures: any = [];

            payload.data.assetsExceptHouse.forEach((item: AssetsType) => {
              if (!item.id)
                assets.push({
                  totalAmount: item.totalAmount,
                  position: item.position,
                  approximatePrice: item.approximatePrice,
                  assetType: ASSET_TYPE.IMMOVABLE,
                });
            });
            mappedData.assets = assets;

            payload.data.houseAssets.forEach((item: AssetsType) => {
              if (!item.id)
                assets.push({
                  homeTypeAndNo: item.homeTypeAndNo,
                  position: item.position,
                  approximatePrice: item.approximatePrice,
                  assetType: ASSET_TYPE.HOME,
                });
            });
            mappedData.assets = assets;

            payload.data.othersAssets.forEach((item: AssetsType) => {
              if (!item.id)
                assets.push({
                  otherAssetsName: item.otherAssetsName,
                  approximatePrice: item.approximatePrice,
                  assetType: ASSET_TYPE.OTHER,
                });
            });
            mappedData.assets = assets;

            payload.data.yearlyIncomesAndExpenditures.forEach(
              (item: YearlyIncomesAndExpendituresType) => {
                if (!item.id)
                  yearlyIncomesAndExpenditures.push({
                    totalApproximateIncome: item.totalApproximateIncome,
                    totalApproximateExpenditure:
                      item.totalApproximateExpenditure,
                  });
              },
            );
            mappedData.yearlyIncomesAndExpenditures =
              yearlyIncomesAndExpenditures;

            const newPayload = {
              ...payload,
              data: mappedData,
            };

            const { data } = await createAssetLiabilityDetails(newPayload);
            toast.success('জমা দেওয়া সফল হয়েছে!');
            dispatch(createAssetLiabilityDetailsSuccess(data));
          } catch (error: any) {
            if (!isRequestCancelled(error)) {
              toast.error(error.response?.data.message);
              dispatch(createAssetLiabilityDetailsFailed());
            }
          }
          break;
        }

        case GET_ASSET_LIABILITY_DETAILS.GET_ASSET_LIABILITY_DETAILS_REQUEST: {
          try {
            const { payload } = action as any;
            const { data }: any = await getAssetLiabilityDetails(payload);

            const other: AssetsType[] = [];
            const immovable: AssetsType[] = [];
            const home: AssetsType[] = [];
            const yearly: YearlyIncomesAndExpendituresType[] = [];

            data.assets?.forEach((item: GetAssetLiabilityPropsType) => {
              if (item.assetType === ASSET_TYPE.IMMOVABLE) {
                immovable.push({
                  ...item,
                  idx: item.id,
                });
              } else if (item.assetType === ASSET_TYPE.OTHER) {
                other.push({ ...item, idx: item.id });
              } else if (item.assetType === ASSET_TYPE.HOME) {
                home.push({ ...item, idx: item.id });
              }
            });

            // pushing an item in yearlyIncomesAndExpenditures if no data is received.
            if (!data.yearlyIncomesAndExpenditures.length) {
              yearly.push({
                totalApproximateExpenditure: '',
                totalApproximateIncome: '',
              });
            }
            data.yearlyIncomesAndExpenditures?.forEach((item: any) => {
              yearly.push({ ...item, idx: item.id });
            });

            const assetIncomeExpenditureDetails = {
              constituencyNameAndNo: data.constituencyNameAndNo,
              candidateName: data.candidateName,
              candidateAddress: data.candidateAddress,
              assetsExceptHouse: immovable,
              houseAssets: home,
              othersAssets: other,
              yearlyIncomesAndExpenditures: yearly,
            };

            dispatch(
              getAssetLiabilityDetailsSuccess(assetIncomeExpenditureDetails),
            );
          } catch (error) {
            if (!isRequestCancelled(error)) {
              dispatch(getAssetLiabilityDetailsFailed());
            }
          }
          break;
        }

        case UPDATE_ASSET.UPDATE_ASSET_REQUEST: {
          try {
            const { payload } = action as any;
            const { data }: any = await updateAssets(payload);

            dispatch(updateAssetsSuccess(data));
            toast.success('আপডেট করা সফল হয়েছে!');
          } catch (error: any) {
            if (!isRequestCancelled(error)) {
              toast.error(error.response.data.message);
              dispatch(updateAssetsFailed());
            }
          }
          break;
        }

        case UPDATE_YEARLY_INCOME.UPDATE_YEARLY_INCOME_REQUEST: {
          try {
            const { payload } = action as any;
            const { data }: any = await updateYearlyIncome(payload);

            dispatch(updateYearlyIncomeSuccess(data));
            toast.success('আপডেট করা সফল হয়েছে!');
          } catch (error: any) {
            if (!isRequestCancelled(error)) {
              toast.error(error.response.data.message);
              dispatch(updateYearlyIncomeFailed());
            }
          }
          break;
        }

        case DELETE_ASSET.DELETE_ASSET_REQUEST: {
          try {
            const { payload } = action as any;
            const { electionSettingsId, candidateElectionDetailId } = payload;

            const { status } = await deleteAsset(payload);

            dispatch(deleteAssetSuccess());
            if (status === 204) toast.success('মুছে ফেলা সফল হয়েছে!');
            dispatch(
              getAssetLiabilityDetailsRequest({
                electionSettingsId,
                candidateElectionDetailId,
              }),
            );
          } catch (error: any) {
            if (!isRequestCancelled(error)) {
              toast.error(error.response.data.message);
              dispatch(deleteAssetFailed());
            }
          }
          break;
        }

        case DELETE_YEARLY_INCOME.DELETE_YEARLY_INCOME_REQUEST: {
          try {
            const { payload } = action as any;
            const { electionSettingsId, candidateElectionDetailId } = payload;

            const { status } = await deleteYearlyIncome(payload);

            dispatch(deleteYearlyIncomeSuccess());
            if (status === 204) toast.success('মুছে ফেলা সফল হয়েছে!');
            dispatch(
              getAssetLiabilityDetailsRequest({
                electionSettingsId,
                candidateElectionDetailId,
              }),
            );
          } catch (error: any) {
            if (!isRequestCancelled(error)) {
              toast.error(error.response.data.message);
              dispatch(deleteYearlyIncomeFailed());
            }
          }
          break;
        }

        default:
          break;
      }
      return nextAction;
    };
  };
};
