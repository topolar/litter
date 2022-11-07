import {Post} from "../../__generated__/graphql";
import {Card, CardContent} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import moment from "moment";
import CardHeader from "@mui/material/CardHeader";
import * as React from "react";

export const PostDetail: React.FC<{ post:Post }> = ({post}) => {
	return (
		<Card sx={{width:'100%'}}>
			<CardHeader
				avatar={
					post.user ? (
						<Avatar src={post.user.image!} alt={post.user.name!} sx={{ bgcolor: red[500] }} aria-label="post"/>
					): (
						<Avatar sx={{ bgcolor: red[500] }} aria-label="post">?</Avatar>
					)
				}
				title={post.user?.name}
				subheader={moment(post.createdAt).utcOffset(60).format('D.M.YYYY H:mm')}
			/>
			<CardContent sx={{fontSize:"1.3em"}}>
				{post.text}
			</CardContent>
		</Card>
	);
};