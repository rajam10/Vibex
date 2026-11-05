import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors, spacing, typography } from '@/src/theme';
import { jamendoProvider, MusicTrack } from '@/src/services/music';
import { usePlayer } from '@/src/context/PlayerContext';
import { Icon } from '@/src/components/Icon';
import { TrackRow } from '@/src/components/TrackRow';

// Genre suggestion chips shown in the empty state
const GENRE_CHIPS = ['Pop', 'Rock', 'Electronic', 'Jazz', 'Classical', 'Chill'];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MusicTrack[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { playTrack } = usePlayer();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Clear any pending debounce when query changes
    if (debounceRef.current) clearTimeout(debounceRef.current);

    setError(null);

    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    // Debounce: wait 400 ms after the user stops typing before hitting the API
    debounceRef.current = setTimeout(async () => {
      try {
        const items = await jamendoProvider.search({ query, limit: 30 });
        setResults(items);
      } catch {
        setError('Could not reach Jamendo. Check your connection and try again.');
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  /** Tap a genre chip → fill the search box and trigger a search */
  const handleChip = (genre: string) => setQuery(genre);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.eyebrow}>DISCOVER</Text>
      <Text style={styles.title}>Search your sound</Text>

      {/* Search input */}
      <View style={styles.search}>
        <Icon name="search" size={20} color={colors.muted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Songs, artists, albums, genres…"
          placeholderTextColor={colors.subtle}
          style={styles.input}
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
        />
        {query.length > 0 && (
          <Text onPress={() => setQuery('')} style={styles.clear}>✕</Text>
        )}
      </View>

      {/* Empty state */}
      {query.length === 0 && (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>What are you in the mood for?</Text>
          <Text style={styles.emptySub}>
            Search Jamendo's library of 600,000+ free tracks.
          </Text>
          <View style={styles.pills}>
            {GENRE_CHIPS.map((genre) => (
              <Text key={genre} style={styles.pill} onPress={() => handleChip(genre)}>
                {genre}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Loading spinner */}
      {loading && (
        <ActivityIndicator color={colors.accentSoft} style={{ marginTop: 40 }} />
      )}

      {/* Error state */}
      {!loading && error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      {/* Results */}
      {!loading && !error && query.length > 0 && (
        <View style={{ marginTop: 28 }}>
          <Text style={styles.results}>{results.length} RESULTS FROM JAMENDO</Text>
          {results.length > 0 ? (
            results.map((track) => (
              <TrackRow
                key={track.id}
                track={track}
                onPress={() => playTrack(track)}
              />
            ))
          ) : (
            <Text style={styles.noResults}>
              No tracks found. Try a different search.
            </Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: 130 },
  eyebrow: {
    color: colors.cyan,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 2,
    marginTop: 12,
    marginBottom: 9,
  },
  title: { color: colors.text, ...typography.display, marginBottom: 24 },
  search: {
    height: 56,
    backgroundColor: colors.surface,
    borderRadius: 17,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  input: { color: colors.text, flex: 1, fontSize: 15, fontWeight: '600' },
  clear: { color: colors.muted, fontSize: 16, paddingHorizontal: 4 },
  empty: { alignItems: 'center', marginTop: 80 },
  emptyTitle: { color: colors.text, fontSize: 18, fontWeight: '800' },
  emptySub: { color: colors.muted, marginTop: 8, textAlign: 'center', lineHeight: 20 },
  pills: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 22, justifyContent: 'center' },
  pill: {
    color: colors.accentSoft,
    backgroundColor: colors.surfaceElevated,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    fontWeight: '700',
  },
  results: {
    color: colors.subtle,
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: '900',
    marginBottom: 18,
  },
  noResults: { color: colors.muted, textAlign: 'center', marginTop: 30 },
  errorText: { color: '#F87171', textAlign: 'center', marginTop: 40, lineHeight: 22 },
});
