import { useState } from 'react';
import { fetchArtistDetails, requestAccessToken } from '@/api';
import { useAuthStore } from '@/zustand/authStore';
import { Button } from '@/components/ui/button';

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
        <Button onClick={handleRequestToken}>Request Access Token</Button>
        <p>Access Token: {accessToken}</p>
      </div>
      <div className="flex items-center gap-4">
        <Button onClick={handlefetchArtist}>Fetch Artist Details</Button>
        <p>Artist Detail: {artistDetails}</p>
      </div>
    </div>
  );
}
