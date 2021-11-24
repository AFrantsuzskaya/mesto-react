import React from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState(''); 
  const [userAvatar, setUserAvatar] = React.useState(''); 
  const [cards, setCards] = React.useState([]);
  
  React.useEffect (() => {
    api
      .getUserInfo()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch((err) => console.log(`Ошибка загрузки инициирующих данных: ${err}`))
  }, [])

  React.useEffect (() => {
    api
      .getCardList()
      .then((cards) => {
        setCards(cards.map((card) => ({
          _id: card._id,
          link: card.link,
          name: card.name,
          likes: card.likes
        })))

        ;
      })
      .catch((err) => console.log(`Ошибка загрузки карточек: ${err}`))
  }, [])
      
  return(
    <main className="content">
      <section className="profile content__profile">
        <div className="profile__wrapper">
          <button type="button" className="profile__avatar" onClick={props.onEditAvatar}  style={{ backgroundImage: `url(${userAvatar})` }}>
            <div className="profile__overlay"></div>
          </button>
            <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <button type="button" className="button profile__edit-button" onClick={props.onEditProfile}></button>
            <p className="profile__occupation">{userDescription}</p>  
          </div>
        </div>
          <button type="button" className="button profile__add-button" 
          onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__content content__elements">
        {cards.map((card) => {
            return <Card key={card._id} card={card} onCardClick={props.onCardClick}/>
          })}
        </ul>
      </section>
    </main>
  )
}
export default Main;
