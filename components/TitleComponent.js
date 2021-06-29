import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import  { styles }  from "../styles.js/styles";
import Colors from "../styles.js/Colors";



export default class TitleComponent extends React.Component {
    render(){
        console.log("properties",this.props.name)
        const { name } = this.props

        return(
            <View style={[  styles.allCenter, styles.marginTop24, styles.marginBottom24, styles.borderColorGreen, styles.radius10,  styles.marginRight12, styles.border]}>
                <Text style = {[styles.fontSize17, styles.padding12,  styles.fontWeightBold,  ]}> { name } </Text>
            </View>
        )
    };
        
}