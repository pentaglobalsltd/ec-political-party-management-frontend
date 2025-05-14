import {
  signOutRequest,
  signOutRestoreRequest,
} from '@actions/auth/auth-actions';

import { useAppSelector } from '@helpers/redux';
import { SignOutState } from '@reducers/types/auth-state';
import { getSignOutState } from '@selectors/auth-selector';

import { useDispatch } from 'react-redux';

interface UseSignOut {
  signOutHook: () => void;
  requested: boolean;
  isSuccess: boolean;
  isFailed: boolean;
  restoreSignOut: () => void;
}

const useSignOut = (): UseSignOut => {
  const dispatch = useDispatch();

  const data = useAppSelector<SignOutState>(getSignOutState);

  const requested = data.request;
  const isSuccess = Boolean(data.success);
  const isFailed = Boolean(data.failed);

  const logout = () => {
    dispatch(signOutRequest());
  };

  const restoreSignOut = () => {
    dispatch(signOutRestoreRequest());
  };

  return {
    signOutHook: logout,
    isFailed,
    isSuccess,
    requested,
    restoreSignOut,
  };
};

export default useSignOut;
