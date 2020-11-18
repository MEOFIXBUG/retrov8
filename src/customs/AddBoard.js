import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import BoardService from "../services/board.service";
import { useHistory } from 'react-router-dom';
export default function AddBoard() {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState("");
    let history = useHistory();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handleAdd = async () => {
        const res = await BoardService.InsertBoard(name);
        if (res.success) {
            setOpen(false);
            history.push(`/myboard/${res.data}`);
        }
        else {
            if (res.message == 'Unauthorized') {
                window.location.href = "/";
            }
            else{
                alert(res.message);
            }
        }

    };
    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                + Thêm mới
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new one</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name Board"
                        type="text"
                        name="boardname"
                        onChange={handleNameChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleAdd} color="primary">
                        Add
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
