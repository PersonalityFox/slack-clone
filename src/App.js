import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import db from "./firebase";
import { auth } from "./firebase";

function App() {
	const [rooms, setRooms] = useState([]);
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

	useEffect(() => {
		getChannels();
	}, []);

	const getChannels = () => {
		db.collection("rooms").onSnapshot((snapshot) => {
			setRooms(
				snapshot.docs.map((doc) => {
					return { id: doc.id, name: doc.data().name };
				})
			);
		});
	};

	const signOut = () => {
		auth.signOut().then(() => {
			setUser(null);
			localStorage.removeItem("user");
		});
	};

	return (
		<div className='app'>
			<Router>
				{!user ? (
					<Login setUser={setUser} />
				) : (
					<Container>
						<Header user={user} signOut={signOut} />
						<Main>
							<Sidebar rooms={rooms} />
							<Switch>
								<Route path='/room/:channelId' exact>
									<Chat user={user} />
								</Route>
								<Route path='/room/:channelId/:threadId' exact>
									<Chat user={user} />
								</Route>
								<Route path='/'>
									<ChannelEmpty>
										Select or Create new Channel
									</ChannelEmpty>
								</Route>
								{/* <Route path='/' component={Login} /> */}
							</Switch>
						</Main>
					</Container>
				)}
			</Router>
		</div>
	);
}

export default App;

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: grid;
	grid-template-rows: 38px minmax(0, 1fr);
`;
const Main = styled.div`
	display: grid;
	grid-template-columns: 260px auto;
`;

const ChannelEmpty = styled.div`
	padding: 20px;
	font-size: 20px;
`;
