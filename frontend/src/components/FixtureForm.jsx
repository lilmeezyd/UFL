import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createFixture, reset } from "../features/fixtures/fixtureSlice"
import { getPositions } from "../features/positions/positionSlice"
import { getTeams } from "../features/teams/teamSlice"
import { getMatchdays } from "../features/matchdays/matchdaySlice"
import { toast } from "react-toastify"

function FixtureForm() {

const [ data, setData ] = useState({
    matchday: '',
    teamAway: '',
    teamHome: '',
    kickOffTime: ''
    })
  
    const { matchday, teamAway, teamHome, kickOffTime } = data
    const { isError, isLoading, message } = useSelector((state) => 
      state.players
    ) 
    const { positions } = useSelector((state) => state.positions)
    const { teams } = useSelector((state) => state.teams)
    const { matchdays } = useSelector((state) => state.matchdays)
    const dispatch = useDispatch()

    useEffect(() => {
      if(isError) {
        toast.error(message)
      }

      dispatch(getPositions())
      dispatch(getTeams())
      dispatch(getMatchdays())
      return () => {
        dispatch(reset())
      }

    }, [isError, message, dispatch])

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
        dispatch(createFixture(fixture))
        setData((prevState) => ({
          ...prevState,
          matchday: '',
          teamAway: '',
          teamHome: '',
          kickOffTime: ''
        }))
    }  

  return (
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
      </section>
  )
}

export default FixtureForm