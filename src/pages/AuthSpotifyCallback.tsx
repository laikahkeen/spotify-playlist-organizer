import { NavLink } from 'react-router';
import { getAccessToken } from '@/api';
import { useAuthStore } from '@/zustand/authStore';
import { Button } from '@/components/ui/button';

export default function AuthSpotifyCallback() {
  const clientId = 'ea805dc29a43402580309e9b53e180b4';
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code') || '';
  const accessToken = useAuthStore((state) => state.accessToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const handleRequestToken = async () => {
    const response = await getAccessToken(clientId, code);
    setAccessToken(response);
  };
  return (
    <>
      <Button onClick={handleRequestToken}>get access token with code</Button>
      <p>Access Token: {accessToken}</p>
      <NavLink to="/">
        <Button>return to home page</Button>
      </NavLink>
    </>
  );
}
