# ✨ Chaos Gacha Mobile

Welcome to **Chaos Gacha Mobile** – a playful, customizable gacha simulator built with [Expo](https://expo.dev) and React Native. Roll for randomized items, track your history, and tweak your luck with tickets and level configs!

---

## 🙏 Credits

- **Original Python Script & Data:**  
  Created by [Bronzdeck](https://github.com/Bronzdeck/ChaosGacha)  
  Support the author on [Patreon](https://www.patreon.com/BronzDeck)

---

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the app**
   ```bash
   npx expo start
   ```

3. **Open on your device**
   - Scan the QR code with [Expo Go](https://expo.dev/go)
   - Or launch in an [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/) / [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)

---

## 🎲 Features

- **Gacha Simulator:** Roll for random items with customizable rarity and categories.
- **History Tracking:** View your roll history and stats.
- **Tickets & Levels:** Use tickets to influence your luck, or fine-tune min/ave/max levels.
- **Parallax UI:** Enjoy a smooth, animated interface with themed visuals.
- **Cross-Platform:** Works on iOS, Android, and web.

---

## 🗂️ Project Structure

```
app/
  (tabs)/
    index.tsx           # Main gacha screen
    rollHistory.tsx     # Roll history & stats
    options.tsx         # (Coming soon)
components/
  gacha_interface/      # Gacha UI components
  ui/                   # Shared UI elements
constants/              # App constants & types
store/                  # Zustand store
utils/                  # Utility functions
assets/                 # Fonts & images
```

---

## 🛠️ Customization

- Edit gacha data in `data/` (e.g., `abilities.json`, `familiars.json`)
- Tweak UI in `components/`
- Update logic in `store/` and `utils/`

---

## 🧹 Reset the Project

Want a fresh start? Move the starter code to `app-example` and create a blank app:

```bash
npm run reset-project
```

---

## 📚 Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [File-based Routing](https://docs.expo.dev/router/introduction/)
- [React Native](https://reactnative.dev/)

---

## 💬 Community

- [Expo on GitHub](https://github.com/expo/expo)
- [Expo Discord](https://chat.expo.dev)

---

> Made with ❤️ using Expo & React Native.  
> Original idea and data by [Bronzdeck](https://github.com/Bronzdeck/ChaosGacha)
