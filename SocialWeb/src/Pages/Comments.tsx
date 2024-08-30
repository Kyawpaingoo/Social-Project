import { Alert, Box, Button, TextField, Typography } from '@mui/material'
import Item from '../Components/Item'
import React, { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { queryClient, useThemeHook } from '../Context/Theme';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { PostListType } from '../DataTypes/Post';
import { fetchComment, postComment, RemoveComment } from '../Libs/fetcher';
import { PostCommentType } from '../DataTypes/Comment';


//const api = import.meta.env.Social_API;
const Comments : React.FC = () => {
    const {id} = useParams();
    const postId: number = Number(id);

    const contentInput = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const {auth, setGlobalMsg} = useThemeHook();

    const {isLoading, isError, error, data: post} = useQuery<PostListType>(["post", postId], 
        async ()=>fetchComment(postId)
    );

    const addComment = useMutation(
        (content: string) => postComment(content, postId),
        {
            onMutate: async (newContent) => {
                await queryClient.cancelQueries(['post', postId]);
                const prevPost = queryClient.getQueryData<PostListType>(['post', postId]);

                queryClient.setQueryData<PostListType | undefined>(['post', postId], (old)=> {
                    if(!old) return old;
                        
                    const commentData : PostCommentType = {
                        id: 0,
                        content: newContent,
                        userId: old.userId,
                        postId: postId,
                        created: new Date().toISOString(),
                        isDeleted: false,
                        user: old.user,
                        likes: [],
                    }

                    return {
                        ...old,
                        comments: [...old.comments, commentData]
                    }
                });

                return { prevPost };
            },

            onSuccess: (newComment)=> {
                queryClient.setQueryData<PostListType | undefined>(['post', postId], (old)=> {
                    if (!old) return old;
                    return {
                        ...old,
                        comments: old.comments.map(comment =>
                            comment.id === Date.now() ? newComment : comment
                        )
                    }
                });
                setGlobalMsg("Comment added successfully");
            },

            onError: (error, _ , context) => {
                console.error("Failed to add comment: ", error);
                setGlobalMsg("Failed to add comment");
                if(context?.prevPost) {
                    queryClient.setQueryData<PostListType>(['post', postId], context.prevPost);
                }
            },

            onSettled: ()=> {
                queryClient.invalidateQueries(['post', postId])
            }
        }
    )

    const removePost = useMutation(
        async (id: number) => {
            await axios.put(`/content/posts/${id}`);
        },
        {
            onSuccess: ()=>{
                queryClient.invalidateQueries("posts");
                navigate("/");
                setGlobalMsg("A Post deleted");
            },

            onError: (error) => {
                console.log("Fail to delete post:", error);
                setGlobalMsg("Failed to delete post");
            }
        }
    );

    const removeComment = useMutation(
        (id: number) => RemoveComment(id),
        {
            onMutate: async (id: number)=> {
                await queryClient.cancelQueries(["posts", postId]);
                const prevData = queryClient.getQueryData<PostListType>(["posts",postId]);

                queryClient.setQueryData<PostListType | undefined>(["posts", postId], (old)=>{
                    if(!old) return undefined;
                    console.log('success')
                    return {
                        ...old,
                        comments: old.comments.filter(comment => comment.id !== id)
                    }
                });
                
                return {prevData};
            },

            onSettled: ()=>{
                queryClient.invalidateQueries(["posts", postId]);   
            },

            onSuccess: ()=>{
                queryClient.invalidateQueries(["posts", postId])
                setGlobalMsg("A comment deleted");
            },

            onError: (error, id ,context)=>{
                console.log("Error message: ", error)
                setGlobalMsg("Failed to delete comment");

                if (context?.prevData) {
                    queryClient.setQueryData<PostListType>(["posts", postId], context.prevData);
                }
            }
        }
    )

    if(isError)
    {
        return (
            <Box>
                <Alert severity='warning'>
                    {error.message}
                </Alert>
            </Box>
        )
    }

    if(isLoading)
    {
        return (
            <Box>
                Loading...
            </Box>
        )
    }

    if(post)
    {
        return (
            <Box>
                <Item 
                    primary
                    key={post?.id}
                    item={post as PostListType}
                    remove={removePost.mutate}
                    comment={false}
                />
                {
                    post.comments?.length > 0 ? post.comments.map(comment => {
                       
                        if(comment) {
                            return (
                                <Item
                                    key={comment.id}
                                    item={comment}
                                    remove={removeComment.mutate}
                                    isOwner={comment.user?.name}
                                    comment={true}
                                />
                            )
                        }
                        
                    }) : (
                        <Typography>No Data.</Typography>
                    )
                }
                
                {
                    auth && (
                        <form onSubmit={(e: React.FormEvent<HTMLFormElement>)=> {
                            e.preventDefault();
                            const content = contentInput.current?.value;
                            
                            if(!content) return false;
                            addComment.mutate(content);
                            e.currentTarget.reset();
                        }}>
                            <Box
                                sx={{display: 'flex', flexDirection: 'column', gap: 1, my: 3}}
                            >
                                <TextField inputRef={contentInput} multiline placeholder='Your Comment' />
                                <Button type='submit' variant='contained'>Reply</Button>
                            </Box>
                        </form>
                    )
                }
                
            </Box>
        )
    }
}

export default Comments