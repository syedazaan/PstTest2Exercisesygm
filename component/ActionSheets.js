import React from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';

const { width, height } = Dimensions.get('screen');


const ActionSheets = ( props ) => {
        return (
                <View styles = {styles.container}>
                        <Text>Hello This is Action Sheets</Text>
            </View>
        );
};

const styles = StyleSheet.create({
        container: {
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: height / 3,
                height: height/2.4,
                width: width / 1.05,
                borderTopRightRadius: 40,
                marginHorizontal: 10,
        }
});

export default  ActionSheets ;