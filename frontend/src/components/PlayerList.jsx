import { useDispatch, useSelector } from "react-redux"
import { deletePlayer, getPlayers, reset } from "../features/players/playerSlice"
import { getPositions } from "../features/positions/positionSlice"
import { getTeams } from "../features/teams/teamSlice"
//import Spinner from "../components/Spinner"
import  ReactPaginate  from 'react-paginate'
import { useEffect, useState } from "react"

function PlayerList() {

const [currentPage, setCurrentPage ] = useState(1)
const [ playersPerPage ] = useState(5)
    
const dispatch = useDispatch()
const { players,  isError, message } = useSelector(
      (state) => state.players)
const { teams } = useSelector((state) => state.teams)
const { positions } = useSelector((state) => state.positions)

const indexOfLastPlayer = currentPage * playersPerPage
const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage
const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer)

useEffect(() => {
    dispatch(getPlayers())
    dispatch(getTeams())
    dispatch(getPositions())
    return () => {
        dispatch(reset())
    }
}, [dispatch])

const paginate = ({selected}) => {
    setCurrentPage(selected + 1)
}
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
    { currentPlayers.map(player => (
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
    <ReactPaginate
        breakLabel="..."
        className="react-paginate"
        onPageChange={paginate}
        pageCount={Math.ceil(players.length / playersPerPage)}
        previousLabel={'Prev'}
        nextLabel={'Next'}
        containerClassName={'pagination'}
        pageLinkClassName={'page-number'}
        previousLinkClassName={'page-number'}
        nextLinkClassName={'page-number'}
        activeLinkClassName={'active'}
     />
   </div>)
  )
}

export default PlayerList

