import { Alert, Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'

const Register: React.FC = () => {
  return (
    <Box>
        <Typography variant='h3'>Register</Typography>
        <Alert severity='warning' sx={{ mt: 2}}>All fields required</Alert>

        <form>
            <Box
                sx={{display: 'flex', flexDirection: 'column', gap: 1, mt: 2}}
            >
                <TextField placeholder='Name' fullWidth />
                <TextField placeholder='Username' fullWidth />
                <TextField placeholder='Bio' fullWidth />
                <TextField type='password' placeholder='Password' fullWidth />
                <Button type='submit' variant='contained'>
                    Register
                </Button>
            </Box>
        </form>
    </Box>
  )
}

export default Register