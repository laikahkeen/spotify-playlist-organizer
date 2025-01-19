import AuthPoc from '@/components/AuthPoc';
import NavBar from '@/components/NavBar';
import ProfileData from '@/components/ProfileData';

export default function RootPage() {
  return (
    <div className="container m-auto h-screen">
      <NavBar />
      <div className="p-4">
        <p>Sort Your Music</p>
        <p>
          Sort your Spotify playlists by any of a wide range of musical attributes such as tempo, loudness, valence,
          energy, danceability, popularity and more. Now with Filters!
        </p>
        <p>Login with your Spotify account to get started</p>
        <AuthPoc />
        <ProfileData />
      </div>
    </div>
  );
}
