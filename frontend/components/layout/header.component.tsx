import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {useContext} from "react";
import {signInWithGooglePopup} from "../../utils/firebase.utils";
import {UserContext} from "../../contexts/user.context";
import GoogleIcon from '@mui/icons-material/Google';
import {Menu, MenuItem} from "@mui/material";


export const Header: React.FC<{ title:string,onDrawerToggle: () => void }> = (props) => {
    const { onDrawerToggle,title } = props;
    const userContext = useContext(UserContext);
    const currentUser=userContext?.currentUser;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogin = async()=>{
        const { user } = await signInWithGooglePopup();
        userContext?.setCurrentUser(user);
    }

    const handleLogout = async()=>{
        userContext?.setCurrentUser(null);
        handleClose();
    }

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
                        { currentUser ? (
                          <>
                            <IconButton color="inherit" sx={{ p: 0.5 }}  aria-label="login" onClick={handleClick}>
                                <Avatar src={currentUser.photoURL??undefined} alt={currentUser.displayName??undefined} />
                            </IconButton>
                          </>
                        ) : (
                          <Button variant="outlined" startIcon={<GoogleIcon />} onClick={handleLogin}>
                              Přihlásit
                          </Button>
                        )}
                    </Grid>
                </Grid>
            </Toolbar>
            <Menu
              id="account-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{'aria-labelledby': 'account-button',}}
            >
                <MenuItem onClick={handleLogout}>Odhlásit</MenuItem>
            </Menu>
        </AppBar>
    );
}