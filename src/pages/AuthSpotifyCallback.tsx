import { NavLink, useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import spotifyAccountApi from '@/api/spotifyAccountApi';
import { useCallback, useEffect, useState } from 'react';

export default function AuthSpotifyCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleRedirect = useCallback(
    async (code: string) => {
      try {
        await spotifyAccountApi.getPrivateAccessToken(code);
        navigate('/');
      } catch (err) {
        setError(JSON.stringify(err) || 'Failed to retrieve access token');
      }
    },
    [navigate]
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const errorParam = params.get('error');

    if (errorParam) {
      setError(errorParam);
    } else if (code) {
      handleRedirect(code);
    }
  }, [handleRedirect]);

  return (
    <>
      {error && (
        <div className="flex h-full w-full flex-col flex-wrap items-center justify-center gap-4">
          <p className="">Error: {error}</p>
          <NavLink to="/">
            <Button>Return to Home Page</Button>
          </NavLink>
        </div>
      )}
    </>
  );
}
