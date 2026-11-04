export type MusicTrack = {
  id: string;
  title: string;
  artist: string;
  album?: string;
  artworkUrl?: string;
  streamUrl?: string;
  duration?: number;
  source: string;
  license?: string;
  attribution?: string;
};

export type MusicSearchQuery = { query: string; limit?: number };

export interface MusicProvider {
  readonly name: string;
  search(query: MusicSearchQuery): Promise<MusicTrack[]>;
  getFeatured(): Promise<MusicTrack[]>;
}
