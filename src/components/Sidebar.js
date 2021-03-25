import styled from "styled-components";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddIcon from "@material-ui/icons/Add";
import { sidebarItemsData } from "../data/SidebarData";
import db from "../firebase";
import { useHistory } from "react-router-dom";

function Sidebar({ rooms }) {
	const addChannel = () => {
		const promptName = prompt("Enter a channel name");
		if (promptName) {
			db.collection("rooms").add({
				name: promptName,
			});
		}
	};

	const history = useHistory();

	const goToChannel = (id) => {
		if (id) {
			history.push(`/room/${id}`);
		}
	};

	return (
		<Container>
			<WorkSpaceContainer>
				<Name>Chatter</Name>
				<NewMessage>
					<AddCircleOutlineIcon />
				</NewMessage>
			</WorkSpaceContainer>
			<MainChannels>
				{sidebarItemsData.map((item) => (
					<MainChannelItem key={item.name}>
						{item.icon}
						{item.name}
					</MainChannelItem>
				))}
			</MainChannels>
			<ChannelsContainer>
				<NewChannelContainer>
					<div>Channel</div>
					<AddIcon onClick={addChannel} />
				</NewChannelContainer>
				<ChannelsList>
					{rooms.map((room) => (
						<Channel
							onClick={() => goToChannel(room.id)}
							key={room.id}>
							# {room.name}
						</Channel>
					))}
				</ChannelsList>
			</ChannelsContainer>
		</Container>
	);
}

export default Sidebar;

const Container = styled.div`
	background: #3f0e40;
`;

const WorkSpaceContainer = styled.div`
	color: white;
	height: 64px;
	display: flex;
	align-items: center;
	padding-left: 19px;
	justify-content: space-between;
	border-bottom: 1px solid #532753;
`;

const Name = styled.div``;

const NewMessage = styled.div`
	width: 36px;
	height: 36px;
	background: white;
	color: #3f0e40;
	fill: #3f0e40;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	margin-right: 20px;
	cursor: pointer;
`;

const MainChannels = styled.div`
	padding-top: 20px;
`;

const MainChannelItem = styled.div`
	color: rgb(188, 171, 188);
	display: grid;
	grid-template-columns: 15% auto;
	height: 28px;
	align-items: center;
	padding: 0 19px;
	cursor: pointer;
	:hover {
		background: #350d36;
	}
`;
const ChannelsContainer = styled.div`
	color: rgb(188, 171, 188);
	margin-top: 10px;
`;
const NewChannelContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 28px;
	padding-left: 19px;
	padding-right: 12px;
	padding-bottom: 8px;

	.MuiSvgIcon-root {
		cursor: pointer;
	}
`;
const ChannelsList = styled.div``;
const Channel = styled.div`
	height: 28px;
	display: flex;
	padding-left: 19px;
	padding-right: 12px;
	cursor: pointer;
	:hover {
		background: #350d36;
	}
`;
