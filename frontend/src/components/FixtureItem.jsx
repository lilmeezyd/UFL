import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPlayers, reset  } from "../features/players/playerSlice"
import getTime from "../utils/getTime"
import getPm from "../utils/getPm"

function FixtureItem({fixture, teams}) {

    const [ stats, displayStats ] = useState(false)
    const { players } = useSelector((state) => state.players)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPlayers())
    
      return () => {
        dispatch(reset())
      }
    }, [dispatch])
    
  const onClick = () => {
    displayStats((prevState) => !prevState)
    }


    const createStats = (field, ground) => {
        return fixture?.stats?.length > 0 && fixture?.stats?.filter(x => x.identifier === field)[0]
                        [ground].map((x) => (
                            <p key={x.player} className="player">
                            <span className="stats">{players.find(player => player._id === x.player).appName}</span>
                            <span>({x.value})</span></p>
                        ))
    }
    
    const statExists = (field) => {
        return fixture?.stats?.findIndex(x => x.away.length === 0 && x.home.length === 0 && x.identifier === field)
    }
    const teamName = (teamData) => {
        return teams?.filter(team => team._id === teamData)[0]?.name
    }
    const teamCode = (teamData) => {
        return teams?.filter(team => team._id === teamData)[0]?.code
    }
    
  return (
    
    <>
    <div onClick={onClick} className={`${stats && 'bg-teams'} teams`}>
    <div className="home">
        <p className="team">{teamName(fixture?.teamHome)}</p>
            <p className="ticker-image">
            <img src={require(`../static/t${teamCode(fixture?.teamHome)}.png`)} alt={teamName(fixture?.teamHome)} />
            </p>
        <p className={`${fixture?.stats?.length > 0 ? 'score' : 'time-1'}`}>{fixture?.stats?.length > 0 ?
            fixture?.stats?.filter(x => x.identifier === 'goalsScored')[0]
            .home.map(x => x.value).reduce((a, b) => a+b,0) + fixture?.stats?.filter(x => x.identifier === 'ownGoals')[0]
            .away.map(x => x.value).reduce((a, b) => a+b,0) : 
            getTime(new Date(fixture?.kickOffTime)?.toLocaleTimeString('en-US'))}
        </p>
    </div>

    <div className="away">  
        <p className={`${fixture?.stats?.length > 0 ? 'score' : 'time-2'}`}>{fixture?.stats?.length > 0 ? 
            fixture?.stats?.filter(x => x.identifier === 'goalsScored')[0]
            .away.map(x => x.value).reduce((a, b) => a+b,0) + fixture?.stats?.filter(x => x.identifier === 'ownGoals')[0]
            .home.map(x => x.value).reduce((a, b) => a+b,0) : 
            getPm(new Date(fixture?.kickOffTime)?.toLocaleTimeString('en-US'))
            }
        </p>
        <p className="ticker-image">
        <img src={require(`../static/t${teamCode(fixture?.teamAway)}.png`)} alt={teamName(fixture?.teamAway)} />
        </p>
        <p className="team">{teamName(fixture?.teamAway)}</p>
    </div>
    </div>
    {stats && fixture?.stats?.length > 0 &&
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
    </>
  )
}

export default FixtureItem