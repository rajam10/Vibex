import { MusicProvider, MusicSearchQuery, MusicTrack } from './MusicProvider';

/** Placeholder for the official Jamendo API integration. It intentionally does not
 * invent endpoints or ship a client secret; use a public client id configured at
 * build time only after reviewing Jamendo's current API and license requirements. */
export class JamendoProvider implements MusicProvider {
  readonly name = 'jamendo';
  async search(_query: MusicSearchQuery): Promise<MusicTrack[]> { return []; }
  async getFeatured(): Promise<MusicTrack[]> { return []; }
}
