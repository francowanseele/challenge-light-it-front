import React, { useState } from 'react';

import Login from '../Components/UserGuest/Login';
import Signin from '../Components/UserGuest/Signin';
import useAuth from "../hooks/useAuth";

import loginImg from '../assets/login.jpg';

export default function UserGuest() {
  const [isLogin, setIsLogin] = useState(true);

  const { user, isLoading } = useAuth();

  if (user && !isLoading) {
    window.location.href = "/";
    return <></>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img
          className="w-full h-full object-cover"
          src={loginImg}
          alt="landing-img"
        />
      </div>

      {isLogin ? (
        <Login setIsLogin={setIsLogin} />
      ) : (
        <Signin setIsLogin={setIsLogin} />
      )}
    </div>
  );
}
