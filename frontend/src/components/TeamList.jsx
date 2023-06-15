import { useDispatch, useSelector } from "react-redux"
import { deleteTeam, getTeams, reset } from "../features/teams/teamSlice"
import { useEffect, useState } from "react"
import Spinner from "../components/Spinner"
import  ReactPaginate  from 'react-paginate'

function TeamList() {

const [ currentPage, setCurrentPage ] = useState(1)
const [ teamsPerPage ] = useState(5)

const dispatch = useDispatch()
const { teams, isLoading, isError, message } = useSelector(
      (state) => state.teams)


const indexOfLastTeam = currentPage * teamsPerPage
const indexOfFirstTeam = indexOfLastTeam - teamsPerPage
const currentTeams = teams.slice(indexOfFirstTeam, indexOfLastTeam)

const paginate = ({ selected }) => {
    setCurrentPage(selected + 1)
}
      

useEffect(() => {
    dispatch(getTeams())
    return () => {
        dispatch(reset())
    }
}, [dispatch])

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
    { currentTeams.map(team => (
        <div key={team._id} className="content-wrapper">
        <p>{team.name}</p>
        <p>{team.shortName}</p>
        <p>{team.code}</p>
        <p><button 
        onClick={() => dispatch(deleteTeam(team._id))} className="btn btn-danger">Delete</button></p>
        <p><button className="btn btn-warning">Edit</button></p>
        
        </div>
    ))}
    <ReactPaginate
                    breakLabel="..."
                     className="react-paginate"
                      onPageChange={paginate}
                      pageCount={Math.ceil(teams.length / teamsPerPage)}
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

export default TeamList

