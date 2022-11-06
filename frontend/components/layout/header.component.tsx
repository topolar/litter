import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import {ReactNode} from "react";

const lightColor = 'rgba(255, 255, 255, 0.7)';

interface HeaderProps {
    onDrawerToggle: () => void;
}

export const Header: React.FC<{ title:string,onDrawerToggle: () => void }> = (props) => {
    const { onDrawerToggle,title } = props;

    return (
        <AppBar position="sticky" elevation={1} sx={{bgcolor:"#e0e4f1",color:'#000',marginBottom:2}}>
            <Toolbar>
                <Grid container spacing={1} alignItems="center">
                    <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={onDrawerToggle}
                            edge="start"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs>
                        <Typography color="inherit" variant="h5" component="h1">
                            {title}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Tooltip title="Alerts • No alerts">
                            <IconButton color="inherit">
                                <NotificationsIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <IconButton color="inherit" sx={{ p: 0.5 }}>
                            <Avatar src="" alt="My Avatar" />
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}