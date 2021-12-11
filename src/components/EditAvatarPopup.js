import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();
  
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
    avatarRef.current.value = "";
  }
  
  return (
    <PopupWithForm 
        name="avatar" 
        title="Обновить аватар" 
        buttonTitle="Сохранить"
        isOpen={props.isOpen} 
        onClick={props.onClose} 
        onPopupClick={props.onPopupClick}
        onSubmit={handleSubmit}>
        <input 
          type="url" 
          id="avatar" 
          name="avatar" 
          placeholder="Ссылка" 
          className="popup__field popup__field_type_avatar" 
          autoComplete="off" 
          required
          ref={avatarRef} />
        <span id="avatar-error" className="popup__field-error"></span>
      </PopupWithForm>
  )
}

export default EditAvatarPopup;