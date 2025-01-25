export interface UserProfile {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: ExternalUrls;
  followers: HrefTotal;
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
}

export interface Response<T> {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: T[];
}

export interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  public: boolean;
  snapshot_id: string;
  tracks: HrefTotal;
  type: string;
  uri: string;
}

export interface PlaylistForm {
  name: string;
  description: string;
  public: boolean;
}

export interface Owner {
  display_name: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface TrackRecord {
  added_at: string;
  added_by: AddedBy;
  is_local: boolean;
  track: Track;
  video_thumbnail: VideoThumbnail;
}

export interface Track {
  preview_url: string;
  available_markets: string[];
  explicit: boolean;
  type: string;
  episode: boolean;
  track: boolean;
  album: Album;
  artists: Artist[];
  disc_number: number;
  track_number: number;
  duration_ms: number;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  popularity: number;
  uri: string;
  is_local: boolean;
}

export interface Album {
  available_markets: string[];
  type: string;
  album_type: string;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  uri: string;
  artists: Artist[];
  external_urls: ExternalUrls;
  total_tracks: number;
}

export interface Artist {
  external_urls: ExternalUrls;
  followers: HrefTotal;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

interface VideoThumbnail {
  url: string;
}

interface AddedBy {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
}

interface HrefTotal {
  href: string;
  total: number;
}

interface ExternalUrls {
  spotify: string;
}

interface Image {
  url: string;
  height: number;
  width: number;
}

interface ExternalIds {
  isrc: string;
}
