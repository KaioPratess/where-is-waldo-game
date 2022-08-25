import { nanoid } from 'nanoid'
import ski from '../assets/img/ski.jpg'
import toys from '../assets/img/toys.jpg'
import troy from '../assets/img/troy.jpg'
import park from '../assets/img/park.jpg'
import future from '../assets/img/future.jpg'
import beach from '../assets/img/beach.jpg'

function ChapterSelect({selectChapter}) {

  const chapters = {
    'Ski Slopes': ski,
    'Toys Toys Toys': toys,
    'Horseplay in Troy': troy,
    'Amusement Park': park,
    'The Future': future,
    'On the Beach': beach
  }

  const Cards = () => {
    const keyArray = Object.keys(chapters)
    const cards = keyArray.map(key => {
      const id = nanoid()
      return (
        <div className='chapter-div' key={id} id={id} onClick={(e) => {
          const name = e.target.parentElement.childNodes[1].textContent
          const img = e.target.parentElement.childNodes[0].getAttribute('src')

          selectChapter(name, img)
        }}>
          <img src={chapters[key]} alt="chapter" />
          <p className='chapter-name'>{key}</p>
        </div>
      )
    })

    return cards
  }

  return (
    <div className='chapter-select'>
      <h2>Select a Chapter to Play</h2>
      <div className='chapters'>
        <Cards />
      </div>
    </div>
  )
}

export default ChapterSelect