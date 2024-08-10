import { Avatar, Box, Typography } from '@mui/material'
import { pink } from '@mui/material/colors'
import React from 'react'
import Item from '../Components/Item'

const Profile: React.FC = () => {
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
            <Typography>Alice</Typography>
            <Typography sx={{ fontSize: '0.8em', color: 'text.fade'}}>
                Alice's profile bio content here
            </Typography>
        </Box>
    </Box>

    <Item 
        key={1}
        item={{
            id: 1,
            content: 'A post content from ALice',
            name: 'Alice'
        }} 
        remove={()=>{}}
    />
   </Box>
  )
}

export default Profile