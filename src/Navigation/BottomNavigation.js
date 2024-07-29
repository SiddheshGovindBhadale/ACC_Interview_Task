import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Home from '../Screens/Home';
import Task from '../Screens/Task';
import Menu from '../Screens/Menu';
import Addtask from '../Components/Home/Addtask';

const BottomNavigation = () => {
    const Tab = createBottomTabNavigator();

    const screenOptions = () => ({
        tabBarStyle: [
            {
                display: 'flex',
                paddingTop: 9,
                paddingBottom: 9,
                borderTopWidth: 0,
                height: 58,
                paddingHorizontal: 5,
                backgroundColor: '#0A091E'
            },
            null,
        ],
        // tabBarShowLabel: false,
        tabBarInactiveTintColor: '#8E8E8E',
        tabBarActiveTintColor: '#6156E2',
    });

    return (
        <SafeAreaView style={{height:'100%'}}>
            <Tab.Navigator
                screenOptions={screenOptions}
            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ size, color }) => (
                            <AntDesign name='home' size={size} color={color} />
                        )
                    }}
                />
                <Tab.Screen
                    name="Add"
                    component={Addtask}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ size, color }) => (
                            <AntDesign name="plussquare" size={size} color={color} />
                        )
                    }}
                />
                <Tab.Screen
                    name="Menu"
                    component={Menu}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ size, color }) => (
                            <AntDesign name='user' size={size} color={color} />
                        )
                    }}
                />
            </Tab.Navigator>
        </SafeAreaView>
    )
}

export default BottomNavigation

const styles = StyleSheet.create({})