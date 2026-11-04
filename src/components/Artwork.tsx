import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { colors } from '@/src/theme';
export function Artwork({ uri, size = 120, radius = 18 }: { uri?: string; size?: number; radius?: number }) { return <Animated.View entering={FadeIn.duration(350)} style={[styles.wrap, { width: size, height: size, borderRadius: radius }]}><Image source={{ uri }} style={{ width: size, height: size, borderRadius: radius }} /></Animated.View>; }
const styles = StyleSheet.create({ wrap: { backgroundColor: colors.surfaceElevated, overflow: 'hidden' } });
