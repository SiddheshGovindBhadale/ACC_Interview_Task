import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { editTask, showToast } from '../../Utils/utils';
import Feather from 'react-native-vector-icons/dist/Feather';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';

const Addtask = () => {
    const [TaskName, setTaskName] = useState('')
    const [isImportant, setIsImportant] = useState(false)
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [check, setCheck] = useState(true);
    const [EditData, setEditDatas] = useState({});


    // loadData 
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


    const addTask = async () => {
        let obj = {
            "_id": Date.now().toString(),
            "TaskName": TaskName,
            "isImportant": isImportant
        }

        try {
            if (TaskName !== '') {
                let Tasks = await AsyncStorage.getItem("Tasks")

                if (Tasks == null) {
                    Tasks = []
                } else {
                    Tasks = JSON.parse(Tasks)
                }

                Tasks.push(obj)

                await AsyncStorage.setItem("Tasks", JSON.stringify(Tasks))
                setTasks(Tasks);
                setTaskName('')
                setIsImportant(false)
                
            }else{
                showToast("Fill Details")
            }
        } catch (e) {
            console.log(e)
        }
    }




    // editTask
    // SetEdit data 
    const setEditData = (task) => {
        console.log(task)
        setTaskName(task.TaskName)
        setIsImportant(task.isImportant)
        setEditDatas(task)
        setCheck(false)
    }

    const EditTask = async (task) => {
        let obj = {
            "_id": task._id,
            "TaskName": TaskName,
            "isImportant": isImportant
        }

        setTaskName(task.TaskName)
        setIsImportant(task.isImportant)

        try {
            let Tasks = await AsyncStorage.getItem("Tasks")

            if (Tasks == null) {
                Tasks = []
            } else {
                Tasks = JSON.parse(Tasks)
            }

            const newTasks = Tasks.map((t) =>
                t._id === task._id ? { _id: t.id, TaskName: TaskName, isImportant: isImportant } : t
            );

            await AsyncStorage.setItem("Tasks", JSON.stringify(newTasks))
            showToast("Task Updated")
            setTasks(newTasks);
            setTaskName('')
            setIsImportant(false)
            setEditDatas({})
            setCheck(true)
        } catch (e) {
            console.log(e)
        }


    }

    // Delete Task
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
                <TouchableOpacity style={styles.button} onPress={() => { setEditData(item) }}>
                    <Feather name='edit' size={23} color={'green'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => { deleteTask(item._id) }}>
                    <AntDesign name='delete' size={23} color={'red'} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{
            height: '100%', backgroundColor: '#ffffff', paddingBottom: 230
        }}>
            {isLoading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#46c67c" />
                </View>
            ) : (
                <View style={styles.mainContainer}>
                    <View style={styles.topStatusBar}>
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('FarmerToFarmer')}>
                            <Ionicons name="arrow-back" size={22} color="#585C60" />
                        </TouchableOpacity>
                        <Text style={styles.heading}>Add Task</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder='Task'
                            placeholderTextColor={"#828282"}
                            value={TaskName}
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={setTaskName}
                        />
                        <View style={styles.checkBoxContainer}>
                            <Text style={styles.checkBoxText}>Important</Text>
                            <CheckBox
                                disabled={false}
                                value={isImportant}
                                onValueChange={(newValue) => setIsImportant(newValue)}
                                tintColors={{ true: '#F15927', false: 'black' }}
                            />
                        </View>
                        {check ? (
                            <TouchableOpacity style={styles.addButtonText} onPress={addTask}>
                                <Text style={styles.buttontext}>Add task</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={styles.addButtonText} onPress={() => { EditTask(EditData) }}>
                                <Text style={styles.buttontext}>Edit task</Text>
                            </TouchableOpacity>
                        )}

                    </View>



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
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        // borderWidth:1,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    heading: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '600'
    },
    formContainer: {
        paddingHorizontal: 15
    },
    input: {
        borderWidth: 1,
        borderRadius: 7,
        paddingHorizontal: 17,
        marginBottom: 10,
        color: '#000000'
    },
    addButtonText: {
        borderWidth: 1,
        borderRadius: 7,
        height: 40,
        backgroundColor: '#0A091E',
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkBoxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30
    },
    checkBoxText: {
        color: '#000000',
        fontSize: 15,
        fontWeight: '500'
    },
    checkBox: {
        color: '#000000'
    },
    buttontext: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600'
    },



    tasksContainer: {
        padding: 16,
    },
    taskItem: {
        padding: 16,
        marginHorizontal: 15,
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
    },

    DataContainer: {
        borderWidth: 1
    }
})

export default Addtask
