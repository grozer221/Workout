import { Text, View, Button } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { RootStackParamList, useAppTheme } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({navigation }: Props) => {
  const theme = useAppTheme();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{color: theme.colors.primary}}>Home Screen</Text>
      <Text style={{color: theme.colors.secondary}}>Home Screen</Text>
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};
