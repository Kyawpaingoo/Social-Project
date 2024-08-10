import { Box, Button, TextField } from '@mui/material'
import Item from '../Components/Item'
import React from 'react'


const Comments : React.FC = () => {
  return (
    <Box>
        <Item 
            primary
            key={1}
            item={{
                id: 1,
                content: 'Initial post content from Alice',
                name: 'Aclie'
            }}
            remove={()=>{}}
        />
        <Item 
            key={1}
            item={{
                id: 2,
                content: 'A comment from Bob',
                name: 'Bob'
            }}
            remove={()=>{}}
        />
        <Item
            key={3}
            item={{
                id: 2,
                content: 'A comment reply from Alice',
                name: 'Aclie'
            }}
            remove={()=>{}}
        />
        <form>
            <Box
                sx={{display: 'flex', flexDirection: 'column', gap: 1, my: 3}}
            >
                <TextField multiline placeholder='Your Comment' />
                <Button type='submit' variant='contained'>Reply</Button>
            </Box>
        </form>
    </Box>
  )
}

export default Comments