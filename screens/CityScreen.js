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
    const [city, setCity] = useState(route.params.city);

    function getWeather(c = city) {
        axios.post("http://194.67.78.244:3010/get/one", {
            city: c,
        }).then((d) => {
            setWeather(d.data.weather);
            setIsLoading(false);
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
            <MView style={{marginTop: 30}}/>
            {
                !isLoading
                    ? <WeatherPage styles={styles} weather={weather}/>
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
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        // alignItems: "start",
        // justifyContent: "start",
    },
    containerLoading: {
        flex: 1,
        paddingTop: 10,
        paddingLeft: 10,
    },
    separator: {
        marginVertical: 20,
        // margin: 40,
        height: 1,
        width: "100%",
    },
});
