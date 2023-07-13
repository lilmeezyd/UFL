import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {  reset, getFixture } from "../features/fixtures/fixtureSlice"
import { getPlayers  } from "../features/players/playerSlice"
import { getTeams } from "../features/teams/teamSlice"
import { getMatchdays } from "../features/matchdays/matchdaySlice"
import FixtureItem from "./FixtureItem"

function DisplayStats({fixtureId, clearEdit}) {

  const [ stats, displayStats ] = useState(false)
  const { teams } = useSelector((state) => state.teams)
  const { matchdays } = useSelector((state) => state.matchdays)
  const { players } = useSelector((state) => state.players)
  const { singleFixture } = useSelector((state) => state.fixtures)
  const dispatch = useDispatch()
  

  useEffect(() => {
    dispatch(getPlayers())
    dispatch(getTeams())
    dispatch(getMatchdays())
    dispatch(getFixture(fixtureId))
  
    return () => {
      dispatch(reset())
    }
  }, [dispatch, fixtureId])
  

  const onClick = () => {
    displayStats((prevState) => !prevState)
}

  const createStats = (field, ground) => {
    return singleFixture?.stats?.length > 0 && singleFixture?.stats?.filter(x => x.identifier === field)[0]
                    [ground].map((x) => (
                        <p key={x.player} className="player">
                        <span className="stats">{players.find(player => player._id === x.player).appName}</span>
                        <span>({x.value})</span></p>
                    ))
}

const statExists = (field) => {
    return singleFixture?.stats?.findIndex(x => x.away.length === 0 && x.home.length === 0 && x.identifier === field)
}

  return (
    <div key={singleFixture._id} className="content-wrapper-3">
        <button onClick={() => clearEdit()} className="btn btn-close">X</button>
        <div className="deadline">
            <p>{matchdays.filter(matchday => matchday._id === singleFixture.matchday)[0]?.name}</p>
            <p>{new Date(singleFixture.kickOffTime).toDateString()}</p>
        </div>
        <div onClick={onClick} className={`${stats && 'bg-teams'} teams fixture`}>
            <FixtureItem fixture={singleFixture} teams={teams} />
        </div>
        {stats && singleFixture?.stats?.length > 0 &&
            <div>{statExists('goalsScored') === -1 &&
                <>
                    <h1 className="stats">Goals Scored</h1>
                    <div className="info-container">
                <div>
                    {createStats('goalsScored', 'home')}
                </div>

                <div>
                    {createStats('goalsScored', 'away')}
                </div>
                    </div>
                </>}

            {statExists('assists') === -1 && 
            <><h1 className="stats">Assists</h1>
            <div className="info-container">
                <div>
                    {createStats('assists', 'home')}
                </div>

                <div>
                    {createStats('assists', 'away')}
                </div>
            </div></>}

            {statExists('ownGoals') === -1 && 
            <><h1 className="stats">Own Goals</h1>
            <div className="info-container">
                <div>
                    {createStats('ownGoals', 'home')}
                </div>

                <div>
                    {createStats('ownGoals', 'away')}
                </div>
            </div></>}

            {statExists('penaltiesSaved') === -1 &&
            <><h1 className="stats">Penalties Saved</h1>
            <div className="info-container">
                <div>
                    {createStats('penaltiesSaved', 'home')}
                </div>

                <div>
                    {createStats('penaltiesSaved', 'away')}
                </div>
            </div></>}

            {statExists('penaltiesMissed') === -1 &&
            <><h1 className="stats">Penalties Missed</h1>
            <div className="info-container">
                <div>
                    {createStats('penaltiesMissed', 'home')}
                </div>

                <div>
                    {createStats('penaltiesMissed', 'away')}
                </div>
            </div></>}

            {statExists('yellowCards') === -1 &&
            <><h1 className="stats">Yellow Cards</h1>
            <div className="info-container">
                <div>
                    {createStats('yellowCards', 'home')}
                </div>

                <div>
                    {createStats('yellowCards', 'away')}
                </div>
            </div></>}

            {statExists('redCards') === -1 && 
            <><h1 className="stats">Red Cards</h1>
            <div className="info-container">
                <div>
                    {createStats('redCards', 'home')}
                </div>

                <div>
                    {createStats('redCards', 'away')}
                </div>
            </div></>}

            {statExists('saves') === -1 && 
            <><h1 className="stats">Saves</h1>
            <div className="info-container">
                <div>
                    {createStats('saves', 'home')}
                </div>

                <div>
                    {createStats('saves', 'away')}
                </div>
            </div></>}
        </div>}
    </div>
  )
}

export default DisplayStats