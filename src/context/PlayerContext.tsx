import { useAudioPlayer, useAudioPlayerStatus, setAudioModeAsync } from 'expo-audio';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { MusicTrack } from '@/src/services/music';
import { useLibrary } from './AppContext';

type PlayerValue = { currentTrack: MusicTrack | null; isPlaying: boolean; position: number; duration: number; playTrack: (track: MusicTrack) => void; togglePlay: () => void; seekTo: (seconds: number) => void; next: () => void; previous: () => void; toggleLike: () => void };
const PlayerContext = createContext<PlayerValue | null>(null);
export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const { tracks, addRecent, likedIds, toggleLike } = useLibrary();
  const player = useAudioPlayer(null);
  const status = useAudioPlayerStatus(player);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);
  useEffect(() => { setAudioModeAsync({ playsInSilentMode: true, shouldPlayInBackground: true }).catch(() => undefined); }, []);
  const playTrack = (track: MusicTrack) => { setCurrentTrack(track); addRecent(track.id); if (track.streamUrl) { player.replace(track.streamUrl); player.play(); } };
  const currentIndex = currentTrack ? tracks.findIndex((track) => track.id === currentTrack.id) : -1;
  const value = useMemo(() => ({ currentTrack, isPlaying: status.playing, position: status.currentTime || 0, duration: status.duration || currentTrack?.duration || 0, playTrack, togglePlay: () => status.playing ? player.pause() : player.play(), seekTo: (seconds: number) => player.seekTo(seconds), next: () => playTrack(tracks[(currentIndex + 1) % tracks.length]), previous: () => playTrack(tracks[(currentIndex - 1 + tracks.length) % tracks.length]), toggleLike: () => currentTrack && toggleLike(currentTrack.id) }), [currentTrack, status.playing, status.currentTime, status.duration, likedIds, tracks, currentIndex]);
  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}
export function usePlayer() { const context = useContext(PlayerContext); if (!context) throw new Error('usePlayer must be inside PlayerProvider'); return context; }
