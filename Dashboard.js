import React from "react";
import { View, TouchableOpacity, ScrollView, Animated, Keyboard, FlatList, Dimensions, RefreshControl, Text } from "react-native";
import { connect } from "react-redux";
import { styles, screenHeight, padding, margin, screenWidth, widthValue,  } from "SmartCrust/js/styles"
import Colors from "SmartCrust/js/styles/Colors";
// Components
import {TotalConsumptionComponent} from "SmartCrust/js/screens/dashboard/components/TotalConsumptionCard"
import VictoryPieComponent from 'SmartCrust/js/components/common/graphs/PieGraph'
// import VictoryBarComponent from 'SmartCrust/js/components/common/graphs/BarChart'
import VictoryBarComponent from '../customSearch/components/BarChart'

import GraphTableSwitchButton from "SmartCrust/js/components/common/Buttons/GraphTableSwitchButton";
import LoaderComponent from "SmartCrust/js/components/common/loader/Loader";
import HeaderTitle from 'SmartCrust/js/components/common/header/HeaderTitle';
import HeaderTop from 'SmartCrust/js/components/common/header/HeaderTop';
// Constants
// import { host, mqttHost, options } from "SmartCrust/js/constants";
// Icons

// Library
// import mqtt from "mqtt/dist/mqtt";
import moment from "moment";
// Backend
import { apiDispatcher,userDetailActions, logDetails } from "SmartCrust/js/actions";
import * as _ from "lodash";
import { logout } from "SmartCrust/js/actions";
import {dashboard} from "SmartCrust/js/api";
import * as commonSelectors from "SmartCrust/js/selectors/common";
import {sensorPie,sensorBar} from 'SmartCrust/js/helpers/common/chartDataHelper'
import { strings } from "SmartCrust/js/strings";

const {height, width} = Dimensions.get('window');

class Dashboard extends React.Component{
    constructor (props) {
        super (props);
        this.state={
            pieView: false,
            scrollY: new Animated.Value(0),
        };
        
    }

    async componentDidMount(): void {
        this.syncDetails()
        console.log("This User Details", this.props.userDetails);
        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                if (this.props.currentRoute !== 'Dashboard') {
                    this.props.setCurrentRoute('Dashboard');
                    // this.syncData()
                }
            }
        );
        this.props.setCurrentRoute('Dashboard')
        // var cl = options;
        // cl.clientId = this.props.userDetails.userid + cl.clientId;
        // var client = mqtt.connect(mqttHost, options)

    }

    syncDetails = async () => {
       await this.getSensorDetails()
       await this.getConsumptionDetails()
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        // console.log("Active COunt",this.props.activeCount);
        if(this.props.consumptionDetails !== prevProps.consumptionDetails) {
            let data = this.props.consumptionDetails ? JSON.parse(JSON.stringify(this.props.consumptionDetails)) : [];
            console.log('Consumption Details Response',data)
            if (this.props.consumptionDetails) {
                console.log("UPdate",data);
                this.setState({ totalConsumption: data.sum_consumption, estimatedBill: data.estimated_bill, month: moment(data.Timestamp).format('MMMM') })
                console.log("States",this.state);
            }
            if (this.props.sensorDetails) {
                let sensorData = this.props.sensorDetails ? JSON.parse(JSON.stringify(this.props.sensorDetails)) : [];
                console.log("UPdate",sensorData);
                this.setState({ sensorData: sensorData})
            }
        }

        if(this.props.activeCount !== prevProps.activeCount) {
            this.syncData();
        }
    }

    getSensorDetails = async () => {
        
        try {
            let resp = await this.props.apiDispatcher(dashboard.sensorApi());
            console.log("Sensor Details",resp.data);
            this.props.setSensorDetails(resp.data);
            console.log("Sensor Get Details",this.props.sensorDetails);

            // console.log('From Selectors', this.props.sensorDetails);
            // sensorPie(resp.data)
            // let sensorData = await resp.data
            // this.setState({ sensorData: sensorData})
            // console.log("Sensor Data",sensorData);

        } catch (e) {
            console.log("Sensor Details Error",e);
            // this.setState({loading: false, error: e.data.message})
        }
    }

    getConsumptionDetails = async () => {
        try {
            let resp = await this.props.apiDispatcher(dashboard.consumptionApi());
            console.log("Consumption Details",resp.data);
            this.props.setConsumptionDetails(resp.data);
            // console.log('From Consumption', this.props.consumptionDetails);
 

        } catch (e) {
            console.log("Consumption Details Error",e);
            // this.setState({loading: false, error: e.data.message})
        }
    }

    onRefresh = () => {
        this.setState({refreshing: true})
        this.syncDetails()
        this.setState({refreshing: false})
    }

    renderItem = ({item, index}) => {
        const {language, darkMode} = this.props;
        return (
            <View style={[styles.flexOne]}>
                <View style={[styles.flexOne, styles.row, styles.paddingVertical10]}>

                    <View style={[styles.flexQuarterToOne ]}>
                        <Text style={[styles.paddingLeft12, styles.fontWeight300, styles.small, styles.blueMedium]}>
                            {index+1}
                        </Text>
                    </View>
                    <View style={[styles.flexOneAndHalf]}>
                        <Text style={[styles.paddingLeft4, styles.fontWeight300, styles.small, styles.blueMedium]}>
                            {item.location}
                        </Text>
                    </View>
                    <View style={[styles.flexOne]}>
                    <Text style={[styles.fontWeight300, styles.small, styles.blueMedium]}>
                            {item.litre_consumption}
                        </Text>
                    </View>
                    <View style={[styles.flexOne, styles.flexEndHorizontal]}>
                        <Text style={[styles.paddingRight10, styles.fontWeight300, styles.small, styles.blueMedium]}>
                            {item.charges}
                        </Text>
                    </View>
                </View>
                <View style={[{borderWidth: 0.6, borderColor: Colors.grayLight}, {opacity:0.08}]}/>
            </View>
        );
    }

    render() {
        const {language, darkMode} = this.props;
        console.log("LOginsfin in sf",this.props);
        return (
            <View style={[styles.flexOne, styles.paddingTopHeader, darkMode ? styles.bgBlack : styles.bgIdk]}>
                {this.props.navigation.setOptions({ headerTitle : () => (
                    <HeaderTop header1={this.state.month} header2={''} scrollY={this.state.scrollY}/>
                ), })}
                <Animated.ScrollView
                    onScroll={Animated.event([{
                        nativeEvent: {contentOffset: {y: this.state.scrollY}},
                        // useNativeDriver: false // Add This line
                    }])}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            tintColor={Colors.sunglowYellow}
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh} />
                    }
                    style={[styles.flexOne]}
                >
                    {this.state.totalConsumption ?
                    <>
                        <View style={[styles.marginHorizontal20]}>
                            <HeaderTitle header1={this.state.month} header2={''} scrollY={this.state.scrollY}/>
                            <View style={[styles.paddingVertical16]}>
                                <Text style={[styles.lineHeight24, styles.normal, styles.opacity50perc, darkMode ? styles.white : styles.black ]}>
                                    {strings[language].DashboardScreen.content}
                                </Text>
                            </View>
                        </View>
                    
                        <View style={[styles.radius20, styles.bgBlueExtraExtraLight, styles.padding18, styles.marginHorizontal20, styles.shadowBlack]}>
                            <View style={[styles.row]}>
                                <Text style={[styles.fontWeight300, styles.medium24, styles.blue]}>
                                    {"Total "}
                                </Text>
                                <Text style={[styles.fontWeight100, styles.medium24, styles.opacity65perc, darkMode ? styles.white : styles.black  ]}>
                                    Consumption
                                </Text>
                            </View>
                            <View style={[styles.row, styles.flexOne, styles.spaceBetween, styles.paddingHorizontal16, styles.paddingTop10]}>
                                <TotalConsumptionComponent title={'Consumption'} icon={'award'} value={this.state.totalConsumption} unit={"Ltrs"} darkMode={darkMode} language = {language}/>
                                <TotalConsumptionComponent title={'Estimated Bill'} icon={'database'} value={this.state.estimatedBill} unit={"Inr"} />
                            </View>
                        </View>
                        <ScrollView style={[styles.flexOne, styles.paddingBottom10]} horizontal showsHorizontalScrollIndicator={false}>
                            <View style={[styles.radius22, styles.bgBlueExtraExtraLight, styles.marginHorizontal20, styles.shadowBlack, styles.padding32, screenWidth(1.12), styles.paddingBottom10, styles.marginVertical12, styles.flexOne, styles.marginRight12]}>
                                <View style={[styles.spaceBetween, styles.row]}>
                                    <View style={[styles.row]}>
                                        <Text style={[styles.fontWeight200, styles.medium24, styles.blue]}>
                                            {this.state.pieView ? "Pie " : "Bar "}
                                        </Text>
                                        <Text style={[styles.fontWeight200, styles.medium24, styles.opacity65perc, darkMode ? styles.white : styles.black ]}>
                                            {this.state.pieView ? "Chart" : "Chart"}
                                        </Text>
                                    </View>
                                    <TouchableOpacity onPress={()=> this.setState({ pieView: !this.state.pieView })} style={[styles.padding12, styles.bgBlueExtraLight, styles.radius6]}>
                                        <GraphTableSwitchButton view = {this.state.pieView} icon={'piechart'}/>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    {this.state.pieView ?
                                        <View style={[ styles.allCenter]}>
                                            {this.state.sensorData && <VictoryPieComponent consumption={sensorPie(this.state.sensorData)}/> }
                                        </View>
                                        :
                                        <View>
                                            {this.state.sensorData && <VictoryBarComponent barHeight={4} barWidth={1.4} consumption={sensorBar(this.state.sensorData)} colors={Colors.colorCodes}/> }
                                        </View>
                                    }
                                </View>
                            </View>
                            <View style={[styles.radius22, styles.bgBlueExtraExtraLight, styles.padding32, styles.paddingBottom10, {marginRight: 20}, styles.marginVertical12, screenWidth(1.1), styles.shadowBlack]}>
                                <View style={[styles.spaceBetween, styles.row, styles.paddingBottom10]}>
                                    <View style={styles.row}>
                                        <Text style={[styles.fontWeight400, styles.medium, styles.blue]}>
                                            {"Meterwise"}
                                        </Text>
                                        <Text style={[styles.fontWeight100, styles.medium, darkMode ? styles.white : styles.black ]}>
                                            {" Table"}
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={[styles.flexOne, styles.row, styles.paddingVertical12]}>
                                        <View style={[styles.flexQuarterToOne]}>
                                            <Text style={[styles.normal, styles.blue]}>
                                                Sl. No
                                            </Text>
                                        </View>
                                        <View style={[styles.flexOneAndHalf]}>
                                            <Text style={[styles.normal, styles.blue]}>
                                                Location
                                            </Text>
                                        </View>
                                        <View style={[styles.flexOne]}>
                                            <Text style={[styles.normal, styles.blue]}>
                                                Units
                                            </Text>
                                        </View>
                                        <View style={[styles.flexOne, styles.flexEndHorizontal]}>
                                            <Text style={[styles.normal, styles.blue]}>
                                                Price
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={[{borderWidth: 0.6, borderColor: Colors.grayLight}, {opacity:0.08}]}/>
                                    <FlatList 
                                        showsVerticalScrollIndicator={false}
                                        nestedScrollEnabled = {true}
                                        // style={[screenHeight(2.8)]}
                                        data={this.state.sensorData && this.state.sensorData}
                                        renderItem={this.renderItem}
                                        numColumns={1}
                                        initialNumToRender={10}
                                        ref={ref => this.listView = ref}
                                        keyExtractor={(item, index) => item.location + index}
                                    />
                                    <View style={[styles.allCenter, styles.paddingTop10]}>
                                        <Text style={[styles.small, styles.blueMedium]}>
                                            Price in INR, Consumption in Liters
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </>
                    :  <View style={[styles.flexOne, styles.allCenter, screenHeight(1.3)]}>
                            <LoaderComponent/>
                        </View> }
                    
                </Animated.ScrollView>
            </View>
        );
    }
}

function mapStateToProps (state) {
    return {
        darkMode: commonSelectors.darkMode(state),
        token: commonSelectors.getToken(state),
        language: commonSelectors.language(state),
        userDetails: commonSelectors.userDetails(state),
        sensorDetails: commonSelectors.sensorDetails(state), 
        consumptionDetails: commonSelectors.consumptionDetails(state),
        logInfo: commonSelectors.logInfo(state),
    }
}

function mapDispatchToProps (dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        logout: (state=false) => dispatch(logout(state)),
        setCurrentRoute: (data={}) => dispatch(userDetailActions.setCurrentRoute(data)),
        setSensorDetails: (data={}) => dispatch(userDetailActions.setSensorDetails(data)),
        setConsumptionDetails: (data={}) => dispatch(userDetailActions.setConsumptionDetails(data)),
    }
}

const DashboardScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
export {DashboardScreen};

