import React, {useState, useEffect} from "react";
import {
    StyleSheet,
    TextInput,
    Button,
    Platform,
    PermissionsAndroid,
    ToastAndroid,
    Alert,
    ActivityIndicator
} from "react-native";

import {MView, Text, View} from "../components/Themed";
import axios from "react-native-axios";
import moment from "moment";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as Location from "expo-location";
import WeatherPage from "../components/WeatherPage";

export default function TabOneScreen({navigation, route}) {
    const [isLoading, setIsLoading] = useState(true);
    const [weather, setWeather] = useState({});
    const [location, setLocation] = useState(null);
    const [errMsg, setErrMsg] = useState(null);
    const [weatherPeriod, setWeatherPeriod] = useState({});
    const [isLoadingPeriod, setIsLoadingPeriod] = useState(true);

    function getWeatherLocate(locate) {
        axios.post("http://194.67.78.244:3010/locate/one", {
            lan: locate.coords.latitude,
            lon: locate.coords.longitude,
        }).then((d) => {
            setWeather(d.data.weather);
            getWeatherPeriod(locate);
            setIsLoading(false);
        })
    }

    function getWeatherPeriod(locate) {
        axios.post("http://194.67.78.244:3010/locate/period", {
            lan: locate.coords.latitude,
            lon: locate.coords.longitude,
        }).then((d) => {
            setWeatherPeriod({
                daily: d.data.weather.daily,
                alerts: d.data.weather.alerts
            });
            // console.log(d.data.weather.daily);
            setIsLoadingPeriod(false);
        })
    }

    useEffect(() => {
        if (isLoading) {
            (async () => {
                let {status} = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    setErrMsg("Permission was denied");
                    return;
                }

                const locate = await Location.getCurrentPositionAsync({});
                setLocation(locate);
                getWeatherLocate(locate);
            })();
        }
    });

    return (
        <View style={styles.container}>

            {
                !isLoading
                    ? <WeatherPage styles={styles} weather={weather} weatherPeriod={weatherPeriod}
                                   isLoadingPeriod={isLoadingPeriod} loc navigation={navigation}/>
                    : <MView style={styles.containerLoading}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </MView>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        // alignItems: "center",
        // textAlign: "center",
        // justifyContent: "start",
    },
    containerLoading: {
        flex: 1,
        paddingTop: 10,
        paddingLeft: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    separator: {
        marginVertical: 20,
        // margin: 40,
        height: 1,
        width: "100%",
    },
});
