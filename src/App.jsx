import { useState } from 'react'
import ChapterSelect from './components/ChapterSelect'
import './App.css'

function App() {
 
  return (
    <div className="app">
      <header className='header'>
        <h1>Where's Waldo?</h1>
        <span>Scoreboard</span>
      </header>

      <ChapterSelect />

      <footer className='footer'>
        <p>Made by KaioPratess</p>
      </footer>
    </div>
  )
}

export default App
