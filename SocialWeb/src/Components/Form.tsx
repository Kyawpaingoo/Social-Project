import React, { useRef } from 'react';
import {
 Box,
 TextField,
 Button,
} from "@mui/material";

type FormProps = {
    add: (content: string, name: string)=>Promise<void>;
}

const Form: React.FC<FormProps> = (props: FormProps) => {

    const contentRef = useRef<HTMLInputElement>(null);
    const submit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const content = contentRef.current?.value || '';

        props.add(content, "Alice");
        e.currentTarget.reset();
    }
   
  return (
    <form onSubmit={submit}>
        <Box sx={{mb: 4, textAlign: 'right'}}>
            <TextField 
                inputRef={contentRef}
                type='text'
                placeholder='Content'
                fullWidth
                multiline
                sx={{mb: 1}}
            />
            <Button variant='contained' type='submit'>
                Post
            </Button>
        </Box>
    </form>
  )
}

export default Form