import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/dist/Feather';
import { useNavigation } from '@react-navigation/native';

const AddTaskButton = () => {
    let navigation = useNavigation()

    return (
        <TouchableOpacity style={styles.AddTaskButton} onPress={() => {navigation.navigate('Addtask')}}>
            <Text style={styles.AddTaskButtonText}>Add task</Text>
            <Feather name='plus-square' size={22} color={'#000000'} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    AddTaskButton: {
        borderWidth: 1,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        width:150,
        paddingVertical:15,
        borderRadius:7,
    },
    AddTaskButtonText:{
        color:'#000000',
        fontSize:16,
        paddingRight:10,
        fontWeight:'600'
    }
})

export default AddTaskButton
