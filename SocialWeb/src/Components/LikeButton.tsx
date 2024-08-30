import React from 'react'
import { useNavigate } from 'react-router-dom'
import { queryClient, useThemeHook } from '../Context/Theme';
import { PostListType } from '../DataTypes/Post';
import { useMutation } from 'react-query';
import { deleteCommentLike, deletePostLike, postCommentLike, postContentLike } from '../Libs/fetcher';
import { Button, ButtonGroup, IconButton } from '@mui/material';
import {
  Favorite as LikedIcon,
  FavoriteBorder as LikeIcon
} from '@mui/icons-material';

type LikeButtonProps = {
  item: PostListType
  comment?: boolean
}

const LikeButton: React.FC<LikeButtonProps> = (props: LikeButtonProps) => {
  const navigate = useNavigate();
  const { auth } = useThemeHook();

  const isLike = () => {
    if(!auth) return false;
    if(!props.item.likes) return false;

    return props.item.likes.find(like => like.userId == auth.id);
  }

  const likePost = useMutation((id: number)=> postContentLike(id),{
    onSuccess: ()=> {
      queryClient.refetchQueries("posts");
      queryClient.refetchQueries("comments");
    }
  });

  const likeComment = useMutation((id: number)=> postCommentLike(id),{
    onSuccess: ()=> {
      queryClient.refetchQueries("comments");
    }
  });

  const unlikePost = useMutation((id: number)=> deletePostLike(id), {
    onSuccess: ()=>{
      queryClient.refetchQueries("posts");
      queryClient.refetchQueries("comments");
    }
  });

  const unlikeComment = useMutation((id: number)=> deleteCommentLike(id), {
    onSuccess: ()=> {
      queryClient.refetchQueries("comments");
    }
  })

  return (
    <ButtonGroup>
      {
      isLike() ? (
        <IconButton size='small' onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
          e.stopPropagation();
          props.comment ? unlikeComment.mutate(props.item.id)
          : unlikePost.mutate(props.item.id);
          
        }}>
          <LikedIcon fontSize='small' color='error' />
        </IconButton>
      ) : (
        <IconButton
          size='small'
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
            e.stopPropagation();
            props.comment ? likeComment.mutate(props.item.id)
            : likePost.mutate(props.item.id)
          }}
        >
          <LikeIcon fontSize='small' color='error' />
        </IconButton>
      )
    }

    <Button 
      onClick={(e)=>{
        if(props.comment) {
          navigate(`/likes/${props.item.id}/comment`);
        }
        else{
          navigate(`/likes/${props.item.id}/post`)
        }
        
        e.stopPropagation();
      }}
      sx={{ color: 'text.fade'}}
      variant='text'
      size='small'
    >
     {props.item.likes ? props.item.likes.length : 0} 
    </Button>

    </ButtonGroup>
  )
}

export default LikeButton