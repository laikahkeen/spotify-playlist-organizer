import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Playlist } from '@/interfaces/spotify';
import { useSpotifyStore } from '@/stores/spotifyStore';
import { useShallow } from 'zustand/react/shallow';

interface PlaylistCardProps {
  playlist: Playlist;
}

export default function PlaylistCard({ playlist }: PlaylistCardProps) {
  const [selectedPlaylist, setSelectedPlaylist] = useSpotifyStore(
    useShallow((state) => [state.selectedPlaylist, state.setSelectedPlaylist])
  );

  return (
    <Card
      key={playlist.id}
      onClick={() => setSelectedPlaylist(playlist)}
      className={selectedPlaylist.id === playlist.id ? 'border-primary' : ''}
    >
      <CardHeader>
        <CardTitle>{playlist.name}</CardTitle>
        <CardDescription>{playlist.tracks.total} tracks</CardDescription>
      </CardHeader>
    </Card>
  );
}
