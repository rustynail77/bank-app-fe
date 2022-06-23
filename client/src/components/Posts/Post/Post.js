import React from 'react';
import { Card, CardActions, CardContent, 
  // CardMedia, 
  Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6">{post.clientName}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </CardContent>
      <CardContent className={classes.overlay2}>
        <Button style={{ backgroundColor: 'silver' }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="default" /></Button>
      </CardContent>
      <CardContent>
        <Typography color="textPrimary" component="h4">Balance:</Typography>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.balance}</Typography>
      </CardContent>
      <CardContent className={classes.details}>
        <Typography color="textPrimary" component="h4">City:</Typography>
        <Typography className={classes.content} variant="body2" color="textSecondary" component="h2">{post.city}</Typography>
      </CardContent>
      <CardContent className={classes.details}>
        <Typography color="textPrimary" component="h4">Mortgage:</Typography>
        <Typography className={classes.content} variant="body2" color="textSecondary" component="p">{post.haveMortgage}</Typography>
      </CardContent>
      <CardContent className={classes.details}>
        <Typography color="textPrimary" component="h4"># of Cards:</Typography>
        <Typography className={classes.content} variant="body2" color="textSecondary" component="p">{post.numCreditCards}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}><ThumbUpAltIcon fontSize="small" /> Like {post.likeCount} </Button>
        <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" /> Delete</Button>
      </CardActions>
    </Card>
  );
};

export default Post;
