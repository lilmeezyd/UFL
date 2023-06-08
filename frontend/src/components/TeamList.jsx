import { useDispatch, useSelector } from "react-redux"
import { deleteTeam, getTeams, reset } from "../features/teams/teamSlice"
import Spinner from "../components/Spinner"
import { useEffect } from "react"

function TeamList() {
    
const dispatch = useDispatch()

useEffect(() => {
    dispatch(getTeams())
    return () => {
        dispatch(reset())
    }
}, [dispatch])
const { teams, isLoading, isError, message } = useSelector(
      (state) => state.teams)

if(isLoading) {
    return <Spinner />
}
  return (
    (teams.length === 0 ? 'No teams found!' : 
   <div className="div-wrapper">
    <div className="content-wrapper">
        <h3>Name</h3>
        <h3>Short Name</h3>
        <h3>code</h3>
    </div>
    { teams.map(team => (
        <div key={team._id} className="content-wrapper">
        <p>{team.name}</p>
        <p>{team.shortName}</p>
        <p>{team.code}</p>
        <p><button 
        onClick={() => dispatch(deleteTeam(team._id))} className="btn btn-danger">Delete</button></p>
        <p><button className="btn btn-warning">Edit</button></p>
        
        </div>
    ))}
   </div>)
  )
}

export default TeamList

