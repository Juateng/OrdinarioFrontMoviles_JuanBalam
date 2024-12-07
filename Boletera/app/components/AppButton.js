import React from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import colors from '../config/colors';

function AppButton({text, color, onPress}) {
    return (
        <TouchableOpacity style={[styles.button, {backgroundColor: colors[color] }]} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: colors.primary,
        borderRadius: 25,
        alignItems: 'center',
        padding: 15,
        width: '100%',
        marginVertical:10,
    },
    text:{
        color: colors.black,
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
})

export default AppButton;