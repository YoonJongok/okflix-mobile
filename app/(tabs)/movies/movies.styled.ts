import styled from "styled-components/native";

export const Container = styled.ScrollView`
	background-color: ${({ theme }) => theme.mainBgColor};
`;

export const Loader = styled.View`
	height: 100%;
	justify-content: center;
`;
