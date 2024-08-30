import React from 'react'
import {
    Box, Typography, List, ListItem, Avatar, ListItemText, ListItemAvatar,
    ListItemButton
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { PostLike } from '../DataTypes/Post'
import { CommentLike } from '../DataTypes/Comment'

type UserListProps = {
    title: string,
    data: PostLike[] | CommentLike[],
}

const UserList: React.FC<UserListProps> = (props: UserListProps) => {
    const navigate = useNavigate();
  return (
    <Box>
        <Typography variant='h4' sx={{ mb: 3}}>
            {props.title}
        </Typography>
        <List>
            {
                props.data.map((item)=>(
                    <ListItem key={item.id}>
                        <ListItemButton
                            onClick={()=>navigate(`/profile/${item.user.id}`)}
                        >
                            <ListItemAvatar>
                                <Avatar />
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.user.name}
                                secondary={item.user.bio}
                            />
                        </ListItemButton>
                    </ListItem>
                ))
            }
        </List>
    </Box>
  )
}

export default UserList