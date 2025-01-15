import Header from '@/components/Header';
import AuthPoc from '@/components/AuthPoc';
import ProfileData from '@/components/ProfileData';

export default function RootPage() {
  return (
    <div className="min-h-[100vh]">
      <Header />
      <div className="p-4">
        <AuthPoc />
        <ProfileData />
      </div>
    </div>
  );
}
