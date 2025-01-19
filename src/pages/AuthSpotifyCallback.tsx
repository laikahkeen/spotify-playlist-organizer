import { NavLink } from 'react-router';
import { Button } from '@/components/ui/button';
import spotifyAccountApi from '@/api/spotifyAccountApi';
import { useEffect } from 'react';
import { useSpotifyAccountStore } from '@/stores/spotifyAccountStore';

export default function AuthSpotifyCallback() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code') || '';
    spotifyAccountApi.getPrivateAccessToken(code);
  }, []);

  const privateAccessToken = useSpotifyAccountStore((state) => state.privateAccessToken);
  return (
    <>
      {privateAccessToken ? (
        <>
          <p>Access Token: {privateAccessToken.access_token}</p>
          <NavLink to="/">
            <Button>return to home page</Button>
          </NavLink>
        </>
      ) : null}
    </>
  );
}
