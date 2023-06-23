import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {  reset } from "../features/fixtures/fixtureSlice"
import { getPlayers  } from "../features/players/playerSlice"
import { editStats } from "../features/fixtures/fixtureSlice"

function EditStats({singleFixture}) {

    const { players } = useSelector((state) => state.players)
    const dispatch = useDispatch()
    const [data, setData ] = useState({
        identifier: '', homeAway: '', player: '', value: ''
    })

    const { identifier, homeAway, player, value } = data

    useEffect(() => {
      dispatch(getPlayers())
    
      return () => {
        dispatch(reset())
      }
    }, [dispatch])
    

    const onSubmit = (e) => {
        e.preventDefault()
        const stats = {
            identifier, homeAway, player, value
        }

        dispatch(editStats({id: singleFixture._id, stats}))
        setData((prevState) => ({
            ...prevState,
            identifier: '',
            homeAway: '',
            player: '',
            value: ''
        }))
    }
    const onChange = (e) => {
        setData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
  return (
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

            {homeAway === 'home' && identifier !== 'ownGoals' && players
            .filter(x => x.playerTeam.toString() === singleFixture?.teamHome)
            .map(player => (
            <option key={player._id} value={player._id}>
                {player.appName}
            </option>))}

            {homeAway === 'away' && identifier !== 'ownGoals' && players
            .filter(x => x.playerTeam.toString() === singleFixture?.teamAway)
            .map(player => (
            <option key={player._id} value={player._id}>
                {player.appName}
            </option>))}

            {homeAway === 'home' && identifier === 'ownGoals' && players
            .filter(x => x.playerTeam.toString() === singleFixture?.teamAway)
            .map(player => (
            <option key={player._id} value={player._id}>
                {player.appName}
            </option>))}

            {homeAway === 'away' && identifier === 'ownGoals' && players
            .filter(x => x.playerTeam.toString() === singleFixture?.teamHome)
            .map(player => (
            <option key={player._id} value={player._id}>
                {player.appName}
            </option>))}        

            </select>
          </div>
          <div className="form-group">
            <select name="value" id="value" onChange={onChange}>
            <option value="">Select Value</option>
              {[1,2,3,4,5,6,7,8,9].map((val, idx) => (
                <option key={idx} value={+val}>{val}</option>
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

export default EditStats