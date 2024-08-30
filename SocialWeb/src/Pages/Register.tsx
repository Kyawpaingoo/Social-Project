import { Alert, Box, Button, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import { postUser } from '../Libs/fetcher';
import { useThemeHook } from '../Context/Theme';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { RegisterType } from '../DataTypes/User';

const Register: React.FC = () => {
    const { setGlobalMsg } = useThemeHook();
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const nameInput = useRef<HTMLInputElement>(null);
    const usernameInput = useRef<HTMLInputElement>(null);
    const bioInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const name: string = nameInput.current?.value || '';
        const username: string = usernameInput.current?.value || '';
        const bio: string = bioInput.current?.value || '';
        const password: string = passwordInput.current?.value || '';

        if(!name || !username || !password) {
            setError("name, username and password required");
            return false;
        }

        create.mutate({name, username, bio, password});
    };

    const create = useMutation(async (data: RegisterType) => postUser(data), {
        onError: async()=>{
            setError("Cannot createa account");
        },

        onSuccess: async () => {
            setGlobalMsg("Account Created");
            navigate("/login");
        }
    })
  return (
    <Box>
        <Typography variant='h3'>Register</Typography>
        <Alert severity='warning' sx={{ mt: 2}}>All fields required</Alert>

        {
            error && (
                <Alert severity='warning' sx={{mt: 2}}>
                    {error}
                </Alert>
            )
        }
        <form onSubmit={handleSubmit}>
            <Box
                sx={{display: 'flex', flexDirection: 'column', gap: 1, mt: 2}}
            >
                <TextField inputRef={nameInput} 
                            placeholder='Name' fullWidth />
                <TextField inputRef={usernameInput} 
                            placeholder='Username' fullWidth />
                <TextField inputRef={bioInput} 
                            placeholder='Bio' fullWidth />
                <TextField inputRef={passwordInput} 
                            type='password' placeholder='Password' fullWidth />
                <Button type='submit' variant='contained'>
                    Register
                </Button>
            </Box>
        </form>
    </Box>
  ) 
}

export default Register