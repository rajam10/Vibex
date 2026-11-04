import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';
import { useLibrary } from '@/src/context/AppContext';
import { usePlayer } from '@/src/context/PlayerContext';
import { Artwork } from '@/src/components/Artwork';
import { SectionHeader } from '@/src/components/SectionHeader';
import { TrackRow } from '@/src/components/TrackRow';

export default function HomeScreen() {
  const { tracks, recentIds } = useLibrary();
  const { playTrack } = usePlayer();
  const recent = recentIds.map((id) => tracks.find((track) => track.id === id)).filter(Boolean);
  return <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <View style={styles.header}><View><Text style={styles.eyebrow}>V I B E X</Text><Text style={styles.greeting}>Good evening, Rajab</Text></View><View style={styles.avatar}><Text style={styles.avatarText}>R</Text></View></View>
    <View style={styles.hero}><View><Text style={styles.heroEyebrow}>YOUR DAILY MIX</Text><Text style={styles.heroTitle}>Find your next{`\n`}favorite sound.</Text><Text style={styles.heroSub}>Curated for every version of you.</Text></View><View style={styles.heroArt}><Artwork uri={tracks[2]?.artworkUrl} size={100} radius={20} /></View></View>
    {recent.length > 0 && <><SectionHeader title="Recently played" action="See all" />{recent.slice(0, 3).map((track) => track && <TrackRow key={track.id} track={track} onPress={() => playTrack(track)} />)}</>}
    <SectionHeader title="Popular right now" action="See all" /><ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontal}>{tracks.slice(0, 4).map((track) => <View key={track.id} style={styles.card}><Artwork uri={track.artworkUrl} size={142} radius={18} /><Text style={styles.cardTitle} numberOfLines={1}>{track.title}</Text><Text style={styles.cardArtist} numberOfLines={1}>{track.artist}</Text></View>)}</ScrollView>
    <SectionHeader title="Tamil essentials" action="Explore" />{tracks.slice(1, 4).map((track) => <TrackRow key={track.id} track={track} onPress={() => playTrack(track)} />)}
    <SectionHeader title="Made for your night" /><View style={styles.playlist}><Artwork uri={tracks[4]?.artworkUrl} size={86} radius={15} /><View style={{ flex: 1, marginLeft: 14 }}><Text style={styles.playlistKicker}>VIBEX SELECTS</Text><Text style={styles.playlistTitle}>Late night frequencies</Text><Text style={styles.playlistMeta}>A little calm, a little electric.</Text></View></View>
  </ScrollView>;
}
const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: colors.background }, content: { padding: spacing.lg, paddingTop: 16, paddingBottom: 130 }, header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }, eyebrow: { color: colors.accentSoft, fontSize: 12, letterSpacing: 4, fontWeight: '900', marginBottom: 9 }, greeting: { color: colors.text, ...typography.display }, avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.surfaceElevated, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#42325A' }, avatarText: { color: colors.accentSoft, fontWeight: '800' }, hero: { backgroundColor: colors.surface, borderRadius: 24, padding: 20, minHeight: 170, marginBottom: 30, overflow: 'hidden', flexDirection: 'row', alignItems: 'center' }, heroEyebrow: { color: colors.cyan, letterSpacing: 1.8, fontSize: 10, fontWeight: '900', marginBottom: 10 }, heroTitle: { color: colors.text, fontSize: 25, lineHeight: 29, fontWeight: '900', letterSpacing: -0.7 }, heroSub: { color: colors.muted, marginTop: 12, fontSize: 12, fontWeight: '600' }, heroArt: { position: 'absolute', right: -15, bottom: -16, transform: [{ rotate: '14deg' }] }, horizontal: { marginHorizontal: -2, marginBottom: 30 }, card: { width: 142, marginRight: 16 }, cardTitle: { color: colors.text, marginTop: 10, fontWeight: '800', fontSize: 14 }, cardArtist: { color: colors.muted, marginTop: 4, fontSize: 12 }, playlist: { backgroundColor: colors.surface, borderRadius: 20, padding: 12, flexDirection: 'row', alignItems: 'center' }, playlistKicker: { color: colors.accentSoft, fontSize: 10, letterSpacing: 1.5, fontWeight: '900' }, playlistTitle: { color: colors.text, fontSize: 17, fontWeight: '800', marginTop: 6 }, playlistMeta: { color: colors.muted, fontSize: 12, marginTop: 5 } });
