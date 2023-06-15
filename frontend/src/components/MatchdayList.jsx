import { useDispatch, useSelector } from "react-redux"
import { deleteMatchday, getMatchdays, reset } from "../features/matchdays/matchdaySlice"
import Spinner from "../components/Spinner"
import { useEffect } from "react"

function MatchdayList() {
    
const dispatch = useDispatch()

useEffect(() => {
    dispatch(getMatchdays())
    return () => {
        dispatch(reset())
    }
}, [dispatch])
const { matchdays, isLoading, isError, message } = useSelector(
      (state) => state.matchdays)
/*
if(isLoading) {
    return <Spinner />
}*/
  return (
    (matchdays.length === 0 ? 'No matchdays found!' : 
   <div className="div-wrapper">
    { matchdays.map(matchday => (
        <div key={matchday._id} className="content-wrapper">
        <p>{matchday.name}</p>
        <p>{new Date(matchday.deadlineTime).toDateString()}</p>
        <p>{new Date(matchday.deadlineTime)
        .toLocaleTimeString().slice(0, new Date(matchday.deadlineTime)
        .toLocaleTimeString().length-3)+'HRS'}</p>
        <p><button 
        onClick={() => dispatch(deleteMatchday(matchday._id))} className="btn btn-danger">Delete</button></p>
        <p><button className="btn btn-warning">Edit</button></p>
        
        </div>
    ))}
   </div>)
  )
}

export default MatchdayList

