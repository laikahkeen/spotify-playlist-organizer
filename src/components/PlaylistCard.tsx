import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Playlist } from '@/interfaces/spotify';
import { useSpotifyStore } from '@/stores/spotifyStore';
import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

interface PlaylistCardProps {
  playlist: Playlist;
}

export default function PlaylistCard({ playlist }: PlaylistCardProps) {
  const [selectedPlaylists, toggleSelectedPlaylists] = useSpotifyStore(
    useShallow((state) => [state.selectedPlaylists, state.toggleSelectedPlaylists])
  );

  const className = useMemo(() => {
    const isSelected = selectedPlaylists.some((p) => p.id === playlist.id);
    return `${isSelected ? 'border-primary' : ''} hover:shadow-lg`;
  }, [playlist.id, selectedPlaylists]);

  return (
    <Card key={playlist.id} onClick={() => toggleSelectedPlaylists(playlist)} className={className}>
      <CardHeader>
        <CardTitle>{playlist.name}</CardTitle>
        <CardDescription>{playlist.tracks.total} tracks</CardDescription>
      </CardHeader>
    </Card>
  );
}
