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
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import TwitterIcon from '@mui/icons-material/Twitter';
import TagIcon from '@mui/icons-material/Tag';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ListIcon from '@mui/icons-material/List';

const menu = [
    { id: 'Hlavní stránka', icon: <HomeIcon />, active: true },
    { id: 'Prozkoumat', icon: <TagIcon />},
    { id: 'Oznámení', icon: <NotificationsIcon /> },
    { id: 'Zprávy', icon: <MailOutlineIcon /> },
    { id: 'Záložky', icon: <BookmarkBorderIcon /> },
    { id: 'Seznamy', icon: <ListIcon /> },
    { id: 'Profil', icon: <PeopleIcon />,},
];

const item = {
    py: '2px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
};

const itemCategory = {
    bgcolor: '#101F33',
    py: 1.5,
    px: 3,
};

export const Navigator: React.FC<DrawerProps> = (props) => {
    const { ...other } = props;
    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem sx={{ ...item, ...itemCategory, fontSize: 22,justifyContent:'center' }}>
                    <TwitterIcon/> LITTER
                </ListItem>
                <Box sx={{ bgcolor: '#101F33' }}>
                    {menu.map(({ id: childId, icon, active }) => (
                        <ListItem disablePadding key={childId}>
                            <ListItemButton selected={active} sx={item}>
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