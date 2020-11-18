import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Board from "../customs/Board";
import Button from '@material-ui/core/Button';
import AddBoard from "../customs/AddBoard";
import AuthService from "../services/auth.service";
const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    itemRight: {
        float: "right",
        position: "relative",
        transform: "translateY(-50%)"
      }
}));


export default function Album() {
    const classes = useStyles();
    const handleClickLogOut =  () => {
        AuthService.logout();
        window.location.href = "/";
    };
    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Button onClick={handleClickLogOut} variant="contained" color="secondary" className={classes.itemRight}  >
                        Logout
                    </Button>
                    <Container maxWidth="sm" justifyContent="center">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            My Board
                        </Typography>
                        < AddBoard />
                    </Container>
                </div>
                <Board> </Board>
            </main>
            {/* Footer */}
            <footer className={classes.footer}>
            </footer>
            {/* End footer */}
        </React.Fragment>
    );
}