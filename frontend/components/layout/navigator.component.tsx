import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import TwitterIcon from '@mui/icons-material/Twitter';
import TagIcon from '@mui/icons-material/Tag';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ListIcon from '@mui/icons-material/List';
import {useRouter} from "next/router";
import Link from "next/link";



const item = {
    py: '2px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
};

export const Navigator: React.FC<DrawerProps> = (props) => {
    const router = useRouter();
    const menu = [
        { id: 'Hlavní stránka', icon: <HomeIcon />, href:'/', active: router.pathname==='/'},
        { id: 'Prozkoumat', icon: <TagIcon />, href:'#'},
        { id: 'Oznámení', icon: <NotificationsIcon />, href:'#' },
        { id: 'Zprávy', icon: <MailOutlineIcon />, href:'#' },
        { id: 'Záložky', icon: <BookmarkBorderIcon />, href:'#' },
        { id: 'Seznamy', icon: <ListIcon />, href:'#' },
        { id: 'Profil', icon: <PeopleIcon />, href:'#'},
    ];

    const { ...other } = props;
    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem sx={{ ...item,fontSize: 22,justifyContent:'center',bgcolor: '#101F33', py: 1.5, px: 3}}>
                    <TwitterIcon/> LITTER
                </ListItem>
                <Box sx={{ bgcolor: '#101F33' }}>
                    {menu.map(({ id: childId, icon, active,href }) => (
                        <ListItem disablePadding key={childId}>
                            <ListItemButton selected={active} sx={item} href={href} component={Link}>
                                <ListItemIcon sx={{color:'#fff'}}>{icon}</ListItemIcon>
                                <ListItemText>{childId}</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <Divider sx={{ mt: 2 }} />
                </Box>
            </List>
        </Drawer>
    );
}