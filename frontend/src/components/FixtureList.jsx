import { useDispatch, useSelector } from "react-redux"
import { deleteFixture, getFixtures, populateFixture, reset } from "../features/fixtures/fixtureSlice"
import { getMatchdays } from "../features/matchdays/matchdaySlice"
import { getTeams } from "../features/teams/teamSlice"
import { setInitialPoints, deletePoints } from "../features/lives/livesSlice"
import { useMemo, useEffect, useState } from "react"
import { toast } from "react-toastify"
import FixtureItem from "./FixtureItem"
import getTime from "../utils/getTime"
import getPm from "../utils/getPm"

function FixtureList({onEdit, handleClose, handleShow}) {

const [index, setIndex] = useState(1) 
const [showSwap, setShowSwap] = useState(false)  
const [initialData, setInitialData] = useState({mid: '', fid: ''})
const dispatch = useDispatch()
const user = useSelector((state) => state.auth)
const { fixtures, isLoading, isError, message } = useSelector(
      (state) => state.fixtures)
const { teams } = useSelector((state) => state.teams)
const { matchdays } = useSelector((state) => state.matchdays)

const filteredFixtures = useMemo(
    () => fixtures
            .filter(x => x.matchday !== null)
            .map(x => x && 
            {...x, matchday: +matchdays?.filter(y => y._id === x.matchday)[0]?.name.split(' ').join('').slice(8)})
            .filter(x => x.matchday === index)
            .sort((x,y) => {
                if(x.kickOffTime > y.kickOffTime) return 1
                if(x.kickOffTime < y.kickOffTime) return -1
                }) , 
            [fixtures, matchdays, index])

const filteredMatchdays = useMemo(
    () => matchdays.map(x => x && {...x, name: +x.name.split(' ').join('').slice(8)})
                    .filter(x => x.name === index)
, [matchdays, index])


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

const matchdayArray = fixtures
            .filter(x => x.matchday !== null)
            .map(x => x && 
            {...x, matchday: +matchdays?.filter(y => y._id === x.matchday)[0]?.name.split(' ').join('').slice(8)})
            .map(x => x.matchday)

const onDecrement = () => {
    index > Math.min(...matchdayArray) && setIndex((prevState) => prevState - 1)
}

const onIncrement = () => {
    index < Math.max(...matchdayArray) && setIndex((prevState) => prevState + 1)
}

const returnDay = (data, idx) => {
    if(idx === 0) {
        return <>
                <p className="date">{new Date(data[0].kickOffTime).toDateString()}</p>
                </>
    }
    if(idx > 0) {
        return new Date(data[idx-1].kickOffTime).toDateString() === 
                new Date(data[idx].kickOffTime).toDateString() ? '' :<>
                <p className="date">{new Date(data[idx].kickOffTime).toDateString()}</p></>
    }
}

const initialPoints = (x, y) => {
    const data = {mid: y, fid: x}
    setShowSwap(true)
    handleShow()
    setInitialData(data)
    dispatch(populateFixture(x))
}

const closeInitial = () => {
    setShowSwap(false)
    handleClose()
    dispatch(setInitialPoints(initialData))
}

const deleteMatch = (x, y) => {
    dispatch(deleteFixture(x))
    //dispatch(deletePoints({mid: y, id: x}))
}

/*
if(isLoading) {
    return <Spinner />
}*/
  return (
    (fixtures.length === 0 ? 'No fixtures found!' : 
    <>
   <div className="div-wrapper">
    <h1>Fixtures</h1>
    <section className="btn-wrapper">
        <button onClick={onDecrement} className= {`${index === Math.min(...matchdayArray) && 'btn-hide'} btn previous`}>Previous</button>
        <button onClick={onIncrement} className={`${index === Math.max(...matchdayArray) && 'btn-hide'} btn next`}>Next</button>
    </section>
    <section className="deadline">
        <p>Matchday {filteredMatchdays[0]?.name}</p>
        <p>Deadline: {new Date(filteredMatchdays[0]?.deadlineTime).toDateString()},&nbsp;
            {getTime(new Date(filteredMatchdays[0]?.deadlineTime).toLocaleTimeString('en-US'))}&nbsp;
            {getPm(new Date(filteredMatchdays[0]?.deadlineTime).toLocaleTimeString('en-US'))}</p>
    </section>
    { filteredFixtures.map((fixture, idx) => (
        <div key={fixture._id}>
        <div>
            <div className="deadline">
                {returnDay(filteredFixtures, idx)}
            </div>
                <FixtureItem fixture={fixture} teams={teams} />
        </div>
        { !!user.user && user.user.roles.includes(2048) &&
            <div className="buttons-group">
                <p><button 
                onClick={() => deleteMatch(fixture._id, fixture.matchday)} className="btn btn-danger">Delete</button></p>
                <p><button
                onClick={() => onClick(fixture._id)} className="btn btn-warning">Edit</button></p>
                <p><button
                onClick={() => initialPoints(fixture._id, fixture.matchday)}
                className="btn btn-ready">Start</button></p>
            </div>
        } 
        
        </div>
    ))}
   </div>
   {showSwap && <div className="playerpop">
                <div className="infobuttons">
                    <button onClick={() => closeInitial()} className='btn-info btn-info-block btn-warn'>
                        Set Initial Points
                    </button>
                </div>
            </div>}
   </>)
  )
}

export default FixtureList

