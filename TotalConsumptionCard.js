import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import {styles, normalize} from "../../../styles";
import Colors from 'SmartCrust/js/styles/Colors';
// Icons
import FIcons from 'react-native-vector-icons/Feather';


export class TotalConsumptionComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { darkMode, language, icon, value, title, unit } = this.props
        return(
            <View style={[]}>
                {/* <View style={[styles.row]}>
                    <Text style={[styles.fontWeight300, styles.medium24, styles.blue]}>
                        Total 
                    </Text>
                    <Text style={[styles.fontWeight100, styles.medium24]}>
                        {" Consumption"}
                    </Text>
                </View> */}
                <View style={[styles.row]}>
                    <Text style={[styles.fontWeight300, styles.fontSize13, styles.paddingRight14, darkMode ? styles.white : styles.black ]}>
                        {title}
                    </Text>
                     <FIcons name={icon} size={normalize(13)} color={Colors.blue}/>
                </View>
                <View style={[styles.row, styles.flexEndHorizontal, styles.paddingTop4]}>
                    <Text style={[styles.regularPlus, styles.blue, styles.paddingRight10, styles.fontWeight500, darkMode ? styles.white : styles.black ]}>
                        {value}
                    </Text>
                    <Text style={[styles.fontWeight300, styles.fontSize13, darkMode ? styles.white : styles.black , {paddingBottom: 1}]}>
                        {unit}
                    </Text>
                </View>
            </View>
        )
    }
}
