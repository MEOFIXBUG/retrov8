import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './card.css';
const useStyles = makeStyles((theme) => ({
    relativeStyle: {
        position: "relative"
    },
    textareStyle: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        margin: 0,
        padding: 0,
    },
    buttonStyle: {
        position: "absolute",
        bottom: 15,
        right: 10,
    }
}));

function Card(props) {
    const [name, setName] = React.useState(props.item.byName?props.item.byName:"");
    const classes = useStyles();
    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    return (
        <div className={"BoardItem card j" + props.item.type}>
            <br />
            <div className={classes.relativeStyle}>
                <textarea
                    className={classes.textareStyle}
                    placeholder="Enter Text Here"
                    value={name}
                    readOnly={!props.item.isNew}
                    onChange={handleNameChange}
                    // onBlur={props.validateInput}
                />
                {!props.item.isNew ?
                    <>
                    </> :
                    <Button onClick={()=>props.addJob(name,props.item.isNew)} className={classes.buttonStyle} variant="contained" color="primary">
                        {props.item.id?"Edit":"Add"}
                    </Button>}
            </div>
            <br />
            <div className="FunctionNav">
            {!props.item.isNew ?
                   <button onClick={() => props.handleEdit(props.item.id)}>
                   <i className="far fa-edit" title="Edit" />
                   {props.dislikesCount}
               </button> :
                    <></>}
                
                <button onClick={() => props.deleteJob(props.item.id,props.item.isNew)}>
                    <i className="far fa-trash-alt" title="Delete" />
                </button>
            </div>
        </div>
    );
}

export default Card;
