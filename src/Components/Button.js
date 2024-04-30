import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = ({ title, handleOnPress }) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: 'black',
                padding: 16,
                borderRadius: 8,
                alignItems: 'center',
                marginTop: 24
            }}
            onPress={() => handleOnPress()}
        >
            <Text
                style={{
                    color: 'white',
                    fontSize: 24,
                    fontWeight: 'bold'
                }}
            >{title}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({})