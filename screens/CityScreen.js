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
import WeatherPage from "../components/WeatherPage";

export default function CityScreen({navigation, route}) {
    const [isLoading, setIsLoading] = useState(true);
    const [weather, setWeather] = useState({});
    const [weatherPeriod, setWeatherPeriod] = useState({});
    const [isLoadingPeriod, setIsLoadingPeriod] = useState(true);
    const [city, setCity] = useState(route.params.city);

    function getWeather(c = city) {
        axios.post("http://194.67.78.244:3010/locate/one", {
            lan: route.params.lat,
            lon: route.params.lon,
        }).then((d) => {
            setWeather(d.data.weather);
            console.log(d.data.weather);
            getWeatherPeriod();
            setIsLoading(false);
        })
    }

    function getWeatherPeriod() {
        axios.post("http://194.67.78.244:3010/locate/period", {
            lan: route.params.lat,
            lon: route.params.lon,
        }).then((d) => {
            setWeatherPeriod({
                daily: d.data.weather.daily,
                alerts: d.data.weather.alerts
            });
            setIsLoadingPeriod(false);
        })
    }

    useEffect(() => {
        if (isLoading) {
            getWeather();
        }
        if (route.params.city !== city) {
            setCity(route.params.city);
            setIsLoading(true);
        }
    });

    return (
        <View style={styles.container}>
            {
                !isLoading
                    ? <WeatherPage styles={styles} weather={weather} weatherPeriod={weatherPeriod}
                                   isLoadingPeriod={isLoadingPeriod} navigation={navigation}/>
                    : <MView style={styles.containerLoading}>
                        <ActivityIndicator size={100} color="#0000ff"/>
                    </MView>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "start",
        // justifyContent: "start",
    },
    containerLoading: {
        flex: 1,
        paddingTop: 300,
        paddingLeft: 0,
    },
    separator: {
        marginVertical: 20,
        // margin: 40,
        height: 1,
        width: "100%",
    },
});
