import { NavLink } from 'react-router';
import { getAccessToken } from '../api';
import { useAuthStore } from '../zustand/authStore';

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
      <button className="btn" onClick={handleRequestToken}>
        get access token with code
      </button>
      <p>Access Token: {accessToken}</p>
      <NavLink className="btn" to="/">
        return to home page
      </NavLink>
    </>
  );
}
