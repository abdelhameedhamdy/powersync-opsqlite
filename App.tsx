import { StyleSheet, Text, View } from "react-native";

import { useEffect } from "react";
import { useSystem } from "./lib/powersync/system";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const system = useSystem();
  const abortController = new AbortController();
  useEffect(() => {
    system.init();
  }, []);

  useEffect(() => {
    system.powersync.watch(
      "SELECT id, track from tracks",
      [],
      { onResult: (result) => console.log(result.rows) },
      { signal: abortController.signal }
    );

    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
