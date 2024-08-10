import { createContext, Dispatch, useContext, SetStateAction, useState, useMemo } from "react";
import React from "react";
import {
    CssBaseline,
    PaletteMode,
    ThemeProvider,
    createTheme,
} from '@mui/material';
import { deepPurple, grey } from "@mui/material/colors";
import { RouterProvider } from "react-router-dom";
import Routers from "../Routers";

// type authType  = any;

type ThemeContextType = {
    showForm: boolean;
    mode: PaletteMode,
    setShowForm: Dispatch<SetStateAction<boolean>>;
    setMode: Dispatch<SetStateAction<PaletteMode>>;
    showDrawer: boolean,
    setShowDrawer:  Dispatch<SetStateAction<boolean>>,
    auth: boolean | null,
    setAuth:  Dispatch<SetStateAction<boolean | null>>
    globalMsg: string | null,
    setGlobalMsg: Dispatch<SetStateAction<string | null>>
}

export const ThemeContext = createContext<ThemeContextType>({
    showForm: false,
    setShowForm: ()=>{},
    mode: "dark",
    setMode: ()=>{},
    showDrawer: false,
    setShowDrawer: ()=>{},
    auth: false,
    setAuth: ()=>{},
    globalMsg: null,
    setGlobalMsg: ()=>{}
});

export const useThemeHook = () =>{
    return useContext(ThemeContext);
}

const Theme: React.FC = ()=>{
    const [mode, setMode] = useState<PaletteMode>("dark");
    const [showForm,setShowForm] = useState<boolean>(false);
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    const [auth, setAuth] = useState<boolean  | null>(false);
    const [globalMsg, setGlobalMsg] = useState<string | null>(null);

    const theme = useMemo(()=>{
        return createTheme({
        palette: {
				mode,
				primary: deepPurple,
				banner: mode === "dark" ? grey[800] : grey[200],
				text: {
					fade: grey[500],
				},
			},
        });
    },[mode]);

    return (
        <ThemeProvider theme={theme}>
            <ThemeContext.Provider value={{
                showForm, 
                setShowForm,
                mode, 
                setMode,
                showDrawer,
                setShowDrawer,
                auth,
                setAuth,
                globalMsg,
                setGlobalMsg
            }}>
                <RouterProvider router={Routers} />
                <CssBaseline />
            </ThemeContext.Provider>
        </ThemeProvider>
    )
};

export default Theme;