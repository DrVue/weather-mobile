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
            fontFamily: "ProductSans",
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
        container: {},
        title: {
            fontSize: 40,
            textAlign: "center",
            fontFamily: "ProductSans",
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
            // backgroundColor: colorScheme === "dark" ? "#333" : "#ddd",
            paddingTop: 100,
            paddingBottom: 10,
            paddingLeft: 10,
            paddingRight: 10,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            zIndex: 2,
            // height: 450,
            flex: 1,
            alignItems: "flex-start",
        },
        card: {
            // backgroundColor: colorScheme === "dark" ? "#333" : "#ddd",
            // paddingLeft: 10,
            // paddingRight: 10,
            // paddingTop: 10,
            // paddingBottom: 10,
            // borderRadius: 28,
            margin: 10,
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
                <ListItem style={styles.listItem} containerStyle={styles.listItem}>
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

                <ListItem style={styles.listItem} containerStyle={styles.listItem}>
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

                <ListItem style={styles.listItem} containerStyle={styles.listItem}>
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

                <ListItem style={styles.listItem} containerStyle={styles.listItem}>
                    <Icon prov="mci" name="react" size={30}/>
                    <ListItem.Content style={styles.listItem}>
                        <ListItem.Title style={styles.text}>
                            Версия React Native
                        </ListItem.Title>
                        <ListItem.Subtitle style={styles.textSmall}>
                            0.64.3
                        </ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>

                <ListItem style={styles.listItem} containerStyle={styles.listItem}>
                    <Icon prov="mi" name="settings" size={30}/>
                    <ListItem.Content style={styles.listItem}>
                        <ListItem.Title style={styles.text}>
                            Версия Expo SDK
                        </ListItem.Title>
                        <ListItem.Subtitle style={styles.textSmall}>
                            44.0.0
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
                            1.3.0 alpha
                        </ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </MView>
            <MView style={{marginTop: 30}}/>
            <MView>
                <Text style={{fontFamily: "ProductSans", textAlign: "left", paddingLeft: 10, fontSize: 40}}>Dr.Vue</Text>
                <MView style={{flex: 1, flexDirection: "row", justifyContent: "flex-start"}}>
                    <Button type="clear" icon={<Icon prov="mci" name="github" size={30}/>}
                            onPress={() => openURL("https://github.com/drvue")}/>
                </MView>
                <Text style={{fontFamily: "ProductSans", textAlign: "left", paddingLeft: 10}}>Copyright © 2021 Dr.Vue. All rights reserved</Text>
            </MView>
        </View>
    );
}
