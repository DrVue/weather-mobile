import React, {useState, useEffect} from "react";
import {Text, View, MView, Icon} from "./Themed";
import moment from "moment";
import WeatherAPI from "../api";
import {ActivityIndicator, StyleSheet, useColorScheme} from "react-native";
import {LinearProgress, Button} from "react-native-elements";
import {MaterialIcons} from "@expo/vector-icons";

function WindLinear(props) {
    function getScore(wind = props.wind) {
        if (wind <= 0.29) {
            return {
                score: 0,
                value: 0,
                title: "Штиль. Безветрие. Дым поднимается вертикально, листья деревьев неподвижны.",
                color: "#00acff",
            }
        } else if (wind <= 1.59) {
            return {
                score: 1,
                title: "Тихий. Направление ветра заметно по относу дыма, но не по флюгеру.",
                color: "#00acff",
                value: 0.08,
            }
        } else if (wind <= 3.39) {
            return {
                score: 2,
                title: "Лёгкий. Движение ветра ощущается лицом, шелестят листья, приводится в движение флюгер.",
                color: "#00acff",
                value: 0.16,
            }
        } else if (wind <= 5.49) {
            return {
                score: 3,
                title: "Слабый. Листья и тонкие ветви деревьев всё время колышутся, ветер развевает лёгкие флаги.",
                color: "#00acff",
                value: 0.24,
            }
        } else if (wind <= 7.79) {
            return {
                score: 4,
                title: "Умеренный. Ветер поднимает пыль и мусор, приводит в движение тонкие ветви деревьев.",
                color: "#001dff",
                value: 0.33,
            }
        } else if (wind <= 10.79) {
            return {
                score: 5,
                title: "Свежий. Качаются тонкие стволы деревьев, движение ветра ощущается рукой.",
                color: "#001dff",
                value: 0.41,
            }
        } else if (wind <= 13.89) {
            return {
                score: 6,
                title: "Сильный. Качаются толстые сучья деревьев, гудят телеграфные провода.",
                color: "orange",
                value: 0.49,
            }
        } else if (wind <= 17.19) {
            return {
                score: 7,
                title: "Крепкий. Гнутся стволы деревьев, трудно идти против ветра.",
                color: "orange",
                value: 0.58,
            }
        } else if (wind <= 20.79) {
            return {
                score: 8,
                title: "Очень крепкий. Ветер ломает сучья деревьев, идти против ветра очень трудно.",
                color: "orange",
                value: 0.66,
            }
        } else if (wind <= 24.49) {
            return {
                score: 9,
                title: "Шторм. Небольшие повреждения, ветер начинает разрушать крыши зданий.",
                color: "red",
                value: 0.74,
            }
        } else if (wind <= 28.49) {
            return {
                score: 10,
                title: "Сильный шторм. Значительные разрушения строений, ветер вырывает деревья с корнем.",
                color: "red",
                value: 0.83,
            }
        } else if (wind <= 32.69) {
            return {
                score: 11,
                title: "Жестокий шторм. Большие разрушения на значительном пространстве. Наблюдается очень редко.",
                color: "red",
                value: 0.91,
            }
        } else if (wind >= 32.7) {
            return {
                score: 12,
                title: "Ураган. Огромные разрушения, серьёзно повреждены здания, строения и дома, деревья вырваны с корнями.",
                color: "black",
                value: 1,
            }
        }
    }

    return <View style={{backgroundColor: "transparent"}}>
        <LinearProgress style={{
            borderRadius: 5,
            height: 10,
        }} value={getScore().value} color={getScore().color} variant="determinate"/>
        <Text style={{marginTop: 5, backgroundColor: "transparent", fontFamily: "ProductSans"}}>{getScore().title}</Text>
    </View>
}

function Card(props) {
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        card: {
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 28,
            margin: 10,
            // width: "100%",
            // backgroundColor: colorScheme === "dark" ? "#333" : "#ddd",
            // borderRadius: 20,
        },
        cardTextBig: {
            fontSize: 40,
            fontFamily: "ProductSans",
        },
        title: {
            fontFamily: "ProductSans",
            paddingBottom: 5,
            fontSize: 15,
        },
        text: {
            fontFamily: "ProductSans",
        },
    });

    return <View style={styles.card}>
        {/*<Text style={styles.title}>{props.title}</Text>*/}
        <Text style={styles.cardTextBig}>{props.icon} {props.value}</Text>
        {props.children}
    </View>
}

function CardFiveDays(props) {
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        card: {
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 28,
            margin: 10,
            backgroundColor: colorScheme === "dark" ? "#333" : "#ddd",
            // borderRadius: 20,
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
            fontFamily: "ProductSans",
            paddingBottom: 5,
            fontSize: 15,
        },
        text: {
            fontFamily: "ProductSans"
        },
    });

    function Day(props) {
        // console.log()
        const colorScheme = useColorScheme();

        // console.log(props.daily);

        return <MView style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            borderRightWidth: props.end ? 0 : 1,
            borderRightColor: colorScheme === "dark" ? "rgba(255,255,255,0.1)" : "#eee",
            borderRightStyle: "solid",
        }}>
            <Text style={styles.text}>{moment(props.daily.dt, "X").format("DD/MM")}</Text>
            {WeatherAPI.getIconWeather(props.daily.weather[0].id, props.daily.weather[0].icon, colorScheme === "dark" ? "white" : "black", 40)}
            <Text style={styles.text}>{props.daily.main.temp_max.toFixed(0)} °C</Text>

            {/*<Text style={styles.text}>{props.daily.main.temp_min.toFixed(1)} °C</Text>*/}
        </MView>
    }

    function InDay(props) {
        const colorScheme = useColorScheme();

        return <MView style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            borderRightWidth: props.end ? 0 : 1,
            borderRightColor: colorScheme === "dark" ? "rgba(255,255,255,0.1)" : "#eee",
            borderRightStyle: "solid",
        }}>
            <Text style={styles.text}>{props.text}</Text>
            {WeatherAPI.getIconWeather(props.w.weather[0].id, props.w.weather[0].icon, colorScheme === "dark" ? "white" : "black", 40)}
            <Text style={styles.text}>{props.temp.toFixed(1)} °C</Text>
        </MView>
    }

    return <MView>
        <MView style={styles.card}>
            <Text style={styles.title}>Прогноз на пять дней</Text>
            {
                !props.isLoading
                    ? <MView style={{
                        flex: 1,
                        flexDirection: "row",
                        backgroundColor: "transparent",
                    }}>
                        <Day daily={props.daily[3]}/>
                        <Day daily={props.daily[11]}/>
                        <Day daily={props.daily[19]}/>
                        <Day daily={props.daily[27]}/>
                        <Day daily={props.daily[35]} end/>
                    </MView>
                    : <MView style={styles.containerLoading}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </MView>
            }
        </MView>
        <MView style={styles.card}>
            <Text style={styles.title}>В течении дня</Text>
            {
                !props.isLoading
                    ? <MView style={{
                        flex: 1,
                        flexDirection: "row",
                        backgroundColor: "transparent",
                    }}>
                        <InDay temp={props.daily[0].main.temp} w={props.daily[0]} text="Ночь"/>
                        <InDay temp={props.daily[2].main.temp} w={props.daily[2]} text="Утро"/>
                        <InDay temp={props.daily[5].main.temp} w={props.daily[5]} text="День"/>
                        <InDay temp={props.daily[6].main.temp} w={props.daily[6]} text="Вечер" end/>
                    </MView>
                    : <MView style={styles.containerLoading}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </MView>
            }
        </MView>
    </MView>
}

function WeatherPage({weather, route, navigation, loc, weatherPeriod, isLoadingPeriod}) {
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        card: {
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 28,
            margin: 10,
            // width: "100%",
            // backgroundColor: colorScheme === "dark" ? "#333" : "#ddd",
            // borderRadius: 20,
        },
        cardButtonWarning: {
            alignItems: "center",
            padding: 10,
            margin: 10,
            borderRadius: 28,
            backgroundColor: "orange",
        },
        title: {
            fontSize: 30,
            // fontWeight: "bold",
            textAlign: "center",
            color: "#fff",
            fontFamily: "ProductSans",
        },
        text: {
            textAlign: "center",
            color: "#fff",
            fontFamily: "ProductSans",
        },
        googleSans: {
            fontFamily: "ProductSans"
        },
        tempText: {
            fontSize: 50,
            textAlign: "center",
            color: "#fff",
            fontFamily: "ProductSans"
        },
        textDesc: {
            fontSize: 20,
            textAlign: "center",
            color: "#fff",
            fontFamily: "ProductSans"
        },
        tempMiniText: {},
        separator: {
            marginVertical: 20,
            // margin: 40,
            height: 1,
            width: "100%",
        },
        secondView: {
            backgroundColor: colorScheme === "dark" ? "black" : "white",
            // paddingTop: 10,
            // bottom: 20,
        },
        firstView: {
            backgroundColor: WeatherAPI.getColor(weather.weather[0].id, weather.weather[0].icon),
            // paddingTop: 50,
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: 28,
            margin: 10,
            zIndex: 2,
            textAlign: "left",
            alignItems: "flex-start",
            // height: 350,
        },
    });

    // console.log(props.weatherPeriod.alerts)

    return <View>
        <MView style={{marginTop: 80}}/>
        <MView style={styles.firstView}>
            <Text
                style={styles.tempText}>{WeatherAPI.getIconWeather(weather.weather[0].id, weather.weather[0].icon, colorScheme === "dark" ? "white" : "white", 100)}</Text>
            <Text
                style={styles.tempText}>{weather.main.temp.toFixed(1)} °C</Text>
            {/*<MView style={{marginTop: 30}}/>*/}
            <Text style={styles.title}>
                {
                    loc
                        ? <MaterialIcons name="location-on" size={15} color="white"/>
                        : null
                }
            {weather.name} ({weather.sys.country})</Text>
            <Text style={styles.textDesc}>{weather.weather[0].description}</Text>
            <Text style={styles.textDesc}>{weather.main.temp_min.toFixed(1)} °C
                / {weather.main.temp_max.toFixed(1)} °C</Text>
            <Text style={styles.textDesc}>Ощущается как {weather.main.feels_like.toFixed(0)} °C</Text>
            <MView style={{marginTop: 10}}/>
        </MView>
        <Button buttonStyle={styles.cardButtonWarning} titleStyle={{fontFamily: "ProductSans"}} title="К прочтению" onPress={() => {navigation.push("DisclaimerScreen")}}/>
        <MView style={styles.secondView}>
            {
                !isLoadingPeriod
                    ? <MView>
                        {
                            weatherPeriod.alerts
                                ? <Button buttonStyle={styles.card} titleStyle={{color: colorScheme === "dark" ? "white" : "black", fontFamily: "ProductSans"}} title="Служебная информация" icon={<Icon prov="mci" size={20} name="alert"/>} onPress={() => navigation.navigate("AlertsScreen", {alerts: weatherPeriod.alerts})}/>
                                : null
                        }
                    </MView>
                    : null
            }
            <CardFiveDays daily={weatherPeriod} isLoading={isLoadingPeriod}/>
            <Card title="Ветер"
                  value={`${weather.wind.speed} м/с ${WeatherAPI.getWind(weather.wind.deg)}`}
                  icon={<Icon prov="mci" size={40} name="weather-windy"/>}
            >
                <WindLinear wind={weather.wind.speed}/>
            </Card>
            <Card
                title="Давление"
                value={`${(weather.main.pressure / 1.333).toFixed(1)} мм.рт.ст.`}
                icon={<Icon prov="mci" size={40} name="speedometer-medium"/>}
            />
            <Card
                title="Влажность" value={`${weather.main.humidity} %`}
                icon={<Icon prov="mci" size={40} name="water-percent"/>}
            >
                <LinearProgress
                    style={{
                        borderRadius: 5,
                        height: 10,
                    }}
                    value={weather.main.humidity / 100} color="#00acff" variant="determinate"/>
            </Card>
            <Card
                style={styles.card}
                title="Восход\Закат"
                value={`${moment(weather.sys.sunrise, "X").format("HH:mm")} - ${moment(weather.sys.sunset, "X").format("HH:mm")}`}
                icon={<Icon prov="mci" size={40} name="weather-sunset"/>}
            />

        </MView>
        <MView style={{marginTop: 30}}/>
    </View>
}

export default WeatherPage;