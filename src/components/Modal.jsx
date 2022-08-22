export default function Modal({mousePosition}) {
  const modalStyle = {
    top: (mousePosition.y - 20) + 'px',
    left: (mousePosition.x + 20) + 'px',
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