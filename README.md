# Vibex

Vibex is a dark, premium React Native music player built with Expo, Expo Router, TypeScript, Expo Audio, AsyncStorage, Reanimated-ready navigation, and SVG icons.

## Run it

```bash
npm install
npx expo start
```

Then press `a` for an Android emulator or scan the QR code with Expo Go. `npm run typecheck` checks TypeScript.

## Architecture

- `app/` contains Expo Router screens, tabs, and the full-screen player.
- `src/components/` contains reusable artwork, row, icon, section, and mini-player UI.
- `src/context/` owns playback and locally persisted library state.
- `src/services/music/` contains the normalized provider interface, mock provider, Jamendo integration boundary, and disabled MassTamilan boundary.

The initial catalog uses realistic placeholder metadata and a public demo stream so playback can be exercised. Replace it with official, licensed provider responses before shipping. The Jamendo and MassTamilan classes intentionally do not invent endpoints or bypass access controls.
