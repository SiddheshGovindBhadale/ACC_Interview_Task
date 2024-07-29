import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AddTaskButton from '../Components/Home/AddTaskButton';
import { showToast } from '../Utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/dist/Feather';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    let navigation = useNavigation();
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        // Load tasks when component mounts
        const loadTasks = async () => {
            setIsLoading(true);
            try {
                const data = await AsyncStorage.getItem('Tasks');
                let tasks = data ? JSON.parse(data) : [];
                setTasks(tasks);
                setIsLoading(false);
            } catch (e) {
                console.log(e);
                showToast("Error Loading Tasks");
                setIsLoading(false);
            }
        };

        loadTasks();
    }, []);

    const deleteTask = async (id) => {
        setIsLoading(true);
        const newTasks = tasks.filter((t) => t._id !== id);
        try {
            await AsyncStorage.setItem("Tasks", JSON.stringify(newTasks));
            showToast("Task Deleted");
            setTasks(newTasks);
            setIsLoading(false);
        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            const data = await AsyncStorage.getItem('Tasks');
            let tasks = data ? JSON.parse(data) : [];
            setTasks(tasks);
        } catch (err) {
            console.log(err);
        } finally {
            setRefreshing(false);
        }
    };

    // Render Item
    const renderItem = ({ item }) => (
        <View style={styles.taskItem}>
            <View style={styles.left}>
                <Text style={styles.taskName}>{item.TaskName}</Text>
                <Text style={styles.taskImportance}>{item.isImportant ? "Important Task" : "Not Important"}</Text>
            </View>
            <View style={styles.right}>
                <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('EditTask', { task: item }) }}>
                    <Feather name='edit' size={23} color={'green'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => { deleteTask(item._id) }}>
                    <AntDesign name='delete' size={23} color={'red'} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ height: '100%', backgroundColor: '#ffffff' }}>
            {isLoading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#46c67c" />
                </View>
            ) : (
                <View>
                    <View style={styles.topStatusBar}>
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('FarmerToFarmer')}>
                            <FontAwesome name="tasks" size={22} color="#585C60" />
                        </TouchableOpacity>
                        <Text style={styles.heading}>Tasks</Text>
                    </View>
                    <View style={styles.tasksContainer}>
                        {tasks.length > 0 ? (
                            <FlatList
                                data={tasks}
                                keyExtractor={(task, index) => index.toString()}
                                renderItem={renderItem}
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                }
                            />
                        ) : (
                            <Text style={{ color: '#000000', textAlign: 'center' }}>No tasks scheduled!</Text>
                        )}
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    loader: {
        borderWidth: 1,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topStatusBar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        gap: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#ffffff'
    },
    backButton: {
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    heading: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '600'
    },
    tasksContainer: {
        padding: 16,
        // borderWidth:1,
        // borderColor:'red',
        paddingBottom:125
    },
    taskItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    taskName: {
        color: '#000000',
        fontSize: 15,
        fontWeight: '500',
        textTransform: 'capitalize'
    },
    taskImportance: {
        color: '#000000',
        fontSize: 12
    },
    right: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        paddingLeft: 10
    }
});
