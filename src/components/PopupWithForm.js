import React from 'react';
function PopupWithForm(props) {
  return(
  <section className={`popup popup_${props.name} page__popup ${props.isOpen ? 'popup_open' : ''}`} 
  onClick={props.onPopupClick}>
    <button type="button" className="popup__close-button" onClick={props.onClose}></button>
    <div className="popup__container" onClick={(evt) => evt.stopPropagation()}>
      <h2 className="popup__title">{props.title}</h2>
      <form name={props.name} className="popup__form page__popup" noValidate>
        {props.children}
        <button type="submit" name="button" className="popup__submit-button">{props.buttonTitle}</button>
      </form>
    </div>
  </section>
  )
}

export default PopupWithForm;