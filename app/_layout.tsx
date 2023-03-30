import { useColorScheme } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "../theme";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useAssets } from "expo-asset";
import { FontAwesome5 } from "@expo/vector-icons";

export default function IndexLayout() {
	const isDark = useColorScheme() === "dark";

	const [fontsLoaded] = useFonts(FontAwesome5.font);
	// const [assetsLoaded] = useAssets([require("../assets/images/coins.png")]);

	if (!fontsLoaded) return <SplashScreen />;

	return (
		<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			/>
		</ThemeProvider>
	);
}
