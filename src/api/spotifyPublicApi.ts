import { AxiosMethod, createApiRequest } from '@/api/axios';
import spotifyAccountApi from '@/api/spotifyAccountApi';
import { Artist } from '@/interfaces/spotify';
import { useSpotifyAccountStore } from '@/stores/spotifyAccountStore';
import { useQuery } from '@tanstack/react-query';

const spotifyBaseUrl = 'https://api.spotify.com/v1';

const { request: spotifyPublicApiRequest, axiosInstance: spotifyPublicClient } = createApiRequest({
  baseURL: spotifyBaseUrl,
});

spotifyPublicClient.interceptors.request.use(
  async (config) => {
    let publicAccessToken = useSpotifyAccountStore.getState().publicAccessToken;
    if (!publicAccessToken.access_token) {
      publicAccessToken = await spotifyAccountApi.getPublicAccessToken();
    }
    config.headers.Authorization = `Bearer ${publicAccessToken.access_token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let refreshPromise: Promise<null> | null = null;

spotifyPublicClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = (async () => {
          try {
            await spotifyAccountApi.getPublicAccessToken();
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
        return spotifyPublicClient(originalRequest);
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
  getArtistDetails: (artistId: string) => `/artists/${artistId}`,
  getPlaylist: (playlistId: string) => `/playlists/${playlistId}`,
};

const getArtistDetails = async (artistId: string): Promise<Artist> => {
  return await spotifyPublicApiRequest({
    url: spotifyUrl.getArtistDetails(artistId),
    method: AxiosMethod.GET,
  });
};

const getPlaylist = async (playlistId: string): Promise<any> => {
  return await spotifyPublicApiRequest({
    url: spotifyUrl.getPlaylist(playlistId),
    method: AxiosMethod.GET,
  });
};

const spotifyPublicApi = {
  useGetArtistDetails: (artistId: string) =>
    useQuery({
      queryKey: ['spotify', 'artist', artistId],
      queryFn: () => getArtistDetails(artistId),
      enabled: !!artistId,
    }),
  useGetPlaylist: (playlistId: string) =>
    useQuery({
      queryKey: ['spotify', 'playlist', playlistId],
      queryFn: () => getPlaylist(playlistId),
      enabled: !!playlistId,
    }),
};

export default spotifyPublicApi;
