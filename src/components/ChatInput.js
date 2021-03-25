import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SendIcon from "@material-ui/icons/Send";
import InsertEmoticonOutlinedIcon from "@material-ui/icons/InsertEmoticonOutlined";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

function ChatInput({ sendMessage, className }) {
	const [input, setInput] = useState("");
	const [emoji, setEmoji] = useState([]);
	const [showEmoji, setShowEmoji] = useState(false);

	const send = (e) => {
		e.preventDefault();
		if (!input) return;

		sendMessage(input);
		setInput("");
	};
	useEffect(() => {
		if (!emoji || emoji.length === 0) return;
		let sym = emoji.unified.split("-");
		let codesArray = [];
		sym.forEach((el) => codesArray.push("0x" + el));
		let emojiName = String.fromCodePoint(...codesArray);
		setInput(input + emojiName);
	}, [emoji]);
	return (
		<Container className={className}>
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
					<div
						className='emodji-button'
						onClick={() => {
							setShowEmoji(!showEmoji);
						}}>
						{showEmoji ? (
							<Picker
								onSelect={setEmoji}
								style={{
									position: "absolute",
									bottom: "-12px",
									right: "-35px",
									transform: "scale(0.75)",
								}}
							/>
						) : (
							<InsertEmoticonOutlinedIcon></InsertEmoticonOutlinedIcon>
						)}
					</div>
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
	position: relative;
	padding: 0 20px 24px;

	.emodji-button {
		display: flex;
		align-items: center;
		margin-right: 5px;
		cursor: pointer;
		.MuiSvgIcon-root {
			color: #8d8d8e;
		}
	}
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
