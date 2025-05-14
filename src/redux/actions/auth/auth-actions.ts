import { CustomJwtToken } from '@type/auth/jwt-token-types';
import {
  SIGN_OUT,
  SIGN_IN,
  RESET_PASSWORD,
  USER_INFO,
  UPDATE_PASSWORD,
} from './types';

export const signInRequest = (data: { username: string; password: string }) => {
  return {
    type: SIGN_IN.SIGN_IN_REQUEST,
    payload: data,
  } as const;
};

export const signInSuccess = (data: {
  token: string;
  expiresIn: number | string;
  refreshToken: string;
  refreshTokenExpiresIn: number | string;
}) => {
  return {
    type: SIGN_IN.SIGN_IN_SUCCESS,
    payload: data,
  } as const;
};

export const signInFailed = (data: { message: any; statusCode: any }) => {
  return {
    type: SIGN_IN.SIGN_IN_FAILED,
    payload: data,
  } as const;
};

export const signInRestoreRequest = () => {
  return {
    type: SIGN_IN.SIGN_IN_RESTORE,
  } as const;
};

// ==========================

export const signOutRequest = () => {
  return {
    type: SIGN_OUT.SIGN_OUT_REQUEST,
  } as const;
};

export const signOutSuccess = () => {
  return {
    type: SIGN_OUT.SIGN_OUT_SUCCESS,
  } as const;
};

export const signOutFailed = () => {
  return {
    type: SIGN_OUT.SIGN_OUT_FAILED,
  } as const;
};

export const signOutRestoreRequest = () => {
  return {
    type: SIGN_OUT.SIGN_OUT_RESTORE,
  } as const;
};

// ==========================

export const resetPasswordRequest = (username: string, password: string) => {
  return {
    type: RESET_PASSWORD.RESET_PASSWORD_REQUEST,
    payload: {
      username,
      password,
    },
  } as const;
};

export const resetPasswordSuccess = () => {
  return {
    type: RESET_PASSWORD.RESET_PASSWORD_SUCCESS,
  } as const;
};

export const resetPasswordFailed = () => {
  return {
    type: RESET_PASSWORD.RESET_PASSWORD_FAILED,
  } as const;
};

export const resetPasswordRestoreRequest = () => {
  return {
    type: RESET_PASSWORD.RESET_PASSWORD_RESTORE,
  } as const;
};

// ==========================

export const updatePasswordRequest = (password: string) => {
  return {
    type: UPDATE_PASSWORD.UPDATE_PASSWORD_REQUEST,
    payload: {
      password,
    },
  } as const;
};

export const updatePasswordSuccess = () => {
  return {
    type: UPDATE_PASSWORD.UPDATE_PASSWORD_SUCCESS,
  } as const;
};

export const updatePasswordFailed = () => {
  return {
    type: UPDATE_PASSWORD.UPDATE_PASSWORD_FAILED,
  } as const;
};

export const updatePasswordRestoreRequest = () => {
  return {
    type: UPDATE_PASSWORD.UPDATE_PASSWORD_RESTORE,
  } as const;
};

// ==========================

export const userInfoRequest = (accessToken: string) => {
  return {
    type: USER_INFO.USER_INFO_REQUEST,
    payload: accessToken,
  } as const;
};

export const userInfoSuccess = (jwtDecodeData: CustomJwtToken) => {
  return {
    type: USER_INFO.USER_INFO_SUCCESS,
    payload: jwtDecodeData,
  } as const;
};

export const userInfoFailed = () => {
  return {
    type: USER_INFO.USER_INFO_FAILED,
  } as const;
};

export const userInfoRestoreRequest = () => {
  return {
    type: USER_INFO.USER_INFO_RESTORE,
  } as const;
};

export type AuthActions =
  // sign in
  | ReturnType<typeof signInRequest>
  | ReturnType<typeof signInSuccess>
  | ReturnType<typeof signInFailed>
  | ReturnType<typeof signInRestoreRequest>

  // sign out
  | ReturnType<typeof signOutRequest>
  | ReturnType<typeof signOutSuccess>
  | ReturnType<typeof signOutFailed>
  | ReturnType<typeof signOutRestoreRequest>

  // reset password
  | ReturnType<typeof resetPasswordRequest>
  | ReturnType<typeof resetPasswordSuccess>
  | ReturnType<typeof resetPasswordFailed>
  | ReturnType<typeof resetPasswordRestoreRequest>

  // update password
  | ReturnType<typeof updatePasswordRequest>
  | ReturnType<typeof updatePasswordSuccess>
  | ReturnType<typeof updatePasswordFailed>
  | ReturnType<typeof updatePasswordRestoreRequest>

  // user info
  | ReturnType<typeof userInfoRequest>
  | ReturnType<typeof userInfoSuccess>
  | ReturnType<typeof userInfoFailed>
  | ReturnType<typeof userInfoRestoreRequest>;
