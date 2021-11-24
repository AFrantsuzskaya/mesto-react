function ImagePopup(props) {
    return(
      <section className={`popup popup_type_image ${props.card ? 'popup_open' : ''}`} onClick={props.onPopupClick}>
        <div className="popup__image-container">
          <button type="button" className="popup__close-button popup__close-button_block_image" onClick={props.onClose}></button>
          <img className="popup__image" src={props.card.link} alt={props.card.name}/>
          <h2 className="popup__name-title">{props.card.name}</h2>
        </div>
      </section>
    )
}

export default ImagePopup;
