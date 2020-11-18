import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import BoardService from "../services/board.service";
import Category from '../customs/Category';
import Grid from '@material-ui/core/Grid';
import JobService from "../services/job.service";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    textareStyle: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        margin: 0,
        padding: 0,
    },
}));


export default function Temp(props) {
    const classes = useStyles();
    const type = [{ id: 1, byName: 'Went well' }, { id: 11, byName: 'To improve' }, { id: 21, byName: 'Action items' }];
    const [items, setItems] = useState([]);
    const [board, setBoard] = useState('');
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [idtemp, setIdtemp] = useState(1);
    useEffect(() => {
        async function fetchData() {
            // You can await here
            const board = await BoardService.getBoardByID(props.id);
            const res = await board.json();
            if (res.success) {
                setBoard(res.data.byName);
            }
            else {
                if (res.message == 'Unauthorized') {
                    window.location.href = "/";
                }
                else{
                    setError(res.message);
                }
            }
            const myjobs = await BoardService.getJobsOfBoard(props.id);
            const result = await myjobs.json();
            if (result.success) {
                setIsLoaded(true);
                let newItems = [...result.data];
                newItems.forEach(element => {
                    element.isNew = 0;
                });
                setItems(newItems);
            }
            else {
                setIsLoaded(true);
                setError(result.message);
            }
        }
        fetchData();
    }, []); // Or [] if effect doesn't need props or state
    const renderSide = (type) => {
        let newCards = [...items];
        const src = newCards.filter(item => item.type == type.id);

        return (
            <div className="text-center">
                <Category type={type}
                    Card={src}
                    CreateCard={() => createCard(type.id)}
                    AddJob={(input, idxtemp) => addJob(input, idxtemp)}
                    HandleEdit={(id) => handleEdit(id)}
                    HandleDelte={(id, idxtemp) => handleDelte(id, idxtemp)}>
                </Category>
            </div>
        );
    }
    const createCard = (typeId) => {
        let newSrc = [...items, {
            type: typeId,
            isNew: idtemp,
            likes: 0,
            dislikes: 0,
        }];
        setIdtemp(idtemp + 1);
        setItems(newSrc);
    }
    const addJob = async (input, idxtemp) => {
        let newSrc = [...items];
        let value = {};
        newSrc.forEach(element => {
            if (element.isNew == idxtemp) {
                element.byName = input;
                element.isNew = 0;
                value = element;
            }
        });
        let res = {};
        if (value.id === undefined) {

            res = await JobService.InsertJob(value.byName, value.type, props.id);
        }
        else {
            res = await JobService.UpdateJob(value.id, value.byName, value.type);
        }
        if (res.success) {
            const myjobs = await BoardService.getJobsOfBoard(props.id);
            const result = await myjobs.json();
            let newItems = [...result.data];
            newItems.forEach(element => {
                element.isNew = 0;
            });
            setItems(newItems);
            // setItems(newSrc);
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
    const handleDelte = async (id, idxtemp) => {
        if (id === undefined) {
            setItems(items.filter(item => item.isNew != idxtemp));
        } else {
            const res = await JobService.DeleteJob(id);
            if (res.success) {
                setItems(items.filter(item => item.id != id));
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

    }
    const handleEdit = async (id) => {
        let newSrc = [...items];
        newSrc.forEach(element => {
            if (element.id == id) {
                element.isNew = idtemp;
            }
        });
        setItems(newSrc);
    }
    const editBoardNameClick = async () => {
        const res = await BoardService.UpdateBoard(props.id,board);
        if (res.success) {
            alert("successfully")
        }
        else {
            if (res.message == 'Unauthorized') {
                window.location.href = "/";
            }
            else{
                alert(res.message);
            }
        }
    }
    const EditButton = () => (
        <IconButton aria-label="edit" onClick={editBoardNameClick} >
            <EditIcon />
        </IconButton>
    )
    const handleNameChange = (event) => {
        setBoard(event.target.value);
    }
    if (error) {
        return <div>Error: {error}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (

            <Container className={classes.cardGrid} maxWidth="md">
                {/* End hero unit */}
                <TextField
                    id="board-name"
                    label="Board-Name"
                    value={board}
                    onChange={handleNameChange}
                    InputProps={{ endAdornment: <EditButton /> }}
                />
                <Grid container spacing={2}>
                    {type.map((item, index) => (
                        <Grid item key={item} xs={12} sm={6} md={4}>
                            {renderSide(item)}
                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    }
}