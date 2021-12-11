import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(`Ошибка загрузки инициирующих данных: ${err}`))
  }, [])

  React.useEffect (() => {
    api
      .getCardList()
      .then((cards) => {
        setCards(cards)
      })
      .catch((err) => console.log(`Ошибка загрузки карточек: ${err}`))
  }, [])
  
  function closeAllPopups() {
    setIsProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  React.useEffect(() => {
    if (isProfilePopupOpen || isAddPlacePopupOpen || isAvatarPopupOpen || selectedCard) {
      function handleEsc(evt) {
        if (evt.key === 'Escape') {
          closeAllPopups();
        }
      }
      document.addEventListener("keydown", handleEsc)
      return () => {
        document.removeEventListener("keydown", handleEsc)
      }
    }
  }, [isProfilePopupOpen, isAddPlacePopupOpen, isAvatarPopupOpen, selectedCard])

  function handlePopupClickClose(evt) {
    if (evt.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }
  
  function handleUpdateUser(data) {
    api
      .setUserInfo(data.name, data.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups(res);

      })
      .catch((err) => console.log(`Ошибка загрузки данных профиля: ${err}`))
  }
  
  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка загрузки аватара: ${err}`))
  }
  
  function handleAddPlaceSubmit(data) {
    api
     .setCard(data.name, data.link)
     .then(newCard => {
       setCards([newCard, ...cards]);
       closeAllPopups();
     })
     .catch((err) => console.log(`Ошибка загрузки карточки: ${err}`))
    
  }
  
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .toggleLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => console.log(`Ошибка постановки/снятия лайка: ${err}`))
  }
  
  function handleCardDelete(card) {
    api
    .removeCard(card._id)
    .then(() => {
      let newCardsList = cards.filter((c) => c._id !== card._id)
      setCards(newCardsList);
    })
    .catch((err) => console.log(`Ошибка удаления карточки: ${err}`))
  }

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header />
      <Main 
        onEditProfile={()=> setIsProfilePopupOpen(true)} 
        onAddPlace={()=> setIsAddPlacePopupOpen(true)} 
        onEditAvatar={() => setIsAvatarPopupOpen(true)}
        onCardClick={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}/>
      <Footer />
      <EditProfilePopup 
        isOpen={isProfilePopupOpen} 
        onClose={closeAllPopups}
        onPopupClick={handlePopupClickClose} 
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onPopupClick={handlePopupClickClose}
        onAddPlace={handleAddPlaceSubmit}
      ></AddPlacePopup>
      <EditAvatarPopup
        isOpen={isAvatarPopupOpen}
        onClose={closeAllPopups}
        onPopupClick={handlePopupClickClose} 
        onUpdateAvatar={handleUpdateAvatar}
      ></EditAvatarPopup>
      <PopupWithForm name="delete" title="Вы уверены?" buttonTitle="Да">
      </PopupWithForm>
      <ImagePopup 
      card={selectedCard} 
      onClose={closeAllPopups} 
      onPopupClick={handlePopupClickClose}/>
    </div>
  </CurrentUserContext.Provider>
  );
}

export default App;
