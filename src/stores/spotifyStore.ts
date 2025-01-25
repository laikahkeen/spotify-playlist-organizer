import { Playlist } from '@/interfaces/spotify';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SpotifyStoreState {
  selectedPlaylist: Playlist;
}

interface SpotifyStoreAction {
  setSelectedPlaylist: (playlist: Playlist) => void;
}

type SpotifyStore = SpotifyStoreState & SpotifyStoreAction;

const initialState: SpotifyStoreState = {
  selectedPlaylist: {
    id: '',
  } as Playlist,
};

export const useSpotifyStore = create<SpotifyStore>()(
  persist(
    (set) => ({
      ...initialState,
      setSelectedPlaylist: (playlist) => set({ selectedPlaylist: playlist }),
    }),
    {
      name: 'access-tokens',
    }
  )
);
