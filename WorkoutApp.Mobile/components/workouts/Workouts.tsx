import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";

const Workouts = () => {
  return (
    <View style={styles.center}>
      <Text>This is the workouts screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default Workouts;
