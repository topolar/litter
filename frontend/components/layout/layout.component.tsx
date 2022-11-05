import {Box, useMediaQuery} from "@mui/material";
import {theme} from "../../utils/theme";
import React, {ReactNode} from "react";
import { Header } from "./header.component";
import { Navigator } from "./navigator.component"

const drawerWidth = 256;

export const Layout: React.FC<{ children:ReactNode }> = ({children}) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
                {isSmUp ? null : (
                    <Navigator
                        PaperProps={{ style: { width: drawerWidth, backgroundColor: '#101F33' } }}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                    />
                )}
                <Navigator
                    PaperProps={{ style: { width: drawerWidth,backgroundColor: '#101F33' } }}
                    sx={{ display: { sm: 'block', xs: 'none' } }}
                />
            </Box>
            <Box sx={{flex:1, display:'flex' ,bgcolor: '#eaeff1'}}>
                <Box sx={{ flex: 1, display: 'flex', maxWidth:600, flexDirection: 'column',borderRight:"#999 1px solid" }}>
                    <Header onDrawerToggle={handleDrawerToggle} />
                    <Box component="main" sx={{ flex: 1, py: 6, px: 4 }}>
                        {children}
                    </Box>
                    <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
                        (c) Copyright 2022,M.T.
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};