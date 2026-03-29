import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View, } from "react-native";

export function Header({ onLogout }: { onLogout: () => void }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={styles.avatarRing}>
          <LinearGradient colors={["#4F8EF7", "#FFD166"]} style={styles.avatar} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <Text style={styles.avatarText}>A</Text>
          </LinearGradient>
        </View>
        <View>
          <Text style={styles.headerGreeting}>Have a nice day 👋</Text>
          <Text style={styles.headerName}>Admin</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onLogout} style={styles.logoutBtn}>
        <Text style={styles.logoutIcon}>⎋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingTop: 50, paddingBottom: 12 },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatarRing: { width: 46, height: 46, borderRadius: 14, padding: 2, backgroundColor: "rgba(79,142,247,0.2)" },
  avatar: { flex: 1, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  avatarText: { fontSize: 18, fontWeight: "800", color: "#fff" },
  headerGreeting: { fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 1 },
  headerName: { fontSize: 17, fontWeight: "700", color: "#fff" },
  logoutBtn: { width: 38, height: 38, borderRadius: 10, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  logoutIcon: { fontSize: 18, color: "rgba(255,255,255,0.6)" },
})