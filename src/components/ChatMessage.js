import React from "react";
import styled from "styled-components";

function ChatMessage({
	id,
	text,
	name,
	image,
	timestamp,
	thread,
	threadStart,
}) {
	return (
		<Container>
			<UserAvatar>
				<img
					alt='Profile Photo'
					src={
						image
							? image
							: "https://randomuser.me/api/portraits/lego/1.jpg"
					}
				/>
			</UserAvatar>
			<MessageContent>
				<Name>
					{name}
					<span>{new Date(timestamp.toDate()).toUTCString()}</span>
				</Name>
				<Text>{text}</Text>
				{!thread && (
					<div className='thread' onClick={() => threadStart(id)}>
						Thread start
					</div>
				)}
			</MessageContent>
		</Container>
	);
}

export default ChatMessage;

const Container = styled.div`
	padding: 8px 20px;
	display: flex;
	align-items: flex-start;

	:hover {
		background: #efefef;

		.thread {
			opacity: 1;
		}
	}
`;

const UserAvatar = styled.div`
	padding-top: 5px;
	width: 36px;
	height: 36px;
	border-radius: 2px;
	overflow: hidden;
	margin-right: 8px;

	img {
		width: 100%;
	}
`;
const MessageContent = styled.div`
	display: flex;
	flex-direction: column;

	.thread {
		font-size: 12px;
		opacity: 0;
		color: #7b7b7b;
		transition: all 0.1s ease-out;
		cursor: pointer;
	}
`;
const Name = styled.span`
	font-weight: bold;
	font-size: 15px;
	line-height: 1.4;

	span {
		margin-left: 8px;
		font-weight: 400;
		color: rgb(97, 96, 97);
		font-size: 13px;
	}
`;
const Text = styled.div``;
