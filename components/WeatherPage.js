import React from "react";
import {Text, View} from "./Themed";
import moment from "moment";
import WeatherAPI from "../api";
import {StyleSheet, useColorScheme} from "react-native";

function Card(props) {
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        card: {
            padding: 5,
            marginTop: 5,
            marginBottom: 5,
            width: "100%",
            backgroundColor: colorScheme === "dark" ? "#333" : "#bbb",
            borderRadius: 5,
        },
        cardTextBig: {
            fontSize: 40,
        }
    })

    return <View style={styles.card}>
        <Text>{props.title}</Text>
        <Text style={styles.cardTextBig}>{props.value}</Text>
        {props.children}
    </View>
}

function WeatherPage (props) {
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        title: {
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
        },
        text: {
            textAlign: "center",
        },
        tempText: {
            fontSize: 50,
            textAlign: "center",
        },
        tempMiniText: {},
        separator: {
            marginVertical: 20,
            // margin: 40,
            height: 1,
            width: "100%",
        },
    });

    return <View>
        <Text style={styles.title}>{props.weather.name}</Text>

        <Text style={styles.text}>{props.weather.weather[0].description}</Text>
        <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
        />
        <Text
            style={styles.tempText}>{WeatherAPI.getIconWeather(props.weather.weather[0].id, props.weather.weather[0].icon, colorScheme === "dark" ? "white" : "black",)} {props.weather.main.temp.toFixed(1)} °C</Text>
        <Text style={styles.text}>{props.weather.main.temp_min.toFixed(1)} °C / {props.weather.main.temp_max.toFixed(1)} °C</Text>
        <Text style={styles.text}>Ощущается как {props.weather.main.feels_like.toFixed(1)} °C</Text>
        <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
        />
        <Card title="Ветер" value={`${props.weather.wind.speed} м/с ${WeatherAPI.getWind(props.weather.wind.deg)}`}></Card>
        <Card title="Давление" value={`${(props.weather.main.pressure / 1.333).toFixed(2)} мм.рт.ст.`}></Card>
        <Card title="Влажность" value={`${props.weather.main.humidity} %`}></Card>
        <Card title="Восход\Закат" value={`${moment(props.weather.sys.sunrise, "X").format("HH:mm")} - ${moment(props.weather.sys.sunset, "X").format("HH:mm")}`}></Card>
    </View>
}

export default WeatherPage;