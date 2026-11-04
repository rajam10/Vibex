import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { mockMusicProvider } from '@/src/services/music';
import { LibraryProvider } from '@/src/context/AppContext';
import { PlayerProvider } from '@/src/context/PlayerContext';
import { colors } from '@/src/theme';

export default function RootLayout() {
  const [tracks, setTracks] = React.useState<Awaited<ReturnType<typeof mockMusicProvider.getFeatured>>>([]);
  React.useEffect(() => { mockMusicProvider.getFeatured().then(setTracks); }, []);
  return <SafeAreaProvider><LibraryProvider tracks={tracks}><PlayerProvider><StatusBar style="light" /><Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }} /></PlayerProvider></LibraryProvider></SafeAreaProvider>;
}
