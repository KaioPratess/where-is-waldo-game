export default function Modal({mousePosition, isCharacter}) {
  const modalStyle = {
    top: (window.innerHeight - mousePosition.y) < 80 ? (mousePosition.y - 210) : (mousePosition.y - 10) + 'px',
    left: (window.innerWidth - mousePosition.x) < 280 ? (mousePosition.x - 220) : (mousePosition.x + 20) + 'px'
  }

  const markerStyle = {
    top: (mousePosition.y - 20) + 'px',
    left: (mousePosition.x - 20) + 'px',
  }

  return (
    <div className="modal-container">
      <div className="marker" style={markerStyle}></div>
      <div className="modal" style={modalStyle}>
        <ul>
          <li onClick={() => isCharacter('waldo')}>Waldo</li>
          <li onClick={() => isCharacter('woof')}>Woof</li>
          <li onClick={() => isCharacter('wilma')}>Wilma</li>
          <li onClick={() => isCharacter('wizard')}>Wizard</li>
          <li onClick={() => isCharacter('odlaw')}>Odlaw</li>
        </ul>
      </div>
    </div>
  )
}