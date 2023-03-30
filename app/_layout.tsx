import { useColorScheme } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "../theme";
import { Stack } from "expo-router";

export default function IndexLayout() {
	const isDark = useColorScheme() === "dark";

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
