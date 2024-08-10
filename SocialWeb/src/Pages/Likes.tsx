import React from 'react'
import { Box } from '@mui/material'
import UserList from '../Components/UserList'

const Likes: React.FC = () => {
  return (
    <Box>
        <UserList title='Likes' />
    </Box>
  )
}

export default Likes