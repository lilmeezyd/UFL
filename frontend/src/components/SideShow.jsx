import React from 'react'

function SideShow({managerInfo}) {
  return (
    <div className="playersCol">
    <h1>Leagues</h1>
    <div className="league-wrapper">
      <div className="league">
        <div className="league-header">Name</div>
        <div className="league-header">Rank</div>
      </div>
      {Object.keys(managerInfo).length > 0 && managerInfo.leagues.map(league =>
        <div className="league" key={league._id}>
          <div className="league-header">{league.name}</div>
          <div>{league.currentRank === null ? '-' : league.currentRank}</div>
        </div>)}
    </div>
    <h1>Transfers</h1>
    <div className="transfer-wrapper">
      <div className="league">
        <div className="league-header">Matchday Transfers</div>
        <div>1</div>
      </div>
      <div className="league">
        <div className="league-header">Total Transfers</div>
        <div>5</div>
      </div>
    </div>
    <h1>Budget</h1>
    <div className="balance-wrapper">
      <div className="league">
        <div className="league-header">Team value</div>
        <div>UGX 100.3m</div>
      </div>
      <div className="league">
        <div className="league-header">ITB</div>
        <div>UGX 2m</div>
      </div>
    </div>
    <h1>Chips</h1>
    <div className="chips-wrapper">
      <div className="league">
        <div className="league-header">Wildcard</div>
        <div>Unavailable</div>
      </div>
      <div className="league">
        <div className="league-header">Triple Captain</div>
        <div>Used Matchday 3</div>
      </div>
      <div className="league">
        <div className="league-header">Limitless</div>
        <div>Active</div>
      </div>
    </div>
  </div>
  )
}

export default SideShow