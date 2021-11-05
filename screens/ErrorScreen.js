import {StyleSheet, useColorScheme} from "react-native";
import {Icon, MView, Text, View} from "../components/Themed";
import {Button} from "react-native-elements";
import React from "react";

export default function ErrorScreen({route, navigation}) {
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
        cardButton: {
            // flex: 1,
            alignItems: "center",
            padding: 10,
            marginTop: 5,
            marginBottom: 5,
            width: "100%",
            // backgroundColor: colorScheme === "dark" ? "#333" : "#ddd",
            // backgroundColor: colorScheme === "dark" ? "#fa0" : "#fa0",
            borderRadius: 20,
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
            paddingTop: 30,
            bottom: 20,
        },
        firstView: {
            backgroundColor: colorScheme === "dark" ? "red" : "red",
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
            <Icon prov="mci" name="wifi-off" color="white" size={100}/>
            <Text style={styles.title}>Ошибка</Text>
        </MView>
        <MView style={styles.secondView}>
            <MView style={styles.card}>
                <Text>Отсутствует подключение к серверу</Text>
            </MView>
            <Button buttonStyle={styles.cardButton} titleStyle={{fontFamily: "ProductSans"}} title="Перезагрузка" icon={<Icon prov="mci" name="reload" size={20}/>} onPress={() => navigation.push("TabOneScreen")}/>
        </MView>
    </View>;
}