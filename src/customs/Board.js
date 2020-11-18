import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import BoardItem from './BoardItem';
import BoardService from "../services/board.service";
const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    }
}));

export default function Board() {
    const classes = useStyles();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    useEffect(() => {
        async function fetchData() {
            // You can await here
            const myboard = await BoardService.getUserBoard();
            const sharedboard = await BoardService.getSharedBoard();
            const result1 = await myboard.json();
            const result2 = await sharedboard.json();
            if (result1.success || result2.success) {
                setIsLoaded(true);
                const result = result1.data.concat(result2.data);
                setItems(result);
            }
            else {
                if (result1.message == 'Unauthorized' || result2.message == 'Unauthorized') {
                    window.location.href = "/";
                }
                setIsLoaded(true);
                setError(result1.message + '\n' + result2.message);
            }
        }
        fetchData();
    }, []); // Or [] if effect doesn't need props or state
    const handleDelte = async (i) => {
        const res = await BoardService.DeleteBoard(items[i].id);
        if (res.success) {
            setItems(items.filter(item => item.id != items[i].id));
        }
        else {
            if (res.message == 'Unauthorized') {
                window.location.href = "/";
            }
            else{
                setError(res.message);
            }
        }
    }
    const handlePublish = async (id, flag) => {
        const res = await BoardService.PublishBoard(id, flag);
        if (res.success) {
            let newSrc = [...items];
            newSrc.forEach(element => {
                if (element.id == id) {
                    element.isPublished = flag;
                }
            });
            setItems(newSrc);
            alert(flag?`Đã chia sẻ công khai`:'Đã hủy chia sẻ');
        }
        else {
            if (res.message == 'Unauthorized') {
                window.location.href = "/";
            }
            else{
                setError(res.message);
            }
            
        }
    }
    const renderBoardItem = (i) => {
        return (
            <BoardItem key={i} id={items[i].id} item={items[i]}
                // onEditClick={(id, byName) => handleEdit(id, byName)}
                onPublishClick={() => handlePublish(items[i].id, 1-items[i].isPublished)}
                onDelClick={() => handleDelte(i)} 
                ></BoardItem>
        );
    }
    if (error) {
        return <div>Error: {error}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <Container className={classes.cardGrid} maxWidth="md">
                {/* End hero unit */}
                <Grid container spacing={4}>
                    {items.map((item, index) => (
                        <Grid item key={item.id} xs={12} sm={6} md={4}>
                            {renderBoardItem(index)}
                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    }
}
