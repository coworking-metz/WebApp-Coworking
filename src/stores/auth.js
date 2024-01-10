import { defineStore } from 'pinia';
import { refreshTokens } from '../services/tickets/auth';

const LOCAL_STORAGE_REFRESH_TOKEN_NAME = 'rt';

/**
 * In order to avoid asking for multiple refresh tokens at the same time when it has expired,
 * this singleton holds the http request Promise until a new token is fetched.
 */
let refreshPromise = null;

// https://stackoverflow.com/a/38552302
const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join(''),
    );

    return JSON.parse(jsonPayload);
};

export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: null,
        user: null,
    }),
    actions: {
        setRefreshToken(refreshToken) {
            localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_NAME, refreshToken);
        },
        setAccessToken(accessToken) {
            const decodedUser = parseJwt(accessToken);

            this.user = decodedUser || null;
            this.accessToken = accessToken || null;
        },
        fetchTokens() {
            if (!refreshPromise) {
                const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_NAME);

                refreshPromise = refreshTokens(refreshToken, false)
                    .then(async ({ accessToken: newAccessToken, refreshToken: newRefresToken }) => {
                        this.setAccessToken(newAccessToken);
                        this.setRefreshToken(newRefresToken);
                    })
                    .finally(() => {
                        refreshPromise = null;
                    });
            }
            return refreshPromise;
        },
        disconnect() {
            this.accessToken = null;
            this.user = null;
            localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_NAME);
        },
        logout() {
            this.disconnect();
            localStorage.clear();
        },
    },
});
