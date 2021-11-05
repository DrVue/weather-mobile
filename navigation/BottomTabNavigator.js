// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import {useColorScheme} from "react-native";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";

import Colors from "../constants/Colors";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import SearchScreen from "../screens/SearchScreen";
import CityScreen from "../screens/CityScreen";
import AlertsScreen from "../screens/AlertsScreen";
import {Button} from "react-native-elements";
import {Icon, MView} from "../components/Themed";

const BottomTab = createBottomTabNavigator();

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
    return (
        <TabOneStack.Navigator screenOptions={{headerShown: true}}>
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
                            <Button type="clear" icon={<Icon prov="mci" name="reload" size={30} onPress={() => navigation.replace("TabOneScreen")}/>}/>
                            <Button type="clear" icon={<Icon prov="mi" name="search" size={30} onPress={() => navigation.navigate("SearchScreen")}/>}/>
                            <Button type="clear" icon={<Icon prov="mi" name="info" size={30} onPress={() => navigation.navigate("TabTwoScreen")}/>}/>
                        </MView>
                    )
                })}
            />
            <TabOneStack.Screen
                name="TabTwoScreen"
                component={TabTwoScreen}
                options={{
                    title: "О приложении",
                    headerTransparent: true,
                    headerTitleAlign: "center",
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
                    title: "Информация",
                })}
            />
            <TabOneStack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{
                    headerTransparent: true,
                    title: "",
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
                            <Button type="clear" icon={<Icon prov="mi" name="info" size={30} onPress={() => navigation.navigate("TabTwoScreen")}/>}/>
                        </MView>
                    )
                })}
            />
        </TabOneStack.Navigator>
    );
}