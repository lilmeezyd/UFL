import FixtureList from '../components/FixtureList'
import Players from '../components/Players'
import PickCard from '../components/PickCard'
import { useState, useEffect, useContext } from 'react'
import { ModalContext } from '../modalContext'
import { getPlayers, reset } from '../features/players/playerSlice'
import { getTeams } from '../features/teams/teamSlice'
import { useDispatch, useSelector } from 'react-redux'

function TeamSelection({ showPop, handleClose, handleShow }) {
  const [playerPicks, setPlayerPicks] = useState([])
  const [goalSlots, setGoalSlots] = useState([{ slot: 1, used: false }, { slot: 12, used: false }])
  const [defSlots, setDefSlots] = useState([{ slot: 2, used: false }, { slot: 3, used: false }, { slot: 4, used: false }
    , { slot: 5, used: false }, { slot: 13, used: false }])
  const [midSlots, setMidSlots] = useState([{ slot: 6, used: false }, { slot: 7, used: false }, { slot: 8, used: false }
    , { slot: 9, used: false }, { slot: 14, used: false }])
  const [fwdSlots, setFwdSlots] = useState([{ slot: 10, used: false }, { slot: 11, used: false }, { slot: 15, used: false }])
  const [league, setLeague] = useState(0)
  const [width, setWidth] = useState(null)
  const [list, setList] = useState(false)
  const [showMsg, setShowMsg] = useState(false)
  const [playerMsg, setPlayerMsg] = useState('')
  const dispatch = useDispatch()
  const { players } = useSelector((state) => state.players)
  const { teams } = useSelector(state => state.teams)

  const onResize = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    dispatch(getPlayers)
    dispatch(getTeams)
    window.addEventListener('resize', onResize)

    return () => {
      dispatch(reset())
      window.addEventListener('resize', onResize)
    }
  }, [dispatch])


  const onClick = (newPlayer) => {
    const { _id, nowCost, playerTeam, playerPosition } = newPlayer
    let position, IsCaptain, IsViceCaptain, multiplier
    const found = playerPicks.findIndex(x => x._id === _id)
    const squad = playerPicks.reduce((a, b) => {
      a[b.playerPosition] = a[b.playerPosition] ? ++a[b.playerPosition] : 1
      return a
    }, {})
    if (squad['648a4408ae0e41bee2304c9a'] === 2 && playerPosition === '648a4408ae0e41bee2304c9a') {
      return `Can't add more goalies`
    }
    if (squad['647faf277bb2ccc06e8bb00d'] === 5 && playerPosition === '647faf277bb2ccc06e8bb00d') {
      return
    }
    if (squad['647faf357bb2ccc06e8bb010'] === 5 && playerPosition === '647faf357bb2ccc06e8bb010') {
      return
    }
    if (squad['64807d367bb2ccc06e8bb051'] === 3 && playerPosition === '64807d367bb2ccc06e8bb051') {
      return
    }
    returnPosition(playerPosition)
    const playerName = players.find(player => player._id === _id).appName
    let message = `${playerName} added`
    position = returnPosition(playerPosition).position
    IsCaptain = returnPosition(playerPosition).IsCaptain
    IsViceCaptain = returnPosition(playerPosition).IsViceCaptain
    multiplier = returnPosition(playerPosition).multiplier

    found === -1 && setShowMsg(true)
    found === -1 && setPlayerMsg(message)
    found === -1 && setPlayerPicks(prevState => ([
      ...prevState,
      {
        _id, nowCost, playerTeam, playerPosition, position,
        multiplier, IsCaptain, IsViceCaptain
      }
    ]))

  }

  const returnPosition = (id) => {
    let position, IsViceCaptain, IsCaptain, multiplier, positionIndex

    if (id === '648a4408ae0e41bee2304c9a') {
      positionIndex = goalSlots.findIndex(x => x.used === false)
      position = goalSlots[positionIndex].slot
      IsViceCaptain = position === 1 ? true : false
      IsCaptain = false
      multiplier = position === 1 ? 1 : 0
      setGoalSlots([...goalSlots.map((slot, idx) =>
        idx === positionIndex ? { slot: position, used: true } : slot
      )])
    }
    if (id === '647faf277bb2ccc06e8bb00d') {
      positionIndex = defSlots.findIndex(x => x.used === false)
      position = defSlots[positionIndex].slot
      IsCaptain = position === 2 ? true : false
      IsViceCaptain = false
      multiplier = position === 2 ? 2 : position === 13 ? 0 : 1
      setDefSlots([...defSlots.map((slot, idx) =>
        idx === positionIndex ? { slot: position, used: true } : slot
      )])
    }
    if (id === '647faf357bb2ccc06e8bb010') {
      positionIndex = midSlots.findIndex(x => x.used === false)
      position = midSlots[positionIndex].slot
      IsCaptain = false
      IsViceCaptain = false
      multiplier = position === 14 ? 0 : 1
      setMidSlots([...midSlots.map((slot, idx) =>
        idx === positionIndex ? { slot: position, used: true } : slot
      )])
    }
    if (id === '64807d367bb2ccc06e8bb051') {
      positionIndex = fwdSlots.findIndex(x => x.used === false)
      position = fwdSlots[positionIndex].slot
      IsCaptain = false
      IsViceCaptain = false
      multiplier = position === 15 ? 0 : 1
      setFwdSlots([...fwdSlots.map((slot, idx) =>
        idx === positionIndex ? { slot: position, used: true } : slot
      )])
    }
    return { position, IsViceCaptain, IsCaptain, multiplier }
  }

  const removePick = (id, pid) => {
    let position = playerPicks.find(x => x._id === id).position
    let playerName = players.find(player => player._id === id).appName
    let message = `${playerName} removed`
    removePosition(pid, position)
    setShowMsg(true)
    setPlayerMsg(message)
    setPlayerPicks(playerPicks.filter(x => x._id !== id))
  }

  const removePosition = (pid, position) => {
    if (pid === '648a4408ae0e41bee2304c9a') {
      let positionIndex = goalSlots.findIndex(x => x.slot === position)
      setGoalSlots([...goalSlots.map((slot, idx) =>
        idx === positionIndex ? { slot: position, used: false } : slot)])
    }
    if (pid === '647faf277bb2ccc06e8bb00d') {
      let positionIndex = defSlots.findIndex(x => x.slot === position)
      setDefSlots([...defSlots.map((slot, idx) =>
        idx === positionIndex ? { slot: position, used: false } : slot)])
    }
    if (pid === '647faf357bb2ccc06e8bb010') {
      let positionIndex = midSlots.findIndex(x => x.slot === position)
      setMidSlots([...midSlots.map((slot, idx) =>
        idx === positionIndex ? { slot: position, used: false } : slot
      )])
    }
    if (pid === '64807d367bb2ccc06e8bb051') {
      let positionIndex = fwdSlots.findIndex(x => x.slot === position)
      setFwdSlots([...fwdSlots.map((slot, idx) =>
        idx === positionIndex ? { slot: position, used: false } : slot
      )])
    }
  }



  const toggleList = () => {
    setList(prevState => !prevState)
    setWidth(window.innerWidth)
  }

  const onAuto = () => {
    console.log(playerPicks)
  }

  const onReset = () => {
    setPlayerPicks([])
    setGoalSlots([{ slot: 1, used: false }, { slot: 12, used: false }])
    setDefSlots([{ slot: 2, used: false }, { slot: 3, used: false }, { slot: 4, used: false }
      , { slot: 5, used: false }, { slot: 13, used: false }])
    setMidSlots([{ slot: 6, used: false }, { slot: 7, used: false }, { slot: 8, used: false }
      , { slot: 9, used: false }, { slot: 14, used: false }])
    setFwdSlots([{ slot: 10, used: false }, { slot: 11, used: false }, { slot: 15, used: false }])
  }



  const onChange = (e) => { }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('bouhood')
  }


  let itb = (100 - playerPicks.reduce((x, y) => x + y.nowCost, 0)).toFixed(1)
  let itbClass = itb < 0 ? 'bad' : 'good'
  let sClass = playerPicks.length < 15 ? 'bad' : 'good'
  let showSquad = (width > 760 || !list) ? 'squad' : 'hides'
  let showPlayers = (width > 760 || list) ? 'players-col' : 'hides'
  return (
    <>
      <div className="players-heading-container">
        <h3 className="players-heading">Team Selection</h3>
        <button onClick={toggleList} className="btn player-list">
          {list ? 'Go back' : 'Player list'}</button>
      </div>
      <div className='team-selection'>
        <section className={`${showSquad}`}>
          <div className="transfer-header">
            <h3 className="gw-heading">Matchday 1</h3>
          </div>
          <div className="matchday-deadline">
            <h4>Matchday 1 deadline:</h4>
            <p>Fri 11 Aug 20:30</p>
          </div>
          <div className="players-money-select">
            <div className='vertical'></div>
            <div className="horizontal"></div>
            <div className="players-select">
              <h3 className="select-heading">Players Selected</h3>
              <div className={`players-selected ${sClass}`}>{playerPicks.length} / 15</div>
            </div>
            <div className="players-money">
              <h3 className="money-heading">Money Remaining</h3>
              <div className={`money-selected ${itbClass}`}>{itb}</div>
            </div>
          </div>
          <div className="auto-reset">
            <div className="fpl-buttons">
              <button onClick={onAuto} className="btn-auto-reset">
                Auto Pick
              </button>
            </div>
            <div className="fpl-buttons">
              <button onClick={onReset} className="btn-auto-reset">Reset</button>
            </div>
          </div>
          {showMsg && <div className="message">
            <span className="success-span-msg">{playerMsg}</span>
          </div>}
          <div className="pitch">
            <div className="pitch_row">
              <div className="pitch_unit"></div>
              <PickCard toggleList={toggleList} removePick={removePick} handleShow={handleShow} handleClose={handleClose} type={'goalies'} index={0} playerPicks={playerPicks} />
              <div className="pitch_unit"></div>
              <PickCard toggleList={toggleList} removePick={removePick} handleShow={handleShow} handleClose={handleClose} type={'goalies'} index={1} playerPicks={playerPicks} />
              <div className="pitch_unit"></div>
            </div>
            <div className="pitch_row">
              <PickCard toggleList={toggleList} removePick={removePick} handleShow={handleShow} handleClose={handleClose} type={'defenders'} index={0} playerPicks={playerPicks} />
              <PickCard toggleList={toggleList} removePick={removePick} handleShow={handleShow} handleClose={handleClose} type={'defenders'} index={1} playerPicks={playerPicks} />
              <PickCard toggleList={toggleList} removePick={removePick} handleShow={handleShow} handleClose={handleClose} type={'defenders'} index={2} playerPicks={playerPicks} />
              <PickCard toggleList={toggleList} removePick={removePick} handleShow={handleShow} handleClose={handleClose} type={'defenders'} index={3} playerPicks={playerPicks} />
              <PickCard toggleList={toggleList} removePick={removePick} handleShow={handleShow} handleClose={handleClose} type={'defenders'} index={4} playerPicks={playerPicks} /></div>
            <div className="pitch_row">
              <PickCard toggleList={toggleList} removePick={removePick} handleShow={handleShow} handleClose={handleClose} type={'midfielders'} index={0} playerPicks={playerPicks} />
              <PickCard toggleList={toggleList} removePick={removePick} handleShow={handleShow} handleClose={handleClose} type={'midfielders'} index={1} playerPicks={playerPicks} />
              <PickCard toggleList={toggleList} removePick={removePick} handleShow={handleShow} handleClose={handleClose} type={'midfielders'} index={2} playerPicks={playerPicks} />
              <PickCard toggleList={toggleList} removePick={removePick} handleShow={handleShow} handleClose={handleClose} type={'midfielders'} index={3} playerPicks={playerPicks} />
              <PickCard toggleList={toggleList} removePick={removePick} handleShow={handleShow} handleClose={handleClose} type={'midfielders'} index={4} playerPicks={playerPicks} />
            </div>
            <div className="pitch_row">
              <div className="pitch_unit"></div>
              <PickCard toggleList={toggleList} removePick={removePick} handleShow={handleShow} handleClose={handleClose} type={'forwards'} index={0} playerPicks={playerPicks} />
              <PickCard toggleList={toggleList} removePick={removePick} handleShow={handleShow} handleClose={handleClose} type={'forwards'} index={1} playerPicks={playerPicks} />
              <PickCard toggleList={toggleList} removePick={removePick} handleShow={handleShow} handleClose={handleClose} type={'forwards'} index={2} playerPicks={playerPicks} />
              <div className="pitch_unit"></div></div>
          </div>
          <section className="form">
            <form onSubmit={onSubmit}>
              <div className='team-name-1'>
                <div className="form-group fav-team">
                  <label htmlFor="teamName">Team Name</label>
                  <input type="text" />
                </div>
                <div className='name-warning'>*Team name should not be more than 20 characters</div>
              </div>
              <div className='team-name-1'>
                <div className="form-group fav-team">
                  <label htmlFor="team">Favorite Team</label>
                  <select name="team" id="team">
                    <option value={123}>Neutral</option>
                    {teams.map(team => (
                      <option value={team._id} key={team._id}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='name-warning'>*Select favorite team</div>
              </div>
              <div className="form-group">
                <button className="btn btn-block m-auto">Save</button>
              </div>
            </form>
          </section>
        </section>


        <Players
          playerPicks={playerPicks}
          showPop={showPop}
          handleShow={handleShow}
          handleClose={handleClose} showPlayers={showPlayers} onClick={onClick} />
        <FixtureList />
      </div>
    </>
  )
}

export default TeamSelection