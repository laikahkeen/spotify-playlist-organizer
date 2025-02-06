import PlaylistSection from '@/components/PlaylistSection';
import NavBar from '@/components/NavBar';
import TracklistSection from '@/components/TracklistSection';

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="grid grid-cols-3 gap-4 p-4">
        <div className="border p-4">
          <PlaylistSection />
        </div>
        <div className="col-span-2 border p-4">
          <TracklistSection />
        </div>
      </div>
    </>
  );
}
