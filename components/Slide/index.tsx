import { StyleSheet } from "react-native";
import { useColorScheme } from "react-native";
import { makeImgPath } from "../../libs/makeImgPath";
import { BlurView } from "expo-blur";
import {
	BgImg,
	Column,
	Overview,
	Title,
	Votes,
	Wrapper,
	_View,
} from "./Slide.styled";
import Poster from "../Poster";
import { MovieType } from "../../app/(tabs)/movies/movies.types";

interface SlideProps {
	nowPlaying: MovieType;
}

const Slide = ({ nowPlaying }: SlideProps) => {
	const isDark = useColorScheme() === "dark";
	return (
		<_View key={nowPlaying.id}>
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
					<Poster path={makeImgPath(nowPlaying.poster_path)} />
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
		</_View>
	);
};

export default Slide;
