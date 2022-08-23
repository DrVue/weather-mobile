// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import {useColorScheme} from "react-native";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import appStorage from "react-native-sync-localstorage";


import Colors from "../constants/Colors";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import SearchScreen from "../screens/SearchScreen";
import CityScreen from "../screens/CityScreen";
import AlertsScreen from "../screens/AlertsScreen";
import {Button} from "react-native-elements";
import {Icon, MView} from "../components/Themed";
import ErrorScreen from "../screens/ErrorScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import DisclaimerScreen from "../screens/DisclaimerScreen";
import {useEffect, useState} from "react";
import * as Location from "expo-location";

const BottomTab = createBottomTabNavigator();

// const dataApp = await SyncStorage.init();

function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="TabOne"
            screenOptions={{tabBarActiveTintColor: Colors[colorScheme].tint, headerShown: false}}
        >
            <BottomTab.Screen
                name="Рядом"
                component={TabOneNavigator}
            />
        </BottomTab.Navigator>
    );
}

const TabOneStack = createStackNavigator();
// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

export default function TabOneNavigator() {
    const [isLoading, setIsLoading] = useState(true);
    const [isWelcome, setIsWelcome] = useState("false");

    useEffect(() => {
        if (isLoading) {
            (async () => {
                setIsWelcome(await AsyncStorage.getItem("@welcome"));
                await setIsLoading(false);
            })();
        }
    })

    const animConf = {
        animation: "spring",
        config: {
            stiffness: 2000,
            damping: 2000,
            mass: 10,
            overshootClamping: true,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
        }
    }

    let getWelcome = async () => {
        return await AsyncStorage.getItem("@welcome");
    };
    return isLoading === false
            ?
        <TabOneStack.Navigator screenOptions={{headerShown: true}}>
            {/*{console.log(appStorage.getItem("@welcome"))}*/}
            {/*{console.log(getWelcome())}*/}
            {
                isWelcome !== "true"
                    ? <TabOneStack.Screen
                        name="WelcomeScreen"
                        component={WelcomeScreen}
                        options={{
                            title: "",
                            headerTransparent: true,
                            headerTitleAlign: "center",
                            transitionSpec: {
                                open: animConf,
                                close: animConf,
                            },
                        }}
                    />
                    : null
            }
            <TabOneStack.Screen
                name="TabOneScreen"
                component={TabOneScreen}
                initialParams={{}}
                options={({navigation, route}) => ({
                    city: route.params.city,
                    title: "",
                    headerTransparent: true,
                    headerRight: () => (
                        <MView style={{flex: 1, flexDirection: "row", backgroundColor: "transparent"}}>
                            <Button type="clear" icon={<Icon prov="mci" name="reload" size={30}
                                                             onPress={() => navigation.replace("TabOneScreen")}/>}/>
                            <Button type="clear" icon={<Icon prov="mi" name="search" size={30}
                                                             onPress={() => navigation.navigate("SearchScreen")}/>}/>
                            <Button type="clear" icon={<Icon prov="mi" name="info" size={30}
                                                             onPress={() => navigation.navigate("TabTwoScreen")}/>}/>
                        </MView>
                    ),
                    transitionSpec: {
                        open: animConf,
                        close: animConf,
                    },
                })}
            />
            <TabOneStack.Screen
                name="TabTwoScreen"
                component={TabTwoScreen}
                options={{
                    title: "",
                    headerTransparent: true,
                    headerTitleAlign: "center",
                    transitionSpec: {
                        open: animConf,
                        close: animConf,
                    },
                }}
            />
            <TabOneStack.Screen
                name="AlertsScreen"
                component={AlertsScreen}
                initialParams={{alerts: []}}
                options={({route}) => ({
                    alerts: route.params.alerts,
                    headerTransparent: true,
                    headerTitleAlign: "center",
                    title: "",
                    transitionSpec: {
                        open: animConf,
                        close: animConf,
                    },
                })}
            />
            <TabOneStack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{
                    headerTransparent: true,
                    title: "",
                    transitionSpec: {
                        open: animConf,
                        close: animConf,
                    },
                }}
            />
            <TabOneStack.Screen
                name="ErrorScreen"
                component={ErrorScreen}
                options={{
                    headerTransparent: true,
                    title: "",
                    transitionSpec: {
                        open: animConf,
                        close: animConf,
                    },
                }}
            />
            <TabOneStack.Screen
                name="DisclaimerScreen"
                component={DisclaimerScreen}
                options={{
                    headerTransparent: true,
                    title: "",
                    transitionSpec: {
                        open: animConf,
                        close: animConf,
                    },
                }}
            />
            <TabOneStack.Screen
                name="CityScreen"
                component={CityScreen}
                options={({navigation, route}) => ({
                    lat: route.params.lat,
                    lon: route.params.lon,
                    title: "",
                    headerTransparent: true,
                    headerRight: () => (
                        <MView style={{flex: 1, flexDirection: "row", backgroundColor: "transparent"}}>
                            <Button type="clear" icon={<Icon prov="mi" name="info" size={30}
                                                             onPress={() => navigation.navigate("TabTwoScreen")}/>}/>
                        </MView>
                    ),
                    transitionSpec: {
                        open: animConf,
                        close: animConf,
                    },
                })}
            />
        </TabOneStack.Navigator>
        : null;
}