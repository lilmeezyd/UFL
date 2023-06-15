import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPlayers } from "../features/players/playerSlice"
import { getTeams  } from "../features/teams/teamSlice"
import { getMatchdays  } from "../features/matchdays/matchdaySlice"

function DashboardHome() {

  const dispatch = useDispatch()
  const { players } = useSelector((state) => state.players)
  const { teams } = useSelector((state) => state.teams)
  const { matchdays } = useSelector((state) => state.matchdays)

  useEffect(() => {
    dispatch(getPlayers())
    dispatch(getTeams())
    dispatch(getMatchdays())
}, [dispatch])

  
  return (
    <>
    <header className="dashboard-header">
      <div className="header-element">
        <h3>{teams.length}</h3>
        <p>Teams</p>
      </div>
      <div className="header-element">
        <h3>{players.length}</h3>
        <p>Players</p>
      </div>
      <div className="header-element">
        <h3>{matchdays.length}</h3>
        <p>Matchdays</p>
      </div>
      <div className="header-element">
        <h3>20</h3>
        <p>Users</p>
      </div>
    </header>

    <section className="player-stats-info">
      <div className="player-stats">
        <h3>Most Transferred In Players</h3>
      </div>
      <div className="player-stats">
        <h3>Most Transferred Out Players</h3>
      </div>
      <div className="player-stats">
        <h3>Most Selected Players</h3>
      </div>
      <div className="player-stats">
        <h3>Matchday Dream Team</h3>
      </div>
      <div className="player-stats">
        <h3>Overall Dream Team</h3>
      </div>
    </section></>
  )
}

export default DashboardHome