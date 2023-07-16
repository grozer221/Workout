import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { FAB } from 'react-native-paper';
import { useAppTheme } from '../../hooks/theme';

export const Exercises = () => {
  const theme = useAppTheme();

  return (
    <View style={styles.center}>
      <Text>This is the Exercises screen</Text>
      <FAB
        icon="plus"
        style={{...styles.fab, backgroundColor: theme.colors.secondary}}
        onPress={() => console.log('Pressed')}
      />
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

