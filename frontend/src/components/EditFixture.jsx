import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFixture, editFixture, reset } from "../features/fixtures/fixtureSlice"
import { getTeams } from "../features/teams/teamSlice"
import { getMatchdays } from "../features/matchdays/matchdaySlice"
import { getPlayers } from "../features/players/playerSlice"
import EditStats from "./EditStats"
import DisplayStats from "./DisplayStats"
import { toast } from "react-toastify"


function EditFixture({fixtureId, clearEdit, handleShow, handleClose}) {
     
    const { teams } = useSelector((state) => state.teams)
    const { matchdays } = useSelector((state) => state.matchdays)
    const { singleFixture, isError,  message, isSuccess } = useSelector((state) => state.fixtures)
    const dispatch = useDispatch()
    const [ data, setData ] = useState({
        matchday: '',
        teamAway: '',
        teamHome: '',
        kickOffTime: ''
        })
         
    const { matchday, teamAway, teamHome, kickOffTime } = data

    useEffect(() => {
       /* if(isError) {
            toast.error(message)
        }*/
      dispatch(getTeams())
      dispatch(getMatchdays())
      dispatch(getFixture(fixtureId))
      return () => {
        dispatch(reset())
      }

    }, [dispatch, fixtureId, isError, message])

    
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
    <DisplayStats clearEdit={clearEdit} singleFixture={singleFixture} />    
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
      </section> : <EditStats fixtureId={fixtureId}
      singleFixture={singleFixture} handleClose={handleClose} handleShow={handleShow}
       />}
      </>
  )
}

export default EditFixture