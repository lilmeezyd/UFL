import { useDispatch, useSelector } from "react-redux"
import { deleteFixture, getFixtures, populateFixture, reset } from "../features/fixtures/fixtureSlice"
import { getMatchdays } from "../features/matchdays/matchdaySlice"
import { getTeams } from "../features/teams/teamSlice"
import { useEffect } from "react"
import { toast } from "react-toastify"

function FixtureList({onEdit}) {
    
const dispatch = useDispatch()
const { fixtures, isLoading, isError, message } = useSelector(
      (state) => state.fixtures)
const { teams } = useSelector((state) => state.teams)
const { matchdays } = useSelector((state) => state.matchdays)

useEffect(() => {
    if(isError) {
        toast.error(message)
    }
    dispatch(getFixtures())
    dispatch(getMatchdays())
    dispatch(getTeams())
    return () => {
        dispatch(reset())
    }
}, [dispatch, isError, message])

const onClick = (id) => {
    onEdit(id)
}

/*
if(isLoading) {
    return <Spinner />
}*/
  return (
    (fixtures.length === 0 ? 'No fixtures found!' : 
   <div className="div-wrapper">
    <div className="content-wrapper-2">
        <h3>Matchday</h3>
        <h3>Date</h3>
        <h3>Home</h3>
        <h3>Away</h3>
    </div>
    { fixtures.map(fixture => (
        <div key={fixture._id} className="content-wrapper-2">
        <p>{matchdays.filter(matchday => matchday._id === fixture.matchday)[0]?.name}</p>
        <p>{new Date(fixture.kickOffTime).toLocaleString('en-US')}</p>
        <p>{teams.filter(team => team._id === fixture.teamHome)[0]?.name}</p>
        <p>{teams.filter(team => team._id === fixture.teamAway)[0]?.name}</p>
        <p><button 
        onClick={() => dispatch(deleteFixture(fixture._id))} className="btn btn-danger">Delete</button></p>
        <p><button
        onClick={() => onClick(fixture._id)} className="btn btn-warning">Edit</button></p>
        <p>{<button
        onClick={() => dispatch(populateFixture(fixture._id))}
         className="btn btn-ready">Start</button>}</p>
        
        </div>
    ))}
   </div>)
  )
}

export default FixtureList

