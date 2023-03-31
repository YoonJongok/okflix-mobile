import { StyleSheet } from "react-native";
import { Movie } from "../../(tabs)/movies";
import { useColorScheme } from "react-native";
import { makeImgPath } from "../../../libs/makeImgPath";
import { BlurView } from "expo-blur";
import {
	BgImg,
	Column,
	Overview,
	Poster,
	Title,
	Votes,
	Wrapper,
	_View,
} from "./Slide.styled";

interface SlideProps {
	nowPlaying: Movie;
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
		</_View>
	);
};

export default Slide;
