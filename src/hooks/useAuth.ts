import { useContext } from 'react';
import { AuthContext } from '../store/Provider/AuthProvider';

const useAuth = () => {
  const { state } = useContext(AuthContext);
  return state.isAuthenticated;
};

export default useAuth;
