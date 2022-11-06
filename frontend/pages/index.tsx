import {gql, useMutation, useQuery} from "@apollo/client";
import {GetAllPostsQuery, Post, PostInput} from "../__generated__/graphql";
import {Layout} from "../components/layout/layout.component";
import Head from "next/head";
import {Alert, List, ListItem, Snackbar} from "@mui/material";
import {GetServerSideProps} from "next";
import {getApolloClient} from "../utils/apollo.utils";
import {PostCard} from "../components/posts/post-card.component";
import {PostForm} from "../components/posts/post-form.component";
import {useState} from "react";
import {AlertColor} from "@mui/material/Alert/Alert";

const GET_ALL_POSTS=gql`
  query getAllPosts {
    posts {
      id
      text
      image
      createdAt
      user {
        id
        name
        image
      }
    }
  }
`;

const DELETE_POST=gql`
  mutation deletePost($id:ID!) {
    deletePost(id: $id) {
      success
    }
  }
`

const ADD_POST=gql`
  mutation addPost($input:PostInput!) {
    addPost(input:$input ) {
      success
    }
  }
`

type HomePageProps= {
    posts:Post[]
}

type SnackParams = {
  open:boolean
  message:string
  severity:AlertColor
}

export default function HomePage(props:HomePageProps) {
  const {loading,error,data,refetch} = useQuery<GetAllPostsQuery>(GET_ALL_POSTS);
  const [addPost]=useMutation(ADD_POST);
  const [deletePost]=useMutation(DELETE_POST);

  const [snack,setSnack]=useState<SnackParams>({open:false,message:'',severity:'success'});


  const handleDelete=async(post:Post) => {
    try {
      await deletePost({variables: {id: post.id}});
      setSnack({open: true, message: 'Příspěvek smazán',severity:'success'});
      await refetch();
    } catch (e:any) {
      setSnack({open: true, message: e.message??'Nastala neznámá chyba!',severity:'error'});
      console.log(e);
    }
  }

  const handleSubmit=async(input:PostInput) => {
    const data=await addPost({variables:{input}});
    await refetch();
    setSnack({open:true,message:'Příspěvek přidán',severity:'success'});
  }

  const posts:Post[]=(data?.posts as Post[])?? props.posts;
  return (
      <Layout headerTitle="Hlavní stránka">
        <Head>
          <title>Litter Social</title>
          <meta name="description" content="Litter Social app experiment" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <PostForm onSubmit={handleSubmit}/>

        { loading && posts.length===0 && (
            <div>Loading.....</div>
        )}

        { error && (
            <div>ERROR!</div>
        )}

        { posts && (
            <List sx={{flex:1}} component="ul" aria-label="posts">
              {  posts.map((post)=>(
                <ListItem divider key={post.id} sx={{px:0}}>
                  <PostCard  post={post} onDelete={()=>handleDelete(post)}/>
                </ListItem>)
              )
              }
            </List>
          )
        }

        <Snackbar open={snack.open} autoHideDuration={6000} onClose={()=>setSnack({...snack,open:false})}>
          <Alert onClose={()=>setSnack({...snack,open:false})} severity={snack.severity} sx={{ width: '100%' }}>
            {snack.message}
          </Alert>
        </Snackbar>

      </Layout>
  );
};

export const getServerSideProps : GetServerSideProps<HomePageProps>=async ()=>{
    const client = getApolloClient(true)
    const query = await client.query({query: GET_ALL_POSTS})
    return {props: {
        posts:query.data.posts
    }}
}