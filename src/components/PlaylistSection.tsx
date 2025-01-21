import spotifyApi from '@/api/spotifyApi';
import spotifyPublicApi from '@/api/spotifyPublicApi';
import PlaylistCard from '@/components/PlaylistCard';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function Playlist() {
  const [artistId, setArtistId] = useState('');
  const [playlistId, setPlaylistId] = useState('');
  const { data: artistDetails, isError: artistDetailsError } = spotifyPublicApi.useGetArtistDetails(artistId);
  const { data: playlist, isError: playlistError } = spotifyPublicApi.useGetPlaylist(playlistId);
  const { data: myPlaylists } = spotifyApi.useGetMyPlaylists();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-semibold">My Playlist</h1>
      {myPlaylists &&
        myPlaylists.items.map((playlist) => {
          return <PlaylistCard key={playlist.id} playlist={playlist} />;
        })}

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Input value={artistId} onChange={(e) => setArtistId(e.target.value)}></Input>
        </div>
        <p>Artist Detail: {JSON.stringify(artistDetails) || ''}</p>
        {artistDetailsError && <p>errored!</p>}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Input value={playlistId} onChange={(e) => setPlaylistId(e.target.value)}></Input>
        </div>
        <p>Artist Detail: {JSON.stringify(playlist) || ''}</p>
        {playlistError && <p>errored!</p>}
      </div>
    </div>
  );
}
