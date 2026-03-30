import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SUBJECTS = [
  { name: "Data Structures", route: "/dashboard/ds" },
  { name: "DS Lab", route: "/dashboard/dslab" },
  { name: "PPDS", route: "/dashboard/ppds" },
  { name: "PPDS Lab", route: "/dashboard/ppdslab" },
];

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subjects</Text>

      {SUBJECTS.map((subject, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => router.push(subject.route as any)}
        >
          <Text style={styles.buttonText}>{subject.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0F1E",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 30,
    fontWeight: "700",
  },

  button: {
    width: "80%",
    backgroundColor: "#1E40AF",
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});