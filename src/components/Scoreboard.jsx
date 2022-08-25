import { nanoid } from 'nanoid'
import ski from '../assets/img/ski.jpg'
import toys from '../assets/img/toys.jpg'
import troy from '../assets/img/troy.jpg'
import park from '../assets/img/park.jpg'
import future from '../assets/img/future.jpg'
import beach from '../assets/img/beach.jpg'
import { useEffect, useState } from 'react'

function Scoreboard({currentChapter, getDb}) {
  const [docs, setDocs] = useState([])
  const chapter = Object.keys(currentChapter).length ? currentChapter.name : 'ski-slopes'

  useEffect(() => {
    const documents = getDb(`chapters/${chapter.toLowerCase().replace(' ', '-')}/scoreboard`)

    documents.then(resp => {
      resp.docs.forEach(doc => {
        const name = doc._document.data.value.mapValue.fields.name.stringValue;
        const time = doc._document.data.value.mapValue.fields.time.mapValue.fields
        setDocs(prev => {
          return (
            [
              ...prev,
                {name, time}
            ]
          )
        })
      })
    })
  }, [])

  const chapters = {
    'Ski Slopes': ski,
    'Toys, Toys, Toys': toys,
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
        }}>
          <img src={chapters[key]} alt="chapter" />
          <p className='chapter-name'>{key}</p>
        </div>
      )
    })

    return cards
  }

  const TableRows = () => {
    console.log(docs)
    const rows = docs.map((doc) => {
      const id = nanoid()
      return (
        <tr key={id}>
          <td>{doc.name}</td>
          <td>{`${doc.time.hours.integerValue<10 ? 0 + doc.time.hours.integerValue : doc.time.hours.integerValue}:${doc.time.minutes.integerValue<10 ? 0 + doc.time.minutes.integerValue : doc.time.minutes.integerValue}:${doc.time.seconds.integerValue<10 ? 0 + doc.time.seconds.integerValue : doc.time.seconds.integerValue}`}</td>
        </tr>
      )
    })

    return rows
  }

  return (
    <div className='scoreboard-container'>
      <h1>ScoreBoard</h1>
      <div className='scoreboard-chapters'>
        <Cards />
      </div>
      <h2>{chapter.slice(0, 1).toUpperCase() + chapter.slice(1).replace('-', ' ')}</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <TableRows />
        </tbody>
      </table>
    </div>
  )
}

export default Scoreboard