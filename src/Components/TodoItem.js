import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IconButton } from 'react-native-paper'

const TodoItem = ({item, handleEdit, handleDelete}) => {
    return (
        <View
            style={{
                borderRadius: 8,
                borderWidth: 1,
                borderColor: 'black',
                paddingVertical: 10,
                paddingHorizontal: 16,
                marginTop: 16,
                backgroundColor: "grey",
                flexDirection: 'row',
                alignItems: 'center'
            }}
        >
            <Text
                style={{
                    color: "white",
                    fontSize: 20,
                    flex: 1
                    //If an element has flex: 1 , this means the size of all of the other elements will have the same width as their content, but the element with flex: 1 will have the remaining full space given to it
                }}
            >{item.title}</Text>

            <IconButton
                icon="pencil"
                iconColor='white'
                onPress={() => handleEdit(item)}
            />

            <IconButton
                icon="trash-can"
                iconColor='white'
                onPress={() => handleDelete(item.id)}
            />
        </View>
    )
}

export default TodoItem

const styles = StyleSheet.create({})