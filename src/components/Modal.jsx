export default function Modal({mousePosition}) {
  const modalStyle = {
    top: (window.innerHeight - mousePosition.y) < 80 ? (mousePosition.y - 210) : (mousePosition.y - 10) + 'px',
    left: (window.innerWidth - mousePosition.x) < 255 ? (mousePosition.x - 220) : (mousePosition.x + 20) + 'px'
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
          <li>Waldo</li>
          <li>Woof</li>
          <li>Wilma</li>
          <li>Wizard</li>
          <li>Odlaw</li>
        </ul>
      </div>
    </div>
  )
}