/* eslint-disable @typescript-eslint/no-unused-vars */
import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { toast } from 'react-toastify';
import {
  AuthActions,
  resetPasswordFailed,
  resetPasswordSuccess,
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  updatePasswordFailed,
  updatePasswordSuccess,
  userInfoFailed,
  userInfoSuccess,
} from '@actions/auth/auth-actions';
import { StoreType } from '@reducers/types';
import {
  RESET_PASSWORD,
  SIGN_IN,
  SIGN_OUT,
  UPDATE_PASSWORD,
  USER_INFO,
} from '@actions/auth/types';
import { isRequestCancelled } from '@helpers/routing';
import {
  postResetPassword,
  postSignIn,
  postSignOut,
  postUpdatePassword,
} from '@api/miscellaneous/auth/auth';
import { setStorage } from '@utils/local-store';
import { LS_KEYS } from '@constants/local-store';
import { jwtDecode } from 'jwt-decode';
import { CustomJwtToken } from '@type/auth/jwt-token-types';
import { getRoles } from '@api/miscellaneous/auth/roles';

export const authMiddleware: Middleware<Record<string, unknown>, StoreType> = ({
  getState,
  dispatch,
}: MiddlewareAPI) => {
  return (next: Dispatch<AnyAction>) => {
    return async (action: AuthActions) => {
      const nextAction = next(action);

      switch (action.type) {
        case SIGN_IN.SIGN_IN_REQUEST: {
          const { payload } = action as any;
          try {
            const { data } = await postSignIn({
              username: payload.username,
              password: payload.password,
            });

            setStorage(
              LS_KEYS.AUTH_TOKEN,
              data?.access_token,
              data?.expires_in,
            );

            setStorage(
              LS_KEYS.REFRESH_TOKEN,
              data?.refresh_token,
              data?.refresh_expires_in,
            );

            dispatch(
              signInSuccess({
                token: data?.access_token,
                expiresIn: data?.expires_in,
                refreshToken: data?.refresh_token,
                refreshTokenExpiresIn: data?.refresh_expires_in,
              }),
            );
          } catch (error: any) {
            if (!isRequestCancelled(error)) {
              const errorObj = {
                message: error?.response?.data?.message,
                statusCode: error?.response?.data?.statusCode,
                username: payload?.username,
              };

              dispatch(signInFailed(errorObj));

              toast.error(error?.response?.data?.message);
            }
          }
          break;
        }

        case SIGN_OUT.SIGN_OUT_REQUEST: {
          try {
            await postSignOut();

            dispatch(signOutSuccess());
          } catch (error) {
            dispatch(signOutFailed());
            toast.error('লগআউট হয়নি');
          }
          break;
        }

        case RESET_PASSWORD.RESET_PASSWORD_REQUEST: {
          const { payload } = action as any;

          try {
            await postResetPassword(payload.username, payload.password);

            dispatch(resetPasswordSuccess());
          } catch (error) {
            dispatch(resetPasswordFailed());
            toast.error('পাসওয়ার্ড রিসেট হয়নি');
          }
          break;
        }

        case UPDATE_PASSWORD.UPDATE_PASSWORD_REQUEST: {
          const { payload } = action as any;

          try {
            await postUpdatePassword(payload.password);

            dispatch(updatePasswordSuccess());
            toast.success('পাসওয়ার্ড আপডেট সফল হয়েছে');
          } catch (error) {
            dispatch(updatePasswordFailed());
            toast.error('পাসওয়ার্ড আপডেট হয়নি');
          }
          break;
        }

        case USER_INFO.USER_INFO_REQUEST: {
          const { payload } = action as any;

          try {
            const decoded = jwtDecode<CustomJwtToken>(payload);
            const userId = decoded.sub ?? '';

            const response = await getRoles(userId);
            const roles = response.data.roles || [];

            const result = {
              ...decoded,
              realm_access: {
                roles,
              },
            };

            dispatch(userInfoSuccess(result));
          } catch (error) {
            dispatch(userInfoFailed());
          }
          break;
        }
      }
      return nextAction;
    };
  };
};
