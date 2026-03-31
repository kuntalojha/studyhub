import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Footer } from "../page_layout/Footer";
import { Header } from "../page_layout/Header";


export default function SubjectsLayout() {
  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.content}>
        <Slot />
      </View>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0F1E",
  },
  content: {
    flex: 1,
  },
});