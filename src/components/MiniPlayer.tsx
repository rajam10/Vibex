import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/src/theme';
import { usePlayer } from '@/src/context/PlayerContext';
import { Artwork } from './Artwork';
import { Icon } from './Icon';
export function MiniPlayer() { const router = useRouter(); const { currentTrack, isPlaying, togglePlay } = usePlayer(); if (!currentTrack) return null; return <Pressable onPress={() => router.push('/player')} style={styles.bar}><Artwork uri={currentTrack.artworkUrl} size={46} radius={10} /><View style={styles.info}><Text style={styles.title} numberOfLines={1}>{currentTrack.title}</Text><Text style={styles.artist}>{currentTrack.artist}</Text></View><Pressable onPress={togglePlay} hitSlop={10}><Icon name={isPlaying ? 'pause' : 'play'} size={23} /></Pressable></Pressable>; }
const styles = StyleSheet.create({ bar: { position: 'absolute', bottom: 78, left: 12, right: 12, height: 64, borderRadius: 18, backgroundColor: '#242133', flexDirection: 'row', alignItems: 'center', padding: 9, gap: 10, borderWidth: 1, borderColor: '#3B3150' }, info: { flex: 1 }, title: { color: colors.text, fontWeight: '800', fontSize: 13 }, artist: { color: colors.muted, fontSize: 11, marginTop: 3 } });
