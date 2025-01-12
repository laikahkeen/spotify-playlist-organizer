import { useState } from 'react';
import { fetchArtistDetails, requestAccessToken } from './api';

function App() {
  const [accessToken, setAccessToken] = useState('');

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
      <h1>Spotify Playlist Organizer</h1>
      <button onClick={handleRequestToken}>Request Access Token</button>
      <p>Access Token: {accessToken}</p>
      <button onClick={handlefetchArtist}>Fetch Artist Details</button>
      <p>Artist Detail: {artistDetails}</p>
      <a href="">test</a>
    </div>
  );
}

export default App;
