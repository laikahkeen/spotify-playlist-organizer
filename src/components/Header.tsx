import { NavLink } from 'react-router';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <div className="flex min-h-4 w-full items-center p-4">
      <NavLink to={'/'}>
        <Button>Spotify Playlist Organizer</Button>
      </NavLink>
    </div>
  );
}
