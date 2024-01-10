import HTTP from '../http';

/**
 * Fetch new tokens from the server.
 *
 * @param String refreshToken
 * @returns Promise<{ accessToken: String, refreshToken: String }>
 */
export const refreshTokens = (refreshToken) => {
    return HTTP.post('/auth/tokens', { refreshToken: refreshToken }).then(({ data }) => data);
};
