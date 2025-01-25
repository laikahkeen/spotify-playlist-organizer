import spotifyApi from '@/api/spotifyApi';
import { useSpotifyStore } from '@/stores/spotifyStore';

export default function TracklistSection() {
  const selectedPlaylist = useSpotifyStore((state) => state.selectedPlaylist);
  const { data: tracks } = spotifyApi.useGetPlaylistTracks(selectedPlaylist.id);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-semibold">Tracklist</h1>
      {tracks &&
        tracks.items.map((trackRecord) => {
          return <div key={trackRecord.track.id}>{trackRecord.track.name}</div>;
        })}
    </div>
  );
}
