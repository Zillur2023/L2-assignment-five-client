import React, { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { jwtDecode } from 'jwt-decode';
import { logout } from '../../redux/features/auth/authSlice';

type ProtectedRouteProps = {
  children: ReactNode;
  role: string | undefined;
};
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {


  const { token } = useAppSelector((state: RootState) => state.auth);

  let user:any;

  if (token) {
    user = jwtDecode(token);
  }

  const dispatch = useAppDispatch();

  if (role !== user?.role) {
    dispatch(logout());
    return <Navigate to="/login"  replace={true} />;
  }
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  return (
    <div className="">
      <Outlet /> {/* This is useful if you want nested routes to render */}
      {children}
    </div>
  );
};

export default ProtectedRoute;
