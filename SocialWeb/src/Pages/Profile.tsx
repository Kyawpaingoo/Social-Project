import { Alert, Avatar, Box, Typography } from '@mui/material'
import { pink } from '@mui/material/colors'
import React from 'react'
import Item from '../Components/Item'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { fetchUser } from '../Libs/fetcher'
import { PostListType } from '../DataTypes/Post'

const Profile: React.FC = () => {
    const { id } = useParams<{id: string}>();
    const ID = Number(id);
    const { isLoading, isError, error, data } = useQuery(`users/${ID}`,
        async () => fetchUser(ID), {
            enabled: !isNaN(ID)
        }
    );

    if(isError) {
        return (
            <Box>
                <Alert severity='warning'>
                    {error.message}
                </Alert>
            </Box>
        )
    }

    if(isLoading) {
        return (
            <Box sx={{ textAlign: 'center'}}>
                Loading..
            </Box>
        )
    }
  return (
   <Box>
        <Box sx={{ bgcolor: 'banner', height: 150, borderRadius: 4}}></Box>
        <Box
            sx={{
                mb: 4,
                marginTop: '-60px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1
            }}
        >
            <Avatar sx={{ width: 100, height: 100, bgcolor: pink[500]}} />

            <Box sx={{ textAlign: 'center'}}>
                <Typography>
                    {data ? data.name : 'Unkown User'}
                </Typography>
                <Typography sx={{ fontSize: '0.8em', color: 'text.fade'}}>
                    {data ? data?.bio : ''}
                </Typography>
            </Box>
        </Box>

        {
            data?.post && data.post.length > 0 ? (
                data.post.map((post: PostListType)=> (
                    <Item 
                        key={post.id}
                        item={post}
                        remove={()=>{}}
                    />
                ))
            ) : (
                <Typography sx={{textAlign: 'center', color: 'text.fade'}}>
                    No Post found.
                </Typography>
            )
        }
   </Box>
  )
}

export default Profile