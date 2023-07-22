import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPositions } from "../features/positions/positionSlice"
import { getTeams } from "../features/teams/teamSlice"
import { getPlayers } from '../features/players/playerSlice'
import returnPlayers from '../utils/returnPlayers'
import lastPage from '../static/last_page.png'
import firstPage from '../static/first_page.png'
import prevPage from "../static/chevron_left.png"
import nextPage from "../static/chevron_right.png"

function Players() {


  const [sort, setSort] = useState('totalPoints')
  const [view, setView] = useState('allPlayers')
  const [word, setWord] = useState('')
  const [cutPrice, setCutPrice] = useState(25)
  const [curPage, setCurPage] = useState(1)
  const pageSize = 20

  const dispatch = useDispatch()
  const { teams } = useSelector((state) => state.teams)
  const { positions } = useSelector((state) => state.positions)
  const { players } = useSelector((state) => state.players)

  useEffect(() => {
    dispatch(getTeams())
    dispatch(getPositions())
    dispatch(getPlayers())
  }, [dispatch])

  const filteredPlayers = useMemo(() => {
    returnPlayers(players, sort, view, word, curPage, pageSize, cutPrice)
  }, [players, sort, view, word, curPage, pageSize, cutPrice])


  const onView = (e) => {
    setView(e.target.value);
    setCurPage(1);
   }
  const onSearch = (e) => {
    setWord(e.target.value);
    setCurPage(1);
  }
  const onSort = (e) => {
    setSort(e.target.value);
    setCurPage(1);
   }
  return (
    <section className="players-col">
      <div className="players small">
        <div className="players-container">
          <div className="players-heading-container">
            <h3 className="players-heading">Player Selection</h3>
          </div>
          <div className="form">
            <form>
              <div className="form-group view">
                <label>View</label>
                <select onChange={onView} className="custom-select small" id="view_by">
                  <optgroup label="Global">
                    <option value="allPlayers">All Players</option>
                  </optgroup>
                  <optgroup label='By Position'>
                    {positions.map((pos, idx) => {
                      return (
                        <option key={idx} value={'position_'+pos._id}>{pos.pluralName}</option>
                      )
                    }
                    )}
                  </optgroup>
                  <optgroup label='By Team'>
                    {teams.map((team, idx) => {
                      return (
                        <option key={idx} value={'team_'+team._id}>{team.name}</option>)
                    }
                    )}
                  </optgroup>
                </select>
              </div>

              <div className="form-group sort">
                <label>Sorted by</label>
                <select onChange={onSort} className="custom-select small" id="sort_by">
                  <option value="total_points">Total points</option>
                  <option value="event_points">Round points</option>
                  <option value="now_cost">Price</option>
                </select>
              </div>

              <div className="form-group search">
                <label>Search</label>
                <input onChange={onSearch} id="search" className="blur" type="text" name="" />
              </div>
            </form>
          </div>
        </div>
      </div>

      {players.length ?
        <div className="player-info">
          <div className="player-numbers small">
            <span className="number">{filteredPlayers?.length}&nbsp;</span>
            <span className="numbers">{filteredPlayers?.length === 1 ? 'Player' : 'Players'}</span>
          </div>
          {filteredPlayers}
        </div> : <div className='no-trans small'>No Players Found</div>}
    </section>
  )
}

export default Players