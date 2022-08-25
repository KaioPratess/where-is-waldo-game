import { useState, useEffect } from 'react'
import ChapterSelect from './components/ChapterSelect'
import Game from './components/Game'
import Scoreboard from './components/Scoreboard'
import char from './assets/img/char.png'
import logo from './assets/img/logo.png'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

import './App.css'

function App() {
  const [currentComponent, setCurrentComponent] = useState('chapterSelect')
  const [currentChapter, setCurrentChapter] = useState({})
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [positions, setPositions] = useState({})
  const [ foundCharacter, setFoundCharacter ] = useState()
  const [intervalState, setIntervalState] = useState(null)

  const changeFoundCharacter = (c) => {
    setFoundCharacter(c)
  }

  const changeCurrentComponent = (component) => {
    setCurrentComponent(component)
  }

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

  const returnHome = () => {
    window.location.reload()
  }

  const selectChapter = (name, img) => {
    setCurrentComponent('game')
    setCurrentChapter({name, img})
    const documents = getDb(`chapters/${name.toLowerCase().replace(/ /g, '-')}/positions`);
    console.log(documents)
    console.log(name.toLowerCase().replace(/ /g, '-'))

    documents.then(resp => {
        resp.docs.forEach(doc => {
          setPositions(prev => {
            return {
              ...prev,
              [doc.id]: {
                rangeX: doc._document.data.value.mapValue.fields.rangeX.arrayValue.values,
                rangeY: doc._document.data.value.mapValue.fields.rangeY.arrayValue.values
              }
            }
          })
        })
    })
    setIntervalState(setInterval(count, 1000))
  }

  const firebaseConfig = {
    apiKey: "AIzaSyA_6NzJhqx_GWodizVLBxbM6tzPHRXYrD0",
    authDomain: "where-s-waldo-game.firebaseapp.com",
    projectId: "where-s-waldo-game",
    storageBucket: "where-s-waldo-game.appspot.com",
    messagingSenderId: "162540878009",
    appId: "1:162540878009:web:76184a13138fcfa68a4368"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  const getDb = async (path) => {
    const querySnapshot = await getDocs(collection(db, path));

    return querySnapshot
  }

  const sendToDb = async (data) => {
    const docRef = await addDoc(collection(db, `chapters/${currentChapter.name.toLowerCase().replace(' ', '-')}/scoreboard`), data);

    console.log("Document written with ID: ", docRef.id);
  }

  useEffect(() => {
    const spans = document.querySelectorAll('.cspan')
    spans.forEach(span => {
      if(span.textContent.toLowerCase() === foundCharacter) {
        span.style.textDecoration = 'line-through'
        span.style.color = 'yellow'
      }
    })
  }, [foundCharacter])

  return (
    <div className="app">
      <header className='header'>
        <img src={logo} alt="logo" className='logo' onClick={returnHome}/>
        {currentComponent === 'chapterSelect' && <span onClick={() => setCurrentComponent('scoreboard')}>Scoreboard</span>}
        {currentComponent === 'game' && <div className='char-div'>
                                          <div className="characters">
                                            <img src={char} alt="characters" />
                                            <div>
                                              <span className='cspan'>Waldo</span>
                                              <span className='cspan'>Woof</span>
                                              <span className='cspan'>Wilma</span>
                                              <span className='cspan'>Wizard</span>
                                              <span className='cspan'>Odlaw</span>
                                            </div>
                                          </div>
                                          <div className="counter">{hours<10 && 0}{hours}:{minutes<10 && 0}{minutes}:{seconds<10 && 0}{seconds}</div>
                                        </div>
        }
      </header>

      {currentComponent === 'chapterSelect' &&  <ChapterSelect selectChapter={selectChapter}/>}
      {currentComponent === 'game' &&  <Game currentChapter={currentChapter} positions={positions} changeFoundCharacter={changeFoundCharacter} foundCharacter={foundCharacter} time={{hours, minutes, seconds}} interval={intervalState} sendToDb={sendToDb} changeCurrentComponent={changeCurrentComponent}/>}
      {currentComponent === 'scoreboard' &&  <Scoreboard currentChapter={currentChapter} getDb={getDb} />}
   
      <footer className='footer'>
        <p>Made by KaioPratess</p>
      </footer>
    </div>
  )
}

export default App
