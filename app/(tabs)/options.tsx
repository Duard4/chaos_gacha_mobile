// import ParallaxScrollView from "@/components/ParallaxScrollView";
// import { ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";
// import { IconSymbol } from "@/components/ui/IconSymbol";
// import { Image } from "expo-image";
// import { StyleSheet } from "react-native";

// export default function ComingSoonScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
//       headerImage={
//         <Image
//           source={require("@/assets/images/stars-galaxy.jpg")}
//           style={styles.headerImage}
//         />
//       }
//     >
//       <ThemedView style={styles.container}>
//         <ThemedText type="title" style={styles.title}>
//           Coming Soon
//         </ThemedText>
//         <ThemedText style={styles.subtitle}>
//           We're working hard to bring you this feature
//         </ThemedText>

//         <ThemedView style={styles.card}>
//           <IconSymbol
//             name="hammer.fill"
//             size={48}
//             color="#FFA500"
//             style={styles.icon}
//           />
//           <ThemedText style={styles.cardText}>
//             This section is currently under development.
//           </ThemedText>
//           <ThemedText style={styles.cardText}>
//             Check back in a future update!
//           </ThemedText>
//         </ThemedView>

//         <ThemedView style={styles.tipContainer}>
//           <ThemedText type="defaultSemiBold" style={styles.tipTitle}>
//             In the meantime:
//           </ThemedText>
//           <ThemedText style={styles.tipText}>
//             • Explore other features of the app
//           </ThemedText>
//           <ThemedText style={styles.tipText}>
//             • Check our updates in Settings
//           </ThemedText>
//           <ThemedText style={styles.tipText}>
//             • Send us your feature suggestions
//           </ThemedText>
//         </ThemedView>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 20,
//     paddingBottom: 40,
//   },
//   headerImage: {
//     width: "100%",
//     height: "100%",
//     position: "absolute",
//   },
//   title: {
//     fontSize: 32,
//     marginBottom: 8,
//     textAlign: "center",
//   },
//   subtitle: {
//     fontSize: 18,
//     textAlign: "center",
//     marginBottom: 24,
//     opacity: 0.8,
//   },
//   card: {
//     backgroundColor: "rgba(255, 165, 0, 0.1)",
//     borderRadius: 16,
//     padding: 24,
//     alignItems: "center",
//     marginBottom: 32,
//     borderWidth: 1,
//     borderColor: "rgba(255, 165, 0, 0.3)",
//   },
//   icon: {
//     marginBottom: 16,
//   },
//   cardText: {
//     fontSize: 16,
//     textAlign: "center",
//     marginBottom: 8,
//   },
//   tipContainer: {
//     backgroundColor: "rgba(0, 122, 255, 0.1)",
//     borderRadius: 16,
//     padding: 20,
//     borderWidth: 1,
//     borderColor: "rgba(0, 122, 255, 0.3)",
//   },
//   tipTitle: {
//     fontSize: 18,
//     marginBottom: 12,
//     color: "#007AFF",
//   },
//   tipText: {
//     fontSize: 16,
//     marginBottom: 8,
//     marginLeft: 8,
//   },
// });
