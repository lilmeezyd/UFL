import { useEffect, useState } from "react"
import { getPicks, reset } from "../features/picks/picksSlice"
import { getPlayers } from "../features/players/playerSlice"
import { getTeams } from "../features/teams/teamSlice"
import { getPositions } from "../features/positions/positionSlice"
import { useDispatch, useSelector } from "react-redux"
import FixtureList from '../components/FixtureList'
import SideShow from '../components/SideShow'
import Squad from "../components/Squad"
import { getLeagues } from "../features/leagues/leagueSlice"
import { getManagerInfo } from "../features/managerInfo/managerInfoSlice"
import { getFixtures } from "../features/fixtures/fixtureSlice"
import { getMatchdays } from "../features/matchdays/matchdaySlice"
function PickTeam({ handleClose, handleShow }) {

  const dispatch = useDispatch()
  const { players } = useSelector(state => state.players)
  const { teams } = useSelector(state => state.teams)
  const { positions } = useSelector(state => state.positions)
  const { managerPicks } = useSelector((state) => state.managerPicks)
  const { managerInfo } = useSelector(state => state.managerInfo)
  const { fixtures } = useSelector(state => state.fixtures)
  const { matchdays } = useSelector(state => state.matchdays)
  const { leagues } = useSelector(state => state.leagues)
  const { teamName } = managerInfo

  useEffect(() => {
    dispatch(getPicks())
    dispatch(getPlayers())
    dispatch(getTeams())
    dispatch(getPositions())
    dispatch(getLeagues())
    dispatch(getManagerInfo())
    dispatch(getFixtures())
    dispatch(getMatchdays())
    return () => {
      dispatch(reset())
    }
  }, [dispatch])



  return (
    <>
      <div className="transfer-header">
        <h3 className="gw-heading">{teamName}</h3>
      </div>
      <div className="transfer-header">
        <h3 className="gw-heading">Matchday 1</h3>
      </div>
      <div className="matchday-deadline">
        <h4>Matchday 1 deadline:</h4>
        <p>Fri 11 Aug 20:30</p>
      </div>
      <div className='team-selection'>
        {!!teams.length === true &&
          !!positions.length === true &&
          !!managerPicks === true &&
          <Squad handleShow={handleShow} handleClose={handleClose}
            players={players} teams={teams} positions={positions}
            managerPicks={managerPicks.picks}
            teamName={teamName}
            fixtures={fixtures}
            matchdays={matchdays}
            picksId={managerPicks._id} />}
        <SideShow managerInfo={managerInfo} />
        <FixtureList />
      </div>
    </>
  )
}

export default PickTeam