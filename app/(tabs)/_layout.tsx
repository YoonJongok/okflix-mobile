import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { themeColors } from "../../theme";
import { FontAwesome5 } from "@expo/vector-icons";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import React from "react";

const TabsLayout: React.FC = () => {
	const isDark = useColorScheme() === "dark";
	return (
		<Tabs
			screenOptions={({ route }) => ({
				tabBarStyle: {
					backgroundColor: isDark ? themeColors.black : "white",
				},
				tabBarActiveTintColor: isDark ? themeColors.yellow : themeColors.black,
				tabBarInactiveTintColor: isDark
					? themeColors.darkGrey
					: themeColors.lightGrey,
				headerStyle: {
					backgroundColor: isDark ? themeColors.black : "white",
				},
				headerTitleStyle: {
					color: isDark ? "white" : themeColors.black,
				},
				tabBarLabelStyle: {
					marginTop: -5,
					fontSize: 10,
					fontWeight: "600",
				},
				tabBarIcon: ({ color, size }) => {
					let iconName: string;
					if (route.name === "movies") {
						iconName = "film";
					} else if (route.name === "tv") {
						iconName = "tv";
					} else if (route.name === "search") {
						iconName = "search";
					}
					return <FontAwesome5 name={iconName} size={size} color={color} />;
				},
			})}
			sceneContainerStyle={{
				backgroundColor: isDark ? themeColors.black : "white",
			}}
		>
			<Tabs.Screen name="movies" options={{ title: "Movies" }} />
			<Tabs.Screen name="tv" options={{ title: "TV" }} />
			<Tabs.Screen name="search" options={{ title: "Search" }} />
		</Tabs>
	);
};

export default TabsLayout;
