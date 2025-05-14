import { useSignIn } from './useSignIn';
import { useKcWrapper } from './useKcWrapper';

const useAuthWrapper =
  import.meta.env.VITE_AUTH_GRANT_FLOW === 'true' ? useKcWrapper : useSignIn;

export default useAuthWrapper;
