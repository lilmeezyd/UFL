import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFixture, editFixture, reset } from "../features/fixtures/fixtureSlice"
import { getTeams } from "../features/teams/teamSlice"
import { getMatchdays } from "../features/matchdays/matchdaySlice"
import EditStats from "./EditStats"
import { toast } from "react-toastify"


function EditFixture({fixtureId, clearEdit}) {
    
    const { teams } = useSelector((state) => state.teams)
    const { matchdays } = useSelector((state) => state.matchdays)
    const { singleFixture } = useSelector((state) => state.fixtures)
    const dispatch = useDispatch()
    const [ data, setData ] = useState({
        matchday: '',
        teamAway: '',
        teamHome: '',
        kickOffTime: ''
        })
      
    const { matchday, teamAway, teamHome, kickOffTime } = data

    useEffect(() => {
      dispatch(getTeams())
      dispatch(getMatchdays())
      dispatch(getFixture(fixtureId))
      return () => {
        dispatch(reset())
      }

    }, [dispatch, fixtureId])

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
  return (
    <>
    <div key={singleFixture._id} className="content-wrapper-3">
        <button onClick={() => clearEdit()} className="btn btn-close">X</button>
        <p>{matchdays.filter(matchday => matchday._id === singleFixture.matchday)[0]?.name}</p>
        <p>{new Date(singleFixture.kickOffTime).toLocaleString('en-US')}</p>
        <div className="teams">
            <p>{teams.filter(team => team._id === singleFixture.teamHome)[0]?.name}</p>
            <p>:</p>
            <p>{teams.filter(team => team._id === singleFixture.teamAway)[0]?.name}</p>
        </div>
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