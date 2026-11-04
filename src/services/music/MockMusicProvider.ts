import { MusicProvider, MusicSearchQuery, MusicTrack } from './MusicProvider';

const artwork = [
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=85',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=85',
  'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&q=85',
  'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=85',
  'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=85',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=85',
];

// A public demo asset keeps the initial build playable. Production providers must
// return licensed URLs from their official APIs instead of embedding URLs here.
const demoStream = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
const tracks: MusicTrack[] = [
  { id: 't1', title: 'Midnight City Lights', artist: 'The Vibex Collective', album: 'Afterglow', artworkUrl: artwork[0], streamUrl: demoStream, duration: 269, source: 'mock', license: 'Demo audio' },
  { id: 't2', title: 'Vaanil Pogum', artist: 'Karthik Waves', album: 'Neela Iravu', artworkUrl: artwork[1], streamUrl: demoStream, duration: 232, source: 'mock', license: 'Demo audio' },
  { id: 't3', title: 'Ocean Drive', artist: 'Maya Sol', album: 'Solstice', artworkUrl: artwork[2], streamUrl: demoStream, duration: 211, source: 'mock', license: 'Demo audio' },
  { id: 't4', title: 'Nenjukkul Peidhidum', artist: 'A.R. Rahman Vibes', album: 'Tamil Essentials', artworkUrl: artwork[3], streamUrl: demoStream, duration: 258, source: 'mock', license: 'Demo audio' },
  { id: 't5', title: 'Golden Hour', artist: 'JVKE', album: 'this is what ____ feels like', artworkUrl: artwork[4], streamUrl: demoStream, duration: 209, source: 'mock', license: 'Demo audio' },
  { id: 't6', title: 'Kaatrin Mozhi', artist: 'Ananya Rao', album: 'Maalai Pozhudhu', artworkUrl: artwork[5], streamUrl: demoStream, duration: 245, source: 'mock', license: 'Demo audio' },
];

export class MockMusicProvider implements MusicProvider {
  readonly name = 'mock';
  async search({ query, limit = 20 }: MusicSearchQuery) {
    const normalized = query.trim().toLowerCase();
    return tracks.filter((track) => !normalized || [track.title, track.artist, track.album].some((value) => value?.toLowerCase().includes(normalized))).slice(0, limit);
  }
  async getFeatured() { return tracks; }
}

export const mockMusicProvider = new MockMusicProvider();
