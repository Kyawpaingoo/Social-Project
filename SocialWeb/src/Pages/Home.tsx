import React from 'react'
import Item from '../Components/Item'
import Form from '../Components/Form'
import { queryClient, useThemeHook } from '../Context/Theme'
import { Alert, Box, Container } from '@mui/material'
import axios from 'axios'
import { PostListType } from '../DataTypes/Post';
import { useMutation, useQuery } from 'react-query'
import { postContent } from '../Libs/fetcher'

const Home: React.FC = () => {
  //const data = useLoaderData();
  //const [queryData, setQueryData] = useState<ProductListType[]>([]);
  const {auth, showForm, setGlobalMsg } = useThemeHook();

  const { isLoading, isError, error, data: posts } = useQuery<PostListType[]>("posts", async()=>{
    const response = await axios.get(`/content/posts`);
    return response.data;
  })

  const remove = useMutation(
    async (id: number) =>{
      await axios.put(`/content/posts/${id}`,{
        method: 'PUT'
      });
    },
    {
      onMutate: (id: number) => {
        queryClient.cancelQueries("posts");
        const prevData = queryClient.getQueryData<PostListType[]>("posts");

        if(prevData)
        {
          queryClient.setQueryData<PostListType[]>("posts", (old) =>
            old ? old.filter((item: PostListType)=> item.id !== id) : []
          );
        }
        
        setGlobalMsg("A post deleted")
      }
    }
  )

  const add = useMutation(async (content: string)=> postContent(content),{
    onSuccess: async (post) => {
      await queryClient.cancelQueries("posts");
      queryClient.setQueryData<PostListType[]>("posts", (old)=> 
        old ? [post, ...old] : [post]
      );
      setGlobalMsg("A post added");
    }
  })

  if(isError)
  {
    return (
      <Box>
        <Alert severity='warning'>{error.message}</Alert>
      </Box>
    )
  }

  if(isLoading)
  {
    return (
      <Box sx={{ textAlign: 'center'}}>
        Loading...
      </Box>
    )
  }
  
  return (
    <Box
      >
      <Container
        maxWidth="sm"
        sx={{mt: 4}}
      >
        {
          auth && showForm && <Form add={add.mutate} />
        }
        
        {
          posts && posts.map(item => (
              <Item key={item.id} item={item} remove={remove.mutate} />
          ))
        }
        
      </Container>
    </Box>
  )
}

export default Home;
