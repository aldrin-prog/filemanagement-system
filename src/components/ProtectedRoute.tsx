import { useAppContext } from '@/context/AppContext';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import LoadingBar from './LoadingBar';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isGrantAccess, setIsGrantAccess] = useState(false);
  const { user,isUserSuccess } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      if (isUserSuccess) {
        try {
          const groups = user?.['cognito:groups'] || [];
          const grantAccess = groups.every((role: string) =>
            allowedRoles.includes(role.toLowerCase())
          );

          if (!grantAccess) {
            navigate('/unauthorized', { replace: true });
            return;
          }

          setIsGrantAccess(true);
        } catch (error) {
          navigate('/login', { replace: true });
        } finally {
            setIsLoading(false);
        }
      }
    };

    checkUser();
  }, [user]);

  if (isLoading) {
    return <LoadingBar />;
  }

  return isGrantAccess ? <>{children}</> :  <Navigate to="/unauthorized" replace />;
};

export default ProtectedRoute;
