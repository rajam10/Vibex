import Constants from 'expo-constants';
import { MusicProvider, MusicSearchQuery, MusicTrack } from './MusicProvider';

const BASE_URL = 'https://api.jamendo.com/v3.0';

// client_id is stored in app.json → extra → jamendoClientId
const CLIENT_ID: string =
  (Constants.expoConfig?.extra?.jamendoClientId as string | undefined) ?? '';

// Shape of a single track object returned by GET /v3.0/tracks/
interface JamendoTrack {
  id: string;
  name: string;
  artist_name: string;
  album_name?: string;
  album_image?: string;
  image?: string;
  audio: string;           // streaming URL (mp3, 96 kbps by default)
  audiodownload?: string;
  duration: number;        // seconds
  license_ccurl?: string;
  shareurl?: string;
}

interface JamendoResponse {
  headers: { status: string; code: number; error_message: string };
  results: JamendoTrack[];
}

/** Map a raw Jamendo track object to our internal MusicTrack type. */
function toMusicTrack(raw: JamendoTrack): MusicTrack {
  return {
    id: `jamendo-${raw.id}`,
    title: raw.name,
    artist: raw.artist_name,
    album: raw.album_name || undefined,
    // prefer album_image; fall back to the track-level image field
    artworkUrl: raw.album_image || raw.image || undefined,
    streamUrl: raw.audio || undefined,
    duration: raw.duration,
    source: 'jamendo',
    license: raw.license_ccurl
      ? `Creative Commons — ${raw.license_ccurl}`
      : 'Creative Commons',
    attribution: raw.artist_name,
  };
}

/** Build a full Jamendo API URL with common defaults applied. */
function buildUrl(endpoint: string, params: Record<string, string>): string {
  const qs = new URLSearchParams({
    client_id: CLIENT_ID,
    format: 'json',
    audioformat: 'mp32',  // VBR good-quality MP3 stream
    imagesize: '500',
    ...params,
  });
  return `${BASE_URL}${endpoint}?${qs.toString()}`;
}

/** Fetch JSON from Jamendo, throwing on network or API-level errors. */
async function jamendoFetch(url: string): Promise<JamendoTrack[]> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Jamendo HTTP ${response.status}: ${response.statusText}`);
  }
  const json: JamendoResponse = await response.json();
  if (json.headers.code !== 0) {
    throw new Error(`Jamendo API error ${json.headers.code}: ${json.headers.error_message}`);
  }
  return json.results;
}

export class JamendoProvider implements MusicProvider {
  readonly name = 'jamendo';

  /**
   * Search tracks by free-text query.
   * Uses Jamendo's `search` parameter which covers track name, artist, album
   * and tags — giving the most natural search experience.
   */
  async search({ query, limit = 20 }: MusicSearchQuery): Promise<MusicTrack[]> {
    if (!CLIENT_ID) {
      console.warn('[JamendoProvider] client_id is not configured.');
      return [];
    }

    const trimmed = query.trim();

    // When query is empty return popular featured tracks as default state
    if (!trimmed) {
      return this.getFeatured(limit);
    }

    const url = buildUrl('/tracks/', {
      search: trimmed,
      limit: String(limit),
      order: 'relevance',
      // include both album tracks and singles
      type: 'albumtrack single',
    });

    try {
      const raw = await jamendoFetch(url);
      return raw.map(toMusicTrack);
    } catch (err) {
      console.error('[JamendoProvider] search failed:', err);
      return [];
    }
  }

  /**
   * Fetch featured / popular tracks for the home screen.
   * Orders by weekly popularity and restricts to Jamendo-curated picks.
   */
  async getFeatured(limit = 20): Promise<MusicTrack[]> {
    if (!CLIENT_ID) {
      console.warn('[JamendoProvider] client_id is not configured.');
      return [];
    }

    const url = buildUrl('/tracks/', {
      limit: String(limit),
      order: 'popularity_week',
      featured: '1',
      groupby: 'artist_id',
    });

    try {
      const raw = await jamendoFetch(url);
      return raw.map(toMusicTrack);
    } catch (err) {
      console.error('[JamendoProvider] getFeatured failed:', err);
      return [];
    }
  }
}

export const jamendoProvider = new JamendoProvider();
