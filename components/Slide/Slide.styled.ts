import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const _View = styled.View`
	width: ${SCREEN_WIDTH}px;
	height: ${SCREEN_HEIGHT / 4}px;
	justify-content: center;
`;

export const Text = styled.Text`
	text-align: center;
`;

export const BgImg = styled.Image``;

export const Title = styled.Text<{ isDark: boolean }>`
	font-size: 16px;
	font-weight: 600;
	color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;
export const Wrapper = styled.View`
	background-color: themeColors.yellow;
	flex-direction: row;
	height: 100%;
	width: 90%;
	margin: 0 auto;
	justify-content: space-around;
	align-items: center;
`;
export const Column = styled.View`
	width: 60%;
`;
export const Overview = styled.Text<{ isDark: boolean }>`
	margin-top: 10px;
	color: ${(props) =>
		props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
`;
export const Votes = styled(Overview)`
	font-size: 12px;
`;
