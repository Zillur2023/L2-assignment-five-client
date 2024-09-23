import React, { ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useAppSelector } from '../../redux/hooks';


interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useAppSelector((state: RootState) => state.auth);

  if (!user) {
    // If no user, redirect to login
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // If user is authenticated, render children
  return (
    <div className="">
      <Outlet /> {/* This is useful if you want nested routes to render */}
      {children}
    </div>
  );
};

export default ProtectedRoute;
