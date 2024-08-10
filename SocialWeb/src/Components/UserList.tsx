import React from 'react'
import {
    Box, Typography, List, ListItem, Avatar, ListItemText, ListItemAvatar
} from '@mui/material'

type UserListProps = {
    title: string
}

const UserList: React.FC<UserListProps> = (props: UserListProps) => {
  return (
    <Box>
        <Typography variant='h4' sx={{ mb: 3}}>
            {props.title}
        </Typography>
        <List>
            <ListItem>
                <ListItemAvatar>
                    <Avatar />
                </ListItemAvatar>
                <ListItemText
                    primary='Alice @alice'
                    secondary="Alice's profile bio"
                />
            </ListItem>
        </List>
    </Box>
  )
}

export default UserList