// rnfes = shortcut to create a functional component with styles and export
import {
    StyleSheet,
    TextInput,
    View,
    FlatList,
    Alert
} from 'react-native'
import React, { useState } from 'react'
import Fallback from '../Components/Fallback'
import Button from '../Components/Button'
import TodoItem from '../Components/TodoItem'
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodoScreen = () => {
    const getData = async () => {
        try {
            const currentTodoList = await AsyncStorage.getItem('todoList');
            if (currentTodoList !== null) {
                // We have data!!
                currentTodoList = JSON.parse(currentTodoList);
            }
        } catch (error) {
            // Error retrieving data
            console.log(error)
        }
    }

    const data = getData();

    // init local states
    const [todo, setTodo] = useState("")
    const [todoList, setTodoList] = useState(data)
    const [editedTodo, setEditedTodo] = useState(null)

    // handle when the "Add" button pressed
    const handleAddTodo = async () => {
        if (todo == "") {
            Alert.alert(
                "Error",
                "Todo can't be empty!"
            )
            return;
        }

        setTodoList([...todoList, { id: Date.now().toString(), title: todo }])

        try {
            await AsyncStorage.setItem('todoList', JSON.stringify(todoList));
        } catch (error) {
            console.log(error)
        }

        setTodo("")    }

    // handle when edit button pressed 
    const handleEdit = (item) => {
        setEditedTodo(item);
        setTodo(item.title)
    }

    // to save an updated todo
    const handleUpdateTodo = () => {
        const editedTodoList = todoList.map(item => {
            if (item.id === editedTodo.id) {
                return { ...item, title: todo }
            }
            return item;
        })

        setTodoList(editedTodoList)
        setEditedTodo(null)
        setTodo("")
    }

    // handle when delete button pressed
    const handleDelete = (id) => {
        const updatedTodoList = todoList.filter(todo => todo.id !== id)
        setTodoList(updatedTodoList);
    }

    const renderItem = ({ item }) => {
        return (
            <TodoItem
                item={item}
                handleEdit={handleEdit}
                handleDelete={handleDelete} />
        )
    }

    return (
        <View style={{ margin: 16 }}>
            <TextInput
                placeholder="Add a todo"
                style={
                    styles.textInput
                }
                value={todo}
                onChangeText={(userText) => setTodo(userText)}
            />

            {editedTodo ?
                (<Button title={"Save"} handleOnPress={handleUpdateTodo} />)
                : (<Button title={"Add"} handleOnPress={handleAddTodo} />)}

            {/* Render todo list */}
            <FlatList
                data={todoList}
                renderItem={renderItem}
            />
            {!todoList.length && <Fallback />}
        </View>
    )
}

export default TodoScreen

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        padding: 16,
        fontSize: 20
    },
})