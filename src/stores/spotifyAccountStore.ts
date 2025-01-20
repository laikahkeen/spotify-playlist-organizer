import { queryClient } from '@/api/queryClient';
import { PrivateAccessTokenResponse, PublicAccessTokenResponse } from '@/interfaces/spotifyAccount';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  publicAccessToken: PublicAccessTokenResponse;
  privateAccessToken: PrivateAccessTokenResponse;
  setPublicAccessToken: (token: PublicAccessTokenResponse) => void;
  setPrivateAccessToken: (token: PrivateAccessTokenResponse) => void;
  clearPrivateAccessToken: () => Promise<void>;
}

const initialPublicAccessTokenState = {
  access_token: '',
  token_type: '',
  expires_in: 0,
};

const initialPrivateAccessTokenState = {
  access_token: '',
  token_type: '',
  expires_in: 0,
  refresh_token: '',
  scope: '',
};

export const useSpotifyAccountStore = create<AuthStore>()(
  persist(
    (set) => ({
      publicAccessToken: initialPublicAccessTokenState,
      privateAccessToken: initialPrivateAccessTokenState,
      setPublicAccessToken: (token) => set({ publicAccessToken: token }),
      setPrivateAccessToken: (token) => set({ privateAccessToken: token }),
      clearPrivateAccessToken: async () => {
        await set({ privateAccessToken: initialPrivateAccessTokenState });
        queryClient.resetQueries();
      },
    }),
    {
      name: 'access-tokens',
    }
  )
);
