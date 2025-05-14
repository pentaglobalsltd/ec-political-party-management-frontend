import { CustomJwtToken } from '@type/auth/jwt-token-types';
import { ReduxRequest } from './redux-request';

export interface SignInState extends ReduxRequest<string> {}
export interface SignOutState extends ReduxRequest<string> {}
export interface ResetPasswordState extends ReduxRequest<string> {}
export interface UpdatePasswordState extends ReduxRequest<string> {}
export interface UserInfoState extends ReduxRequest<CustomJwtToken> {}

export interface AuthState {
  signIn: SignInState;
  signOut: SignOutState;
  resetPassword: ResetPasswordState;
  updatePassword: UpdatePasswordState;
  userInfo: UserInfoState;
}
