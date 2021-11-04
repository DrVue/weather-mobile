import {ActivityIndicator, StyleSheet, useColorScheme} from "react-native";
import {Icon, MView, Text} from "../components/Themed";
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
            fontWeight: "bold",
            fontSize: 20,
        },
        text: {
            textAlignVertical: "top",
        }
    });

    return <MView>
        <MView style={{marginTop: 60}}/>
        <Button title="Назад" buttonStyle={styles.card} onPress={() => navigation.goBack()}/>
        <MView>
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
    </MView>;
}