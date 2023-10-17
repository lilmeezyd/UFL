import { useEffect, useState } from 'react'

function Live({ livePicks, teamName,
    matchdays, fixtures, players, teams, positions }) {
    const [index, setIndex] = useState(1)

    useEffect(() => {
        setIndex(livePicks.length)
    }, [livePicks])

    const returnXI = (a, _mid) => {
        const returnMap = pick => {
            const player = players?.find(x => x._id === pick._id)
            const teamCode = teams?.find(x => x._id === pick.playerTeam)?.code
            const team = teams?.find(x => x._id === pick.playerTeam)?._id
            const fixtureObj = fixtures?.find(x => x.matchday === _mid &&
                (x.teamAway === team || x.teamHome === team))
            let pitch = player.matchdays.findIndex(x => x.matchday === _mid) === -1 ?
                (fixtureObj?.teamHome === team ? '(H)' :
                    fixtureObj?.teamAway === team ? '(A)' : '') : ''
            let teamAgainstId = fixtureObj?.teamHome === team ?
                fixtureObj?.teamAway : fixtureObj?.teamHome
            const points = player.matchdays.findIndex(x => x.matchday === _mid) === -1 ?
                teams?.find(x => x._id === teamAgainstId)?.shortName :
                (pick.multiplier === 2 ? 
                    +player.matchdays.find(x => x.matchday === _mid).matchdayPoints*2 : 
                    +player.matchdays.find(x => x.matchday === _mid).matchdayPoints)

            let forwardImage =
                player?.playerPosition === '648a4408ae0e41bee2304c9a'
                    ? `${teamCode}_1-66`
                    : `${teamCode}-66`;
            const appName = player?.appName
            console.log(pick)
            return (
                <div className='pitch_unit' key={pick._id}>
                    <button type='button' className='btn-details'>
                        <img className='image_pic' src={require(`../static/shirt_${forwardImage}.webp`)} alt={forwardImage} />
                        <div className='details-cont'>
                            <div className='data_name'>{appName}</div>
                            <div className='data_price'>{points}&nbsp;
                                {pitch}</div>
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
        const goalies = a.filter(x => x.playerPosition === '648a4408ae0e41bee2304c9a' && x.multiplier > 0).map(returnMap)
        const defenders = a.filter(x => x.playerPosition === '647faf277bb2ccc06e8bb00d' && x.multiplier > 0).map(returnMap)
        const midfielders = a.filter(x => x.playerPosition === '647faf357bb2ccc06e8bb010' && x.multiplier > 0).map(returnMap)
        const forwards = a.filter(x => x.playerPosition === '64807d367bb2ccc06e8bb051' && x.multiplier > 0).map(returnMap)

        return { goalies, defenders, midfielders, forwards }
    }
    const returnBench = (a, _mid) => {
        const returnMap = pick => {
            const player = players?.find(x => x._id === pick._id)
            const teamCode = teams?.find(x => x._id === pick.playerTeam).code
            const team = teams?.find(x => x._id === pick.playerTeam)?._id
            const fixtureObj = fixtures?.find(x => x.matchday === _mid &&
                (x.teamAway === team || x.teamHome === team))
            let pitch = player.matchdays.findIndex(x => x.matchday === _mid) === -1 ?
                (fixtureObj?.teamHome === team ? '(H)' :
                    fixtureObj?.teamAway === team ? '(A)' : '') : ''
            let teamAgainstId = fixtureObj?.teamHome === team ?
                fixtureObj?.teamAway : fixtureObj?.teamHome
            const points = player.matchdays.findIndex(x => x.matchday === _mid) === -1 ?
                teams?.find(x => x._id === teamAgainstId)?.shortName :
                +player.matchdays.find(x => x.matchday === _mid).matchdayPoints
            let forwardImage =
                player?.playerPosition === '648a4408ae0e41bee2304c9a'
                    ? `${teamCode}_1-66`
                    : `${teamCode}-66`;
            const appName = player?.appName
            const short = positions?.find(x => x._id === player.playerPosition).shortName
            return (
                <div className='pitch_unit' key={pick._id}>
                    <button type='button' className='btn-details'>
                        <img className='image_pic' src={require(`../static/shirt_${forwardImage}.webp`)} alt={forwardImage} />
                        <div className='details-cont'>
                            <div className='data_name'>{appName}</div>
                            <div className='data_price'>{points}&nbsp;{pitch}</div>
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
        const bench = a.filter(x => x.multiplier === 0).sort(returnSort).map(returnMap)

        return bench
    }
    const onDecrement = () => {
        index > livePicks.length && setIndex((prevState) => prevState - 1)
    }

    const onIncrement = () => {
        index < livePicks.length && setIndex((prevState) => prevState + 1)
    }

    const getPoints = (a, _mid) => {
        //const player = players?.find(x => x._id === a._id)
        //const points = player.matchdays.findIndex(x => x.matchday === _mid) === -1 ?
        //        null : +player.matchdays.find(x => x.matchday === _mid).matchdayPoints
        console.log(a)
        return a.reduce((x, y) => x + y.points, 0)
    }

    return (
        <>
            {players.length > 0 &&
                positions.length > 0 &&
                teams.length > 0 &&
                fixtures.length > 0 &&
                matchdays.length > 0 &&
                <>{livePicks.map(x =>
                (livePicks &&
                    <section key={x.matchday} className="squad">
                        <section className="btn-wrapper">
                            <button onClick={onDecrement} className={`${index === 1 && 'btn-hide'} btn previous`}>Previous</button>
                            <div className="transfer-header">
                                <h3 className="gw-heading">Matchday {x.matchday}</h3>
                                <h4>{teamName}</h4>
                                <h4>Points: {getPoints(x.picks, x.matchdayId)}</h4>
                            </div>
                            <button onClick={onIncrement} className={`${index === livePicks.length && 'btn-hide'} btn next`}>Next</button>
                        </section>
                        <div className="pitch">
                            <div className="starting">
                                <div className="pitch_row">
                                    {returnXI(x.picks, x.matchdayId).goalies}
                                </div>
                                <div className="pitch_row">
                                    {returnXI(x.picks, x.matchdayId).defenders}</div>
                                <div className="pitch_row">
                                    {returnXI(x.picks, x.matchdayId).midfielders}
                                </div>
                                <div className="pitch_row">
                                    {returnXI(x.picks, x.matchdayId).forwards}
                                </div>
                            </div>
                            <div className="bench">
                                <div className="pitch_row">
                                    {returnBench(x.picks, x.matchdayId)}
                                </div>
                            </div>
                        </div></section>))}</>

            }
        </>
    )
}

export default Live