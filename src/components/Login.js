import React from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase";

function Login({ setUser }) {
	const signIn = () => {
		auth.signInWithPopup(provider)
			.then((result) => {
				const newUser = {
					name: result.user.displayName,
					email: result.user.email,
					photo: result.user.photoURL,
				};
				setUser(newUser);
				localStorage.setItem("user", JSON.stringify(newUser));
			})
			.catch((error) => {
				alert(error.message);
				console.error(error);
			});
	};

	return (
		<Container>
			<Content>
				<SlackImage src='http://assets.stickpng.com/images/5cb480cd5f1b6d3fbadece79.png' />
				<h1>Sing in Slack</h1>
				<SignInButton onClick={() => signIn()}>
					Sign In With Google
				</SignInButton>
			</Content>
		</Container>
	);
}

export default Login;

const Container = styled.div`
	width: 100%;
	height: 100vh;
	background-color: #f8f8f8;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Content = styled.div`
	background-color: white;
	padding: 100px;
	border-radius: 5px;
	box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 25%);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const SlackImage = styled.img`
	height: 100px;
	margin-bottom: 10px;
`;

const SignInButton = styled.button`
	margin-top: 30px;
	background-color: #0a8d48;
	color: white;
	border: none;
	padding: 8px 15px;
	border-radius: 4px;
	cursor: pointer;
`;
