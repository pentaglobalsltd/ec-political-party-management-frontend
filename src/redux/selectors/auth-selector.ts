import { StoreType } from '@reducers/types';
import {
  ResetPasswordState,
  SignInState,
  SignOutState,
  UpdatePasswordState,
  UserInfoState,
} from '@reducers/types/auth-state';

export const getSignInState = (state: StoreType): SignInState =>
  state.auth.signIn;

export const getSignOutState = (state: StoreType): SignOutState =>
  state.auth.signOut;

export const getResetPasswordState = (state: StoreType): ResetPasswordState =>
  state.auth.resetPassword;

export const getUpdatePasswordState = (state: StoreType): UpdatePasswordState =>
  state.auth.updatePassword;

export const getUserInfoState = (state: StoreType): UserInfoState =>
  state.auth.userInfo;
