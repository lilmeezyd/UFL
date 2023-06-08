import { useDispatch, useSelector } from "react-redux"
import { deleteFixture, getFixtures, reset } from "../features/fixtures/fixtureSlice"
import Spinner from "../components/Spinner"
import { useEffect } from "react"

function FixtureList() {
    
const dispatch = useDispatch()

useEffect(() => {
    dispatch(getFixtures())
    return () => {
        dispatch(reset())
    }
}, [dispatch])
const { fixtures, isLoading, isError, message } = useSelector(
      (state) => state.fixtures)

if(isLoading) {
    return <Spinner />
}
  return (
    (fixtures.length === 0 ? 'No fixtures found!' : 
   <div className="div-wrapper">
    { fixtures.map(fixture => (
        <div key={fixture._id} className="content-wrapper">
        <p>{fixture.matchday}</p>
        <p>{fixture.kickOffTime}</p>
        <p>{fixture.teamHome}</p>
        <p>{fixture.teamAway}</p>
        <p><button 
        onClick={() => dispatch(deleteFixture(fixture._id))} className="btn btn-danger">Delete</button></p>
        <p><button className="btn btn-warning">Edit</button></p>
        
        </div>
    ))}
   </div>)
  )
}

export default FixtureList

