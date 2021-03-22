import React from "react";
import styled from "styled-components";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

function Header() {
	return (
		<Container>
			<Main>
				<AccessTimeIcon />
				<SearchContainer>
					<Search>
						<input type='text' placholder='Search...' />
					</Search>
				</SearchContainer>
				<HelpOutlineIcon />
			</Main>
			<UserContainer>
				<Name>Paul</Name>
				<UserImage>
					<img src='https://i.imgur.com/6VBx3io.png' alt='' />
				</UserImage>
			</UserContainer>
		</Container>
	);
}

export default Header;

const Container = styled.div`
	position: relative;
	background: #350d36;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 1px 0 0 rgba(255 255 255 / 10%);
`;

const Main = styled.div`
	display: flex;
	margin: 0 16px;
`;

const SearchContainer = styled.div`
	min-width: 400px;
	margin: 0 16px;
`;
const Search = styled.div`
	width: 100%;
	box-shadow: inset 0 0 0 1px rgb(104 74 104);
	border-radius: 6px;
	display: flex;
	align-items: center;

	input {
		width: 100%;
		background-color: transparent;
		border: none;
		padding: 4px 8px;
		color: white;

		&:focus {
			outline: none;
		}
	}
`;

const UserContainer = styled.div`
	display: flex;
	align-items: center;
	padding-right: 16px;
	position: absolute;
	right: 0;
`;

const Name = styled.div`
	padding-right: 16px;
`;
const UserImage = styled.div`
	width: 28px;
	height: 28px;
	border: 2px solid white;
	border-radius: 3px;

	img {
		width: 100%;
	}
`;
