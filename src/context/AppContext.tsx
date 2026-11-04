import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { MusicTrack } from '@/src/services/music';

type Playlist = { id: string; name: string; trackIds: string[] };
type AppContextValue = { likedIds: string[]; recentIds: string[]; playlists: Playlist[]; toggleLike: (id: string) => void; addRecent: (id: string) => void; createPlaylist: (name: string) => void; isReady: boolean; tracks: MusicTrack[] };
const STORAGE_KEY = '@vibex/library';
const LibraryContext = createContext<AppContextValue | null>(null);

export function LibraryProvider({ children, tracks }: { children: React.ReactNode; tracks: MusicTrack[] }) {
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isReady, setReady] = useState(false);

  useEffect(() => { AsyncStorage.getItem(STORAGE_KEY).then((stored) => { if (stored) { const value = JSON.parse(stored); setLikedIds(value.likedIds ?? []); setRecentIds(value.recentIds ?? []); setPlaylists(value.playlists ?? []); } setReady(true); }).catch(() => setReady(true)); }, []);
  useEffect(() => { if (isReady) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ likedIds, recentIds, playlists })); }, [likedIds, recentIds, playlists, isReady]);
  const value = useMemo(() => ({ likedIds, recentIds, playlists, tracks, isReady, toggleLike: (id: string) => setLikedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [id, ...current]), addRecent: (id: string) => setRecentIds((current) => [id, ...current.filter((item) => item !== id)].slice(0, 20)), createPlaylist: (name: string) => setPlaylists((current) => [...current, { id: `playlist-${Date.now()}`, name, trackIds: [] }]) }), [likedIds, recentIds, playlists, tracks, isReady]);
  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}
export function useLibrary() { const context = useContext(LibraryContext); if (!context) throw new Error('useLibrary must be inside LibraryProvider'); return context; }
