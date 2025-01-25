import { queryClient } from '@/api/queryClient';
import { PrivateAccessTokenResponse, PublicAccessTokenResponse } from '@/interfaces/spotifyAccount';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SpotifyAccountStoreState {
  publicAccessToken: PublicAccessTokenResponse;
  privateAccessToken: PrivateAccessTokenResponse;
}

interface SpotifyAccountStoreAction {
  setPublicAccessToken: (token: PublicAccessTokenResponse) => void;
  setPrivateAccessToken: (token: PrivateAccessTokenResponse) => void;
  clearPrivateAccessToken: () => void;
}

type SpotifyAccountStore = SpotifyAccountStoreState & SpotifyAccountStoreAction;

const initialState: SpotifyAccountStoreState = {
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
};

export const useSpotifyAccountStore = create<SpotifyAccountStore>()(
  persist(
    (set) => ({
      ...initialState,
      setPublicAccessToken: (token) => set({ publicAccessToken: token }),
      setPrivateAccessToken: (token) => set({ privateAccessToken: token }),
      clearPrivateAccessToken: () => {
        set({ privateAccessToken: initialState.privateAccessToken });
        queryClient.resetQueries();
      },
    }),
    {
      name: 'access-tokens',
    }
  )
);
