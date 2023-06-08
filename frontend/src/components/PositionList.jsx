import { useDispatch, useSelector } from "react-redux"
import { deletePosition, getPositions, reset } from "../features/positions/positionSlice"
import Spinner from "../components/Spinner"
import { useEffect } from "react"

function PositionList() {
    
const dispatch = useDispatch()

useEffect(() => {
    dispatch(getPositions())
    return () => {
        dispatch(reset())
    }
}, [dispatch])
const { positions, isLoading, isError, message } = useSelector(
      (state) => state.positions)

if(isLoading) {
    return <Spinner />
}
  return (
    (positions.length === 0 ? 'No positions found!' : 
   <div className="div-wrapper">
    { positions.map(position => (
        <div key={position._id} className="content-wrapper">
        <p>{position.singularName}</p>
        <p>{position.pluralName}</p>
        <p>{position.shortName}</p>
        <p><button 
        onClick={() => dispatch(deletePosition(position._id))} className="btn btn-danger">Delete</button></p>
        <p><button className="btn btn-warning">Edit</button></p>
        
        </div>
    ))}
   </div>)
  )
}

export default PositionList

