import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showToast } from '../../Utils/utils';
import { useNavigation } from '@react-navigation/native';


const EditTask = ({ route }) => {
    let navigation = useNavigation()
    const { task } = route.params;
    console.log(task)

    const [TaskName, setTaskName] = useState(task.TaskName)
    const [isImportant, setIsImportant] = useState(task.isImportant)


    // useEffect(() => {
    //     setTaskName(task.TaskName)
    // }, []);

    const EditTask = async () => {
        let obj = {
            "_id": task._id,
            "TaskName": TaskName,
            "isImportant": isImportant
        }

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

            navigation.goBack()
        } catch (e) {
            console.log(e)
        }


    }

    return (
        <SafeAreaView style={{ backgroundColor: '#ffffff', height: '100%' }}>
            <ScrollView>
                <View style={styles.mainContainer}>
                    <View style={styles.topStatusBar}>
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('FarmerToFarmer')}>
                            <Ionicons name="arrow-back" size={22} color="#585C60" />
                        </TouchableOpacity>
                        <Text style={styles.heading}>Edit Task</Text>
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
                        <TouchableOpacity style={styles.addButtonText} onPress={EditTask}>
                            <Text style={styles.buttontext}>Edit task</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
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
    }
})

export default EditTask
