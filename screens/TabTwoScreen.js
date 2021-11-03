import {Platform, StyleSheet} from "react-native";

import {Text, View} from "../components/Themed";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export default function TabTwoScreen({route}) {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons size={100} style={{marginBottom: -3}} name="weather-cloudy" color="white"/>
            <Text style={styles.title}>О приложении "Погода"</Text>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <Text
                style={styles.getStartedText}
                lightColor="rgba(0,0,0,0.8)"
                darkColor="rgba(255,255,255,0.8)"
            >
                Автор - Ivan "DrVue" Panasyuk
            </Text>
            <Text
                style={styles.getStartedText}
                lightColor="rgba(0,0,0,0.8)"
                darkColor="rgba(255,255,255,0.8)"
            >
                Создано с помощью React Native!
            </Text>
            <Text
                style={styles.getStartedText}
                lightColor="rgba(0,0,0,0.8)"
                darkColor="rgba(255,255,255,0.8)"
            >
                Данные предоставлены OpenWeatherMap
            </Text>
            <Text
                style={styles.getStartedText}
                lightColor="rgba(0,0,0,0.8)"
                darkColor="rgba(255,255,255,0.8)"
            >
                v 0.4.0
            </Text>
        </View>
    );
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
});
