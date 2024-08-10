import { Box, Container, Snackbar} from '@mui/material'

import {Outlet} from 'react-router-dom'

import Header from './Components/Header';
import AppDrawer from './Components/AppDrawer';

import { useThemeHook } from './Context/Theme';

import React from 'react'

const Template: React.FC = () => {
    const {globalMsg, setGlobalMsg} = useThemeHook();
  return (
    <Box>
        <Header />
        <AppDrawer />
        <Container maxWidth='sm' sx={{mt: 4}}>
            <Outlet />
        </Container>
        <Snackbar 
            anchorOrigin={{
                horizontal: 'center',
                vertical: 'bottom'
            }}
            open={Boolean(globalMsg)}
            autoHideDuration={6000}
            onClose={()=> setGlobalMsg(null)}
            message={globalMsg}
        />
    </Box>
  )
}

export default Template