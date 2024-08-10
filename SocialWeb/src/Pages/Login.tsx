import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useThemeHook } from '../Context/Theme';
import {Alert, Box, Button, TextField, Typography} from '@mui/material'

const Login: React.FC = () => {
    const navigate = useNavigate();
    const {setAuth} = useThemeHook();

    const submit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setAuth(true);
        navigate('/');
    }
  return (
    <Box>
        <Typography variant='h1'>Login</Typography>

        <Alert severity='warning'>All fields required.</Alert>

        <form onSubmit={submit}>
            <Box
                sx={{display: 'flex', flexDirection: 'column', gap: 1, mt: 2}}
            >
                <TextField placeholder='Username' fullWidth />
                <TextField type='password' placeholder='Pasword' fullWidth />
                <Button type='submit' variant='contained' fullWidth>
                    Login
                </Button>
            </Box>
        </form>
    </Box>
  )
}

export default Login