import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { toast } from 'react-toastify';

import { StoreType } from '@reducers/types';
import { isRequestCancelled } from '@helpers/routing';
import {
  IncomeSourceDetailsActions,
  createIncomeSourceDetailsFailed,
  createIncomeSourceDetailsSuccess,
  deleteOtherFundingFailed,
  deleteOtherFundingSuccess,
  deleteRelativeFundingFailed,
  deleteRelativeFundingSuccess,
  deleteSelfFundingFailed,
  deleteSelfFundingSuccess,
  getIncomeSourceDetailsFailed,
  getIncomeSourceDetailsRequest,
  getIncomeSourceDetailsSuccess,
  updateOtherFundingFailed,
  updateOtherFundingSuccess,
  updateRelativeFundingFailed,
  updateRelativeFundingSuccess,
  updateSelfFundingFailed,
  updateSelfFundingSuccess,
} from '@actions/candidate-info-management/operator-view/candidate-management/income-source-details/income-source-details-first-part-actions';
import {
  CREATE_INCOME_SOURCE_DETAILS,
  DELETE_OTHER_FUNDING,
  DELETE_RELATIVE_FUNDING,
  DELETE_SELF_FUNDING,
  GET_INCOME_SOURCE_DETAILS,
  UPDATE_OTHER_FUNDING,
  UPDATE_RELATIVE_FUNDING,
  UPDATE_SELF_FUNDING,
} from '@actions/candidate-info-management/operator-view/candidate-management/income-source-details/types/income-source-details-first-part-actions';
import {
  createIncomeSourceDetails,
  getIncomeSourceDetails,
  updateOtherFunding,
  updateRelativeFunding,
  updateSelfFunding,
} from '@api/candidate-info-management/operator-view/candidate-management/income-source-details/income-source-details';
import {
  OtherFundingsType,
  RelativeFundingsType,
  SelfFundingsType,
} from '@type/candidate-info-management/operator-view/income-source-details/income-source-details-first-part';
import { FundingType } from '@containers/candidate-info-management/controller-list/apply-candidate-income-source-details/edit/constants';
import { deleteSelfFunding } from '@api/candidate-info-management/operator-view/candidate-management/income-source-details/delete-self-funding';
import { deleteRelativeFunding } from '@api/candidate-info-management/operator-view/candidate-management/income-source-details/delete-relative-funding';
import { deleteOtherFunding } from '@api/candidate-info-management/operator-view/candidate-management/income-source-details/delete-other-funding';

export const incomeSourceDetailsFirstPartMiddleware: Middleware<
  Record<string, unknown>,
  StoreType
> = ({ dispatch }: MiddlewareAPI) => {
  return (next: Dispatch<AnyAction>) => {
    return async (action: IncomeSourceDetailsActions) => {
      const nextAction = next(action);
      switch (action.type) {
        case CREATE_INCOME_SOURCE_DETAILS.CREATE_INCOME_SOURCE_DETAILS_REQUEST: {
          try {
            const { payload } = action as any;

            const relativeFund: RelativeFundingsType[] = [];
            const otherFund: OtherFundingsType[] = [];
            const selfFunding: SelfFundingsType[] = [];

            payload.data.selfFundings?.forEach((item: SelfFundingsType) => {
              if (!item.id) selfFunding.push(item);
            });

            payload.data.earningFromRelative?.forEach(
              (item: RelativeFundingsType) => {
                item.relativeFundingType = FundingType.LOAN;
                if (!item.id) relativeFund.push(item);
              },
            );

            payload.data.donationByRelative?.forEach(
              (item: RelativeFundingsType) => {
                item.relativeFundingType = FundingType.DONATION;
                if (!item.id) relativeFund.push(item);
              },
            );

            payload.data.earningFromOthers?.forEach(
              (item: OtherFundingsType) => {
                item.otherFundingType = FundingType.LOAN;
                if (!item.id) otherFund.push(item);
              },
            );

            payload.data.donationByOthers?.forEach(
              (item: OtherFundingsType) => {
                item.otherFundingType = FundingType.DONATION;
                if (!item.id) otherFund.push(item);
              },
            );

            payload.data.miscellaneous?.forEach((item: OtherFundingsType) => {
              item.otherFundingType = FundingType.OTHER;
              if (!item.id) otherFund.push(item);
            });

            const newData = {
              constituencyNameAndNo: payload.data.constituencyNameAndNo,
              candidateName: payload.data.candidateName,
              candidateAddress: payload.data.candidateAddress,
              selfFundings: selfFunding,
              relativeFundings: relativeFund,
              otherFundings: otherFund,
            };

            const newPayload = {
              ...payload,
              data: newData,
            };

            const { data } = await createIncomeSourceDetails(newPayload);
            toast.success('জমা দেওয়া সফল হয়েছে!');
            dispatch(createIncomeSourceDetailsSuccess(data));
          } catch (error: any) {
            if (!isRequestCancelled(error)) {
              toast.error(error.response.data.message);
              dispatch(createIncomeSourceDetailsFailed());
            }
          }
          break;
        }

        case GET_INCOME_SOURCE_DETAILS.GET_INCOME_SOURCE_DETAILS_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await getIncomeSourceDetails(payload);

            const selfFunding: SelfFundingsType[] = [];
            const relativeLoan: RelativeFundingsType[] = [];
            const relativeDonation: RelativeFundingsType[] = [];

            const otherLoan: OtherFundingsType[] = [];
            const otherDonation: OtherFundingsType[] = [];
            const other: OtherFundingsType[] = [];

            data.selfFundings?.forEach((item: SelfFundingsType) => {
              selfFunding.push({ ...item, idx: item.id });
            });

            data.relativeFundings?.forEach((item: RelativeFundingsType) => {
              switch (item.relativeFundingType) {
                case FundingType.LOAN:
                  relativeLoan.push({ ...item, idx: item.id });
                  break;
                case FundingType.DONATION:
                  relativeDonation.push({ ...item, idx: item.id });
                  break;
                default:
                  break;
              }
            });

            data.otherFundings?.forEach((item: OtherFundingsType) => {
              switch (item.otherFundingType) {
                case FundingType.LOAN:
                  otherLoan.push({ ...item, idx: item.id });
                  break;
                case FundingType.DONATION:
                  otherDonation.push({ ...item, idx: item.id });
                  break;
                case FundingType.OTHER:
                  other.push({ ...item, idx: item.id });
                  break;
                default:
                  break;
              }
            });

            const incomeDetails = {
              constituencyNameAndNo: data.constituencyNameAndNo,
              candidateName: data.candidateName,
              candidateAddress: data.candidateAddress,
              selfFundings: selfFunding,
              earningFromRelative: relativeLoan,
              donationByRelative: relativeDonation,
              earningFromOthers: otherLoan,
              donationByOthers: otherDonation,
              miscellaneous: other,
            };

            dispatch(getIncomeSourceDetailsSuccess(incomeDetails));
          } catch (error) {
            if (!isRequestCancelled(error)) {
              dispatch(getIncomeSourceDetailsFailed());
            }
          }
          break;
        }

        case UPDATE_SELF_FUNDING.UPDATE_SELF_FUNDING_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await updateSelfFunding(payload);

            dispatch(updateSelfFundingSuccess(data));
            toast.success('আপডেট করা সফল হয়েছে!');
          } catch (error: any) {
            if (!isRequestCancelled(error)) {
              toast.error(error.response.data.message);
              dispatch(updateSelfFundingFailed());
            }
          }
          break;
        }

        case UPDATE_RELATIVE_FUNDING.UPDATE_RELATIVE_FUNDING_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await updateRelativeFunding(payload);

            dispatch(updateRelativeFundingSuccess(data));
            toast.success('আপডেট করা সফল হয়েছে!');
          } catch (error: any) {
            if (!isRequestCancelled(error)) {
              toast.error(error.response.data.message);
              dispatch(updateRelativeFundingFailed());
            }
          }
          break;
        }

        case UPDATE_OTHER_FUNDING.UPDATE_OTHER_FUNDING_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await updateOtherFunding(payload);

            dispatch(updateOtherFundingSuccess(data));
            toast.success('আপডেট করা সফল হয়েছে!');
          } catch (error: any) {
            if (!isRequestCancelled(error)) {
              toast.error(error.response.data.message);
              dispatch(updateOtherFundingFailed());
            }
          }
          break;
        }

        case DELETE_SELF_FUNDING.DELETE_SELF_FUNDING_REQUEST: {
          try {
            const { payload } = action as any;
            const { electionSettingsId, candidateElectionDetailId } = payload;

            const { status } = await deleteSelfFunding(payload);

            dispatch(deleteSelfFundingSuccess());
            if (status === 204) toast.success('মুছে ফেলা সফল হয়েছে!');
            dispatch(
              getIncomeSourceDetailsRequest({
                electionSettingsId,
                candidateElectionDetailId,
              }),
            );
          } catch (error: any) {
            if (!isRequestCancelled(error)) {
              toast.error(error.response.data.message);
              dispatch(deleteSelfFundingFailed());
            }
          }
          break;
        }

        case DELETE_RELATIVE_FUNDING.DELETE_RELATIVE_FUNDING_REQUEST: {
          try {
            const { payload } = action as any;
            const { electionSettingsId, candidateElectionDetailId } = payload;

            const { status } = await deleteRelativeFunding(payload);

            dispatch(deleteRelativeFundingSuccess());
            if (status === 204) toast.success('মুছে ফেলা সফল হয়েছে!');
            dispatch(
              getIncomeSourceDetailsRequest({
                electionSettingsId,
                candidateElectionDetailId,
              }),
            );
          } catch (error: any) {
            if (!isRequestCancelled(error)) {
              toast.error(error.response.data.message);
              dispatch(deleteRelativeFundingFailed());
            }
          }
          break;
        }

        case DELETE_OTHER_FUNDING.DELETE_OTHER_FUNDING_REQUEST: {
          try {
            const { payload } = action as any;
            const { electionSettingsId, candidateElectionDetailId } = payload;

            const { status } = await deleteOtherFunding(payload);

            dispatch(deleteOtherFundingSuccess());
            if (status === 204) toast.success('মুছে ফেলা সফল হয়েছে!');
            dispatch(
              getIncomeSourceDetailsRequest({
                electionSettingsId,
                candidateElectionDetailId,
              }),
            );
          } catch (error: any) {
            if (!isRequestCancelled(error)) {
              toast.error(error.response.data.message);
              dispatch(deleteOtherFundingFailed());
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
