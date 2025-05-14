import { useDispatch } from 'react-redux';
import { LS_KEYS } from '@constants/local-store';
import { getStorage, setStorage } from '@utils/local-store';
import {
  userInfoRequest,
  userInfoRestoreRequest,
} from '@actions/auth/auth-actions';
import { useAppSelector } from '@helpers/redux';
import { UserInfoState } from '@reducers/types/auth-state';
import { getUserInfoState } from '@selectors/auth-selector';

interface HookReturnType {
  decodeJwtToken: (paramAccessToken?: string) => void;
  clearDecodedJwtToken: () => void;
  userType: string;
  email: string;
  name: string;
  sub: string;
  preferred_username: string;
  realmAccess: { roles: string[] };

  requested?: boolean;
  isSuccess?: boolean;
  isFailed?: boolean;
}

const useUserInfo = (): HookReturnType => {
  const dispatch = useDispatch();

  const data = useAppSelector<UserInfoState>(getUserInfoState);

  // console.log('data USER INFO:', data);

  const requested = data.request;
  const isSuccess = Boolean(data.success);
  const isFailed = Boolean(data.failed);
  const userData = data?.data || null;

  const userType = userData?.userType || '';
  const email = userData?.email || '';
  const name = userData?.name || '';
  const sub = userData?.sub || '';
  const preferred_username = userData?.preferred_username || '';
  const realmAccess = userData?.realm_access || { roles: [] };

  const decodeJwtToken = (paramAccessToken?: string) => {
    if (paramAccessToken) {
      setStorage(LS_KEYS.AUTH_TOKEN, paramAccessToken);
    }

    const accessToken =
      paramAccessToken ?? (getStorage(LS_KEYS.AUTH_TOKEN) || '');

    if (accessToken !== '') {
      dispatch(userInfoRequest(accessToken));
    }
  };

  const clearDecodedJwtToken = () => {
    dispatch(userInfoRestoreRequest());
  };

  return {
    decodeJwtToken,
    clearDecodedJwtToken,
    email,
    name,
    realmAccess,
    sub,
    preferred_username,
    userType,

    requested,
    isFailed,
    isSuccess,
  };
};

export default useUserInfo;
