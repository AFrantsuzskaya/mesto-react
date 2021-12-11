import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);
  
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);
  
  function handleChangeName(evt) {
    setName(evt.target.value);
  }
  
  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description
    });
  }

  return (
    <PopupWithForm 
      name="submit" 
      title="Редактировать профиль" 
      buttonTitle="Сохранить" 
      isOpen={props.isOpen} 
      onClick={props.onClose} 
      onPopupClick={props.onPopupClick}
      onSubmit={handleSubmit}
    >
      <input 
        type="text" 
        id="user-name" 
        name="name" 
        placeholder="Имя" 
        className="popup__field popup__field_type_name" 
        autoComplete="off" 
        required minLength="2" 
        maxLength="40"
        value={name || ''}
        onChange={handleChangeName}/>
      <span id="user-name-error" className="popup__field-error"></span>
      <input 
        type="text" 
        id="about" 
        name="about" 
        placeholder="О себе" 
        className="popup__field popup__field_type_about-me" 
        autoComplete="off" 
        required 
        minLength="2" 
        maxLength="200"
        value={description || ''}
        onChange={handleChangeDescription}/>
      <span id="about-error" className="popup__field-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;