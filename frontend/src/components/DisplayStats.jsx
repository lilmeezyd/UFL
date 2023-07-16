import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {  reset, getFixture } from "../features/fixtures/fixtureSlice"
import { getTeams } from "../features/teams/teamSlice"
import { getMatchdays } from "../features/matchdays/matchdaySlice"
import FixtureItem from "./FixtureItem"
import getTime from "../utils/getTime"
import getPm from "../utils/getPm"

function DisplayStats({ singleFixture, clearEdit}) {

  const { teams } = useSelector((state) => state.teams)
  const { matchdays } = useSelector((state) => state.matchdays)
  const dispatch = useDispatch()
  

  useEffect(() => {
    dispatch(getTeams())
    dispatch(getMatchdays())
  
    return () => {
      dispatch(reset())
    }
  }, [dispatch])
  

  return (
    <div key={singleFixture._id} className="content-wrapper-3">
        <button onClick={() => clearEdit()} className="btn btn-close">X</button>
        <div className="deadline">
            <p>{matchdays.filter(matchday => matchday._id === singleFixture.matchday)[0]?.name}</p>
            <p>{new Date(singleFixture.kickOffTime).toDateString()},&nbsp;
            {getTime(new Date(singleFixture.kickOffTime).toLocaleTimeString('en-US'))}&nbsp;
            {getPm(new Date(singleFixture.kickOffTime).toLocaleTimeString('en-US'))}</p>
            <p className="line"></p>
        </div>
            {singleFixture.kickOffTime && <FixtureItem fixture={singleFixture} teams={teams} />}
        
    </div>
  )
}

export default DisplayStats