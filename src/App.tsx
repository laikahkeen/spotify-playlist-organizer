import { BrowserRouter, Route, Routes } from 'react-router';
import RootPage from '@/pages/RootPage';
import AuthSpotifyCallback from '@/pages/AuthSpotifyCallback';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="/auth/spotify/callback" element={<AuthSpotifyCallback />} />
      </Routes>
    </BrowserRouter>
  );
}
