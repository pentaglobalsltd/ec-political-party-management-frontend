import { configureStore } from '@reduxjs/toolkit';

import rootReducer from '@reducers/index';
import { authMiddleware } from '@middlewares/auth-middleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: [authMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
