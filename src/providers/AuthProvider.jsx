import React, { useState, useEffect, createContext } from "react";
import {
  getAccessTokenApi,
  getRefreshTokenApi,
  refreshAccessTokenApi,
  logout,
} from "../api/auth";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

export default function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState({
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    checkUserLogin(setUser);
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

function checkUserLogin(setUser) {
  try {
    const accessToken = getAccessTokenApi();

    if (!accessToken) {
      const refreshToken = getRefreshTokenApi();

      if (!refreshToken) {
        logout();
        setUser({
          user: null,
          isLoading: false,
        });
      } else {
        refreshAccessTokenApi(refreshToken);
        const newRefreshToken = getRefreshTokenApi();

        setUser({
          user: jwtDecode(newRefreshToken),
          isLoading: false,
        });
      }
    } else {
      setUser({
        user: jwtDecode(accessToken),
        isLoading: false,
      });
    }
  } catch (error) {}
}
