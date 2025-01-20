import { BrowserRouter, Route, Routes } from 'react-router';
import AuthSpotifyCallback from '@/pages/AuthSpotifyCallback';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/api/queryClient';
import Layout from '@/pages/Layout';
import Home from '@/pages/home';

export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="auth/spotify/callback" element={<AuthSpotifyCallback />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
