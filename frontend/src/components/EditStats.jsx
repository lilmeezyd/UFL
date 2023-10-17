import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPlayers, getPlayer, updatePlayer  } from "../features/players/playerSlice"
import { editStats, reset } from "../features/fixtures/fixtureSlice"
import { addPointsToPicks } from "../features/lives/livesSlice"
import { toast } from "react-toastify"

function EditStats({singleFixture, handleShow, handleClose}) {

    const { players, onePlayer } = useSelector((state) => state.players)
    const { isError, isSuccess, message } = useSelector((state) => state.fixtures)
    const dispatch = useDispatch()
    const [showSwap, setShowSwap] = useState(false) 
    const [data, setData ] = useState({
        identifier: '', homeAway: '', player: '', value: ''
    })

    const { identifier, homeAway, player, value } = data


    useEffect(() => {
      if(isError) {
        toast.error(message)
      }
      dispatch(getPlayer(player))
      dispatch(getPlayers())
    
      return () => {
        dispatch(reset())
      }
    }, [dispatch, isError, message, player])
    

    const onSubmit = (e) => {
        e.preventDefault()
        const stats = {
            identifier, homeAway, player, value
        }
        const playerStat = {}
        playerStat[identifier] = +value
        dispatch(updatePlayer({id: player, playerStat, matchday:singleFixture.matchday}))
        
        dispatch(editStats({id: singleFixture._id, stats}))
       /* setData((prevState) => ({
            ...prevState,
            identifier: '',
            homeAway: '',
            player: '',
            value: ''
        })) */
        setShowSwap(true)
        handleShow()
    }
    const closeAddPoints = () => {
      dispatch(addPointsToPicks({mid: singleFixture.matchday, pid: player}))
      setShowSwap(false)
      handleClose()
    }
    const onChange = (e) => {
        setData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
  return (
    <>
    <section className='form'>
        <form onSubmit={onSubmit}> 
          
          <div className="form-group">
            <select name="identifier" id="identifier" onChange={onChange}>
              <option value="">Select Stat</option>
                {singleFixture?.stats?.map(x => x.identifier)?.map((stat, idx) => (
                    <option key={idx} value={stat}>{stat}</option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <select name="homeAway" id="homeAway" onChange={onChange}>
              <option value="">Select Home or Away</option>
              <option value='home'>Home</option>
              <option value='away'>Away</option>
            </select>
          </div>
          <div className="form-group">
            <select name="player" id="player" onChange={onChange}>
            <option value="">Select Player</option>

            {homeAway === 'home' && players
            .filter(x => x.playerTeam.toString() === singleFixture?.teamHome)
            .map(player => (
            <option key={player._id} value={player._id}>
                {player.appName}
            </option>))}

            {homeAway === 'away' && players
            .filter(x => x.playerTeam.toString() === singleFixture?.teamAway)
            .map(player => (
            <option key={player._id} value={player._id}>
                {player.appName}
            </option>))}
            </select>
          </div>
          <div className="form-group">
            <select name="value" id="value" onChange={onChange}>
            <option value="">Select Value</option>
              {[-1,1].map((val, idx) => (
                <option key={idx} value={+val}>{val}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
      {showSwap && <div className="playerpop">
                <div className="infobuttons">
                    <button onClick={() => closeAddPoints()} className='btn-info btn-info-block btn-warn'>
                        Add Player Points
                    </button>
                </div>
            </div>}
      </>
  )
}

export default EditStats