import TracklistCard from '@/components/TracklistCard';

import { useSpotifyStore } from '@/stores/spotifyStore';

export default function TracklistSection() {
  const selectedPlaylists = useSpotifyStore((state) => state.selectedPlaylists);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-semibold">My Tracklists</h1>

      <div className="grid grid-cols-3 gap-2">
        {selectedPlaylists &&
          selectedPlaylists.map((playlist) => <TracklistCard key={playlist.id} playlist={playlist} />)}
      </div>
    </div>
  );
}
