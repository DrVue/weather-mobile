import {MaterialCommunityIcons} from "@expo/vector-icons";
import React from "react";

class WeatherAPI {
    static getWind(deg) {
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

    static getIconWeather(code, icon = "01d", color = "white", size = 50) {
        const c = code.toString();
        if (c[0] === "2") {
            return <MaterialCommunityIcons size={size} style={{marginBottom: -3}} name="weather-cloudy" color={color}/>;
        } else if (c[0] === "3") {
            return <MaterialCommunityIcons size={size} style={{marginBottom: -3}} name="weather-rainy" color={color}/>;
        } else if (c[0] === "5") {
            return <MaterialCommunityIcons size={size} style={{marginBottom: -3}} name="weather-rainy" color={color}/>;
        } else if (c[0] === "6") {
            return <MaterialCommunityIcons size={size} style={{marginBottom: -3}} name="weather-snowy" color={color}/>;
        } else if (c === "731" || c === "771" || c === "781") {
            return <MaterialCommunityIcons size={size} style={{marginBottom: -3}} name="weather-windy" color={color}/>;
        } else if (c[0] === "7") {
            return <MaterialCommunityIcons size={size} style={{marginBottom: -3}} name="weather-fog" color={color}/>;
        } else if (c === "800") {
            if (icon[2] === "d") {
                return <MaterialCommunityIcons size={size} style={{marginBottom: -3}} name="weather-sunny"
                                               color={color}/>;
            } else if (icon[2] === "n") {
                return <MaterialCommunityIcons size={size} style={{marginBottom: -3}} name="weather-night"
                                               color={color}/>;
            }
        } else if (c === "801" || c === "802") {
            if (icon[2] === "d") {
                return <MaterialCommunityIcons size={size} style={{marginBottom: -3}} name="weather-partly-cloudy"
                                               color={color}/>;
            } else if (icon[2] === "n") {
                return <MaterialCommunityIcons size={size} style={{marginBottom: -3}} name="weather-night-partly-cloudy"
                                               color={color}/>;
            }
        } else if (c === "803" || c === "804") {
            return <MaterialCommunityIcons size={size} style={{marginBottom: -3}} name="weather-cloudy" color={color}/>;
        }
    }
}

export default WeatherAPI;