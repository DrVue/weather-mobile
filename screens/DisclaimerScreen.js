import {StyleSheet, useColorScheme} from "react-native";
import {Icon, MView, Text, View} from "../components/Themed";
import {Button} from "react-native-elements";
import React from "react";

export default function DisclaimerScreen({route, navigation}) {
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        card: {
            alignItems: "flex-start",
            padding: 10,
            margin: 10,
            backgroundColor: colorScheme === "dark" ? "#333" : "#ddd",
            borderRadius: 28,
        },
        cardButton: {
            alignItems: "center",
            padding: 10,
            margin: 10,
            borderRadius: 28,
        },
        cardTextBig: {
            fontSize: 40,
            fontFamily: "ProductSans"
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
            fontFamily: "ProductSans"
        },
        text: {
            textAlignVertical: "top",
            fontFamily: "ProductSans"
        },
        secondView: {
            backgroundColor: colorScheme === "dark" ? "black" : "white",
            paddingTop: 10,
            paddingBottom: 10,
            bottom: 20,
        },
        firstView: {
            paddingTop: 100,
            paddingBottom: 10,
            paddingLeft: 10,
            paddingRight: 10,
            zIndex: 2,
            flex: 1,
            alignItems: "flex-start",
        },
        bigText: {
            fontSize: 20,
            margin: 10,
        }
    });

    return <View style={{flex: 1, flexDirection: "column"}}>
        <MView style={styles.firstView}>
            <Icon prov="mci" name="weather-partly-lightning" color="white" size={100}/>
            <Text style={styles.title}>К прочтению</Text>
        </MView>
        <MView style={styles.secondView}>
            <Text style={styles.bigText}>Данное приложение разрабатывается Иваном Панасюк (далее - Автор) и находится в ранней стадии разработки. По этому здесь всё может измениться по усмотрению Автора.</Text>

            <Text style={styles.bigText}>Все данные о погодных условиях приложение получает из сторонних источников (OpenWeatherMap) и туда передаются данные обезличенные данные о местоположении.</Text>

            <Text style={styles.bigText}>Так же данные о погодных условиях могут быть не точными, либо не соответствовать действительности, так как данные собираются сообществом (OpenWeatherMap)</Text>
        </MView>
        <MView style={{flexGrow: 1,}}/>
    </View>;
}