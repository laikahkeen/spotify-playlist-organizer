import { NavLink } from 'react-router';

export default function Header() {
  return (
    <div className="navbar bg-base-100">
      <NavLink to={'/'} className="btn text-xl">
        Spotify Playlist Organizer
      </NavLink>
    </div>
  );
}
