import { useDispatch } from 'react-redux';
import { useAppSelector } from '@helpers/redux';
import { UpdatePasswordState } from '@reducers/types/auth-state';
import { getUpdatePasswordState } from '@selectors/auth-selector';
import {
  updatePasswordRequest,
  updatePasswordRestoreRequest,
} from '@actions/auth/auth-actions';

interface UseUpdatePassword {
  requested: boolean;
  isSuccess: boolean;
  isFailed: boolean;
  updatePassword: (password: string) => void;
  restoreUpdatePassword: () => void;
}

const useUpdatePassword = (): UseUpdatePassword => {
  const dispatch = useDispatch();

  const data = useAppSelector<UpdatePasswordState>(getUpdatePasswordState);

  const requested = data.request;
  const isSuccess = Boolean(data.success);
  const isFailed = Boolean(data.failed);

  const updatePassword = (password: string) => {
    dispatch(updatePasswordRequest(password));
  };

  const restoreUpdatePassword = () => {
    dispatch(updatePasswordRestoreRequest());
  };

  return {
    requested,
    isSuccess,
    isFailed,
    updatePassword,
    restoreUpdatePassword,
  };
};

export default useUpdatePassword;
