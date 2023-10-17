import { useState, useEffect } from 'react'
import PickCard from '../components/PickCard'
import Players from '../components/Players'
import { createPicks } from '../features/picks/picksSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToLeague } from '../features/leagues/leagueSlice'

function SelectionBody({ teamLeagues, picks, players, list, width,
    toggleList, handleShow, handleClose, showPop,
    goalSlot, defSlot, midSlot, fwdSlot }) {
    const [teamName, setTeamName] = useState('')
    const [league, setLeague] = useState('64f51d5d64a599eb910e8ff1')
    const [playerPicks, setPlayerPicks] = useState([])
    const [goalSlots, setGoalSlots] = useState([])
    const [defSlots, setDefSlots] = useState([])
    const [midSlots, setMidSlots] = useState([])
    const [fwdSlots, setFwdSlots] = useState([])
    const [showMsg, setShowMsg] = useState(false)
    const [playerMsg, setPlayerMsg] = useState('') 
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        setPlayerPicks(picks)
        setGoalSlots(goalSlot)
        setDefSlots(defSlot)
        setMidSlots(midSlot)
        setFwdSlots(fwdSlot)
    }, [])

    const onReset = () => {
        setPlayerPicks(picks)
        setPlayerMsg('')
        setShowMsg(false)
        setGoalSlots(goalSlot)
        setDefSlots(defSlot)
        setMidSlots(midSlot)
        setFwdSlots(fwdSlot)
    }

    const onAuto = () => {
        console.log(playerPicks)
    }

    const returnPosition = (id) => {
        let position, IsViceCaptain, IsCaptain, multiplier, positionIndex

        if (id === '648a4408ae0e41bee2304c9a') {
            positionIndex = goalSlots.findIndex(x => x.used === false)
            position = goalSlots[positionIndex].slot
            IsViceCaptain = goalSlots[positionIndex].IsViceCaptain
            IsCaptain = goalSlots[positionIndex].IsCaptain
            multiplier = goalSlots[positionIndex].multiplier
            setGoalSlots([...goalSlots.map((slot, idx) =>
                idx === positionIndex ? { slot: position, used: true, IsCaptain, IsViceCaptain, multiplier } : slot
            )])
        }
        if (id === '647faf277bb2ccc06e8bb00d') {
            positionIndex = defSlots.findIndex(x => x.used === false)
            position = defSlots[positionIndex].slot
            IsViceCaptain = defSlots[positionIndex].IsViceCaptain
            IsCaptain = defSlots[positionIndex].IsCaptain
            multiplier = defSlots[positionIndex].multiplier
            setDefSlots([...defSlots.map((slot, idx) =>
                idx === positionIndex ? { slot: position, used: true, IsCaptain, IsViceCaptain, multiplier } : slot
            )])
        }
        if (id === '647faf357bb2ccc06e8bb010') {
            positionIndex = midSlots.findIndex(x => x.used === false)
            position = midSlots[positionIndex].slot
            IsViceCaptain = midSlots[positionIndex].IsViceCaptain
            IsCaptain = midSlots[positionIndex].IsCaptain
            multiplier = midSlots[positionIndex].multiplier
            setMidSlots([...midSlots.map((slot, idx) =>
                idx === positionIndex ? { slot: position, used: true, IsCaptain, IsViceCaptain, multiplier } : slot
            )])
        }
        if (id === '64807d367bb2ccc06e8bb051') {
            positionIndex = fwdSlots.findIndex(x => x.used === false)
            position = fwdSlots[positionIndex].slot
            IsViceCaptain = fwdSlots[positionIndex].IsViceCaptain
            IsCaptain = fwdSlots[positionIndex].IsCaptain
            multiplier = fwdSlots[positionIndex].multiplier
            setFwdSlots([...fwdSlots.map((slot, idx) =>
                idx === positionIndex ? { slot: position, used: true, IsCaptain, IsViceCaptain, multiplier } : slot
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
                idx === positionIndex ? { ...slot, slot: position, used: false } : slot)])
        }
        if (pid === '647faf277bb2ccc06e8bb00d') {
            let positionIndex = defSlots.findIndex(x => x.slot === position)
            setDefSlots([...defSlots.map((slot, idx) =>
                idx === positionIndex ? { ...slot, slot: position, used: false } : slot)])
        }
        if (pid === '647faf357bb2ccc06e8bb010') {
            let positionIndex = midSlots.findIndex(x => x.slot === position)
            setMidSlots([...midSlots.map((slot, idx) =>
                idx === positionIndex ? { ...slot, slot: position, used: false } : slot
            )])
        }
        if (pid === '64807d367bb2ccc06e8bb051') {
            let positionIndex = fwdSlots.findIndex(x => x.slot === position)
            setFwdSlots([...fwdSlots.map((slot, idx) =>
                idx === positionIndex ? { ...slot, slot: position, used: false } : slot
            )])
        }
    }

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

        const playerName = players.find(player => player._id === _id).appName
        let message = `${playerName} added`


        position = returnPosition(playerPosition).position
        IsCaptain = returnPosition(playerPosition).IsCaptain
        IsViceCaptain = returnPosition(playerPosition).IsViceCaptain
        multiplier = returnPosition(playerPosition).multiplier

        setPlayerPicks(prevState => ([
            ...prevState,
            {
                _id, nowCost, playerTeam, playerPosition, position,
                multiplier, IsCaptain, IsViceCaptain
            }
        ]))

        setShowMsg(true)
        setPlayerMsg(message)

    }


    const onChange = (e) => {
        setTeamName(e.target.value)
    }

    const selectLeague = (e) => {
        setLeague(e.target.value)
    }

    const disableButton = () => {
        let itb = 100 - playerPicks.reduce((x, y) => x + y.nowCost, 0)
        if (itb < 0) return true
        if (playerPicks.length < 15) return true
        if (teamName.length === 0 || teamName.length > 20) return true
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createPicks({ picks: playerPicks, teamName }))
        dispatch(addToLeague(league))
        dispatch(addToLeague('6504dbaaa5c601808d971cf4'))
        navigate('/pickteam')
    }

    let itb = (100 - playerPicks?.reduce((x, y) => x + y.nowCost, 0)).toFixed(1)
    let itbClass = itb < 0 ? 'bad' : 'good'
    let sClass = playerPicks?.length < 15 ? 'bad' : 'good'
    let showSquad = (width > 760 || !list) ? 'squad' : 'hides'
    let showPlayers = (width > 760 || list) ? 'players-col' : 'hides'
    return (
        <>
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
                        <div className={`players-selected ${sClass}`}>{playerPicks?.length} / 15</div>
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
                                <input
                                    className='form-control'
                                    onChange={onChange}
                                    value={teamName}
                                    id='teamName'
                                    name='teamName'
                                    placeholder='Team Name'
                                    type="text" />
                            </div>
                            <div className='name-warning'>*Team name should not be more than 20 characters</div>
                        </div>
                        <div className='team-name-1'>
                            <div className="form-group fav-team">
                                <label htmlFor="team">Favorite Team</label>
                                <select name="team" id="team" onChange={selectLeague}>
                                    {teamLeagues.map(team => (
                                        <option value={team._id} key={team._id}>
                                            {team.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='name-warning'>*Select favorite team</div>
                        </div>
                        <div className="form-group">
                            <button disabled={disableButton()} className="btn btn-block btn-green m-auto">Save</button>
                        </div>
                    </form>
                </section>
            </section>
            <Players
                playerPicks={playerPicks}
                showPop={showPop}
                handleShow={handleShow}
                handleClose={handleClose} showPlayers={showPlayers} onClick={onClick} />
        </>
    )
}

export default SelectionBody