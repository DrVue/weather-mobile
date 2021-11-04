import React, {useState, useEffect} from "react";
import {Text, View, MView, Icon} from "./Themed";
import moment from "moment";
import WeatherAPI from "../api";
import {ActivityIndicator, StyleSheet, useColorScheme} from "react-native";
import {LinearProgress, Button} from "react-native-elements";
import axios from "react-native-axios";

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
        <Text style={{marginTop: 5, backgroundColor: "transparent"}}>{getScore().title}</Text>
    </View>
}

function Card(props) {
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        card: {
            padding: 10,
            marginTop: 5,
            marginBottom: 5,
            width: "100%",
            backgroundColor: colorScheme === "dark" ? "#333" : "#ddd",
            borderRadius: 20,
        },
        cardTextBig: {
            fontSize: 40,
        },
        title: {
            fontWeight: "bold",
        }
    });

    return <View style={styles.card}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.cardTextBig}>{props.icon} {props.value}</Text>
        {props.children}
    </View>
}

function Alerts(props) {
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        card: {
            flex: 1,
            alignItems: "center",
            padding: 10,
            marginTop: 5,
            marginBottom: 5,
            width: "100%",
            backgroundColor: colorScheme === "dark" ? "#fa0" : "#fa0",
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
        {
            !props.isLoading
                ? <MView>
                    {
                        props.weather.alerts
                            ? <MView>
                                {
                                    props.weather.alerts[0] && props.weather.alerts[0].description !== ""
                                        ? <MView style={styles.card}>
                                            <Icon prov="mci" size={80} name="alert"/>
                                            <Text style={styles.title}>{props.weather.alerts[0].event}</Text>
                                            <Text style={styles.text}>{props.weather.alerts[0].description}</Text>
                                        </MView>
                                        : null
                                }
                                {
                                    props.weather.alerts[1] && props.weather.alerts[1].description !== ""
                                        ? <MView style={styles.card}>
                                            <Icon prov="mci" size={80} name="alert"/>
                                            <Text style={styles.title}>{props.weather.alerts[1].event}</Text>
                                            <Text style={styles.text}>{props.weather.alerts[1].description}</Text>
                                        </MView>
                                        : null
                                }
                                {
                                    props.weather.alerts[2] && props.weather.alerts[2].description !== ""
                                        ? <MView style={styles.card}>
                                            <Icon prov="mci" size={80} name="alert"/>
                                            <Text style={styles.title}>{props.weather.alerts[2].event}</Text>
                                            <Text style={styles.text}>{props.weather.alerts[2].description}</Text>
                                        </MView>
                                        : null
                                }
                            </MView>
                            : null
                    }
                </MView>
                : <MView style={styles.containerLoading}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </MView>
        }
    </MView>
}

function CardFiveDays(props) {
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        card: {
            padding: 10,
            marginTop: 5,
            marginBottom: 5,
            width: "100%",
            backgroundColor: colorScheme === "dark" ? "#333" : "#ddd",
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
        }
    });

    function Day(props) {
        const colorScheme = useColorScheme();

        console.log(props.daily);

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
            <Text>{moment(props.daily.dt, "X").format("DD/MM")}</Text>
            {WeatherAPI.getIconWeather(props.daily.weather[0].id, props.daily.weather[0].icon, colorScheme === "dark" ? "white" : "black", 40)}
            <Text>{props.daily.temp.max.toFixed(1)} °C</Text>
            <View
                style={{
                    marginVertical: 1,
                    // margin: 40,
                    height: 1,
                    width: "50%",
                }}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <Text>{props.daily.temp.min.toFixed(1)} °C</Text>
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
            <Text>{props.text}</Text>
            {WeatherAPI.getIconWeather(props.w.weather[0].id, props.w.weather[0].icon, colorScheme === "dark" ? "white" : "black", 40)}
            <Text>{props.temp.toFixed(1)} °C</Text>
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
                        <Day daily={props.daily.daily[1]}/>
                        <Day daily={props.daily.daily[2]}/>
                        <Day daily={props.daily.daily[3]}/>
                        <Day daily={props.daily.daily[4]}/>
                        <Day daily={props.daily.daily[5]} end/>
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
                        <InDay temp={props.daily.daily[0].temp.night} w={props.daily.daily[0]} text="Ночь"/>
                        <InDay temp={props.daily.daily[0].temp.morn} w={props.daily.daily[0]} text="Утро"/>
                        <InDay temp={props.daily.daily[0].temp.day} w={props.daily.daily[0]} text="День"/>
                        <InDay temp={props.daily.daily[0].temp.eve} w={props.daily.daily[0]} text="Вечер" end/>
                    </MView>
                    : <MView style={styles.containerLoading}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </MView>
            }
        </MView>
    </MView>
}

function WeatherPage(props) {
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        title: {
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
        },
        text: {
            textAlign: "center",
        },
        tempText: {
            fontSize: 50,
            textAlign: "center",
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
            paddingTop: 10,
            paddingLeft: 10,
            paddingRight: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            bottom: 20,
        },
        firstView: {
            backgroundColor: "gray",
            paddingTop: 10,
            paddingLeft: 10,
            paddingRight: 10,
        }
    });

    return <View>
        <MView style={styles.firstView}>
            <MView style={{marginTop: 30}}/>
            <Text
                style={styles.tempText}>{WeatherAPI.getIconWeather(props.weather.weather[0].id, props.weather.weather[0].icon, colorScheme === "dark" ? "white" : "black", 100)}</Text>
            <Text
                style={styles.tempText}>{props.weather.main.temp.toFixed(1)} °C</Text>
            <MView style={{marginTop: 30}}/>
            <Text style={styles.title}>{props.weather.name} ({props.weather.sys.country})</Text>
            <Text style={styles.text}>{props.weather.weather[0].description}</Text>
            <Text style={styles.text}>{props.weather.main.temp_min.toFixed(1)} °C
                / {props.weather.main.temp_max.toFixed(1)} °C</Text>
            <Text style={styles.text}>Ощущается как {props.weather.main.feels_like.toFixed(1)} °C</Text>
            <MView style={{marginTop: 30}}/>
        </MView>
        <MView style={styles.secondView}>
            <Alerts weather={props.weatherPeriod} isLoading={props.isLoadingPeriod}/>
            <Card title="Ветер"
                  value={`${props.weather.wind.speed} м/с ${WeatherAPI.getWind(props.weather.wind.deg)}`}
                  icon={<Icon prov="mci" size={40} name="weather-windy"/>}
            >
                <WindLinear wind={props.weather.wind.speed}/>
            </Card>
            <Card
                title="Давление"
                value={`${(props.weather.main.pressure / 1.333).toFixed(2)} мм.рт.ст.`}
                icon={<Icon prov="mci" size={40} name="speedometer-medium"/>}
            />
            <Card
                title="Влажность" value={`${props.weather.main.humidity} %`}
                icon={<Icon prov="mci" size={40} name="water-percent"/>}
            >
                <LinearProgress
                    style={{
                        borderRadius: 5,
                        height: 10,
                    }}
                    value={props.weather.main.humidity / 100} color="#00acff" variant="determinate"/>
            </Card>
            <Card
                title="Восход\Закат"
                value={`${moment(props.weather.sys.sunrise, "X").format("HH:mm")} - ${moment(props.weather.sys.sunset, "X").format("HH:mm")}`}
                icon={<Icon prov="mci" size={40} name="weather-sunset"/>}
            />
            <CardFiveDays daily={props.weatherPeriod} isLoading={props.isLoadingPeriod}/>
        </MView>
        <MView style={{marginTop: 30}}/>
    </View>
}

export default WeatherPage;