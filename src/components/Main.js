import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  
  const currentUser = React.useContext(CurrentUserContext);
  

  return(
    <main className="content">
      <section className="profile content__profile">
        <div className="profile__wrapper">
          <button type="button" className="profile__avatar" onClick={props.onEditAvatar}  style={{ backgroundImage: `url(${currentUser.avatar})` }}>
            <div className="profile__overlay"></div>
          </button>
            <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" className="button profile__edit-button" onClick={props.onEditProfile}></button>
            <p className="profile__occupation">{currentUser.about}</p>  
          </div>
        </div>
          <button type="button" className="button profile__add-button" 
          onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__content content__elements">
        {props.cards.map((card) => {
            return <Card 
            key={card._id} 
            card={card} 
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
            />
          })}
        </ul>
      </section>
    </main>
  )
}
export default Main;
