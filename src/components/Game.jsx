import { useEffect, useState } from 'react'
import Magnify from './Magnify'
import Modal from './Modal'

function Game({currentChapter, positions, foundCharacter, changeFoundCharacter, time, interval, sendToDb, changeCurrentComponent}) {
  const [ img, setImg ] = useState()
  const [ mousePosition, setMousePosition ] = useState({x:0,y:0})
  const [ displayMagnify, setDisplayMagnify ] = useState(false)
  const [ activateModal, setActivateModal ] = useState(false)
  const [ clickedPosition, setClickedPosition ] = useState({})
  const [ openDialog, setOpenDialog ] = useState(false)
  const [ openCongrats, setOpenCongrats]  = useState(false)
  const [ charArray, setCharArray ] = useState([])

  const submit = () => {
    const name = document.querySelector('#name').value

    if(!name) {
      alert('Fill in your Name!')
    } else {
      sendToDb({name, time})
    }

    changeCurrentComponent('scoreboard')
  }

  const handleClick = (e) => {
    setActivateModal(prevState => !prevState)
    const rect = e.target.getBoundingClientRect();
    setClickedPosition({
      x: (mousePosition.x / rect.width).toFixed(2), 
      y: (mousePosition.y / rect.height).toFixed(2)
    })

    console.log(`x: ${(mousePosition.x / rect.width).toFixed(2)}`)
    console.log(`y: ${(mousePosition.y / rect.height).toFixed(2)}`)
  }

  useEffect(() => {
    if(foundCharacter) {
      if(!charArray.includes(foundCharacter)) {
        setCharArray(prevArr => [...prevArr, foundCharacter])
      }
    }
  },  [foundCharacter])

  useEffect(() => {
    if(charArray.length === 5) {
      setOpenCongrats(true)
      setCharArray([])
      clearInterval(interval)
      return
    }
  }, [charArray])

  const isCharacter = (c) => {
    let isTrue;
    console.log(positions[c])
    const minX = positions[c].rangeX[0].doubleValue
    const maxX = positions[c].rangeX[1].doubleValue
    const minY = positions[c].rangeY[0].doubleValue
    const maxY = positions[c].rangeY[1].doubleValue

    if(clickedPosition.x <= maxX && clickedPosition.x >= minX && clickedPosition.y <= maxY && clickedPosition.y >= minY) {
      isTrue = true
      changeFoundCharacter(c)
    } else {
      isTrue = false
      changeFoundCharacter(0)
    }
    openDialogFn()
    
    return isTrue
  }

  const openDialogFn = () => {
    setOpenDialog(true)
    setTimeout(() => {
      setOpenDialog(false)
    }, 1000)
  }

  const handleMouseLeave = () => {
    setDisplayMagnify(false)
  }

  const getMousePosition = (e) => {
    let rect, x = 0, y = 0;
    e.target.style.cursor = 'none';
    e = e || window.event;
    /* Get the x and y positions of the image: */
    rect = e.target.getBoundingClientRect();
    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = e.pageX - rect.left;
    y = e.pageY - rect.top;
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

  const dialogStyle = {
    display: 'flex',
    background: foundCharacter ? 'green' : 'red',
  }

  return (
    <div className="game-div">
      <h1>{currentChapter.name}</h1>
      {openDialog && 
        <div className='dialog' style={dialogStyle}>
          <p>{foundCharacter ? `You found ${foundCharacter.slice(0, 1).toUpperCase() + foundCharacter.slice(1)}!` : `Wrong! Keep Looking!`}</p>
        </div>
      }
      {openCongrats && 
        <div className='congrats-bg'>
          <div className='congrats'>
            <p>Congratulations!</p>
            <p>You found all characters in {time.hours<10 && 0}{time.hours}:{time.minutes<10 && 0}{time.minutes}:{time.seconds<10 && 0}{time.seconds}!</p>
            <div>
              <label htmlFor="name">Tell us your name</label>
              <input type='text' id='name' name='name' maxLength={15} required/>
            </div>
            <button type='btn' className='btn' onClick={submit}>Submit</button>
          </div>
        </div>
      }
      <div className="img-div">
        <img src={currentChapter.img} alt="Chapter Image" className='img' onClick={handleClick} onMouseMove={getMousePosition} onMouseLeave={handleMouseLeave}/>
        {displayMagnify && <Magnify img={img} zoom={2.5} mousePosition={mousePosition}/>}
        {activateModal && <Modal mousePosition={mousePosition} isCharacter={isCharacter}/>}
      </div>
    </div>
  )
}

export default Game