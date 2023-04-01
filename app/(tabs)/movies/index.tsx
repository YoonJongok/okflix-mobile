import SwiperFlatList from "react-native-swiper-flatlist";
import { Loader, Container } from "./movies.styled";
import {
	ActivityIndicator,
	Dimensions,
	RefreshControl,
	useColorScheme,
} from "react-native";
import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import Slide from "../../../components/Slide";
import { MovieType } from "./movies.types";
import styled from "styled-components/native";
import Poster from "../../../components/Poster";
import VerticalMedia from "../../../components/VerticalMedia";
import HorizontalMedia from "../../../components/HorizontalMedia";

const API_KEY = "f2d97896a7b8f93a3b0c012fd1cfdefc";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListTitle = styled.Text`
	color: white;
	font-size: 18px;
	font-weight: 600;
	margin-left: 30px;
`;

const TrendingScroll = styled.ScrollView`
	margin-top: 20px;
`;

const Title = styled.Text`
	color: white;
	font-weight: 600;
	margin-top: 7px;
	margin-bottom: 5px;
`;
const Votes = styled.Text`
	color: rgba(255, 255, 255, 0.8);
	font-size: 10px;
`;

const Movie = styled.View`
	margin-right: 20px;
	align-items: center;
`;

const ListContainer = styled.View`
	margin-bottom: 40px;
`;

const HMovie = styled.View`
	padding: 0px 30px;
	margin-bottom: 30px;
	flex-direction: row;
`;

const HColumn = styled.View`
	margin-left: 15px;
	width: 80%;
`;

const Overview = styled.Text`
	color: white;
	opacity: 0.8;
	width: 80%;
`;

const Release = styled.Text`
	color: white;
	font-size: 12px;
	margin-vertical: 10px;
`;
const ComingSoonTitle = styled(ListTitle)`
	margin-bottom: 30px;
`;

const Movies = () => {
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [nowPlaying, setNowPlaying] = useState<MovieType[]>([]);
	const [upcoming, setUpcoming] = useState([]);
	const [trending, setTrending] = useState([]);

	const isDark = useColorScheme() === "dark";

	const onRefresh = async () => {
		setRefreshing(true);
		await getData();
		setRefreshing(false);
	};

	const getTrending = async () => {
		const { results } = await (
			await fetch(
				`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
			)
		).json();
		setTrending(results);
	};
	const getUpcoming = async () => {
		const { results } = await (
			await fetch(
				`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
			)
		).json();
		setUpcoming(results);
	};

	const getNowPlaying = async () => {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
		).then((res) => res.json());
		const result = response.results.slice(0, 7);
		setNowPlaying(result);
	};

	const getData = async () => {
		await Promise.all([getNowPlaying(), getUpcoming(), getTrending()]);

		setLoading(false);
	};

	useEffect(() => {
		getData();
	}, []);

	if (loading)
		return (
			<Loader>
				<ActivityIndicator size={"large"} />
			</Loader>
		);

	return (
		<Container
			refreshControl={
				<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
			}
		>
			<Stack.Screen
				options={{
					title: "Movies",
				}}
			/>
			<SwiperFlatList
				autoplay
				autoplayDelay={2}
				autoplayLoop
				style={{ marginBottom: 30, width: "100%", height: SCREEN_HEIGHT / 4 }}
				index={0}
			>
				{nowPlaying.length > 0 &&
					nowPlaying.map((nowPlaying) => {
						return <Slide key={nowPlaying.id} nowPlaying={nowPlaying} />;
					})}
			</SwiperFlatList>
			<ListContainer>
				<ListTitle>Trending Movies</ListTitle>
				<TrendingScroll
					contentContainerStyle={{ paddingLeft: 30 }}
					horizontal
					showsHorizontalScrollIndicator={false}
				>
					{trending.map((movie) => (
						<VerticalMedia
							key={movie.id}
							posterPath={movie.poster_path}
							originalTitle={movie.original_title}
							voteAverage={movie.vote_average}
						/>
					))}
				</TrendingScroll>
			</ListContainer>
			<ComingSoonTitle>Coming soon</ComingSoonTitle>
			{upcoming.map((movie) => (
				<HorizontalMedia
					key={movie.id}
					posterPath={movie.poster_path}
					originalTitle={movie.original_title}
					overview={movie.overview}
					releaseDate={movie.release_date}
				/>
			))}
		</Container>
	);
};

export default Movies;
