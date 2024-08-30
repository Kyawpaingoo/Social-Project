import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useThemeHook } from '../Context/Theme';
import {Alert, Box, Button, TextField, Typography} from '@mui/material'
import { useMutation } from 'react-query';
import { postLogin } from '../Libs/fetcher';
import { LoginType } from '../DataTypes/User';

type loginParamType = {
    username: string,
    password: string
}

const Login: React.FC = () => {
    const usernameInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    const [error, setError] = useState<string  | null>(null);

    const navigate = useNavigate();
    const {setAuth} = useThemeHook();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const username: string = usernameInput.current?.value || '';
        const password: string = passwordInput.current?.value || '';

        if(!username || !password)
        {
            setError("username and password required");
            return false;
        }

        login.mutate({username, password})   
    }

    const login = useMutation(async ({username, password} : loginParamType)=> postLogin(username, password),{
        onError: async ()=>{
            setError("Incorrect username or password");
        },

        onSuccess: async (result: LoginType) => {
            setAuth(result.user);
            localStorage.setItem("token", result.token);
            navigate('/');
        }
    })  
  return (
    <Box>
        <Typography variant='h1'>Login</Typography>

        {
            error && (
                <Alert severity='warning'>
                    {error}
                </Alert>
            )
        }
        
        <form onSubmit={handleSubmit}>
            <Box
                sx={{display: 'flex', flexDirection: 'column', gap: 1, mt: 2}}
            >
                <TextField inputRef={usernameInput} 
                            placeholder='Username' fullWidth />
                <TextField inputRef={passwordInput} 
                            type='password' placeholder='Pasword' fullWidth />
                <Button type='submit' variant='contained' fullWidth>
                    Login
                </Button>
            </Box>
        </form>
    </Box>
  )
}

export default Login