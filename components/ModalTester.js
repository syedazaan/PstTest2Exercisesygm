import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import { styles } from '../styles.js/styles';
import  Colors  from '../styles.js/Colors';

function ModalTester() {
        const [isModalVisible, setModalVisible] = useState(false);

        const toggleModal = () => {
                setModalVisible(!isModalVisible);
        };

        return (
                <View style={{flex: 1}}>
                       <Button title="" onPress={toggleModal}  />
                                
                              <Modal isVisible={isModalVisible}>
                                        {/* Empty_Top */}
                                        <View style={{flex:0.4, }}></View>
                                       
                                        {/* Content_Block */}
                                        <View style={{flex: 1,borderRadius:20, backgroundColor:"white", marginTop:25, marginBottom:25, marginLeft:15, marginRight:15,}}>
                                              
                                              <Button title="Hide modal" onPress={toggleModal} />
                                                        {/* Image_Block */}
                                                        <View style={{flex:1, flexDirection:"row", }}>
                                                                <View style={{flex:1.5, }}></View>
                                                                <View style={{flex:2, }}>
                                                                        <View style={{flex:1, }}><Text style={{fontSize:18, fontWeight: "bold", marginLeft:10, }}>Complete</Text></View>
                                                                        <View style={{flex:1, }}><Text style={{fontSize:18, fontWeight: "bold", marginLeft:10, }}>your profile to get</Text></View>
                                                                        <View style={{flex:1, }}><Text style={{fontSize:18, fontWeight: "bold", marginLeft:10, }}>maximum visibility</Text></View>
                                                                        <View style={{flex:1, }}><Text style = {{fontSize:15, fontWeight:"600", color:"grey", marginLeft:10,}}>60% completed</Text></View>
                                                                </View>
                                                        </View>
                                                        {/* Profile_Block */}
                                                        <View style={{flex:0.8, }}>
                                                                <View style={{flex:1, flexDirection:"row",}}>
                                                                        <View style={{flex:1, }}></View>
                                                                        <View style={{flex:5, justifyContent:"center", }}><Text style = {{fontSize:15, fontWeight:"bold", color:"midnightblue", marginLeft:10,}}>Profile created</Text></View>
                                                                </View>
                                                                <View style={{flex:1, flexDirection:"row", }}>
                                                                         <View style={{flex:1, }}></View>
                                                                        <View style={{flex:5, justifyContent:"center", }}><Text style = {{fontSize:15, fontWeight:"bold", color:"midnightblue", marginLeft:10,}}>Total work experienc</Text></View>
                                                                </View>
                                                        </View>
                                                        {/* Plus_block */}
                                                        <View style={{flex:0.8, flexDirection:"row", }}>
                                                                <View style={{flex:1, }}></View>
                                                                <View style={{flex:5, margin:10, alignItems:"center", justifyContent:"center", borderTopRightRadius:20, borderBottomLeftRadius:20, borderBottomRightRadius:20, backgroundColor:"rgb(82,107,226)", }}>
                                                                        <Text style={{fontWeight:"600", fontSize:20, color:"white"}}>Add educational background</Text>
                                                                </View>
                                                        </View>
                                        </View>

                                        {/* Empty_Bottom */}
                                        <View style={{flex:0.4,}}></View>
                                </Modal>
                  </View>
  );
}

export default ModalTester;
