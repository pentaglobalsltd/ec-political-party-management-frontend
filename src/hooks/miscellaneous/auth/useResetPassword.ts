import {
  resetPasswordRequest,
  resetPasswordRestoreRequest,
} from '@actions/auth/auth-actions';
import { useAppSelector } from '@helpers/redux';
import { ResetPasswordState } from '@reducers/types/auth-state';
import { getResetPasswordState } from '@selectors/auth-selector';
import { useDispatch } from 'react-redux';

interface UseResetPassword {
  requested: boolean;
  isSuccess: boolean;
  isFailed: boolean;
  resetPassword: (username: string, password: string) => void;
  restoreResetPassword: () => void;
}

const useResetPassword = (): UseResetPassword => {
  const dispatch = useDispatch();

  const data = useAppSelector<ResetPasswordState>(getResetPasswordState);

  const requested = data.request;
  const isSuccess = Boolean(data.success);
  const isFailed = Boolean(data.failed);

  const resetPassword = (username: string, password: string) => {
    dispatch(resetPasswordRequest(username, password));
  };

  const restoreResetPassword = () => {
    dispatch(resetPasswordRestoreRequest());
  };

  return {
    requested,
    isSuccess,
    isFailed,
    resetPassword,
    restoreResetPassword,
  };
};

export default useResetPassword;
