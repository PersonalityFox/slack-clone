import MessageIcon from "@material-ui/icons/Message";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PeopleIcon from "@material-ui/icons/People";
import AppsIcon from "@material-ui/icons/Apps";

export const sidebarItemsData = [
	{
		icon: <MessageIcon />,
		name: "Thread",
	},
	{
		icon: <InboxIcon />,
		name: "All DMs",
	},
	{
		icon: <DraftsIcon />,
		name: "Mentions & Reactions",
	},
	{
		icon: <BookmarkBorderIcon />,
		name: "Save Items",
	},
	{
		icon: <PeopleIcon />,
		name: "People & Groups",
	},
	{
		icon: <AppsIcon />,
		name: "More",
	},
];
