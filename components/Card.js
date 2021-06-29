import React from 'react' 
// import {TouchableOpacity } from 'react-native-gesture-handler';
import { TouchableOpacity, StyleSheet, Dimensions, Text, View,  } from 'react-native';

const { width, height } = Dimensions.get('screen');

const Card = ({ title,  description, onPress }) => {
        <TouchableOpacity style = {styles.container} onPress = {onPress}>
                <Text>{title}</Text>
                <Text>{description}</Text>
        </TouchableOpacity>
};

const styles = StyleSheet.create({
    container: {
        width: width / 1.2,
        shadowColor: "#ccc",
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.9,
        marginVertical: 10,
        backgroundColor: "#fff",
        padding: 10,
        alignSelf: "center"
    }
});

export default Card ;