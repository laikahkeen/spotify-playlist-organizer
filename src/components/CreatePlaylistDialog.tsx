import spotifyApi from '@/api/spotifyApi';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string(),
  public: z.boolean(),
});

export default function CreatePlaylistDialog() {
  const { data: userProfile } = spotifyApi.useGetMyProfile();
  const { mutate: createPlaylist, isSuccess } = spotifyApi.useCreatePlaylist();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: 'New Playlist',
      description: 'New playlist description',
      public: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (userProfile) {
      createPlaylist({ userId: userProfile.id, data: values });
      if (isSuccess) {
        setOpen(false);
        form.reset();
      }
    }
  }

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Playlist</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Add new playlist</DialogTitle>
              <DialogDescription>Add new playlist to your profile here. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Playlist name</FormLabel>
                  <FormControl>
                    <Input placeholder="Playlist name" {...field} />
                  </FormControl>
                  <FormDescription>This is your new playlist name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormDescription>This is your new playlist description.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="public"
              render={({ field }) => (
                <FormItem className="flex justify-between">
                  <div>
                    <FormLabel className="text-base">Public Playlist</FormLabel>
                    <FormDescription>Make the playlist public.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Add Playlist</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
