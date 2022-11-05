import {Post} from "../../__generated__/graphql";
import {Card, CardContent} from "@mui/material";

export const PostDetail: React.FC<{ post:Post }> = ({post}) => {
	return (
		<Card sx={{width:'100%'}}>
			<CardContent sx={{fontSize:"1.3em"}}>
				{post.text}
			</CardContent>
		</Card>
	);
};