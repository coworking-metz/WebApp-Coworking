import { useAuthStore } from '@/stores/auth';
import axiosRetry from 'axios-retry';
import { version as appVersion } from '../../package.json';

const MAX_REQUEST_RETRIES = 1;

// to avoid dependency cycle @see https://stackoverflow.com/a/51048400/15183871
const createHttpInterceptors = (httpInstance) => {
    httpInstance.interceptors.request.use((config) => {
        const { accessToken } = useAuthStore();
        const headers = {
            ...config.headers,
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
            ...(appVersion ? { 'X-APP-VERSION': appVersion } : {}),
        };

        return {
            ...config,
            headers,
        };
    });

    axiosRetry(httpInstance, {
        retries: MAX_REQUEST_RETRIES,
        retryDelay: axiosRetry.exponentialDelay,
        retryCondition: async (error) => {
            // check if the access token has been expired

            const is401 = error.response?.status === 401;
            if (!is401) return false;

            const hadAccessToken = !!error.response?.config?.headers.get('Authorization');
            if (!hadAccessToken) return false;

            const responseContentType = error.response?.headers?.['content-type'] || '';
            const isResponseContentJson = responseContentType.includes('application/json');
            if (!isResponseContentJson) return false;

            // if the expected response type was blob, the data won't be parsed as JSON by axios
            // we need to do it ourselves
            const content = error.response?.data;
            const parsedError =
                typeof content?.text === 'function' ? JSON.parse(await content.text()) : content;
            const isTokenExpired = parsedError.code === 'EXPIRED_ACCESS_TOKEN';
            if (isTokenExpired) {
                // should fetch another access token and retry
                await useAuthStore().fetchTokens();
                return true;
            }
            return false;
        },
    });

    httpInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const authStore = useAuthStore();
            // disconnect the user on 401
            if (error.response && error.response.status === 401 && authStore.accessToken) {
                // the user should be properly logged out of the platform
                await authStore.disconnect();

                // TODO: notify the user that he has been disconnected

                return Promise.reject(new Error('User has been logged out'));
            }

            return Promise.reject(error);
        },
    );
};

export default createHttpInterceptors;
