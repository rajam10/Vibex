import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { colors } from '@/src/theme';
import { Icon } from '@/src/components/Icon';
import { MiniPlayer } from '@/src/components/MiniPlayer';

export default function TabsLayout() {
  return <View style={{ flex: 1, backgroundColor: colors.background }}><Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.text, tabBarInactiveTintColor: colors.subtle, tabBarStyle: { backgroundColor: colors.background, borderTopColor: colors.divider, height: 74, paddingTop: 9 }, tabBarLabelStyle: { fontSize: 11, fontWeight: '700', marginBottom: 9 }, tabBarIconStyle: { marginTop: 4 } }}><Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color }) => <Icon name="home" size={22} color={color} /> }} /><Tabs.Screen name="search" options={{ title: 'Search', tabBarIcon: ({ color }) => <Icon name="search" size={22} color={color} /> }} /><Tabs.Screen name="library" options={{ title: 'Library', tabBarIcon: ({ color }) => <Icon name="library" size={22} color={color} /> }} /></Tabs><MiniPlayer /></View>;
}
