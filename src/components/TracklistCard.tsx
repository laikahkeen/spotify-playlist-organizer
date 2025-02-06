import spotifyApi from '@/api/spotifyApi';
import { Playlist, Track } from '@/interfaces/spotify';
import { useEffect, useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from '@/components/ui/sortable-item';

interface TracklistCardProps {
  playlist: Playlist;
}

export default function TracklistCard({ playlist }: TracklistCardProps) {
  const { data: tracks } = spotifyApi.useGetPlaylistTracks(playlist.id);
  const [items, setItems] = useState<Track[]>([]);

  useEffect(() => {
    if (tracks) {
      setItems([...tracks.items.map((trackrecord) => trackrecord.track)]);
    }
  }, [tracks]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const arrayIds = items.map((item) => item.id);
        const oldIndex = arrayIds.indexOf(active.id);
        const newIndex = arrayIds.indexOf(over.id);
        const newArray = arrayMove(items, oldIndex, newIndex);
        return newArray;
      });
    }
  }

  return (
    <>
      {tracks && (
        <div className="flex max-h-96 min-w-56 flex-col gap-2">
          <h1 className="text-xl font-semibold">{playlist.name}</h1>
          <div className="overflow-y-auto">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={items} strategy={verticalListSortingStrategy}>
                {items.map((track) => (
                  <SortableItem key={track.id} id={track.id}>
                    <div key={track.id}>{track.name}</div>
                  </SortableItem>
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </div>
      )}
    </>
  );
}
