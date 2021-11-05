import React, {useState, useEffect} from "react";
import {SearchBar, ListItem} from "react-native-elements";
import axios from "react-native-axios";
import {MView, Icon, View} from "../components/Themed";
import {StyleSheet, useColorScheme, ActivityIndicator} from "react-native";

import {
    DarkTheme,
    DefaultTheme,
} from "@react-navigation/native";



export default function SearchScreen ({navigation}) {
    const [isLoading, setIsLoading] = useState(false);
    const [res, setRes] = useState([]);
    const [city, setCity] = useState("");
    const [err, setErr] = useState(false);

    function getWeather() {
        setIsLoading(true);

        axios.post("http://194.67.78.244:3010/find", {
            city: city,
        }).then((d) => {
            setRes(d.data.list);
            setIsLoading(false);
        }).catch(err => {
            navigation.push("ErrorScreen");
            setErr(true);
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
            fontFamily: "ProductSans"
        },
        separator: {
            marginVertical: 30,
            height: 1,
            width: "80%",
        },
        card: {
            backgroundColor: colorScheme === "dark" ? "#333" : "#ddd",
            borderRadius: 20,
            padding: 5,
        },
        text: {
            color: colorScheme === "dark" ? "#fff" : "#000",
            fontFamily: "ProductSans",
        },
        searchBar: {
            backgroundColor: colorScheme === "dark" ? "#555" : "#bbb",
            color: colorScheme === "dark" ? "#fff" : "#000",
            fontFamily: "ProductSans",
        },
        containerSearchBar: {
            backgroundColor: colorScheme === "dark" ? "#555" : "#bbb",
            color: colorScheme === "dark" ? "#fff" : "#000",
            borderRadius: 20,
            padding: 5,
        },
        backgroundSearchBar: {
            backgroundColor: "transparent",
            color: colorScheme === "dark" ? "#fff" : "#000",
            marginTop: 10,
        },
        icon: {
            color: colorScheme === "dark" ? "#fff" : "#000",
        },
        listItem: {
            backgroundColor: "transparent",
            // borderColor: colorScheme === "dark" ? "#000" : "#fff",
            color: colorScheme === "dark" ? "#fff" : "#000",
        },
        textSmall: {
            color: colorScheme === "dark" ? "gray" : "gray",
            fontFamily: "ProductSans",
        },
        secondView: {
            backgroundColor: colorScheme === "dark" ? "black" : "white",
            paddingTop: 30,
            bottom: 20,
        },
        firstView: {
            backgroundColor: colorScheme === "dark" ? "#333" : "#ddd",
            paddingTop: 100,
            paddingBottom: 10,
            paddingLeft: 10,
            paddingRight: 10,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            zIndex: 2,
            // height: 450,
            flex: 1,
            alignItems: "center",
        },
    });



    return <View>
        <MView style={styles.firstView}>
            <SearchBar
                placeholder="Поиск по городу..."
                onChangeText={text => setCity(text)}
                onSubmitEditing={getWeather}
                value={city}
                lightTheme={true}
                platform="android"
                inputStyle={styles.searchBar}
                placeholderStyle={{fontFamily: "ProductSans"}}
                inputContainerStyle={styles.containerSearchBar}
                containerStyle={styles.backgroundSearchBar}
                rightIconContainerStyle={styles.icon}
                loadingProps={<ActivityIndicator size="small" color="#0000ff"/>}
                showLoading="true"
            />
        </MView>
        <MView style={styles.secondView}>
            {
                !isLoading && !err
                    ? res !== []
                        ? <View style={styles.card}>
                        {
                            res.map((e, i) => {
                                    return <ListItem style={styles.listItem} containerStyle={styles.listItem} key={i} bottomDivider={i + 1 !== res.length} onPress={() => navigation.navigate("CityScreen", {lat: e.coord.lat, lon: e.coord.lon})}>
                                        <Icon prov="mi" name="location-city" size={30}/>
                                        <ListItem.Content style={styles.listItem}>
                                            <ListItem.Title style={styles.text}>
                                                {e.name}, {e.sys.country}
                                            </ListItem.Title>
                                            <ListItem.Subtitle style={styles.textSmall}>
                                                {e.main.temp.toFixed(1)} °C | {e.weather[0].description}
                                            </ListItem.Subtitle>
                                        </ListItem.Content>
                                        <ListItem.Chevron/>
                                    </ListItem>
                                })
                        }
                    </View>
                    : null
                    : <ActivityIndicator size={50} color="#0000ff"/>
            }
        </MView>
    </View>
}

