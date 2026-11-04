import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MusicTrack } from '@/src/services/music';
import { colors, spacing } from '@/src/theme';
import { Artwork } from './Artwork';
import { Icon } from './Icon';
export function TrackRow({ track, onPress, trailing = 'more' }: { track: MusicTrack; onPress: () => void; trailing?: string }) { return <Pressable onPress={onPress} style={styles.row}><Artwork uri={track.artworkUrl} size={54} radius={12} /><View style={styles.info}><Text style={styles.title} numberOfLines={1}>{track.title}</Text><Text style={styles.artist} numberOfLines={1}>{track.artist}</Text></View><Icon name={trailing} size={20} color={colors.muted} /></Pressable>; }
const styles = StyleSheet.create({ row: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 12 }, info: { flex: 1 }, title: { color: colors.text, fontSize: 15, fontWeight: '700' }, artist: { color: colors.muted, fontSize: 13, marginTop: 4 }, });
