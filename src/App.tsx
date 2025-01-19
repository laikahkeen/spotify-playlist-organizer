import { BrowserRouter, Route, Routes } from 'react-router';
import RootPage from '@/pages/RootPage';
import AuthSpotifyCallback from '@/pages/AuthSpotifyCallback';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/api/queryClient';

export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Routes>
          <Route path="/" element={<RootPage />} />
          <Route path="/auth/spotify/callback" element={<AuthSpotifyCallback />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
