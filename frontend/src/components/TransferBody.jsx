import { useState, useEffect } from 'react'
import PickCard from '../components/PickCard'
import Players from '../components/Players'
import TransferComp from './TransferComp'
import { createPicks } from '../features/picks/picksSlice'

function TransferBody({ picks, players, positions, teams, list, width,
    toggleList, handleShow, handleClose, showPop,
    goalSlot, defSlot, midSlot, fwdSlot }) {

    const [playerPicks, setPlayerPicks] = useState([])
    const [goalSlots, setGoalSlots] = useState([])
    const [defSlots, setDefSlots] = useState([])
    const [midSlots, setMidSlots] = useState([])
    const [fwdSlots, setFwdSlots] = useState([])
    const [transfers, setTransfers] = useState([])
    const [showMsg, setShowMsg] = useState(false)
    const [playerMsg, setPlayerMsg] = useState('')
    const [tranSection, setTranSection] = useState(false)

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
        setTransfers([])
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
        let playerPosition = playerPicks.find(x => x._id === id).playerPosition
        let playerName = players.find(player => player._id === id).appName
        let alreadyIn = transfers.find(x => x.playerIn === id)
        let message = `${playerName} removed`
        !!alreadyIn === false && setTransfers(prevState => ([
            ...prevState, {
                playerOut: id,
                position,
                playerPosition,
                playerIn: null
            }
        ]))


        !!alreadyIn === true && setTransfers(transfers.map(transfer =>
            transfer.playerIn === id ? { ...transfer, playerIn: null } : transfer))
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
        //if(!!picks.length === false)
        //returnPosition(playerPosition)
        const playerName = players.find(player => player._id === _id).appName
        let message = `${playerName} added`

        let playerExists = transfers.find(x => x.playerOut === _id)
        let playerPos = !!playerExists && playerExists.position
        let playerInExists = !!playerExists && playerExists.playerIn

        if (!!playerExists === false) {
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
        }

        if (!!playerExists === true && !!playerInExists === false) {
            position = playerExists.position
            if (playerPosition === '648a4408ae0e41bee2304c9a') {
                IsCaptain = goalSlots.find(x => x.slot === position).IsCaptain
                IsViceCaptain = goalSlots.find(x => x.slot === position).IsViceCaptain
                multiplier = goalSlots.find(x => x.slot === position).multiplier
                setGoalSlots([...goalSlots.map(x =>
                    x.slot === position ? { ...x, used: true } : x)])
            }
            if (playerPosition === '647faf277bb2ccc06e8bb00d') {
                IsCaptain = defSlots.find(x => x.slot === position).IsCaptain
                IsViceCaptain = defSlots.find(x => x.slot === position).IsViceCaptain
                multiplier = defSlots.find(x => x.slot === position).multiplier
                setDefSlots([...defSlots.map(x =>
                    x.slot === position ? { ...x, used: true } : x)])
            }
            if (playerPosition === '647faf357bb2ccc06e8bb010') {
                IsCaptain = midSlots.find(x => x.slot === position).IsCaptain
                IsViceCaptain = midSlots.find(x => x.slot === position).IsViceCaptain
                multiplier = midSlots.find(x => x.slot === position).multiplier
                setMidSlots([...midSlots.map(x =>
                    x.slot === position ? { ...x, used: true } : x)])
            }
            if (playerPosition === '64807d367bb2ccc06e8bb051') {
                IsCaptain = fwdSlots.find(x => x.slot === position).IsCaptain
                IsViceCaptain = fwdSlots.find(x => x.slot === position).IsViceCaptain
                multiplier = fwdSlots.find(x => x.slot === position).multiplier
                setFwdSlots([...fwdSlots.map(x =>
                    x.slot === position ? { ...x, used: true } : x)])
            }
            setPlayerPicks(prevState => ([
                ...prevState,
                {
                    _id, nowCost, playerTeam, playerPosition, position,
                    multiplier, IsCaptain, IsViceCaptain
                }
            ]))
        }


        found === -1 && !!playerExists === false && setTransfers(transfers.map((transfer, key) =>
            transfer.position === position ? { ...transfer, playerIn: _id } : transfer
        ))

        found === -1 && !!playerExists === true && !!playerInExists === false && setTransfers(transfers.filter((transfer, key) =>
            transfer.position !== playerPos))

        if (found === -1 && !!playerExists === true && !!playerInExists === true) {
            let newPlayerIn = playerExists.playerIn
            let newPosition = playerExists.playerPosition
            let positionIndex = transfers.findIndex(x => x.playerPosition === newPosition && x.playerIn === null)
            let newSlot = transfers.find(x => x.playerPosition === newPosition && x.playerIn === null).position
            setTransfers(transfers.map((transfer, key) =>
                key === positionIndex ? { ...transfer, playerIn: newPlayerIn } : transfer).filter((transfer, key) =>
                    transfer.position !== playerPos))

            if (newPosition === '648a4408ae0e41bee2304c9a') {
                IsCaptain = goalSlots.find(x => x.slot === newSlot).IsCaptain
                IsViceCaptain = goalSlots.find(x => x.slot === newSlot).IsViceCaptain
                multiplier = goalSlots.find(x => x.slot === newSlot).multiplier
                setGoalSlots([...goalSlots.map(x =>
                    x.slot === newSlot ? { ...x, used: true } : x)])
            }
            if (newPosition === '647faf277bb2ccc06e8bb00d') {
                IsCaptain = defSlots.find(x => x.slot === newSlot).IsCaptain
                IsViceCaptain = defSlots.find(x => x.slot === newSlot).IsViceCaptain
                multiplier = defSlots.find(x => x.slot === newSlot).multiplier
                setDefSlots([...defSlots.map(x =>
                    x.slot === newSlot ? { ...x, used: true } : x)])
            }
            if (newPosition === '647faf357bb2ccc06e8bb010') {
                IsCaptain = midSlots.find(x => x.slot === newSlot).IsCaptain
                IsViceCaptain = midSlots.find(x => x.slot === newSlot).IsViceCaptain
                multiplier = midSlots.find(x => x.slot === newSlot).multiplier
                setMidSlots([...midSlots.map(x =>
                    x.slot === newSlot ? { ...x, used: true } : x)])
            }
            if (newPosition === '64807d367bb2ccc06e8bb051') {
                IsCaptain = fwdSlots.find(x => x.slot === newSlot).IsCaptain
                IsViceCaptain = fwdSlots.find(x => x.slot === newSlot).IsViceCaptain
                multiplier = fwdSlots.find(x => x.slot === newSlot).multiplier
                setFwdSlots([...fwdSlots.map(x =>
                    x.slot === newSlot ? { ...x, used: true } : x)])
            }

            let nPlayerTeam = playerPicks.find(x => x.position === playerPos).playerTeam
            let nNowCost = playerPicks.find(x => x.position === playerPos).nowCost
            let n_id = playerPicks.find(x => x.position === playerPos)._id

            setPlayerPicks(playerPicks.map((player, key) =>
                player.position === playerPos ? { ...player, _id, nowCost, playerTeam, }
                    : player))

            setPlayerPicks(prevState => ([
                ...prevState,
                {
                    _id: n_id, nowCost: nNowCost, playerTeam: nPlayerTeam, playerPosition: newPosition, position: newSlot,
                    multiplier, IsCaptain, IsViceCaptain
                }
            ]))

        }

        found === -1 && setShowMsg(true)
        found === -1 && setPlayerMsg(message)

    }

    const isEqual = (a,b)  => {
        if(b.length !== a.length) return false
        for(let i=0; i < a.length; i++) {
          if(!b.includes(a[i])) return false
        }
        return true
    }

    const disableButton = () => {
        let itb = 100 - playerPicks.reduce((x, y) => x + y.nowCost, 0)
        if (itb < 0) return true
        if (playerPicks.length < 15) return true
        return isEqual(picks.map(x => x._id), playerPicks.map(x => x._id))
        
    }

    const onSubmit = (e) => {
        e.preventDefault()
        //dispatch(createPicks({ picks: playerPicks, teamName }))
        //navigate('/pickteam')
        setTranSection(true)
        console.log(playerPicks)
    }


    let itb = (100 - playerPicks?.reduce((x, y) => x + y.nowCost, 0)).toFixed(1)
    let itbClass = itb < 0 ? 'bad' : 'good'
    let sClass = playerPicks?.length < 15 ? 'bad' : 'good'
    let showSquad = (width > 760 || !list) ? 'squad' : 'hides'
    let showPlayers = (width > 760 || list) ? 'players-col' : 'hides'

    return (
        <>
            {tranSection ? <TransferComp positions={positions} teams={teams} players={players} transfers={transfers} /> : 
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
                        <div className="form-group">
                            <button disabled={disableButton()} className="btn btn-block btn-green m-auto">Save</button>
                        </div>
                    </form>
                </section>
            </section>}
            <Players
                playerPicks={playerPicks}
                showPop={showPop}
                handleShow={handleShow}
                handleClose={handleClose} showPlayers={showPlayers} onClick={onClick} />
        </>
    )
}

export default TransferBody

