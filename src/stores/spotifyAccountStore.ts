import { PrivateAccessTokenResponse, PublicAccessTokenResponse } from '@/interfaces/spotifyAccount';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  publicAccessToken: PublicAccessTokenResponse;
  privateAccessToken: PrivateAccessTokenResponse;
  setPublicAccessToken: (token: PublicAccessTokenResponse) => void;
  setPrivateAccessToken: (token: PrivateAccessTokenResponse) => void;
}

export const useSpotifyAccountStore = create<AuthStore>()(
  persist(
    (set) => ({
      publicAccessToken: {
        access_token: '',
        token_type: '',
        expires_in: 0,
      },
      privateAccessToken: {
        access_token: '',
        token_type: '',
        expires_in: 0,
        refresh_token: '',
        scope: '',
      },
      setPublicAccessToken: (token) => set({ publicAccessToken: token }),
      setPrivateAccessToken: (token) => set({ privateAccessToken: token }),
    }),
    {
      name: 'access-tokens',
    }
  )
);
