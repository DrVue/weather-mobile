import React, {useState, useEffect} from "react";
import {SearchBar, ListItem} from "react-native-elements";
import axios from "react-native-axios";
import {Text, View} from "../components/Themed";
import {StyleSheet, useColorScheme, ActivityIndicator} from "react-native";

import {
    DarkTheme,
    DefaultTheme,
} from "@react-navigation/native";



export default function SearchScreen ({navigation}) {
    const [isLoading, setIsLoading] = useState(false);
    const [res, setRes] = useState([]);
    const [city, setCity] = useState("");

    function getWeather() {
        setIsLoading(true);

        axios.post("http://194.67.78.244:3010/find", {
            city: city,
        }).then((d) => {
            setRes(d.data.list);
            setIsLoading(false);
        })
    }

    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        },
        title: {
            fontSize: 20,
            fontWeight: "bold",
        },
        separator: {
            marginVertical: 30,
            height: 1,
            width: "80%",
        },
        text: {
            color: colorScheme === "dark" ? "#fff" : "#000",
        },
        searchBar: {
            backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
            color: colorScheme === "dark" ? "#fff" : "#000",
        },
        listItem: {
            backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
            borderColor: colorScheme === "dark" ? "#000" : "#fff",
            color: colorScheme === "dark" ? "#fff" : "#000",
        },
        textSmall: {
            color: colorScheme === "dark" ? "gray" : "gray",
        }
    });



    return <View>
            <SearchBar
                placeholder="Поиск по городу..."
                onChangeText={text => setCity(text)}
                onSubmitEditing={getWeather}
                value={city}
                lightTheme={true}
                platform="android"
                inputStyle={styles.searchBar}
                inputContainerStyle={styles.searchBar}
                containerStyle={styles.searchBar}
                loadingProps={<ActivityIndicator size="small" color="#0000ff"/>}
                showLoading="true"
            />


        {
            !isLoading
                ? <View>
                    {
                        res.map((e, i) => {
                            return <ListItem style={styles.listItem} containerStyle={styles.listItem} key={i} bottomDivider onPress={() => navigation.navigate("CityScreen", {city: e.name + "," + e.sys.country})}>
                                <ListItem.Content style={styles.listItem}>
                                    <ListItem.Title style={styles.text}>
                                        {e.name}, {e.sys.country}
                                    </ListItem.Title>
                                    <ListItem.Subtitle style={styles.textSmall}>
                                        {e.main.temp.toFixed(1)} °C | {e.weather[0].description}
                                    </ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                        })
                    }
                </View>
                : <ActivityIndicator size="large" color="#0000ff"/>
        }
    </View>
}

