import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFixture, editFixture, reset } from "../features/fixtures/fixtureSlice"
import { getTeams } from "../features/teams/teamSlice"
import { getMatchdays } from "../features/matchdays/matchdaySlice"
import { getPlayers } from "../features/players/playerSlice"
import EditStats from "./EditStats"
import { toast } from "react-toastify"


function EditFixture({fixtureId, clearEdit}) {
    
    const { teams } = useSelector((state) => state.teams)
    const { matchdays } = useSelector((state) => state.matchdays)
    const { singleFixture } = useSelector((state) => state.fixtures)
    const { players } = useSelector((state) => state.players)
    const dispatch = useDispatch()
    const [ data, setData ] = useState({
        matchday: '',
        teamAway: '',
        teamHome: '',
        kickOffTime: ''
        })
    const [ stats, displayStats ] = useState(false)
      
    const { matchday, teamAway, teamHome, kickOffTime } = data

    useEffect(() => {
      dispatch(getTeams())
      dispatch(getMatchdays())
      dispatch(getPlayers())
      dispatch(getFixture(fixtureId))
      return () => {
        dispatch(reset())
      }

    }, [dispatch, fixtureId])

    const onClick = () => {
        displayStats((prevState) => !prevState)
    }

    const reduceStat = () => {
        console.log('reduce')
    }

    const onChange = (e) => {
        setData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
        }))
      }
    
    const onSubmit = (e) => {
        e.preventDefault()
        const fixture = {
            matchday,
            teamAway,
            teamHome,
            kickOffTime
        }
        
        dispatch(editFixture({fixtureId, fixture}))
        setData((prevState) => ({
          ...prevState,
          matchday: '',
          teamAway: '',
          teamHome: '',
          kickOffTime: ''
        }))
    }

    const createStats = (field, ground) => {
        return singleFixture?.stats?.length > 0 && singleFixture?.stats?.filter(x => x.identifier === field)[0]
                        [ground].map((x) => (
                            <p key={x.player} className="player">
                            <span className="stats">{players.find(player => player._id === x.player).appName}</span>
                            <span>({x.value})</span>
                            <button onClick={reduceStat} className="btn btn-small btn-danger">x</button></p>
                        ))
    }

    const statExists = (field) => {
        return singleFixture?.stats?.findIndex(x => x.away.length === 0 && x.home.length === 0 && x.identifier === field)
    }
  return (
    <>
    <div key={singleFixture._id} className="content-wrapper-3">
        <button onClick={() => clearEdit()} className="btn btn-close">X</button>
        <p>{matchdays.filter(matchday => matchday._id === singleFixture.matchday)[0]?.name}</p>
        <p>{new Date(singleFixture.kickOffTime).toLocaleString('en-US')}</p>
        <div onClick={onClick} className={`${stats && 'bg-teams'} teams`}>
            <p>{teams.filter(team => team._id === singleFixture.teamHome)[0]?.name}</p>
            <p>{singleFixture?.stats?.length > 0 ? 
            singleFixture?.stats?.filter(x => x.identifier === 'goalsScored')[0]
            .home.length === 0 ? '0' : singleFixture?.stats?.filter(x => x.identifier === 'goalsScored')[0]
            .home.map(x => x.value).reduce((a, b) => a+b) : ''}</p>
            <p>:</p>

            <p>{singleFixture?.stats?.length > 0 ? 
            singleFixture?.stats?.filter(x => x.identifier === 'goalsScored')[0]
            .away.length === 0 ? '0' : singleFixture?.stats?.filter(x => x.identifier === 'goalsScored')[0]
            .away.map(x => x.value).reduce((a, b) => a+b) : ''}</p>
            <p>{teams.filter(team => team._id === singleFixture.teamAway)[0]?.name}</p>
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
    
    {singleFixture?.stats?.length === 0 ? 
    <section className='form'>
        <form onSubmit={onSubmit}> 
          
          <div className="form-group">
            <select name="matchday" id="matchday" onChange={onChange}>
              <option value="">Select Matchday</option>
                {matchdays.map(matchday => (
                    <option
                    key={matchday._id} value={matchday._id}>{matchday.name}</option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <input type="datetime-local" 
            id='kickOffTime' name='kickOffTime' value={kickOffTime}
            onChange={onChange} />
          </div>
          <div className="form-group">
            <select name="teamHome" id="teamHome" onChange={onChange}>
            <option value="">Select Home Team</option>
              {teams.map(team => (
                <option key={team._id}
                 value={team._id}>{team.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <select name="teamAway" id="teamAway" onChange={onChange}>
            <option value="">Select Away Team</option>
              {teams.map(team => (
                <option key={team._id}
                 value={team._id}>{team.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section> : <EditStats
      singleFixture={singleFixture}
       />}
      </>
  )
}

export default EditFixture