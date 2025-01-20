import { NavLink } from 'react-router';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import spotifyAccountApi from '@/api/spotifyAccountApi';
import spotifyApi from '@/api/spotifyApi';
import { useSpotifyAccountStore } from '@/stores/spotifyAccountStore';

export default function NavBar() {
  const { data: profile } = spotifyApi.useGetProfile();
  const clearPrivateAccessToken = useSpotifyAccountStore((state) => state.clearPrivateAccessToken);
  return (
    <div className="navbar border-b">
      <div className="flex-1">
        <NavLink to={'/'} className="font-bold">
          Spotify Playlist Organizer
        </NavLink>
      </div>
      <div className="gap-4">
        <Input placeholder="Search..." startIcon={Search} />

        {profile ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={profile.images[0]?.url} />
                <AvatarFallback>{profile.id[0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>User ID: {profile.id}</DropdownMenuItem>
              <DropdownMenuItem>Email: {profile.email}</DropdownMenuItem>
              <DropdownMenuItem>Spotify URI: {profile.uri}</DropdownMenuItem>
              <DropdownMenuItem>Link: {profile.external_urls.spotify}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={clearPrivateAccessToken}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => spotifyAccountApi.redirectToAuthCodeFlow()}>Login with Spotify</Button>
        )}
      </div>
    </div>
  );
}
