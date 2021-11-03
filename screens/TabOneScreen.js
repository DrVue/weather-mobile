import {useState, useEffect} from "react";
import {StyleSheet, TextInput, Button} from "react-native";

import {Text, View} from "../components/Themed";
import axios from "react-native-axios";
import moment from "moment";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export default function TabOneScreen({navigation, route}) {
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

    function getCel(val) {
        return (val - 273.15).toFixed(1);
    }

    function getWind(deg) {
        if (deg >= 348.75 && deg < 11.25) {
            return "С";
        } else if (deg >= 11.25 && deg < 33.75) {
            return "ССВ";
        } else if (deg >= 33.75 && deg < 56.25) {
            return "СВ";
        } else if (deg >= 56.25 && deg < 78.75) {
            return "ВСВ";
        } else if (deg >= 78.75 && deg < 101.25) {
            return "В";
        } else if (deg >= 101.25 && deg < 123.75) {
            return "ВЮВ";
        } else if (deg >= 123.75 && deg < 146.25) {
            return "ЮВ";
        } else if (deg >= 146.25 && deg < 168.75) {
            return "ЮЮВ";
        } else if (deg >= 168.75 && deg < 191.25) {
            return "Ю";
        } else if (deg >= 191.25 && deg < 213.75) {
            return "ЮЮЗ";
        } else if (deg >= 213.75 && deg < 236.25) {
            return "ЮЗ";
        } else if (deg >= 236.25 && deg < 258.75) {
            return "ЗЮЗ";
        } else if (deg >= 258.75 && deg < 281.25) {
            return "З";
        } else if (deg >= 281.25 && deg < 303.75) {
            return "ЗСЗ";
        } else if (deg >= 303.75 && deg < 326.25) {
            return "СЗ";
        } else if (deg >= 326.25 && deg < 348.75) {
            return "ССЗ";
        }
    }

    function getIconWeather(code, icon = "01d") {
        const c = code.toString();
        if (c[0] === "2") {
            return <MaterialCommunityIcons size={50} style={{marginBottom: -3}} name="weather-cloudy" color="white"/>;
        } else if (c[0] === "3") {
            return <MaterialCommunityIcons size={50} style={{marginBottom: -3}} name="weather-rainy" color="white"/>;
        } else if (c[0] === "5") {
            return <MaterialCommunityIcons size={50} style={{marginBottom: -3}} name="weather-rainy" color="white"/>;
        } else if (c[0] === "6") {
            return <MaterialCommunityIcons size={50} style={{marginBottom: -3}} name="weather-snowy" color="white"/>;
        } else if (c === "731" || c === "771" || c === "781") {
            return <MaterialCommunityIcons size={50} style={{marginBottom: -3}} name="weather-windy" color="white"/>;
        } else if (c[0] === "7") {
            return <MaterialCommunityIcons size={50} style={{marginBottom: -3}} name="weather-fog" color="white"/>;
        } else if (c === "800") {
            if (icon[2] === "d") {
                return <MaterialCommunityIcons size={50} style={{marginBottom: -3}} name="weather-sunny" color="white"/>;
            } else if (icon[2] === "n") {
                return <MaterialCommunityIcons size={50} style={{marginBottom: -3}} name="weather-night" color="white"/>;
            }
        } else if (c === "801" || c === "802") {
            if (icon[2] === "d") {
                return <MaterialCommunityIcons size={50} style={{marginBottom: -3}} name="weather-partly-cloudy" color="white"/>;
            } else if (icon[2] === "n") {
                return <MaterialCommunityIcons size={50} style={{marginBottom: -3}} name="weather-night-partly-cloudy" color="white"/>;
            }
        } else if (c === "803" || c === "804") {
            return <MaterialCommunityIcons size={50} style={{marginBottom: -3}} name="weather-cloudy" color="white"/>;
        }
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
                    ? <View>
                        <Text style={styles.title}>{weather.name}</Text>
                        <Text>{weather.weather[0].description}</Text>
                        <View
                            style={styles.separator}
                            lightColor="#eee"
                            darkColor="rgba(255,255,255,0.1)"
                        />
                        <Text style={styles.tempText}>{getIconWeather(weather.weather[0].id, weather.weather[0].icon)} {weather.main.temp.toFixed(1)} °C</Text>
                        <Text>{weather.main.temp_min.toFixed(1)} °C / {weather.main.temp_max.toFixed(1)} °C</Text>
                        <Text>Ощущается как {weather.main.feels_like.toFixed(1)} °C</Text>
                        <View
                            style={styles.separator}
                            lightColor="#eee"
                            darkColor="rgba(255,255,255,0.1)"
                        />
                        <Text>Давление: {(weather.main.pressure / 1.333).toFixed(2)} мм.рт.ст.</Text>
                        <Text>Ветер: {weather.wind.speed} м/с {getWind(weather.wind.deg)}</Text>
                        <Text>Влажность: {weather.main.humidity} %</Text>
                        <Text>Восход\Закат: {moment(weather.sys.sunrise, "X").format("HH:mm")} - {moment(weather.sys.sunset, "X").format("HH:mm")}</Text>

                    </View>
                    : <Text style={styles.title}>Loading...</Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingLeft: 10,
        // alignItems: "start",
        // justifyContent: "start",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    tempText: {
        fontSize: 50,
    },
    tempMiniText: {},
    separator: {
        marginVertical: 20,
        // margin: 40,
        height: 1,
        width: "95%",
    },
    input: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: "#fff",
        marginBottom: 10,
        width: "95%",
        color: "#fff",
    },
    button: {
        display: "flex",
        marginRight: 20,
        width: "95%",
    }
});
