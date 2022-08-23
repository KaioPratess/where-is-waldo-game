import { useState, useEffect } from 'react'

export default function Magnify({img, zoom, mousePosition}) {
  const [ glassStyle, setGlassStyle] = useState({
    backgroundImage: "url('" + img.src + "')",
    backgroundRepeat: "no-repeat",
    backgroundSize: (img.width * zoom) + "px " + (img.height * zoom) + "px",
    position: 'absolute',
    border: '3px solid #000',
    borderRadius: '50%',
    cursor: 'none',
    width: '100px',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: (mousePosition.y - (100 / 2)) + 'px',
    left: (mousePosition.x - (100 / 2)) + 'px',
    pointerEvents: 'none'
  })

  useEffect(() => {
    setGlassStyle(prevStyle => {
      return {
        ...prevStyle,
        left: (mousePosition.x - (100 / 2)) + "px",
        top: (mousePosition.y - (100 / 2)) + "px",
        backgroundPosition: "-" + ((mousePosition.x * zoom) - (100 / 2) + 3) + "px -" + ((mousePosition.y * zoom) - (100 / 2) + 3) + "px",
      }
    })
  }, [mousePosition])

  const pointerStyle = {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    border: '1px solid red',
    backgroundColor: 'red',
  }

  return (
    <div className='img-magnifier-glass' style={glassStyle}>
      <div className='pointer' style={pointerStyle}></div>
    </div>
  )
}