import PlaylistSection from '@/components/PlaylistSection';
import NavBar from '@/components/NavBar';

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="grid grid-cols-3 p-4">
        <div className="border">
          <PlaylistSection />
        </div>
        <div className="border"></div>
        <div className="border"></div>
      </div>
    </>
  );
}
