import spotifyApi from '@/api/spotifyApi';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Playlist } from '@/interfaces/spotify';

interface PlaylistCardProps {
  playlist: Playlist;
}

export default function PlaylistCard({ playlist }: PlaylistCardProps) {
  const { data: tracks } = spotifyApi.useGetPlaylistTracks(playlist.id);

  return (
    <Card key={playlist.id}>
      <CardHeader>
        <CardTitle>{playlist.name}</CardTitle>
        <CardDescription>{playlist.tracks.total} tracks</CardDescription>
      </CardHeader>
      {tracks &&
        tracks.items.map((trackRecord) => {
          return <div key={trackRecord.track.id}>{trackRecord.track.name}</div>;
        })}
    </Card>
  );
}
