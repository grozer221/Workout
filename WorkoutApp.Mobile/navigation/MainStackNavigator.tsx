import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../components/home/Home';
import About from '../components/about/About';
import { MainStackNavigatorParamList, ContactStackNavigatorParamList } from '../types/navigation';
import Contact from '../components/contact/Contact';

const MainStack = createStackNavigator<MainStackNavigatorParamList>();
const ContactStack = createStackNavigator<ContactStackNavigatorParamList>();


const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

export const MainStackNavigator = () => {
  return (
    <MainStack.Navigator screenOptions={screenOptionStyle}>
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen name="About" component={About} />
    </MainStack.Navigator>
  );
}

export const ContactStackNavigator = () => {
  return (
    <ContactStack.Navigator screenOptions={screenOptionStyle}>
      <ContactStack.Screen name="Contact" component={Contact} />
    </ContactStack.Navigator>
  );
}
