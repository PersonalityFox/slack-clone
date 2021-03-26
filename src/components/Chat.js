import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CloseIcon from "@material-ui/icons/Close";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import db from "../firebase";
import { useParams } from "react-router-dom";
import firebase from "firebase";
import { useHistory } from "react-router-dom";

function Chat({ user }) {
	const [channel, setChannel] = useState();
	const [messages, setMessages] = useState([]);
	const [threads, setThreads] = useState([]);

	let { channelId, threadId } = useParams();
	const history = useHistory();

	const sendMessage = (text) => {
		if (channelId) {
			let payload = {
				text: text,
				user: user.name,
				userImage: user.photo,
				timestamp: firebase.firestore.Timestamp.now(),
			};
			db.collection("rooms")
				.doc(channelId)
				.collection("messages")
				.add(payload);
		}
	};
	const sendThreadMessage = (text) => {
		if (channelId && threadId) {
			let payload = {
				text: text,
				user: user.name,
				userImage: user.photo,
				timestamp: firebase.firestore.Timestamp.now(),
			};
			db.collection("rooms")
				.doc(channelId)
				.collection("messages")
				.doc(threadId)
				.collection("threads")
				.add(payload);
		}
	};

	const goToThread = (id) => {
		if (id) {
			history.push(`/room/${channelId}/${id}`);
		}
	};
	const closeThread = () => {
		const containerElement = document.getElementById("thread__container");

		containerElement.classList.remove("open");

		history.push(`/room/${channelId}`);
	};
	const threadStart = (id) => {
		goToThread(id);

		const containerElement = document.getElementById("thread__container");
		containerElement.classList.add("open");
	};
	const hasThreads = () => {
		const containerElement = document.getElementById("thread__container");
		return containerElement.classList.contains("open");
	};

	useEffect(() => {
		const getChannel = () => {
			db.collection("rooms")
				.doc(channelId)
				.onSnapshot((snapshot) => {
					setChannel(snapshot.data());
				});
		};
		const getMessages = () => {
			db.collection("rooms")
				.doc(channelId)
				.collection("messages")
				.orderBy("timestamp", "asc")
				.onSnapshot((snapshot) => {
					let messages = snapshot.docs.map((doc) => {
						return {
							id: doc.id,
							text: doc.data().text,
							timestamp: doc.data().timestamp,
							user: doc.data().user,
							userImage: doc.data().userImage,
						};
					});
					setMessages(messages);
				});
		};
		getChannel();
		getMessages();
		if (!hasThreads) closeThread();
	}, [channelId]);

	useEffect(() => {
		const getThreads = () => {
			db.collection("rooms")
				.doc(channelId)
				.collection("messages")
				.doc(threadId)
				.collection("threads")
				.orderBy("timestamp", "asc")
				.onSnapshot((snapshot) => {
					let threads = snapshot.docs.map((doc) => doc.data());
					setThreads(threads);
				});
		};
		getThreads();
	}, [threadId]);

	return (
		<Container>
			<Header>
				<Channel>
					<ChannelName># {channel && channel.name}</ChannelName>
					<ChannelInfo>Company desc</ChannelInfo>
				</Channel>
				<ChannelDetails>
					<div>Detail</div>
					<Info />
				</ChannelDetails>
			</Header>
			<ChatContainer>
				<MessageContainer>
					{messages.length > 0 &&
						messages.map((data, index) => (
							<ChatMessage
								key={data.id}
								id={data.id}
								text={data.text}
								name={data.user}
								image={data.userImage}
								timestamp={data.timestamp}
								thread={false}
								threadStart={threadStart}
							/>
						))}
				</MessageContainer>
				<ThreadContainer id='thread__container' className='open'>
					<ThreadHeader>
						<p>Thread</p>
						<ChannelName># {channel && channel.name}</ChannelName>
						<CloseThread
							onClick={() => {
								closeThread();
							}}>
							<CloseIcon />
						</CloseThread>
					</ThreadHeader>
					<MessageContainer className='thread__messages'>
						{threads.length > 0 ? (
							threads.map((data, index) => (
								<ChatMessage
									text={data.text}
									name={data.user}
									image={data.userImage}
									timestamp={data.timestamp}
									thread={true}
								/>
							))
						) : (
							<p>Start thread now</p>
						)}
					</MessageContainer>
					<ChatInput
						className='thread__input'
						sendMessage={sendThreadMessage}
					/>
				</ThreadContainer>
			</ChatContainer>
			<ChatInput sendMessage={sendMessage} />
		</Container>
	);
}

export default Chat;

const Container = styled.div`
	display: grid;
	grid-template-rows: 64px auto min-content;
	min-height: 0;
`;

const Channel = styled.div``;
const ChannelDetails = styled.div`
	display: flex;
	align-items: center;
	color: #606060;
`;
const ChannelName = styled.div`
	font-width: 700;
`;
const ChannelInfo = styled.div`
	font-width: 400;
	color: #606060;
	font-size: 13px;
	margin-top: 8px;
`;
const Info = styled(InfoOutlinedIcon)`
	margin-left: 10px;
`;
const Header = styled.div`
	padding: 0 20px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid rgba(83, 39, 83, 0.13);
	justify-content: space-between;
`;
const ChatContainer = styled.div`
	display: flex;
	overflow: hidden;
`;

const MessageContainer = styled.div`
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	width: 100%;

	&.thread__messages {
		margin-bottom: 5px;
		> * {
			padding: 8px 10px;
		}
	}
`;

const ThreadContainer = styled.div`
	position: relative;
	width: 380px;
	overflow: hidden;

	border-left: 1px solid #e2e2e2;

	/* transform: translateX(380px); */
	margin-right: -380px;

	transition: all 0.3s ease;

	&.open {
		margin-right: 0;
		/* transform: translateX(0); */
	}

	.thread__input {
		padding: 0 10px;
	}
`;

const ThreadHeader = styled.header`
	position: relative;
	padding: 12px 12px;
	height: 64px;
	box-sizing: border-box;
	border-bottom: 1px solid #e2e2e2;

	p {
		font-weight: bold;

		+ div {
			font-size: 14px;
		}
	}
`;

const CloseThread = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	right: 12px;
	height: 100%;

	display: flex;
	align-items: center;
	cursor: pointer;
`;
