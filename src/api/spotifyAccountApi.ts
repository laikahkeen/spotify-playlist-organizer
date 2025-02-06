import { AxiosMethod, createApiRequest } from '@/api/axios';
import { PrivateAccessTokenResponse, PublicAccessTokenResponse } from '@/interfaces/spotifyAccount';
import { generateCodeChallenge, generateCodeVerifier } from '@/lib/utils';
import { useSpotifyAccountStore } from '@/stores/spotifyAccountStore';

const APP_BASE_URL = window.location.origin;
const client_id: string = import.meta.env.VITE_SPOTIFY_API_CLIENT_ID;
const client_secret: string = import.meta.env.VITE_SPOTIFY_API_CLIENT_SECRET;
const redirect_uri = `${APP_BASE_URL}/auth/spotify/callback`;

const spotifyAccountBaseUrl = 'https://accounts.spotify.com';
const { request: spotifyAccountApiRequest } = createApiRequest({
  baseURL: spotifyAccountBaseUrl,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

const spotifyAccountUrl = {
  getAccessToken: () => '/api/token',
};

const getPublicAccessToken = async (): Promise<PublicAccessTokenResponse> => {
  const data = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id,
    client_secret,
  });

  const response: PublicAccessTokenResponse = await spotifyAccountApiRequest({
    url: spotifyAccountUrl.getAccessToken(),
    method: AxiosMethod.POST,
    data,
  });

  useSpotifyAccountStore.getState().setPublicAccessToken(response);
  return response;
};

const redirectToAuthCodeFlow = async () => {
  const verifier = generateCodeVerifier(128);
  const code_challenge = await generateCodeChallenge(verifier);

  localStorage.setItem('verifier', verifier);

  const params = new URLSearchParams({
    redirect_uri,
    scope:
      'user-read-private user-read-email playlist-modify-private playlist-modify-public playlist-read-private playlist-modify-private',
    response_type: 'code',
    client_id,
    code_challenge_method: 'S256',
    code_challenge,
  });

  document.location = `${spotifyAccountBaseUrl}/authorize?${params.toString()}`;
};

const getPrivateAccessToken = async (code: string): Promise<PrivateAccessTokenResponse> => {
  const code_verifier = localStorage.getItem('verifier') || '';

  const data = new URLSearchParams({
    grant_type: 'authorization_code',
    redirect_uri,
    client_id,
    code,
    code_verifier,
  });

  const response: PrivateAccessTokenResponse = await spotifyAccountApiRequest({
    url: spotifyAccountUrl.getAccessToken(),
    method: AxiosMethod.POST,
    data,
  });

  useSpotifyAccountStore.getState().setPrivateAccessToken(response);
  return response;
};

const refreshToken = async (): Promise<PrivateAccessTokenResponse> => {
  const refresh_token = useSpotifyAccountStore.getState().privateAccessToken.refresh_token;

  const data = new URLSearchParams({
    client_id,
    grant_type: 'refresh_token',
    refresh_token,
  });

  const response: PrivateAccessTokenResponse = await spotifyAccountApiRequest({
    url: spotifyAccountUrl.getAccessToken(),
    method: AxiosMethod.POST,
    data,
  });

  useSpotifyAccountStore.getState().setPrivateAccessToken(response);
  return response;
};

const spotifyAccountApi = {
  getPublicAccessToken,
  redirectToAuthCodeFlow,
  getPrivateAccessToken,
  refreshToken,
};

export default spotifyAccountApi;
