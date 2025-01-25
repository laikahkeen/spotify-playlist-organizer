import spotifyApi from '@/api/spotifyApi';
import CreatePlaylistDialog from '@/components/CreatePlaylistDialog';
import PlaylistCard from '@/components/PlaylistCard';

export default function PlaylistSection() {
  const { data: myPlaylists } = spotifyApi.useGetMyPlaylists();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-semibold">My Playlist</h1>
      <CreatePlaylistDialog />
      {myPlaylists &&
        myPlaylists.items.map((playlist) => {
          return <PlaylistCard key={playlist.id} playlist={playlist} />;
        })}
    </div>
  );
}
