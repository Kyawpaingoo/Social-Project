import {
 IconButton,
 ButtonGroup,
 Button
} from "@mui/material";
import {
 ChatBubbleOutline as CommentIcon
} from "@mui/icons-material";

import React from 'react'
import { PostListType } from "../DataTypes/Post";

type CommentButtonType = {
    item: PostListType
    comment?: boolean
}

const CommentButton: React.FC<CommentButtonType> = (props: CommentButtonType) => {
  return (
    <>
        {
            !props.comment && (
                <ButtonGroup sx={{ml: 3}}>
                    <IconButton size="small">
                        <CommentIcon fontSize="small" color="info" />
                    </IconButton>

                    <Button sx={{ color: 'text.fade'}}
                        variant="text"
                        size="small"
                    >
                        {props.item.comments ? props.item.comments.length : 0}
                    </Button>
                </ButtonGroup>
            )
    }
    </>
  )
}

export default CommentButton