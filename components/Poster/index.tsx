import React from "react";
import styled from "styled-components/native";
import { makeImgPath } from "../../libs/makeImgPath";
import { Image } from "./Poster.styled";

interface PosterProps {
	path: string;
}

const Poster: React.FC<PosterProps> = ({ path }) => (
	<Image source={{ uri: makeImgPath(path) }} />
);

export default Poster;
