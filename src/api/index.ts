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
