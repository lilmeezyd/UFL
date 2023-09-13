
function TransferHeader({toggleList, list, title}) {
  return (
    <div className="players-heading-container">
        <h3 className="players-heading">{title}</h3>
        <button onClick={toggleList} className="btn player-list">
          {list ? 'Go back' : 'Player list'}</button>
      </div>
  )
}

export default TransferHeader