import { useEffect, useState } from "react"
import { getPicks, reset } from "../features/picks/picksSlice"
import { getPlayers } from "../features/players/playerSlice"
import { getTeams } from "../features/teams/teamSlice"
import { getPositions } from "../features/positions/positionSlice"
import { useDispatch, useSelector } from "react-redux"
import FixtureList from '../components/FixtureList'
import Squad from "../components/Squad"
function PickTeam({ handleClose, handleShow }) {

  const dispatch = useDispatch()
  const { players } = useSelector(state => state.players)
  const { teams } = useSelector(state => state.teams)
  const { positions } = useSelector(state => state.positions)
  const { managerPicks } = useSelector((state) => state.managerPicks)

  useEffect(() => {
    dispatch(getPicks())
    dispatch(getPlayers())
    dispatch(getTeams())
    dispatch(getPositions())

    return () => {
      dispatch(reset())
    }
  }, [dispatch])



  return (
    <div className='team-selection'>
      {!!teams.length === true && 
      !!positions.length === true &&
      !!managerPicks === true &&
      <Squad handleShow={handleShow} handleClose={handleClose} players={players} teams={teams} positions={positions} 
      managerPicks={managerPicks.picks} />}
      <div>Leagues</div>
      <FixtureList />
    </div>
  )
}

export default PickTeam