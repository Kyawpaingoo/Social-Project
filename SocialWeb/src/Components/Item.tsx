import React from 'react'

import {Box, Card, CardContent, Typography, IconButton} from '@mui/material'
import { Alarm as TimeIcon, AccountCircle as UserIcon, Delete as DeleteIcon } from '@mui/icons-material'
import {green} from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'
import { formatRelative } from 'date-fns'
import { PostListType } from '../DataTypes/Post'
import { CommentDetail, PostCommentType } from '../DataTypes/Comment'
import LikeButton from './LikeButton'
import CommentButton from './CommentButton'

type ItemProps = {
    item: PostListType | CommentDetail | PostCommentType,
    remove: (id: number)=>void,
    primary?: boolean,
    comment?: boolean,
    isOwner?: string,
}

const Item: React.FC<ItemProps> = (props: ItemProps) => {
  const navigate = useNavigate();

  const id: number | null = 'id' in props.item ? props.item.id : null;
  const created: string | null = 'created' in props.item ? props.item.created : null;
  const content = 'content' in props.item ? props.item.content : undefined;
  const user = 'user' in props.item ? props.item.user : undefined;

  return (
   <Card sx={{ mb: 2}}>
    {
      props.primary && <Box sx={{ height: 50, bgcolor: green[500]}} />
    }
    <CardContent
      onClick={()=>{
        if(props.comment) return false;
        navigate(`/comments/${id}`)
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 1
          }}
        >
          <TimeIcon fontSize="small" color='success' />
          <Typography
            variant='caption'
            sx={{
              color: green[500]
            }}
          >
           {
            formatRelative(created ?? Date.now(), new Date())
           }
          </Typography>
        </Box>
        <IconButton
          size='small'
          onClick={()=>props.remove(id ?? 1)}
        >
          <DeleteIcon fontSize='inherit' />
        </IconButton>
      </Box>

      <Typography sx={{ my: 3}}>{content}</Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between'
      }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1
            }}
            onClick={
              (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                navigate(`/profile/${id}`);
                e.stopPropagation();
              }
            }
          >
            <UserIcon 
              fontSize='medium'
              color='info'
            />
            <Typography variant='caption'>{user?.name}</Typography>
          </Box>
          <Box>
            <LikeButton item={props.item as PostListType} comment={props.comment} />
            <CommentButton item={props.item as PostListType} comment={props.comment} />
          </Box>
      </Box>
      
    </CardContent>
   </Card>
  )
}

export default Item