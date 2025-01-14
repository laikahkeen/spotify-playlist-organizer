import { useState } from 'react';
import { fetchArtistDetails, requestAccessToken } from '../api';
import { useAuthStore } from '../zustand/authStore';

export default function AuthPoc() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const handleRequestToken = async () => {
    const response = await requestAccessToken();
    setAccessToken(response.access_token);
  };

  const [artistDetails, setArtistDetails] = useState('');

  const handlefetchArtist = async () => {
    const response = await fetchArtistDetails('4Z8W4fKeB5YxbusRsdQVPb', accessToken);
    setArtistDetails(JSON.stringify(response));
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <button className="btn" onClick={handleRequestToken}>
          Request Access Token
        </button>
        <p className="">Access Token: {accessToken}</p>
      </div>
      <div className="flex items-center gap-4">
        <button className="btn" onClick={handlefetchArtist}>
          Fetch Artist Details
        </button>
        <p>Artist Detail: {artistDetails}</p>
      </div>
    </div>
  );
}
