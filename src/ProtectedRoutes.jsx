import React from 'react'
import Login from './pages/Login';
import { Outlet, Navigate } from 'react-router-dom';
const useAuth = () => {
    const user = {loggedIn: false};
    return user && user.loggedIn;
}

export const ProtectedRoutes = () => {
  if(localStorage.getItem("token")){
    return <Outlet />
  }else{
    return  <Navigate to="/login/"/>
  }  
  
//    const isAuth = props.authorise;
//   console.log(props.authorise)
//  return isAuth ? <Outlet />: <Navigate to="/"/>
  
}
export default ProtectedRoutes