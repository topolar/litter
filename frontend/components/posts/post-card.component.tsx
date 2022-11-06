import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Post} from "../../__generated__/graphql";
import {Chip, Menu, MenuItem} from "@mui/material";
import Link from "next/link";
import moment from 'moment';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

export const PostCard: React.FC<{ post:Post, onDelete:()=>void }> = ({post,onDelete}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        handleClose();
        onDelete();
    }

    return (
        <Card sx={{width:'100%'}}>
            <CardHeader
                avatar={
                  post.user ? (
                    <Avatar src={post.user.image!} alt={post.user.name!} sx={{ bgcolor: red[500] }} aria-label="recipe"/>
                  ): (
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">?</Avatar>
                  )
                }
                action={
                    <IconButton aria-label="settings" id="menu-button" onClick={handleClick}>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={post.user?.name}
                subheader={moment(post.createdAt).utcOffset(60).format('D.M.YYYY H:mm')}
            />
            { post.image && (
                    <CardMedia
                        component="img"
                        height="194"
                        image="/static/images/cards/paella.jpg"
                        alt="Paella dish"
                    />
            )}

            <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{fontSize:"1.3em"}}>
                    {post.text}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Link href={`/posts/${post.id}`}>
                  <IconButton aria-label="share">
                      <ShareIcon />
                  </IconButton>
                </Link>

            </CardActions>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{'aria-labelledby': 'menu-button',}}
            >
                <MenuItem onClick={handleDelete}>Smazat</MenuItem>
            </Menu>
        </Card>
    );
}
