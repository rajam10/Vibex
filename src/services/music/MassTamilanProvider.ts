import { MusicProvider, MusicSearchQuery, MusicTrack } from './MusicProvider';

/** Disabled until written permission and authorized integration details exist. */
export class MassTamilanProvider implements MusicProvider {
  readonly name = 'mass-tamilan-disabled';
  async search(_query: MusicSearchQuery): Promise<MusicTrack[]> { return []; }
  async getFeatured(): Promise<MusicTrack[]> { return []; }
}
