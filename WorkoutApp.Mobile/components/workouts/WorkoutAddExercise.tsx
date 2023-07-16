import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from 'react-native-paper';

export const WorkoutAddExercise = () => {
  return (
    <View style={styles.center}>
      <Text>This is the workout add Exercises screen</Text>
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

