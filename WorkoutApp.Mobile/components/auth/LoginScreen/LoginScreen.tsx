import { Text, View, Button } from 'react-native';
import { useMutation, useQuery } from '@apollo/client';
import { loginMutation, meQuery } from '../../../behaviour/auth/queries';
import React, { useEffect } from 'react';
import { loginData, meData } from '../../../behaviour/auth/types';
import { asyncStorageSetItem } from '../../../utils/asyncStorageUtils';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';

export const LoginScreen = () => {
  // const [login, {data}] = useMutation<loginData>(loginMutation);
  const {data} = useQuery<meData>(meQuery);

  // useEffect(() => {
  //   (async () => {
  //     const res = await login();
  //     await asyncStorageSetItem('AuthToken', res.data?.auth.login.token)
  //   })();
  // }, []);
  const user = data?.auth.me.user;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{user?.email} | {user?.firstName} {user?.lastName} | {data?.auth.me.token}</Text>
    </View>
  );
};
