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

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="TabOne"
            screenOptions={{tabBarActiveTintColor: Colors[colorScheme].tint, headerShown: false}}
        >
            <BottomTab.Screen
                name="Рядом"
                component={TabOneNavigator}
                options={{
                    tabBarIcon: ({color}) => (
                        <MaterialIcons size={30} style={{marginBottom: -3}} name="my-location" color={color}/>
                    ),
                }}
            />
            <BottomTab.Screen
                name="Поиск"
                component={SearchNavigator}
                options={{
                    tabBarIcon: ({color}) => (
                        <MaterialIcons size={30} style={{marginBottom: -3}} name="search" color={color}/>
                    ),
                }}
            />
            <BottomTab.Screen
                name="О приложении"
                component={TabTwoNavigator}
                options={{
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons size={30} style={{marginBottom: -3}} name="information-variant" color={color}/>
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
}

const TabOneStack = createStackNavigator();
// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

function TabOneNavigator() {
    return (
        <TabOneStack.Navigator screenOptions={{headerShown: false}}>
            <TabOneStack.Screen
                name="TabOneScreen"
                component={TabOneScreen}
                initialParams={{}}
                options={({route}) => ({city: route.params.city})}
            />
        </TabOneStack.Navigator>
    );
}

const TabTwoStack = createStackNavigator();

function TabTwoNavigator() {
    return (
        <TabTwoStack.Navigator screenOptions={{headerShown: false}}>
            <TabTwoStack.Screen
                name="TabTwoScreen"
                component={TabTwoScreen}
            />
        </TabTwoStack.Navigator>
    );
}

const SearchStack = createStackNavigator();

function SearchNavigator() {
    return (
        <SearchStack.Navigator screenOptions={{headerShown: false}}>
            <SearchStack.Screen
                name="SearchScreen"
                component={SearchScreen}
            />
            <SearchStack.Screen
                name="CityScreen"
                component={CityScreen}
                initialParams={{city: "Moscow,RU"}}
            />
        </SearchStack.Navigator>
    );
}

const CityStack = createStackNavigator();

function CityNavigator() {
    return (
        <CityStack.Navigator screenOptions={{headerShown: false}}>
            <CityStack.Screen
                name="CityScreen"
                component={CityScreen}
                initialParams={{city: "Moscow,RU"}}
            />
        </CityStack.Navigator>
    );
}