import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Screens/Home';
import BottomNavigation from './src/Navigation/BottomNavigation';
import Task from './src/Screens/Task';
import Menu from './src/Screens/Menu';
import Addtask from './src/Components/Home/Addtask';
import EditTask from './src/Components/Home/EditTask';



const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BottomNavigation" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Task" component={Task} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Addtask" component={Addtask} />
        <Stack.Screen name="EditTask" component={EditTask} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})

//screenOptions={{ headerShown: false }}