import SwiperFlatList from "react-native-swiper-flatlist";
import {
	Votes,
	Overview,
	Column,
	Wrapper,
	Title,
	BgImg,
	Loader,
	View,
	Container,
	Poster,
} from "./movies.styled";
import {
	ActivityIndicator,
	Dimensions,
	StyleSheet,
	useColorScheme,
} from "react-native";
import { useEffect, useState } from "react";
import { makeImgPath } from "../../../libs/makeImgPath";
import { BlurView } from "expo-blur";
import { Stack } from "expo-router";

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

interface SlideProps {
	nowPlaying: Movie;
}

const Slide = ({ nowPlaying }: SlideProps) => {
	const isDark = useColorScheme() === "dark";
	return (
		<View key={nowPlaying.id}>
			<BgImg
				style={StyleSheet.absoluteFill}
				source={{ uri: makeImgPath(nowPlaying.backdrop_path) }}
			/>
			<BlurView
				tint={isDark ? "dark" : "light"}
				intensity={85}
				style={StyleSheet.absoluteFill}
			>
				<Wrapper>
					<Poster source={{ uri: makeImgPath(nowPlaying.poster_path) }} />
					<Column>
						<Title isDark={isDark}>{nowPlaying.original_title}</Title>
						{nowPlaying.vote_average > 0 && (
							<Votes isDark={isDark}>⭐️ {nowPlaying.vote_average}/10</Votes>
						)}
						<Overview isDark={isDark}>
							{nowPlaying.overview.slice(0, 100)}...
						</Overview>
					</Column>
				</Wrapper>
			</BlurView>
		</View>
	);
};
