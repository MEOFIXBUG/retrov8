import React from "react";
import Card from "./Card";
function Category(props) {
    return (
        <div className={props.toggle === 1 ? "row" : "col"}>
            <div className={(props.toggle === 1 ? " Rotate-1" : "").toString()}>
                <h2>{props.type.byName}</h2>
                <button
                    type="button"
                    className="addButton"
                    onClick={() => props.CreateCard(props.type.id)}
                >
                    +
                </button>
            </div>
            {props.Card.map((card) => {
                    return (
                        <Card
                            item={card}
                            addJob={props.AddJob}
                            deleteJob={props.HandleDelte}
                            handleEdit={props.HandleEdit}
                            // cardId={card.id}
                            // value={card.input}
                            // likesCount={card.likes}
                            // dislikesCount={card.dislikes}
                            // userInput={props.userInput}
                            // validateInput={props.validateInput}
                            // MoveLeft={props.MoveLeft}
                            // Delete={props.Delete}
                            // MoveRight={props.MoveRight}
                            // handleLikes={props.handleLikes}
                            // handleDislikes={props.handleDislikes}
                            // addClass={this.state.addClass}
                            // color={props.color}
                        />
                    );
                } 
            )}
        </div>
    );
}

export default Category;
