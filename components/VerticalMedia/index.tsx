import React from "react";
import { Movie, Title } from "./VerticalMedia.styled";
import Poster from "../Poster";
import Votes from "../Votes";

interface VerticalMediaProps {
	posterPath: string;
	originalTitle: string;
	voteAverage: number;
}

const VerticalMedia: React.FC<VerticalMediaProps> = ({
	posterPath,
	originalTitle,
	voteAverage,
}) => (
	<Movie>
		<Poster path={posterPath} />
		<Title>
			{originalTitle.slice(0, 13)}
			{originalTitle.length > 13 ? "..." : null}
		</Title>
		<Votes votes={voteAverage} />
	</Movie>
);

export default VerticalMedia;
