import { Playlist } from '@/interfaces/spotify';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SpotifyStoreState {
  selectedPlaylists: Playlist[];
}

interface SpotifyStoreAction {
  toggleSelectedPlaylists: (playlist: Playlist) => void;
  resetSelectedPlaylists: () => void;
}

type SpotifyStore = SpotifyStoreState & SpotifyStoreAction;

const initialState: SpotifyStoreState = {
  selectedPlaylists: [],
};

export const useSpotifyStore = create<SpotifyStore>()(
  persist(
    (set) => ({
      ...initialState,
      toggleSelectedPlaylists: (playlist) =>
        set((state) => {
          const exists = state.selectedPlaylists.some((p) => p.id === playlist.id);
          return {
            selectedPlaylists: exists
              ? state.selectedPlaylists.filter((p) => p.id !== playlist.id)
              : [...state.selectedPlaylists, playlist],
          };
        }),

      resetSelectedPlaylists: () =>
        set(() => ({
          selectedPlaylists: [],
        })),
    }),
    {
      name: 'selectedPlaylists',
    }
  )
);
