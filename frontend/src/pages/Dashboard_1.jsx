import { useEffect } from "react"
import {useNavigate} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import Spinner from '../components/Spinner'
import { getGoals, reset } from "../features/goals/goalSlice"

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const { goals, isError, isLoading, message } = useSelector((state) => state.goals)

  useEffect(() => {
    if(isError) {
      console.log(message)
    }
    if(!user) {
      navigate('/login')
    }
    dispatch(getGoals())

   /* return () => {
      dispatch(reset())
    } */
  },[user, isError, message, navigate, dispatch])

  if(isLoading) {
    return <Spinner />
  }
  return (
    <>
    <header className="dashboard-header">
      <div className="header-element">
        <h3>15</h3>
        <p>Teams</p>
      </div>
      <div className="header-element">
        <h3>38</h3>
        <p>Players</p>
      </div>
      <div className="header-element">
        <h3>30</h3>
        <p>Matchdays</p>
      </div>
      <div className="header-element">
        <h3>20</h3>
        <p>Users</p>
      </div>
    </header>

    <section className="player-stats-info">
      <div className="player-stats">
        <h3>Most Transferred In Players</h3>
      </div>
      <div className="player-stats">
        <h3>Most Transferred Out Players</h3>
      </div>
      <div className="player-stats">
        <h3>Most Selected Players</h3>
      </div>
      <div className="player-stats">
        <h3>Matchday Dream Team</h3>
      </div>
      <div className="player-stats">
        <h3>Overall Dream Team</h3>
      </div>
    </section>
    </>
  )
}

export default Dashboard