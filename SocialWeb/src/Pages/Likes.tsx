import React from 'react'
import { Alert, Box } from '@mui/material'
import UserList from '../Components/UserList'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { fetchCommentLikes, fetchPostLikes } from '../Libs/fetcher'

const Likes: React.FC = () => {
  const { id, type } = useParams();
  
  const {isLoading, isError, error, data } = useQuery(["users", id, type],
    ()=> {
      console.log(id, type);
      if(type == "comment") {
        return fetchCommentLikes(Number(id));
      }
      else {
        return fetchPostLikes(Number(id));
      }
    }
  );
  
  if(isError) {
    return (
      <Box>
        <Alert severity='warning'>{error.message}</Alert>
      </Box>
    )
  }

  if(isLoading){
    return (
      <Box sx={{ textAlign: 'center' }}>
        Loading...
      </Box>
    )
  }
  return (
    <Box>
        <UserList title='Likes' data={data} />
    </Box>
  )
}

export default Likes