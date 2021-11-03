import React, {useState, useEffect} from "react";
import {SearchBar, ListItem} from "react-native-elements";
import axios from "react-native-axios";
import {Text, View} from "../components/Themed";
import {StyleSheet} from "react-native";

export default function SearchScreen ({navigation}) {
    const [isLoading, setIsLoading] = useState(false);
    const [res, setRes] = useState([]);
    const [city, setCity] = useState("");

    function getWeather() {
        setIsLoading(true);

        axios.post("http://192.168.1.40:3001/find", {
            city: city,
        }).then((d) => {
            setRes(d.data.list);
            setIsLoading(false);
        })
    }

    function handleChange (text) {
        setCity(text);
        getWeather();
    }

    return <View>
            <SearchBar
                placeholder="Поиск по городу..."
                onChangeText={text => setCity(text)}
                onSubmitEditing={getWeather}
                value={city}
                lightTheme={true}
                platform="android"
            />

        {
            !isLoading
                ? <View>
                    {
                        res.map((e, i) => {
                            return <ListItem key={i} bottomDivider onPress={() => navigation.navigate("TabOneScreen", {city: e.name})}>
                                <ListItem.Content>
                                    <ListItem.Title>
                                        {e.name}, {e.sys.country}
                                    </ListItem.Title>
                                    <ListItem.Subtitle style={styles.whiteText}>
                                        {e.main.temp.toFixed(1)} °C | {e.weather[0].description}
                                    </ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                        })
                    }
                </View>
                : <Text>Loading...</Text>
        }
    </View>
}

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
    whiteText: {
        color: "gray",
    },
});