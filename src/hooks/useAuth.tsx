import { useContext, FC } from 'react';
import { AuthContext, AuthProvider } from '@/contexts/FirebaseContext';

// ----------------------------------------------------------------------

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('Auth context must be use inside AuthProvider');

  return context;
};

export const AuthWrapper: FC<any> = (props) => {
  return <AuthProvider>{props.children}</AuthProvider>;
};

export const withAuth = (Component: React.ElementType) => (props: any) =>
  (
    <AuthProvider>
      <Component {...props} />
    </AuthProvider>
  );

export default useAuth;
