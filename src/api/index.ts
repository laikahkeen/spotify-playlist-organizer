import axios from 'axios';

const spotifyAuthBaseUrl = 'https://accounts.spotify.com/api';
const spotifyApiBaseUrl = 'https://api.spotify.com/v1';

const spotifyAuthApi = axios.create({
  baseURL: spotifyAuthBaseUrl,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

const spotifyApi = axios.create({
  baseURL: spotifyApiBaseUrl,
});

interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface UserProfile {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
}

interface Image {
  url: string;
  height: number;
  width: number;
}

export const requestAccessToken = async (): Promise<AccessTokenResponse> => {
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', 'ea805dc29a43402580309e9b53e180b4');
  params.append('client_secret', '3b66944b54f243d8b15a7cf2eec141cf');

  try {
    const response = await spotifyAuthApi.post('/token', params);
    return response.data;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
};

export async function redirectToAuthCodeFlow(clientId: string) {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem('verifier', verifier);

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('response_type', 'code');
  params.append('redirect_uri', 'http://localhost:5173/auth/spotify/callback');
  params.append('scope', 'user-read-private user-read-email');
  params.append('code_challenge_method', 'S256');
  params.append('code_challenge', challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length: number) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function getAccessToken(clientId: string, code: string): Promise<string> {
  const verifier = localStorage.getItem('verifier');

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', 'http://localhost:5173/auth/spotify/callback');
  params.append('code_verifier', verifier!);

  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });

  const { access_token } = await result.json();
  return access_token;
}

export async function fetchProfile(token: string): Promise<UserProfile> {
  const result = await fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  return await result.json();
}

export const fetchArtistDetails = async (artistId: string, accessToken: string) => {
  try {
    const response = await spotifyApi.get(`/artists/${artistId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error fetching artist details:', error);
    throw error;
  }
};
