import {StyleSheet, useColorScheme} from "react-native";
import {Icon, MView, Text, View} from "../components/Themed";
import {Button} from "react-native-elements";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WelcomeScreen({route, navigation}) {
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
            <Text style={styles.title}>Добро пожаловать в Погода</Text>
        </MView>
        <MView style={styles.secondView}>

                <Text style={styles.bigText}>Получайте актуальную информацию о погоде в текущий момент и проноз на день в вашем или других городах</Text>

            {/*<Button buttonStyle={styles.cardButton} titleStyle={{fontFamily: "ProductSans"}} title="Начать" onPress={() => {AsyncStorage.setItem("@welcome", "true"); navigation.push("TabOneScreen")}}/>*/}
        </MView>
        <MView style={{flexGrow: 1,}}/>
        <Button buttonStyle={styles.cardButton} titleStyle={{fontFamily: "ProductSans"}} title="Начать" onPress={() => {AsyncStorage.setItem("@welcome", "true"); navigation.push("TabOneScreen")}}/>
    </View>;
}