import { useState, useEffect } from 'react'
import ChapterSelect from './components/ChapterSelect'
import Game from './components/Game'
import Scoreboard from './components/Scoreboard'
import char from './assets/img/char.png'
import './App.css'

function App() {
  const [currentComponent, setCurrentComponent] = useState('chapterSelect')
  const [currentChapter, setCurrentChapter] = useState({})
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  let interval;

  const count = () => {
      setSeconds(prevState => {
        if(prevState < 59) {
          return prevState + 1
        } else {
          setMinutes(prevState => {
            if(prevState < 59) {
              return prevState + 1
            } else {
              setHours(prevState => prevState + 1)
              return 0
            }
          })
          return 0
        }
      })
  }


  const selectChapter = (name, img) => {
    setCurrentComponent('game')
    setCurrentChapter({name, img})

    interval = setInterval(() => {
      count()
    }, 1000)
  }
 
  return (
    <div className="app">
      <header className='header'>
        <h1 onClick={() => setCurrentComponent('chapterSelect')}>Where's Waldo?</h1>
        {currentComponent === 'chapterSelect' && <span>Scoreboard</span>}
        {currentComponent === 'game' && <div className='char-div'>
                                          <div className="characters">
                                            <img src={char} alt="characters" />
                                            <div>
                                              <span>Wildo</span>
                                              <span>Woof</span>
                                              <span>Wilma</span>
                                              <span>Wizard</span>
                                              <span>Odlaw</span>
                                            </div>
                                          </div>
                                          <div className="counter">{hours<10 && 0}{hours}:{minutes<10 && 0}{minutes}:{seconds<10 && 0}{seconds}</div>
                                        </div>
        }
      </header>

      {currentComponent === 'chapterSelect' &&  <ChapterSelect selectChapter={selectChapter}/>}
      {currentComponent === 'game' &&  <Game currentChapter={currentChapter} />}
      {currentComponent === 'scoreboard' &&  <Scoreboard />}
   
      <footer className='footer'>
        <p>Made by KaioPratess</p>
      </footer>
    </div>
  )
}

export default App
