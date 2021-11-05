import {Linking, Platform, StyleSheet, useColorScheme} from "react-native";

import {MView, Text, View, Icon} from "../components/Themed";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React from "react";
import {Button, ListItem} from "react-native-elements";
import WeatherAPI from "../api";

export default function TabTwoScreen({route}) {
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        text: {
            color: colorScheme === "dark" ? "#fff" : "#000",
        },
        listItem: {
            backgroundColor: "transparent",
            // borderColor: colorScheme === "dark" ? "#000" : "#fff",
            color: colorScheme === "dark" ? "#fff" : "#000",
        },
        textSmall: {
            color: colorScheme === "dark" ? "gray" : "gray",
        },
        container: {},
        title: {
            fontSize: 40,
            textAlign: "center",
        },
        separator: {
            marginVertical: 30,
            height: 1,
            width: "80%",
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
        card: {
            backgroundColor: colorScheme === "dark" ? "#333" : "#ddd",
            borderRadius: 20,
            padding: 5,
        },
    });

    function openURL(url) {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            }
        })
    }

    return (
        <View>
            <MView style={styles.firstView}>
                <Icon prov="mci" name="weather-cloudy" size={100}/>
                <Text style={styles.title}>О приложении</Text>
            </MView>
            <MView style={{marginTop: 30}}/>
            <MView style={styles.card}>
                <ListItem style={styles.listItem} containerStyle={styles.listItem} bottomDivider>
                    <Icon prov="mi" name="face" size={30}/>
                    <ListItem.Content style={styles.listItem}>
                        <ListItem.Title style={styles.text}>
                            Автор
                        </ListItem.Title>
                        <ListItem.Subtitle style={styles.textSmall}>
                            Ivan "DrVue" Panasyuk
                        </ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>

                <ListItem style={styles.listItem} containerStyle={styles.listItem} bottomDivider>
                    <Icon prov="mci" name="weather-cloudy" size={30}/>
                    <ListItem.Content style={styles.listItem}>
                        <ListItem.Title style={styles.text}>
                            Источник данных
                        </ListItem.Title>
                        <ListItem.Subtitle style={styles.textSmall}>
                            OpenWeatherMap
                        </ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>

                <ListItem style={styles.listItem} containerStyle={styles.listItem} bottomDivider>
                    <Icon prov="mci" name="react" size={30}/>
                    <ListItem.Content style={styles.listItem}>
                        <ListItem.Title style={styles.text}>
                            Версия React
                        </ListItem.Title>
                        <ListItem.Subtitle style={styles.textSmall}>
                            17.0.1
                        </ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>

                <ListItem style={styles.listItem} containerStyle={styles.listItem} bottomDivider>
                    <Icon prov="mci" name="react" size={30}/>
                    <ListItem.Content style={styles.listItem}>
                        <ListItem.Title style={styles.text}>
                            Версия React Native
                        </ListItem.Title>
                        <ListItem.Subtitle style={styles.textSmall}>
                            0.64.2
                        </ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>

                <ListItem style={styles.listItem} containerStyle={styles.listItem} bottomDivider>
                    <Icon prov="mi" name="settings" size={30}/>
                    <ListItem.Content style={styles.listItem}>
                        <ListItem.Title style={styles.text}>
                            Версия Expo SDK
                        </ListItem.Title>
                        <ListItem.Subtitle style={styles.textSmall}>
                            43.0.0
                        </ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>

                <ListItem style={styles.listItem} containerStyle={styles.listItem}>
                    <Icon prov="mci" name="application" size={30}/>
                    <ListItem.Content style={styles.listItem}>
                        <ListItem.Title style={styles.text}>
                            Версия приложения
                        </ListItem.Title>
                        <ListItem.Subtitle style={styles.textSmall}>
                            1.0.0 beta
                        </ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </MView>
            <MView style={{marginTop: 30}}/>
            <MView>
                <Button type="clear" icon={<Icon prov="mci" name="github" size={30}/>}
                        onPress={() => openURL("https://github.com/drvue")}/>
            </MView>
        </View>
    );
}
