import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPositions } from "../features/positions/positionSlice"
import { getTeams } from "../features/teams/teamSlice"
import { getPlayers } from '../features/players/playerSlice'
import returnPlayers from '../utils/returnPlayers'
import getPrices from '../utils/getPrices'
import lastPage from '../static/last_page.png'
import firstPage from '../static/first_page.png'
import prevPage from "../static/chevron_left.png"
import nextPage from "../static/chevron_right.png"
import PositionElement from './PositionElement'

function Players() {


  const [sort, setSort] = useState('totalPoints')
  const [view, setView] = useState('allPlayers')
  const [word, setWord] = useState('')
  const [cutPrice, setCutPrice] = useState(25)
  const [curPage, setCurPage] = useState(1)
  const pageSize = 10

  const dispatch = useDispatch()
  const { teams } = useSelector((state) => state.teams)
  const { positions } = useSelector((state) => state.positions)
  const { players } = useSelector((state) => state.players)
  const prices = getPrices(players)

  useEffect(() => {
    dispatch(getTeams())
    dispatch(getPositions())
    dispatch(getPlayers())
  }, [dispatch])

  const filteredPlayers = useMemo(
    () => returnPlayers(players, sort, view, word, curPage, pageSize, cutPrice)
    , [players, sort, view, word, curPage, pageSize, cutPrice])

  let totalPages = Math.ceil(filteredPlayers.originalPlayers.length / pageSize)


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

  const onPrice = (e) => {
    setCutPrice(e.target.value)
    setCurPage(1)
  }
  const viewNextPage = () => {
    setCurPage(curPage + 1)
  }
  const viewPreviousPage = () => {
    setCurPage(curPage - 1)
  }

  const viewFirstPage = () => {
    setCurPage(1)
  }

  const viewLastPage = () => {
    setCurPage(totalPages)
  }

  const goalkeepers = filteredPlayers.returnedPlayers.filter(
    (player) => player.playerPosition === '648a4408ae0e41bee2304c9a'
  );
  const defenders = filteredPlayers.returnedPlayers.filter(player =>
    player.playerPosition === '647faf277bb2ccc06e8bb00d')
  const midfielders = filteredPlayers.returnedPlayers.filter(player =>
    player.playerPosition === '647faf357bb2ccc06e8bb010')
  const forwards = filteredPlayers.returnedPlayers.filter(player =>
    player.playerPosition === '64807d367bb2ccc06e8bb051')
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
                        <option key={idx} value={'position_' + pos._id}>{pos.pluralName}</option>
                      )
                    }
                    )}
                  </optgroup>
                  <optgroup label='By Team'>
                    {teams.map((team, idx) => {
                      return (
                        <option key={idx} value={'team_' + team._id}>{team.name}</option>)
                    }
                    )}
                  </optgroup>
                </select>
              </div>

              <div className="form-group sort">
                <label>Sorted by</label>
                <select onChange={onSort} className="custom-select small" id="sort_by">
                  <option value="totalPoints">Total points</option>
                  <option value="matchdayPoints">Round points</option>
                  <option value="nowCost">Price</option>
                </select>
              </div>

              <div className="form-group cost">
                <select onChange={onPrice} className="custom-select" id="cost_by">
                  {prices.map((price, idx) =>
                    <option key={idx} value={price}>{price}</option>
                  )}
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

      {filteredPlayers?.originalPlayers.length ?
        <div className="player-info">
          <div className="player-numbers">
            <span className="number">{filteredPlayers?.originalPlayers.length}&nbsp;</span>
            <span className="numbers">{filteredPlayers?.originalPlayers.length === 1 ? 'Player' : 'Players'}</span>
          </div>

          <div className="players-table">
            <PositionElement
              id={'goalkeepers'}
              fieldPosition={goalkeepers} teams={teams} positions={positions} sort={sort} />
            <PositionElement
              id={'defenders'}
              fieldPosition={defenders} teams={teams} positions={positions} sort={sort} />
            <PositionElement
              id={'midfielders'}
              fieldPosition={midfielders} teams={teams} positions={positions} sort={sort} />
            <PositionElement
              id={'forwards'}
              fieldPosition={forwards} teams={teams} positions={positions} sort={sort} />
          </div>
        </div> : <div className='no-trans small'>No Players Found</div>}
      <div className="button-controls">
        <button disabled={curPage === 1 ? true : false} onClick={viewFirstPage} className="btn btn-controls" id="firstPage">
          <img src={firstPage} alt="first_page" />
        </button>
        <button disabled={curPage === 1 ? true : false} onClick={viewPreviousPage} className="btn btn-controls" id="prevButton">
          <img src={prevPage} alt="prev_page" />
        </button>
        <div className="pages">
          <span className="current">{curPage}</span>
          <span>of</span>
          <span className="total_pages">{totalPages}</span>
        </div>
        <button disabled={curPage === totalPages ? true : false} onClick={viewNextPage} className="btn btn-controls" id="nextButton">
          <img src={nextPage} alt="next_page" />
        </button>
        <button disabled={curPage === totalPages ? true : false} onClick={viewLastPage} className="btn btn-controls" id="lastPage">
          <img src={lastPage} alt="last_page" />
        </button>
      </div>
    </section>
  )
}

export default Players