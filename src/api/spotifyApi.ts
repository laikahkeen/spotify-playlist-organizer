import { AxiosMethod, createApiRequest } from '@/api/axios';
import spotifyAccountApi from '@/api/spotifyAccountApi';
import { UserProfile } from '@/interfaces/spotify';
import { useSpotifyAccountStore } from '@/stores/spotifyAccountStore';
import { useQuery } from '@tanstack/react-query';

const spotifyBaseUrl = 'https://api.spotify.com/v1';

const { request: spotifyApiRequest, axiosInstance: spotifyClient } = createApiRequest({
  baseURL: spotifyBaseUrl,
});

spotifyClient.interceptors.request.use(
  (config) => {
    const { privateAccessToken } = useSpotifyAccountStore.getState();
    if (!privateAccessToken || !privateAccessToken.access_token) {
      return Promise.reject(new Error('No access token available.'));
    }
    config.headers.Authorization = `Bearer ${privateAccessToken.access_token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let refreshPromise: Promise<null> | null = null;

spotifyClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = (async () => {
          try {
            await spotifyAccountApi.refreshToken();
            return null;
          } catch (refreshError) {
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        })();
      }

      try {
        await refreshPromise;
        return spotifyClient(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    if (status === 403 && error.response.data) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  }
);

const spotifyUrl = {
  getMyProfile: () => '/me',
};

const getProfile = async (): Promise<UserProfile> => {
  return await spotifyApiRequest({
    url: spotifyUrl.getMyProfile(),
    method: AxiosMethod.GET,
  });
};

const spotifyApi = {
  useGetProfile: () =>
    useQuery({
      queryKey: ['spotify', 'me'],
      queryFn: () => getProfile(),
    }),
};

export default spotifyApi;
