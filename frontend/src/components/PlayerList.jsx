import { useDispatch, useSelector } from "react-redux"
import { deletePlayer, getPlayers, reset } from "../features/players/playerSlice"
import Spinner from "../components/Spinner"
import { useEffect } from "react"

function PlayerList() {
    
const dispatch = useDispatch()

useEffect(() => {
    dispatch(getPlayers())
    return () => {
        dispatch(reset())
    }
}, [dispatch])
const { players,  isError, message } = useSelector(
      (state) => state.players)
const { teams } = useSelector((state) => state.teams)
const { positions } = useSelector((state) => state.positions)
/*
if(isLoading) {
    return <Spinner />
}*/
  return (
    (players.length === 0 ? 'No players found!' : 
   <div className="div-wrapper">
    <div className="content-wrapper-1">
        <h3>First Name</h3>
        <h3>App Name</h3>
        <h3>Team Name</h3>
        <h3>Position</h3>
    </div>
    { players.map(player => (
        <div key={player._id} className="content-wrapper-1">
        <p>{player.firstName}</p>
        <p>{player.appName}</p>
        <p>{teams.filter(team => team._id === player.playerTeam)[0].shortName}</p>
        <p>{positions.filter(position => position._id === player.playerPosition)[0].shortName}</p>
        <p><button 
        onClick={() => dispatch(deletePlayer(player._id))} className="btn btn-danger">Delete</button></p>
        <p><button className="btn btn-warning">Edit</button></p>
        
        </div>
    ))}
   </div>)
  )
}

export default PlayerList

