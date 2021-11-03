// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import Ionicons from "@expo/vector-icons/Ionicons";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import {useColorScheme} from "react-native";

import Colors from "../constants/Colors";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import SearchScreen from "../screens/SearchScreen";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="TabOne"
            screenOptions={{tabBarActiveTintColor: Colors[colorScheme].tint}}
        >
            <BottomTab.Screen
                name="Погода"
                component={TabOneNavigator}
                options={{
                    tabBarIcon: ({color}) => (
                        <TabBarIcon name="ios-code" color={color}/>
                    ),
                }}
            />
            <BottomTab.Screen
                name="Поиск"
                component={SearchNavigator}
                options={{
                    tabBarIcon: ({color}) => (
                        <TabBarIcon name="ios-code" color={color}/>
                    ),
                }}
            />
            <BottomTab.Screen
                name="О приложении"
                component={TabTwoNavigator}
                options={{
                    tabBarIcon: ({color}) => (
                        <TabBarIcon name="ios-code" color={color}/>
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props) {
    return <Ionicons size={30} style={{marginBottom: -3}} {...props} />;
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
                initialParams={{city: "Moscow"}}
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
        </SearchStack.Navigator>
    );
}