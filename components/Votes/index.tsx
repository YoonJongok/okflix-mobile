import React from "react";
import { _Text } from "./Votes.styled";

interface VotesProps {
	votes: number;
}

const Votes: React.FC<VotesProps> = ({ votes }) => (
	<_Text>{votes > 0 ? `⭐️ ${votes}/10` : `Coming soon`}</_Text>
);
export default Votes;
