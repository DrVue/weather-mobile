import {ActivityIndicator, StyleSheet, useColorScheme} from "react-native";
import {Icon, MView, Text, View} from "../components/Themed";
import {Button} from "react-native-elements";
import React from "react";

export default function AlertsScreen({route, navigation}) {
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        card: {
            // flex: 1,
            alignItems: "center",
            padding: 10,
            marginTop: 5,
            marginBottom: 5,
            width: "100%",
            backgroundColor: colorScheme === "dark" ? "#333" : "#ddd",
            // backgroundColor: colorScheme === "dark" ? "#fa0" : "#fa0",
            borderRadius: 20,
        },
        cardTextBig: {
            fontSize: 40,
        },
        containerLoading: {
            flex: 1,
            paddingTop: 10,
            paddingLeft: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
        },
        title: {

            fontSize: 40,
        },
        text: {
            textAlignVertical: "top",
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
            <Text style={styles.title}>Информация</Text>
        </MView>
        <MView style={styles.secondView}>
            {
                route.params.alerts !== []
                    ? <MView>
                        {
                            route.params.alerts[0] && route.params.alerts[0].description !== ""
                                ? <MView style={styles.card}>
                                    <Icon prov="mci" size={80} name="alert"/>
                                    <Text style={styles.title}>{route.params.alerts[0].event}</Text>
                                    <Text style={styles.text}>{route.params.alerts[0].description}</Text>
                                </MView>
                                : null
                        }
                        {
                            route.params.alerts[1] && route.params.alerts[1].description !== ""
                                ? <MView style={styles.card}>
                                    <Icon prov="mci" size={80} name="alert"/>
                                    <Text style={styles.title}>{route.params.alerts[1].event}</Text>
                                    <Text style={styles.text}>{route.params.alerts[1].description}</Text>
                                </MView>
                                : null
                        }
                        {
                            route.params.alerts[2] && route.params.alerts[2].description !== ""
                                ? <MView style={styles.card}>
                                    <Icon prov="mci" size={80} name="alert"/>
                                    <Text style={styles.title}>{route.params.alerts[2].event}</Text>
                                    <Text style={styles.text}>{route.params.alerts[2].description}</Text>
                                </MView>
                                : null
                        }
                    </MView>
                    : null
            }
        </MView>
    </View>;
}