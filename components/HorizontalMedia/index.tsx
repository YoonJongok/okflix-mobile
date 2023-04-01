import Poster from "../Poster";
import Votes from "../Votes";
import {
	HColumn,
	HMovie,
	Overview,
	Release,
	Title,
} from "./HorizontalMedia.styled";

interface HorizontalMediaProps {
	posterPath: string;
	originalTitle: string;
	overview: string;
	releaseDate?: string;
	voteAverage?: number;
}

const HorizontalMedia: React.FC<HorizontalMediaProps> = ({
	posterPath,
	originalTitle,
	overview,
	releaseDate,
	voteAverage,
}) => {
	return (
		<HMovie>
			<Poster path={posterPath} />
			<HColumn>
				<Title>
					{originalTitle.length > 30
						? `${originalTitle.slice(0, 30)}...`
						: originalTitle}
				</Title>
				{releaseDate ? (
					<Release>
						{new Date(releaseDate).toLocaleDateString("ko", {
							month: "long",
							day: "numeric",
							year: "numeric",
						})}
					</Release>
				) : null}
				{voteAverage ? <Votes votes={voteAverage} /> : null}
				<Overview>
					{overview !== "" && overview.length > 140
						? `${overview.slice(0, 140)}...`
						: overview}
				</Overview>
			</HColumn>
		</HMovie>
	);
};

export default HorizontalMedia;
