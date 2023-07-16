import { createStackNavigator } from '@react-navigation/stack';
import About from '../components/about/About';
import Home from '../components/home/Home';
import Contact from '../components/contact/Contact';
import { MainStackNavigatorParamList, ContactStackNavigatorParamList } from '../types/navigation';

const Stack = createStackNavigator<MainStackNavigatorParamList>();
const ContactStack = createStackNavigator<ContactStackNavigatorParamList>();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
}

const ContactStackNavigator = () => {
  return (
    <ContactStack.Navigator screenOptions={screenOptionStyle}>
      <ContactStack.Screen name="Contact" component={Contact} />
    </ContactStack.Navigator>
  );
}

export { MainStackNavigator, ContactStackNavigator };
