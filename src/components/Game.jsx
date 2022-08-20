function Game({currentChapter}) {
  return (
    <div className="game-div">

      <h1>{currentChapter.name}</h1>
      <div className="img-div">
        <img src={currentChapter.img} alt="Chapter Image" />
      </div>
    </div>
  )
}

export default Game