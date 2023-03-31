import SwiperFlatList from "react-native-swiper-flatlist";
import { Loader, Container } from "./movies.styled";
import { ActivityIndicator, Dimensions, useColorScheme } from "react-native";
import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import Slide from "../../components/Slide";

const API_KEY = "f2d97896a7b8f93a3b0c012fd1cfdefc";

export type Movie = {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
};

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies = () => {
	const [loading, setLoading] = useState(true);
	const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);

	const isDark = useColorScheme() === "dark";

	const getNowPlaying = async () => {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
		).then((res) => res.json());
		const result = response.results.slice(0, 7);
		setNowPlaying(result);
		setLoading(false);
	};

	useEffect(() => {
		getNowPlaying();
	}, []);

	if (loading)
		return (
			<Loader>
				<ActivityIndicator size={"large"} />
			</Loader>
		);

	return (
		<Container>
			<Stack.Screen
				options={{
					title: "Movies",
				}}
			/>
			<SwiperFlatList
				autoplay
				autoplayDelay={2}
				autoplayLoop
				style={{ height: SCREEN_HEIGHT / 4 }}
				index={0}
			>
				{nowPlaying.length > 0 &&
					nowPlaying.map((nowPlaying) => {
						return <Slide key={nowPlaying.id} nowPlaying={nowPlaying} />;
					})}
			</SwiperFlatList>
		</Container>
	);
};

export default Movies;
