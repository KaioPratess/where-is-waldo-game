import { useEffect, useState } from 'react'
import Magnify from './magnify'
import Modal from './Modal'

function Game({currentChapter}) {
  const [ img, setImg ] = useState()
  const [ mousePosition, setMousePosition ] = useState({x:0,y:0})
  const [ displayMagnify, setDisplayMagnify ] = useState(false)
  const [ activateModal, setActivateModal ] = useState(false)

  const handleClick = (e) => {
    setActivateModal(prevState => !prevState)
    console.log(mousePosition.x, mousePosition.y)
  }

  const handleMouseLeave = () => {
    setDisplayMagnify(false)
  }

  const getMousePosition = (e) => {
    let a, x = 0, y = 0;
    e.target.style.cursor = 'none';
    e = e || window.event;
    /* Get the x and y positions of the image: */
    a = e.target.getBoundingClientRect();
    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /* Consider any page scrolling: */
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    setMousePosition({x, y})
    setDisplayMagnify(true)
    setActivateModal(false)
  }

  useEffect(() => {
    setImg(document.querySelector('.img'))
    setDisplayMagnify(true)
  }, [])

  return (
    <div className="game-div">
      <h1>{currentChapter.name}</h1>
      <div className="img-div">
        <img src={currentChapter.img} alt="Chapter Image" className='img' onClick={handleClick} onMouseMove={getMousePosition} onMouseLeave={handleMouseLeave}/>
        {displayMagnify && <Magnify img={img} zoom={2.5} mousePosition={mousePosition}/>}
        {activateModal && <Modal mousePosition={mousePosition}/>}
      </div>
    </div>
  )
}

export default Game