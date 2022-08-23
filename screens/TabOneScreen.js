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
    const [err, setErr] = useState(false);
    const [weatherPeriod, setWeatherPeriod] = useState({});
    const [isLoadingPeriod, setIsLoadingPeriod] = useState(true);

    function getWeatherLocate(locate) {
        axios.post("http://93.95.97.150/locate/one", {
            lan: locate.coords.latitude,
            lon: locate.coords.longitude,
        }).then((d) => {
            setWeather(d.data.weather);
            getWeatherPeriod(locate);
            setIsLoading(false);
        }).catch(err => {
            navigation.push("ErrorScreen");
            setErr(true);
            setIsLoading(false);
            setIsLoadingPeriod(false);
        })
    }

    function getWeatherPeriod(locate) {
        axios.post("http://93.95.97.150/locate/period", {
            lan: locate.coords.latitude,
            lon: locate.coords.longitude,
        }).then((d) => {
            setWeatherPeriod(d.data.weather.list);
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
                !isLoading && !err
                    ? <WeatherPage styles={styles} weather={weather} weatherPeriod={weatherPeriod}
                                   isLoadingPeriod={isLoadingPeriod} loc navigation={navigation}/>
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
        // alignItems: "center",
        // textAlign: "center",
        // justifyContent: "start",
    },
    containerLoading: {
        flex: 1,
        paddingTop: 300,
        paddingLeft: 0,
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
