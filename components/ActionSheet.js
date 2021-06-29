import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image, Dimensions, Animated, ScrollView, LogBox } from 'react-native';

import { styles } from "../styles.js/styles";
import Colors from "../styles.js/Colors";


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

const ActionSheet = ( props ) => {
        const [ alignment ] = useState(new Animated.Value(0) );
        
        const bringUpActionSheet = ( ) => {
                Animated.timing(alignment, {
                        toValue: 1.7,
                        duration: 500
                }).start( );
        };

        const hideTheActionSheet = ( ) => {
                Animated.timing(alignment, {
                        toValue: 0,
                        duration: 500
                }).start( );
        };

        const actionSheetIntropolate = alignment.interpolate({
                inputRange: [0,1],
                outputRange: [-height / 2.4 + 230, 0]   
                // outputRange: [-height/ 2.4 + 50, 0]
        });

        const actionSheetStyle = {
              bottom: actionSheetIntropolate
        };

        const gestureHandler = ( e )   => {
                console.log("value2",e.nativeEvent.contentOffset.y)
                if (e.nativeEvent.contentOffset.y >0) bringUpActionSheet( );
                // else hideTheActionSheet();
                else hideTheActionSheet();
         };


        return (
                <Animated.View style = { [styles1.container, actionSheetStyle]}>
                       <View style={{height:100}}>
                        <ScrollView 
                                onScroll={(e) => gestureHandler(e) } 

                                // onScroll={(e) => console.log("value",e ) } 
                                style ={styles1.grabber}>

                                                                {/* Footer_Block */}
                        <View  style={[styles.flexTwo, styles.borderTopRadius60, styles.bgBlack, styles.border]}>
                                <View style = {[styles.flexHalf, styles.row, styles.marginLeft16, styles.marginRight16, styles.border]}>
                                        <View style = {[styles.flexThree, styles.border]}></View>
                                        <View style = {[styles.flexQuarterToOne, styles.Margin10, styles.radius10, styles.bgBarGrey, styles.border]}></View>
                                        <View style = {[styles.flexThree, styles.border]}></View>
                                </View>
                                <View style = {[styles.flexOne, styles.row, styles.marginLeft16, styles.marginRight16, styles.border]}>
                                        <View style = {[styles.flexFive, styles.justifyContentCenter, styles.border]}>
                                                <Text style = {[styles.fontSize23, styles.fontWeightBold, styles.white]}>Fat Burner Workout</Text>
                                        </View>
                                        <View style = {[styles.flexTwo, styles.radius10, styles.allCenter, styles.bgSmallGrey, styles.marginTop8, styles.marginBottom8, styles.marginleft20, styles.border]}>
                                                <Text style = {[styles.fontSize15, styles.fontWeightBold, styles.white  ]}>1 Exercise</Text>
                                        </View>
                                </View>
                              
                                <View style = {[styles.flexOneAndHalf, styles.row, styles.marginLeft16, styles.marginRight16, styles.marginBottom8, styles.border]}>
                                       <View style = {[styles.flexHalf, styles.allCenter, styles.marginRight12, styles.row, styles.border]}>
                                                <View>{myIcon10}</View>
                                        </View>
                                       <View style = {[styles.flexTwoAndHalf, styles.allCenter, styles.border]}>
                                                        <Image         
                                                                style={{width:80, height:50,  borderRadius:15 }}
                                                                source={require("../assets/images/workout.jpg")}
                                                        />
                                       </View>
                                       <View style = {[styles.flexFive,  styles.border]}>
                                               <View style = {[styles.flexOne, styles.justifyContentCenter, styles.border]}>
                                                       <Text style={[styles.fontSize13, styles.marginTop8,  styles.white, styles.marginLeft16, styles.fontWeightBold]}>Flutter Kicks</Text>
                                               </View>
                                               <View style = {[styles.flexQuarterToOne, styles.justifyContentCenter, styles.border]}>
                                                       <Text style={[styles.fontSize13, styles.marginBottom16, styles.greyDark, styles.marginLeft16, styles.fontWeightBold]}>LEVEL  {myIcon15} {myIcon15} {myIcon15}</Text>
                                               </View>
                                       </View>
                                       <View style = {[styles.flexOne, styles.allCenter, styles.border]}>
                                               <Text style= {[]}>{myIcon1}</Text>
                                       </View> 
                                </View>
                        
                        </View>
                                                        
                                                        {/* <Text>Hello This is Action Sheet</Text>
                                  
                                                        <Text>Hello This is Action Sheet</Text> */}
                        </ScrollView>
                        </View>


                        <TouchableOpacity 
                                 onPress={()=>console.log("value45591" )}
                                 style={styles.container }>
                               
                               <View  style={[styles.flexTwo, styles.borderTopRadius60,]}>
                                {/* <View style = {[styles.flexHalf, styles.row, styles.marginLeft16, styles.marginRight16, styles.border]}>
                                        <View style = {[styles.flexThree, styles.border]}></View>
                                        <View style = {[styles.flexQuarterToOne, styles.Margin10, styles.radius10, styles.bgBarGrey, styles.border]}></View>
                                        <View style = {[styles.flexThree, styles.border]}></View>
                                </View> */}
                                <View style = {[styles.flexOne, styles.row, styles.marginLeft16, styles.marginRight16, ]}>
                                        <View style = {[styles.flexFive, styles.justifyContentCenter, ]}>
                                                <Text style = {[styles.fontSize23, styles.fontWeightBold, styles.white]}>Fat Burner Workout</Text>
                                        </View>
                                        <View style = {[styles.flexTwo, styles.radius10, styles.allCenter, styles.bgSmallGrey, styles.marginTop24, styles.marginBottom24, styles.marginleft20, ]}>
                                                <Text style = {[styles.fontSize15, styles.fontWeightBold, styles.white  ]}>1 Exercise</Text>
                                        </View>
                                </View>
                              
                                <View style = {[styles.flexOneAndHalf, styles.row, styles.marginLeft16, styles.marginRight16, styles.marginBottom8,]}>
                                       <View style = {[styles.flexHalf, styles.allCenter, styles.marginRight12, styles.row, ]}>
                                                <View>{myIcon10}</View>
                                        </View>
                                       <View style = {[styles.flexTwoAndHalf, styles.allCenter,]}>
                                                        <Image         
                                                                style={{width:80, height:50,  borderRadius:15 }}
                                                                source={require("../assets/images/workout.jpg")}
                                                        />
                                       </View>
                                       <View style = {[styles.flexFive,]}>
                                               <View style = {[styles.flexOne, styles.justifyContentCenter, ]}>
                                                       <Text style={[styles.fontSize13, styles.marginTop8,  styles.white, styles.marginLeft16, styles.fontWeightBold]}>Flutter Kicks</Text>
                                               </View>
                                               <View style = {[styles.flexQuarterToOne, styles.justifyContentCenter,]}>
                                                       <Text style={[styles.fontSize13, styles.marginBottom16, styles.greyDark, styles.marginLeft16, styles.fontWeightBold]}>LEVEL  {myIcon15} {myIcon15} {myIcon15}</Text>
                                               </View>
                                       </View>
                                       <View style = {[styles.flexOne, styles.allCenter,]}>
                                               <Text style= {[]}>{myIcon1}</Text>
                                       </View> 
                                </View>
                        
                        </View>

                                        
                                
                        </TouchableOpacity>
                </Animated.View>
        );
};

const styles1 = StyleSheet.create({
        container: {
                backgroundColor:"#282830",
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: height / 2.2,
                // marginTop:20,
                // width: width / 1.05,
                borderTopRightRadius: 40,
                borderTopLeftRadius: 40,
                // marginHorizontal: 10,

                flex:1,
                // justifyContent: "center",
                // alignItems: " center ",
        },
       
        grabber: {
                width:60,
                borderTopWidth: 5,
                borderTopColor: "#aaa",
        //      alignItems:'center',
                // left:150,
                alignSelf:"center",
                padding: 30,
                height:40,
                marginTop: 10,
           
        },
});

export default ActionSheet;