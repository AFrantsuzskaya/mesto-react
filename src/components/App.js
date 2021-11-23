import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
 
  function closeAllPopups() {
    setIsProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsAvatarPopupOpen(false);
    setSelectedCard(false);
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

  function handlePopupClick(evt) {
    if (evt.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
  
    <div className="page">
      <Header />
      <Main 
        onEditProfile={()=> setIsProfilePopupOpen(true)} 
        onAddPlace={()=> setIsAddPlacePopupOpen(true)} 
        onEditAvatar={() => setIsAvatarPopupOpen(true)}
        onCardClick={handleCardClick}/>
      <Footer />
      <PopupWithForm name="submit" title="Редактировать профиль" buttonTitle="Сохранить" 
      isOpen={isProfilePopupOpen} onClose={()=> closeAllPopups()} onPopupClick={handlePopupClick}>
        <input type="text" id="user-name" name="name" placeholder="Имя" 
        className="popup__field popup__field_type_name" autoComplete="off" 
        required minLength="2" maxLength="40"/>
        <span id="user-name-error" className="popup__field-error"></span>
        <input type="text" id="about" name="about" placeholder="О себе" 
        className="popup__field popup__field_type_about-me" autoComplete="off" 
        required minLength="2" maxLength="200"/>
        <span id="about-error" className="popup__field-error"></span>
      </PopupWithForm>
      <PopupWithForm name="add" title="Новое место" buttonTitle="Создать"
        isOpen={isAddPlacePopupOpen} onClose={()=> closeAllPopups()} onPopupClick={handlePopupClick}>
        <input type="text" id="place-name" name="name" placeholder="Название" 
        className="popup__field popup__field_type_placename" autoComplete="off" 
        required minLength="2" maxLength="30"/>
        <span className="popup__field-error" id="place-name-error"></span>
        <input type="url" id="link" name="link" placeholder="Ссылка на картинку" 
        className="popup__field popup__field_type_link" autoComplete="off" required/>
        <span className="popup__field-error" id="link-error"></span>
      </PopupWithForm>
      <PopupWithForm name="avatar" title="Обновить аватар" buttonTitle="Сохранить"
      isOpen={isAvatarPopupOpen} onClose={()=> closeAllPopups()} onPopupClick={handlePopupClick}>
        <input type="url" id="avatar" name="avatar" placeholder="Ссылка" 
        className="popup__field popup__field_type_avatar" autoComplete="off" required />
        <span id="avatar-error" className="popup__field-error"></span>
      </PopupWithForm>
      <PopupWithForm name="delete" title="Вы уверены?" buttonTitle="Да">
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} onPopupClick={handlePopupClick}/>
  </div>
  

  
  );
}

export default App;
