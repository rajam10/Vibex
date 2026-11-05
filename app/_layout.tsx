import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { jamendoProvider } from '@/src/services/music';
import { LibraryProvider } from '@/src/context/AppContext';
import { PlayerProvider } from '@/src/context/PlayerContext';
import { colors } from '@/src/theme';

export default function RootLayout() {
  const [tracks, setTracks] = React.useState<Awaited<ReturnType<typeof jamendoProvider.getFeatured>>>([]);

  React.useEffect(() => {
    jamendoProvider.getFeatured().then(setTracks).catch(() => {
      // silently fall through — LibraryProvider handles an empty array gracefully
    });
  }, []);

  return (
    <SafeAreaProvider>
      <LibraryProvider tracks={tracks}>
        <PlayerProvider>
          <StatusBar style="light" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.background },
            }}
          />
        </PlayerProvider>
      </LibraryProvider>
    </SafeAreaProvider>
  );
}
