import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {NativeBaseProvider} from "native-base";

import { useLoadedAssets } from "./hooks/useLoadedAssets";
import Navigation from "./navigation";
import { useColorScheme, SafeAreaView } from "react-native";


export default function App() {
    const isLoadingComplete = useLoadedAssets();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <NativeBaseProvider>
                    <Navigation colorScheme={colorScheme} />
                    <StatusBar />
                </NativeBaseProvider>
            </SafeAreaProvider>
        );
    }
}
