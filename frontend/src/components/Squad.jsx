import { useEffect, useState } from "react"

function Squad({ handleClose, handleShow, managerPicks, players, teams, positions }) {
    const [teamPicks, setTeamPicks] = useState(null)
    const [showSwap, setShowSwap] = useState(false)
    const [pick, setPick] = useState({})
    const [playerName, setPlayerName] = useState({ first: '', last: '' })
    const [playerOne, setPlayerOne] = useState({})

    useEffect(() => {
        setTeamPicks(managerPicks)
    }, [managerPicks])

    const showPop = (pick) => {
        setShowSwap(true)
        let first = players.find(x => x._id === pick._id).firstName
        let last = players.find(x => x._id === pick._id).secondName
        setPick(pick)
        setPlayerName({ first, last })
        handleShow()
    }

    const handleCloseSwap = () => {
        setShowSwap(false)
        handleClose()
    }

    const switchPlayer = () => {
        if (Object.values(playerOne).length === 0 ) {
            setPlayerOne(pick)
        }
        if (Object.values(playerOne).length > 0) {
            if (playerOne.multiplier > 0) {

            }
            setTeamPicks(teamPicks.map((tpick, key) => tpick._id === pick._id ? {
                ...tpick, multiplier: playerOne.multiplier, IsViceCaptain: playerOne.IsViceCaptain,
                IsCaptain: playerOne.IsCaptain, position: playerOne.position
            } : tpick._id === playerOne._id ? {
                ...tpick, multiplier: pick.multiplier, IsViceCaptain: pick.IsViceCaptain,
                IsCaptain: pick.IsCaptain, position: pick.position
            } : tpick))
            setPick({})
            setPlayerOne({})
            setPlayerName({ first: '', last: '' })
        }
        setShowSwap(false)
        handleClose()
    }

    const cancelPlayer = () => {
        setPlayerOne({})
        setShowSwap(false)
        handleClose()
    }

    const changeCaptain = (id) => {
        const old = teamPicks.find(x => x.IsCaptain)._id
        const player = teamPicks.find(x => x._id === id)
        let oldVc = player.IsViceCaptain === true ? true : false
        if(playerOne._id === id) {
            setPlayerOne(prevState => ({...prevState, 
                multiplier: 2, IsViceCaptain: false, IsCaptain: true}))
        }
        setTeamPicks(teamPicks.map((pick, key) => pick._id === id ? {
            ...pick,
            multiplier: 2, IsViceCaptain: false, IsCaptain: true
        } : pick._id === old ?
            { ...pick, multiplier: 1, IsViceCaptain: oldVc, IsCaptain: false } : pick))
        setShowSwap(false)
        handleClose()
    }
    const changeVice = (id) => {
        const old = teamPicks.find(x => x.IsViceCaptain)._id
        const player = teamPicks.find(x => x._id === id)
        let oldMultiplier = player.multiplier >= 2 ? 2 : 1
        let oldCap = player.IsCaptain === true ? true : false
        if(playerOne._id === id) {
            setPlayerOne(prevState => ({...prevState, 
                IsViceCaptain: true, IsCaptain: false, multiplier: 1}))
        }
        setTeamPicks(teamPicks.map((pick, key) => pick._id === id ? {
            ...pick, IsViceCaptain: true, IsCaptain: false, multiplier: 1
        } : pick._id === old ? {
            ...pick, IsCaptain: oldCap, multiplier: oldMultiplier,
            IsViceCaptain: false
        } : pick))
        setShowSwap(false)
        handleClose()
    }
    const showInfo = (id) => {
        console.log(id)
    }

    const disableButton = (id, pPosition, sPosition) => {
        const defXI = teamPicks.filter(x => x.playerPosition === '647faf277bb2ccc06e8bb00d' && x.multiplier > 0).length
        const midXI = teamPicks.filter(x => x.playerPosition === '647faf357bb2ccc06e8bb010' && x.multiplier > 0).length
        const fwdXI = teamPicks.filter(x => x.playerPosition === '64807d367bb2ccc06e8bb051' && x.multiplier > 0).length
        const playerPosition = playerOne.playerPosition
        const squadPosition = playerOne.position
        if(squadPosition === 1 && sPosition !== 12 && pPosition !== playerPosition) {
            return true
        }
        if(squadPosition === 12 && sPosition !== 1 && pPosition !== playerPosition) return true
        if(playerPosition === '647faf277bb2ccc06e8bb00d') {
            if(pPosition === '648a4408ae0e41bee2304c9a') { return true}
            if(squadPosition > 12) {
                if(fwdXI === 1 && pPosition === '64807d367bb2ccc06e8bb051') {
                    return true
                }
            } else {
                if(sPosition < 12 && sPosition !== squadPosition) return true
                if(defXI === 3 && sPosition > 12 && pPosition !== playerPosition) return true
            }
        }
        if(playerPosition === '647faf357bb2ccc06e8bb010') {
            if(pPosition === '648a4408ae0e41bee2304c9a') { return true}
            if(squadPosition > 12) {
                if(defXI === 3 && pPosition === '647faf277bb2ccc06e8bb00d' && sPosition < 12) return true
                if(fwdXI === 1 && pPosition === '64807d367bb2ccc06e8bb051' && sPosition < 12) return true
            } else {
                if(sPosition < 12 && sPosition !== squadPosition) return true
            }
        }
        if(playerPosition === '64807d367bb2ccc06e8bb051') {
            if(pPosition === '648a4408ae0e41bee2304c9a') { return true}
            if(squadPosition > 12) {
                if(defXI === 3 && pPosition === '647faf277bb2ccc06e8bb00d' && sPosition < 12) return true
            } else {
                if(sPosition < 12 && sPosition !== squadPosition) return true
                if(fwdXI === 1 && pPosition !== playerPosition) return true
            }
        }
    }


    const returnXI = () => {
        const returnMap = pick => {
            const player = players?.find(x => x._id === pick._id)
            const teamCode = teams?.find(x => x._id === pick.playerTeam)?.code
            let forwardImage =
                player?.playerPosition === '648a4408ae0e41bee2304c9a'
                    ? `${teamCode}_1-66`
                    : `${teamCode}-66`;
            const appName = player?.appName
            return (
                <div className='pitch_unit' key={pick._id}>
                    <button disabled={disableButton(pick._id, pick.playerPosition, pick.position)} onClick={() => showPop(pick)} type='button' className='btn-details'>
                        <img className='image_pic' src={require(`../static/shirt_${forwardImage}.webp`)} alt={forwardImage} />
                        <div className='details-cont'>
                            <div className='data_name'>{appName}</div>
                            <div className='data_price'>{pick.nowCost.toFixed(1)}</div>
                        </div>
                    </button>
                    <div className="captain">
                        {pick.IsCaptain ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" role="img" focusable="false" className="captain">
                                <title>Captain</title><circle cx="12" cy="12" r="12" aria-hidden="true"></circle>
                                <path d="M15.0769667,14.370341 C14.4472145,15.2780796 13.4066319,15.8124328 12.3019667,15.795341 C10.4380057,15.795341 8.92696674,14.284302 8.92696674,12.420341 C8.92696674,10.55638 10.4380057,9.045341 12.3019667,9.045341 C13.3988206,9.06061696 14.42546,9.58781014 15.0769667,10.470341 L17.2519667,8.295341 C15.3643505,6.02401882 12.1615491,5.35094208 9.51934028,6.67031017 C6.87713147,7.98967826 5.49079334,10.954309 6.17225952,13.8279136 C6.8537257,16.7015182 9.42367333,18.7279285 12.3769667,18.720341 C14.2708124,18.7262708 16.0646133,17.8707658 17.2519667,16.395341 L15.0769667,14.370341 Z" fill="#fff" aria-hidden="true"></path>
                            </svg> : pick.IsViceCaptain ? <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" role="img" focusable="false" className="vice-captain">
                                <title>Captain</title><circle cx="12" cy="12" r="12" aria-hidden="true"></circle><polygon points="13.5 .375 8.925 12.375 4.65 12.375 0 .375 3.15 .375 6.75 10.05 10.35 .375" transform="translate(5.25 6)" fill="#fff" aria-hidden="true"></polygon>
                            </svg> : ''}</div>
                </div>
            )
        }
        const goalies = teamPicks.filter(x => x.playerPosition === '648a4408ae0e41bee2304c9a' && x.multiplier > 0).map(returnMap)
        const defenders = teamPicks.filter(x => x.playerPosition === '647faf277bb2ccc06e8bb00d' && x.multiplier > 0).map(returnMap)
        const midfielders = teamPicks.filter(x => x.playerPosition === '647faf357bb2ccc06e8bb010' && x.multiplier > 0).map(returnMap)
        const forwards = teamPicks.filter(x => x.playerPosition === '64807d367bb2ccc06e8bb051' && x.multiplier > 0).map(returnMap)

        return { goalies, defenders, midfielders, forwards }
    }
    const returnBench = () => {
        const returnMap = pick => {
            const player = players?.find(x => x._id === pick._id)
            const teamCode = teams?.find(x => x._id === pick.playerTeam).code
            let forwardImage =
                player?.playerPosition === '648a4408ae0e41bee2304c9a'
                    ? `${teamCode}_1-66`
                    : `${teamCode}-66`;
            const appName = player?.appName
            const short = positions?.find(x => x._id === player.playerPosition).shortName
            return (
                <div className='pitch_unit' key={pick._id}>
                    <button disabled={disableButton(pick._id, pick.playerPosition, pick.position)} onClick={() => showPop(pick)} type='button' className='btn-details'>
                        <img className='image_pic' src={require(`../static/shirt_${forwardImage}.webp`)} alt={forwardImage} />
                        <div className='details-cont'>
                            <div className='data_name'>{appName}</div>
                            <div className='data_price'>{pick.nowCost.toFixed(1)}</div>
                        </div>
                    </button>
                    <div className="short">{short}</div>
                </div>
            )
        }
        const returnSort = (a, b) => {
            if (a.position < b.position) return -1
            if (a.position > b.position) return 1
        }
        const bench = teamPicks.filter(x => x.multiplier === 0).sort(returnSort).map(returnMap)

        return bench
    }
    return (
        <>
            <section>
                {teamPicks && <div className="pitch">
                    <div className="starting">
                        <div className="pitch_row">
                            {returnXI().goalies}
                        </div>
                        <div className="pitch_row">
                            {returnXI().defenders}</div>
                        <div className="pitch_row">
                            {returnXI().midfielders}
                        </div>
                        <div className="pitch_row">
                            {returnXI().forwards}
                        </div>
                    </div>
                    <div className="bench">
                        <div className="pitch_row">
                            {returnBench()}
                        </div>
                    </div>
                </div>}
            </section>
            {showSwap && <div className="playerpop">
                <div className="namesection">
                    <span>{playerName.first}&nbsp;{playerName.last}</span>
                    <button onClick={handleCloseSwap} className="ns-btn btn-close btn-danger"><svg style={{ color: 'white' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16"> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" fill="white"></path> </svg></button>
                </div>
                <div className="infobuttons">
                    {<button onClick={switchPlayer} className='btn-info btn-info-block btn-warn'>
                        Switch
                    </button>}
                    {pick.multiplier > 0 && !pick.IsCaptain && <button onClick={() => changeCaptain(pick._id)} className='btn-info btn-info-block btn-cap'>
                        Make Captain
                    </button>}
                    {pick.multiplier > 0 && !pick.IsViceCaptain && <button onClick={() => changeVice(pick._id)} className='btn-info btn-info-block btn-vcap'>
                        Make Vice Captain
                    </button>}
                    <button onClick={() => showInfo(pick._id)} className='btn-info btn-info-block btn-light'>
                        View Information
                    </button>
                </div>
            </div>}
        </>
    )
}

export default Squad