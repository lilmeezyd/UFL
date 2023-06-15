import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createPlayer, reset } from "../features/players/playerSlice"
import { getPositions } from "../features/positions/positionSlice"
import { getTeams } from "../features/teams/teamSlice"
import { toast } from "react-toastify"

function PlayerForm() {

const [ data, setData ] = useState({
    firstName: '',
    appName: '',
    secondName: '',
    playerPosition: '',
    playerTeam: ''
    })
  
    const { firstName, appName, secondName, playerPosition, playerTeam } = data
    const { isError, isLoading, message } = useSelector((state) => 
      state.players
    ) 
    const { positions } = useSelector((state) => state.positions)
    const { teams } = useSelector((state) => state.teams)
    const dispatch = useDispatch()

    useEffect(() => {
      if(isError) {
        toast.error(message)
      }

      dispatch(getPositions())
      dispatch(getTeams())
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
        const player = {
            firstName,
            appName,
            secondName,
            playerPosition,
            playerTeam
        }
        dispatch(createPlayer(player))
        setData({
            firstName:'',
            appName:'',
            secondName:'',
            playerPosition:'',
            playerTeam:''
        })
    }  
  return (
    <section className='form'>
        <form onSubmit={onSubmit}> 
          <div className="form-group">
            <input type="text" 
            id='firstName' name='firstName' value={firstName}
             placeholder='Enter Player First Name'
            onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="text" 
            id='secondName' name='secondName' value={secondName} 
            placeholder='Enter Player Second Name'
            onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="text" 
            id='appName' name='appName' value={appName}
             placeholder='Enter App Name'
            onChange={onChange} />
          </div>
          <div className="form-group">
            <select name="playerPosition" id="playerPosition" onChange={onChange}>
              <option value="">Select Player Position</option>
              {positions.map(position => (
                <option key={position._id}
                 value={position._id}>{position.singularName}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <select name="playerTeam" id="playerTeam" onChange={onChange}>
            <option value="">Select Player Team</option>
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

export default PlayerForm