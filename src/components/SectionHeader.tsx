import React from 'react';
import { Text, View } from 'react-native';
import { colors, typography } from '@/src/theme';
export function SectionHeader({ title, action }: { title: string; action?: string }) { return <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}><Text style={[typography.title, { color: colors.text }]}>{title}</Text>{action && <Text style={{ color: colors.accentSoft, fontSize: 13, fontWeight: '700' }}>{action}</Text>}</View>; }
