import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <div className="container m-auto h-screen">
      <Outlet />
    </div>
  );
}
