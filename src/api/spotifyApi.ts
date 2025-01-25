import { AxiosMethod, createApiRequest } from '@/api/axios';
import { queryClient } from '@/api/queryClient';
import spotifyAccountApi from '@/api/spotifyAccountApi';
import { Playlist, PlaylistForm, Response, TrackRecord, UserProfile } from '@/interfaces/spotify';
import { useSpotifyAccountStore } from '@/stores/spotifyAccountStore';
import { useMutation, useQuery } from '@tanstack/react-query';

const spotifyBaseUrl = 'https://api.spotify.com/v1';

const { request: spotifyApiRequest, axiosInstance: spotifyClient } = createApiRequest({
  baseURL: spotifyBaseUrl,
});

spotifyClient.interceptors.request.use(
  (config) => {
    const { privateAccessToken } = useSpotifyAccountStore.getState();
    if (!privateAccessToken.access_token) {
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
            useSpotifyAccountStore.getState().clearPrivateAccessToken();
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
  getMyPlaylists: () => '/me/playlists',
  getPlaylistTracks: (playlistId: string) => `/playlists/${playlistId}/tracks`,
  createPlaylist: (userId: string) => `/users/${userId}/playlists`,
};

const getMyProfile = async (): Promise<UserProfile> => {
  return await spotifyApiRequest({
    url: spotifyUrl.getMyProfile(),
    method: AxiosMethod.GET,
  });
};

const getMyPlaylists = async (): Promise<Response<Playlist>> => {
  return await spotifyApiRequest({
    url: spotifyUrl.getMyPlaylists(),
    method: AxiosMethod.GET,
  });
};

const createPlaylist = async (userId: string, data: PlaylistForm): Promise<Playlist> => {
  return await spotifyApiRequest({
    url: spotifyUrl.createPlaylist(userId),
    method: AxiosMethod.POST,
    data,
  });
};

const getPlaylistTracks = async (playlistId: string): Promise<Response<TrackRecord>> => {
  return await spotifyApiRequest({
    url: spotifyUrl.getPlaylistTracks(playlistId),
    method: AxiosMethod.GET,
  });
};

const spotifyApi = {
  useGetMyProfile: () => {
    const accessToken = useSpotifyAccountStore((state) => state.privateAccessToken.access_token);
    return useQuery({
      queryKey: ['spotify', 'me'],
      queryFn: () => getMyProfile(),
      enabled: !!accessToken,
    });
  },
  useGetMyPlaylists: () => {
    const accessToken = useSpotifyAccountStore((state) => state.privateAccessToken.access_token);
    return useQuery({
      queryKey: ['spotify', 'me', 'playlist'],
      queryFn: () => getMyPlaylists(),
      enabled: !!accessToken,
    });
  },
  useCreatePlaylist: () => {
    return useMutation({
      mutationFn: ({ userId, data }: { userId: string; data: PlaylistForm }) => createPlaylist(userId, data),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['spotify', 'me', 'playlist'] }),
    });
  },
  useGetPlaylistTracks: (playlistId: string) => {
    const accessToken = useSpotifyAccountStore((state) => state.privateAccessToken.access_token);
    return useQuery({
      queryKey: ['spotify', 'playlist', playlistId, 'tracks'],
      queryFn: () => getPlaylistTracks(playlistId),
      enabled: !!accessToken,
    });
  },
};

export default spotifyApi;
