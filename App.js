import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
import ActionSheet from './components/ActionSheet';
import TitleComponent from './components/TitleComponent';
import ModalTester from './components/ModalTester';


import { styles } from "./styles.js/styles";
import Colors from "./styles.js/Colors";

import Icon from 'react-native-vector-icons/FontAwesome';
import Iconf from 'react-native-vector-icons/Feather';
import Icona from 'react-native-vector-icons/AntDesign';
import Iconfa from 'react-native-vector-icons/FontAwesome5';
import Iconi from 'react-native-vector-icons/Ionicons';
import Iconm from 'react-native-vector-icons/MaterialIcons';
import Iconen from 'react-native-vector-icons/Entypo';
import Icono from 'react-native-vector-icons/Octicons';
// import Iconmci from 'react-native-vector-icons/MaterialICommunityIcons';

const myIcon = <Icon name="search" size={20} color="black" />;
const myIcon6 = <Iconm name="facebook" size={20} color="rgb(36,107,253)" />;
const myIcon1 = <Icona name="delete" size={25} color="gray" />;
const myIcon2 = <Icona name="left" size={25} color="gray" />;
const myIcon3 = <Iconfa name="scroll" size={22} color="gray" />;
const myIcon4 = <Iconi name="chatbubble-ellipses-outline" size={25} color="gray" />;
const myIcon5 = <Icona name="plussquare" size={45} color="#55C7C8" />;
// const myIcon7 = <Iconfb name="facebook" size={25} color="grey" />;
const myIcon8 = <Iconen name="chevron-left" size={25} color="black" />;
const myIcon12 = <Icono name = "primitive-dot" size = {15}  color="rgb(121,132,211)" />;
const myIcon13 = <Icono name = "primitive-dot" size = {12}  color="#EFB222" />;
const myIcon14 = <Icono name = "primitive-dot" size = {12}  color="lightgray" />;
const myIcon9 =   <Iconen name = "dots-three-horizontal" size = {25}  color="grey" />;
const myIcon10 =   <Iconen name = "dots-three-vertical" size = {25}  color="grey" />;
const myIcon15 = <Icono name = "primitive-dot" size = {10}  color="#EFB222" />;
const myIcon16 = <Icono name = "primitive-dot" size = {10}  color="lightgray" />;


const { width, height } = Dimensions.get('screen');

const App = ( ) => {
        return (
                <View style = {{width, height }}>

                          {/* Header_Block */}
                          <View  style={[styles.flexQuarterToOne,  styles.row, styles.Margin20, ]}>
                                <View style = {[styles.flexOne, styles.Margin10,]}>
                                        <View style = {[styles.flexOne, styles.radius10, styles.bgGreyIcon, styles.allCenter, styles.marginTop10, styles.marginBottom10, ]}>
                                                <ModalTester 
                                                        onPress={console.log("value", this)}
                                                />
                                                {myIcon8}
                                        </View>
                                </View>
                                <View style = {[styles.flexFive, styles.allCenter,]}>
                                        <Text style = {[styles.fontSize15, styles.fontWeightBold ]}>NEW WORKOUT</Text>
                                </View>
                                <View style = {[styles.flexOne, styles.Margin10,   ]}>
                                           <View style = {[styles.flexOne, styles.allCenter, styles.radius10, styles.bgColorYellow, styles.marginTop10, styles.marginBottom10,]}>{myIcon}</View>
                                </View>
                        </View>

                                                {/* Middle_Content_Block */}
                                                <View style={[styles.flexFive, styles.bgContentGrey,  styles.borderTopRadius60,]}>

<View style = {[styles.flexOne, styles.marginLeft16, styles.marginRight16, styles.row,]}>
        <View style = {[styles.flexFive, styles.justifyContentCenter,]}>
                <Text style = {[styles.fontSize23,  styles.fontWeightBold, ]}>Exercices Library</Text>
        </View>
        <View style = {[styles.flexOne, styles.allCenter, ]}>{myIcon9}</View>
</View>

<ScrollView horizontal style={[  styles.height5, styles.marginLeft16, ]}>
        <TitleComponent name= "ABS"/>
        <TitleComponent  name = "BICEPS"/>
        <TitleComponent  name = "CHEST" />
        <TitleComponent  name = "FOREARM"/>
        <TitleComponent  name = "PUSHUPS"/>
</ScrollView>



<View style={[styles.flexFive,  styles.marginLeft16, styles.marginRight16, ]}>
         
         {/* 1_Row */}
        <View style= {[styles.flexOne,  styles.marginBottom8, styles.row, ]}>
                
                 {/* Image */}
                 <View style ={[styles.flexOneAndHalf, styles.allCenter, ]}>
                        <Image         
                                style={{width:120, height:65,  borderRadius:15 }}
                                source={require("./assets/images/workout.jpg")}
                        />
                 </View>
    
                 {/* Title */}
                <View style = {[styles.flexOneAndHalf,]}>
                        <View style = {[styles. flexOne, styles.marginTop18, styles.justifyContentCenter, ]}>
                                <Text style = {[styles.fontSize17, styles.fontWeightBold,  styles.paddingLeft10]}>Bent Raise</Text>
                        </View>
                        <View style = {[styles. flexOne, styles.marginBottom16,  styles.justifyContentCenter,]}>
                                <Text style = {[styles.fontSize15, styles.fontWeightBold, styles.greyDark, styles.paddingLeft10]}>LEVEL  {myIcon13} {myIcon13} {myIcon14}</Text>
                        </View>
                </View>
    
                {/* Icon */}
                 <View style = {[styles.flexQuarterToOne, styles.allCenter, ]}>{myIcon5}</View>
       
        </View>

        {/* 2_Row */}
        <View style= {[styles.flexOne, styles.row, styles.marginTop10, styles.marginBottom10,]}>
                
                 {/* Image */}
                 <View style ={[styles.flexOneAndHalf, styles.allCenter,]}>
                        <Image         
                                style={{width:120, height:65,  borderRadius:15 }}
                                source={require("./assets/images/workout.jpg")}
                        />
                 </View>
    
                 {/* Title */}
                <View style = {[styles.flexOneAndHalf, ]}>
                        <View style = {[styles. flexOne,]}>
                                <View style = {[styles. flexOne, styles.marginTop18, styles.justifyContentCenter,]}>
                                        <Text style = {[styles.fontSize17, styles.fontWeightBold, styles.paddingLeft10]}>Deltoid Raise</Text>
                                </View>
                                
                                <View style = {[styles. flexOne, styles.marginBottom16,  styles.justifyContentCenter, ]}>
                                        <Text style = {[styles.fontSize15, styles.fontWeightBold, styles.greyDark, styles.paddingLeft10]}>LEVEL  {myIcon13} {myIcon13} {myIcon14}</Text>
                                </View> 
                        </View>
                </View>
    
                {/* Icon */}
                 <View style = {[styles.flexQuarterToOne, styles.allCenter, ]}>{myIcon5}</View>
       
        </View>

        {/* 3_Row */}
        <View style= {[styles.flexOne, styles.marginTop10, styles.marginBottom16, styles.row, styles.border]}>
                
                {/* Image */}
                <View style ={[styles.flexOneAndHalf, styles.allCenter,]}>
                        <Image         
                                style={{width:120, height:65,  borderRadius:15 }}
                                source={require("./assets/images/workout.jpg")}
                        />
                </View>
   
                {/* Title */}
               <View style = {[styles.flexOneAndHalf, ]}>
                        <View style = {[styles. flexOne, styles.justifyContentCenter,]}>
                                <Text style = {[styles.fontSize17, styles.fontWeightBold, styles.paddingLeft10]}>Shoulder Raise</Text>
                        </View>
                        <View style = {[styles. flexOne,  styles.justifyContentCenter,]}>
                                <Text style = {[styles.fontSize15, styles.fontWeightBold, styles.greyDark, styles.paddingLeft10]}>LEVEL  {myIcon13} {myIcon13} {myIcon14}</Text>
                        </View>
               </View>
   
               {/* Icon */}
                <View style = {[styles.flexQuarterToOne, styles.allCenter, ]}>{myIcon5}</View>
      
       </View>


</View>

</View>

                        <TouchableOpacity 
                        onPress={()=>console.log("value7891" )}
                        style={styles1.container }>
                                <Text>Hello And Welcome!</Text>
                        </TouchableOpacity>
                        <ActionSheet />
                </View>
        );
};

const styles1 = StyleSheet.create({
        container: {
                backgroundColor: '#f0f0f0',
                flex:1,
                justifyContent: "center",
                alignItems: "center",
        }
});

export default App;