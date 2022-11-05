import {gql, useMutation, useQuery} from "@apollo/client";
import Head from "next/head";
import {List, ListItem} from "@mui/material";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {Post} from "../../__generated__/graphql";
import {Layout} from "../../components/layout/layout.component";
import {PostCard} from "../../components/posts/post-card.component";
import {getApolloClient} from "../../utils/apollo.utils";
import {PostDetail} from "../../components/posts/post-detail.component";

const GET_POST=gql`
    query getPost($id:ID!) {
        post(id: $id) {
            id
            text
            image
            user {
                id
                name
            }
        }
    }
`;

type PostPageProps= {
	post:Post,
	id:string
}

export default function HomePage(props:PostPageProps) {
	const {loading,error,data} = useQuery(GET_POST,{variables:{id:props.id}});

	const post=data?.post ?? props.post;
	return (
		<Layout headerTitle={`Post ${post.id}`}>
			<Head>
				<title>{`Post ${post.id}`}</title>
			</Head>

			{ loading && !post && (
				<div>Loading.....</div>
			)}
			{ error && (
				<div>ERROR!</div>
			)}
			{ post && (
				<PostDetail post={post}/>
			)}
		</Layout>
	);
};


export const getServerSideProps : GetServerSideProps=async (context)=>{
	const id = context.query.id;
	const client = getApolloClient(true)
	const query = await client.query({query: GET_POST,variables:{id}});
	return {props: {
			post:query.data.post,
			id
		}}
}