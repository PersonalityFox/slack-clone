import React, { useState } from "react";
import styled from "styled-components";
import SendIcon from "@material-ui/icons/Send";

function ChatInput({ sendMessage }) {
	const [input, setInput] = useState("");
	const send = (e) => {
		e.preventDefault();
		if (!input) return;

		sendMessage(input);
		setInput("");
	};
	return (
		<Container>
			<InputContainer>
				<form>
					<input
						type='text'
						placeholder='Message here...'
						value={input}
						onChange={(e) => {
							setInput(e.target.value);
						}}
					/>
					<SendButton type='submit' onClick={send}>
						<Send />
					</SendButton>
				</form>
			</InputContainer>
		</Container>
	);
}

export default ChatInput;

const Container = styled.div`
	padding: 0 20px 24px;
`;

const InputContainer = styled.div`
	border: 1px solid #8d8d8e;
	border-radius: 4px;

	form {
		display: flex;
		height: 42px;
		align-items: center;
		padding-left: 10px;
		input {
			flex: 1;
			border: none;
			font-size: 13px;

			&:focus {
				outline: none;
			}
		}
	}
`;
const SendButton = styled.div`
	background: #007a5a;
	border-radius: 2px;
	width: 32px;
	height: 32px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 5px;
	cursor: pointer;

	.MuiSvgIcon-root {
		width: 18px;
	}

	:hover {
		background: #148567;
	}
`;

const Send = styled(SendIcon)`
	color: #d9d9d9;
`;
