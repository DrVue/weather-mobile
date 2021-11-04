import {Linking, Platform, StyleSheet, useColorScheme} from "react-native";

import {MView, Text, View, Icon} from "../components/Themed";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React from "react";
import {Button, ListItem} from "react-native-elements";

export default function TabTwoScreen({route}) {
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        text: {
            color: colorScheme === "dark" ? "#fff" : "#000",
        },
        listItem: {
            backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
            // borderColor: colorScheme === "dark" ? "#000" : "#fff",
            color: colorScheme === "dark" ? "#fff" : "#000",
        },
        textSmall: {
            color: colorScheme === "dark" ? "gray" : "gray",
        },
        container: {},
        title: {
            fontSize: 20,
            fontWeight: "bold",
        },
        separator: {
            marginVertical: 30,
            height: 1,
            width: "80%",
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
            <MView style={{marginTop: 30}}/>
            <View style={styles.container} contentContainerStyle={{
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-start",
            }}>
                <Icon prov="mci" size={100} style={{marginBottom: -3}} name="weather-cloudy" color="white"/>
                <Text style={styles.title}>О приложении "Погода"</Text>
            </View>
            <MView style={{marginTop: 30}}/>
            <ListItem style={styles.listItem} containerStyle={styles.listItem} bottomDivider topDivider>
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

            <ListItem style={styles.listItem} containerStyle={styles.listItem} bottomDivider>
                <Icon prov="mci" name="application" size={30}/>
                <ListItem.Content style={styles.listItem}>
                    <ListItem.Title style={styles.text}>
                        Версия приложения
                    </ListItem.Title>
                    <ListItem.Subtitle style={styles.textSmall}>
                        0.6.0 alpha
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
            <MView style={{marginTop: 30}}/>
            <MView>
                <Button type="clear" icon={<Icon prov="mci" name="github" size={30}/>}
                        onPress={() => openURL("https://github.com/drvue")}/>
            </MView>
        </View>
    );
}
