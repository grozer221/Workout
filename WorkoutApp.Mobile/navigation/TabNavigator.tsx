
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, ContactStackNavigator } from "./StackNavigator";
import { TabNavigatorParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="TabHome" component={MainStackNavigator} />
      <Tab.Screen name="TabContact" component={ContactStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
