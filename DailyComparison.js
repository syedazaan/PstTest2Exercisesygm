import React from "react";
import { View, TouchableOpacity, Animated, FlatList, Dimensions, RefreshControl, Text, ScrollView } from "react-native";
import { connect } from "react-redux";
import { styles, screenHeight, padding, margin, screenWidth, widthValue, heightValue } from "../../styles"
import Colors from "../../styles/Colors";
// Components
import LoaderComponent from "SmartCrust/js/components/common/loader/Loader";
import VictoryMultipleBarComponent from "./components/VictoryMultipleBar";
import {TotalConsumptionComponent} from 'SmartCrust/js/components/common/totalConsumptionComponent/TotalConsumptionComponent';

// import {TotalConsumptionComponent} from 'SmartCrust/js/screens/dashboard/components/TotalConsumptionCard';
import GraphTableSwitchButton from "../../components/common/Buttons/GraphTableSwitchButton";
import GraphAndTable from "SmartCrust/js//components/common/graphs/GraphAndTable";
import WeeklyRadarComponent from "./components/WeeklyRadarGraph";
import HeaderTitle from 'SmartCrust/js/components/common/header/HeaderTitle'
import HeaderTop from 'SmartCrust/js/components/common/header/HeaderTop'
// Constants

// Library
// Backend
import { apiDispatcher,userDetailActions } from "SmartCrust/js/actions";
import { logout } from "../../actions";
import {dashboard} from "../../api";
import * as commonSelectors from "SmartCrust/js/selectors/common";
import {chartRadar, backgroundFixedBar, dailyComparisonInverseValue, dailyComparison} from '../../helpers/common/chartDataHelper'

class DailyComparison extends React.Component{
    constructor (props) {
        super (props);
        this.state={
            scrollY: new Animated.Value(0),
            loading: true
        };
    }

    async componentDidMount(): void {
        this.syncDetails()
        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                if (this.props.currentRoute !== 'dailyComparison') {
                    this.props.setCurrentRoute('dailyComparison');
                    // this.syncData()
                }
            }
        );
        this.props.setCurrentRoute('Dashboard')
    }

   async componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if(this.props.dailyComparison !== prevProps.dailyComparison) {
            this.setState({ loading: true })
            let data = this.props.dailyComparison ? JSON.parse(JSON.stringify(this.props.dailyComparison)) : [];
            console.log('Daily Comparison  Response',data)
            if (this.props.dailyComparison) {
                this.setState({ 
                    today:  dailyComparison(data.Today), 
                    todayInverse: dailyComparisonInverseValue(data.Today),
                    yesterday: dailyComparison(data.Yesterday), 
                    yesterdayInverse: dailyComparisonInverseValue(data.Yesterday),
                    tableData: data.DayComp,
                    price: data.inr,
                    consumption: data.volume
                },this.setState({loading: false}))
                console.log(" State Today", this.state);
            }
        }

        if(this.props.activeCount !== prevProps.activeCount) {
            this.syncData();
        }
    }

    syncDetails = async () => {
       await this.getdailyComparison()
    }

    getdailyComparison = async () => {
        try {
            let resp = await this.props.apiDispatcher(dashboard.dailyComparisonApi());
            console.log("Consumption Details",resp.data);
            this.props.setDailyComparison(resp.data);
        } catch (e) {
            console.log("Consumption Details Error",e);
            this.setState({loading: false, error: e.data.message})
        }
    }

    onRefresh = () => {
        this.setState({refreshing: true})
        this.syncDetails()
        this.setState({refreshing: false})
    }

    render() {
        return (
            this.state.loading ?
            <View style={[styles.flexOne, styles.allCenter, screenHeight(3)]}>
                <LoaderComponent/>
            </View>
            :
            <View style={[styles.flexOne, styles.paddingTopHeader, darkMode ? styles.bgBlack : styles.bgIdk ]}>
                {this.props.navigation.setOptions({ headerTitle : () => (
                    <HeaderTop header1={"Daily"} header2={"Comparison"} scrollY={this.state.scrollY}/>
                ), })}
                <Animated.ScrollView
                    onScroll={Animated.event([{
                        nativeEvent: {contentOffset: {y: this.state.scrollY}},
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
                    <View style={[styles.marginHorizontal20]}>
                        <HeaderTitle header1={"Daily"} header2={"Comparison"} scrollY={this.state.scrollY}/>
                        <View style={[styles.paddingTop16]}>
                            <Text style={[styles.lineHeight24, styles.normal, styles.opacity50perc, darkMode ? styles.white : styles.black  ]}>
                                Please go through the graph or table or anything as per your interest etc,.
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.paddingHorizontal20, styles.paddingTop10]}>
                        <TotalConsumptionComponent
                            title1={"Total"} title2={' Consumption'}
                            subTitle1={'Consumption'} icon1={'award'} value1={this.state.consumption} unit1={"Ltrs"}
                            subTitle2={'Estimated Bill'} icon2={'database'} value2={this.state.price} unit2={"Inr"}
                        />
                    </View>
                    {this.state.today && this.state.tableData ? 
                        <GraphAndTable
                            barChart = {
                                <VictoryMultipleBarComponent 
                                    today={this.state.today}
                                    todayInverse={this.state.todayInverse}
                                    yesterday={this.state.yesterday}
                                    yesterdayInverse={this.state.yesterdayInverse}
                                    fixed={backgroundFixedBar(this.state.today)}
                                />
                            }
                            tableData = {this.state.tableData}
                        /> : null
                    }
                </Animated.ScrollView>
            </View>
        );
    }
}

function mapStateToProps (state) {
    return {
        token: commonSelectors.getToken(state),
        userDetails: commonSelectors.userDetails(state),
        sensorDetails: commonSelectors.sensorDetails(state), 
        dailyComparison: commonSelectors.dailyComparison(state) 
    }
}

function mapDispatchToProps (dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        logout: (state=false) => dispatch(logout(state)),
        setCurrentRoute: (data={}) => dispatch(userDetailActions.setCurrentRoute(data)),
        setDailyComparison: (data={}) => dispatch(userDetailActions.setDailyComparison(data)),
    }
}

const DailyComparisonScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(DailyComparison);
export {DailyComparisonScreen};

