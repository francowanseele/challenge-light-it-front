import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/constants';
import jwtDecode from 'jwt-decode';

export function getAccessTokenApi() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if (!accessToken || accessToken === null) {
        return null;
    } else {
        return willExpireToken(accessToken) ? null : accessToken;
    }
}

export function getRefreshTokenApi() {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    if (!refreshToken || refreshToken === null) {
        return null;
    } else {
        return willExpireToken(refreshToken) ? null : refreshToken;
    }
}

// refresh token, if refresh token expired deslogueo user
export function refreshAccessTokenApi(refreshToken) {
    const url = `${process.env.REACT_APP_HOST_API}/api/refresh-access-token`;
    const bodyObj = {
        refreshToken: refreshToken,
    };
    const params = {
        method: 'POST',
        body: JSON.stringify(bodyObj),
        headers: {
            'Content-Type': 'application/json',
        },
    };

    fetch(url, params)
        .then((response) => {
            if (response.status !== 200) {
                return null;
            } else {
                return response.json();
            }
        })
        .then((result) => {
            if (!result) {
                //Deslogueo user
                logout();
            } else {
                const { accessToken, refreshToken } = result;
                localStorage.setItem(ACCESS_TOKEN, accessToken);
                localStorage.setItem(REFRESH_TOKEN, refreshToken);
            }
        })
        .catch((err) => {
            return {
                ok: false,
                message: 'Error de servidor, vuelva a intentarlo más tarde',
            };
        });
}

export function logout() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
}

function willExpireToken(token) {
    const seconds = 60;
    const metaToken = jwtDecode(token);
    const { exp } = metaToken;

    // Convert date to unix format
    const now = (Date.now() + seconds) / 1000;

    // return true if expire
    return now > exp;
}
