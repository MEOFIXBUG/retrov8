import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import PublishIcon from '@material-ui/icons/Publish';
import DeleteIcon from '@material-ui/icons/Delete';
import BoardService from "../services/board.service";
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    avatar: {
        backgroundColor: red[500],
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
}));
export default function BoardItem(props) {
    const classes = useStyles();
    const isPublished=Boolean(props.item.isPublished);
    let formatter = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "long",
        day: "2-digit"
    });
    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {props.item.byName.slice(0, 1)}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="remove" onClick={props.onDelClick}>
                        <DeleteIcon />
                    </IconButton>
                }
                subheader={formatter.format(Date.parse(props.item.createdAt))}
            />
            <Link to={`/myboard/${props.id}`}>
                <CardContent>
                    <Typography variant="title" color="textSecondary" component="h2">
                        {props.item.byName}
                    </Typography>
                </CardContent>
            </Link>
            <CardActions disableSpacing>

                {props.item.mine ?
                    <>
                        <IconButton aria-label="publish" onClick={props.onPublishClick} >
                            <PublishIcon color= {!isPublished?"":"primary"}  />
                        </IconButton>
                       
                    </> :
                    <IconButton
                        className={classes.expand}
                    >
                        <ShareIcon color="primary" />
                    </IconButton>}


            </CardActions>
        </Card>
    );
}
