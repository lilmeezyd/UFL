import { useEffect } from 'react'
import FixtureList from '../components/FixtureList'
import Live from '../components/Live'
import { getManagerInfo } from "../features/managerInfo/managerInfoSlice"
import { useDispatch, useSelector } from 'react-redux'
import SideShow from '../components/SideShow'
import { getLives, reset } from '../features/lives/livesSlice'
import { getFixtures } from "../features/fixtures/fixtureSlice"
import { getMatchdays } from "../features/matchdays/matchdaySlice"
import { getPlayers } from "../features/players/playerSlice"
import { getTeams } from "../features/teams/teamSlice"
import { getPositions } from "../features/positions/positionSlice"
function Points({ handleClose, handleShow }) {

  const dispatch = useDispatch()
  const { managerInfo } = useSelector(state => state.managerInfo)
  const { lives } = useSelector(state => state.lives)
  const { players } = useSelector(state => state.players)
  const { teams } = useSelector(state => state.teams)
  const { positions } = useSelector(state => state.positions)
  const { fixtures } = useSelector(state => state.fixtures)
  const { matchdays } = useSelector(state => state.matchdays)
  const { teamName } = managerInfo

  useEffect(() => {
    dispatch(getManagerInfo())
    dispatch(getLives())
    dispatch(getPlayers())
    dispatch(getTeams())
    dispatch(getPositions())
    dispatch(getFixtures())
    dispatch(getMatchdays())
    return () => {
      dispatch(reset())
    }
  }, [dispatch])

  return (
    <div className='team-selection'>
      {lives.length > 0 && <Live livePicks={lives[0]?.livePicks}
        players={players} teams={teams} positions={positions}
        teamName={teamName}
        fixtures={fixtures}
        matchdays={matchdays}
        handleShow={handleShow} handleClose={handleClose} />}
      <SideShow managerInfo={managerInfo} />
      <FixtureList />
    </div>
  )
}

export default Points 