import React from "react";

function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
      } 

    return(
      
      <li className="element">
         <div style={{ backgroundImage: `url(${props.card.link})` }} 
         alt={props.card.name} className="element__image" onClick={handleClick}></div>
        <button type="button" className="button element__trash-button"></button>
        <div className="element__block">
          <h2 className="element__title">{props.card.name}</h2>
          <div className="elemet__like-container">
            <button type="button" className="element__button"></button>
            <div className="element__counter">{props.card.likes.length}</div>
          </div>
        </div>
      </li>
    )
}

export default Card;
