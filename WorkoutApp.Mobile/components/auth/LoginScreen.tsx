import { View, Button } from 'react-native';
import { useMutation } from '@apollo/client';
import { authLogin } from '../../behaviour/auth/queries';
import { AuthLoginData, AuthLoginVars } from '../../behaviour/auth/types';
import React from 'react';
import { TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { authActions } from '../../behaviour/auth/slice';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { DrawerNavigatorParams } from '../../types/navigation';

type FormValues = {
  email: string;
  password: string;
}

type Props = NativeStackScreenProps<DrawerNavigatorParams, 'DrawerLogin'>;

export const LoginScreen = ({navigation}: Props) => {
  const [login, {data}] = useMutation<AuthLoginData, AuthLoginVars>(authLogin);
  const dispatch = useDispatch();

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await login({variables: {input: values}});
      dispatch(authActions.login(res.data!.auth.login));
      navigation.navigate('DrawerWorkouts');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik<FormValues>
      initialValues={{email: '', password: ''}}
      onSubmit={onSubmit}
    >
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TextInput
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          <TextInput
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />
          <Button onPress={() => handleSubmit()} title="Submit" />
        </View>
      )}
    </Formik>
  );
};
