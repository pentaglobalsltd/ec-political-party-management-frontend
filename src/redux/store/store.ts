import { configureStore } from '@reduxjs/toolkit';

import rootReducer from '@reducers/index';
import { attachFileMiddleware } from '@middlewares/candidate-info-management/operator-view/candidate-management/attach-file-middleware';
import { candidatePersonalInformationMiddleware } from '@middlewares/candidate-info-management/operator-view/candidate-management/candidate-personal-information/candidate-personal-information-middleware';
import { candidateNominationFormMiddleware } from '@middlewares/candidate-info-management/operator-view/candidate-management/candidate-nomination-form';
import { affidavitFormMiddleware } from '@middlewares/candidate-info-management/operator-view/candidate-management/affidavit-form';
import { assetLiabilityDetailsMiddleware } from '@middlewares/candidate-info-management/operator-view/candidate-management/asset-liability-details/asset-liability-details-middleware';
import { collateralFormMiddleware } from '@middlewares/candidate-info-management/operator-view/candidate-management/collateral-form/collateral-form-middleware';
import { authMiddleware } from '@middlewares/auth-middleware';
import { incomeSourceMiddleware } from '@middlewares/candidate-info-management/operator-view/candidate-management/income-source-details';

export const store = configureStore({
  reducer: rootReducer,
  middleware: [
    authMiddleware,
    candidatePersonalInformationMiddleware,
    ...candidateNominationFormMiddleware,
    ...affidavitFormMiddleware,
    attachFileMiddleware as any,
    assetLiabilityDetailsMiddleware,
    ...incomeSourceMiddleware,
    collateralFormMiddleware,
  ],
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
