import { useContext, useState, useEffect } from 'react'
import { ModalContext } from '../modalContext'
import { useSelector, useDispatch } from 'react-redux'
import { getTeams, reset } from '../features/teams/teamSlice'

function PlayerCard({ playerPicks, handleShow, handleClose, onClick, playerPos, shortName, shortPos, forwardImage, position, team, sort }) {

    const modalOver = useContext(ModalContext)
    const [showTransfer, setShowTransfer] = useState(false)
    const dispatch = useDispatch()
    const { teams } = useSelector((state) => state.teams)

    useEffect(() => {
        dispatch(getTeams())

        return () => {
            dispatch(reset())
        }
    }, [dispatch])

    const showPop = () => {
        setShowTransfer(true)
        handleShow()
    }
    const handleCloseTransfer = () => {
        setShowTransfer(false)
        handleClose()
    }
    const showPlayer = () => {
        onClick(playerPos)
        handleCloseTransfer()
    }
    /*if(!modalOver && showTransfer){
     handleCloseTransfer()
    }*/
    let playersFound = playerPicks
        .map(x => x.playerTeam === playerPos.playerTeam)
        .filter(x => x).length
    let teamName = teams.find(x => x._id === team).name

    let disabled = playerPicks.map(x => x._id).includes(playerPos._id) ? true : false
    let goalkeepersSelected = playerPicks.filter(x => x.playerPosition === '648a4408ae0e41bee2304c9a').length
    let defendersSelected = playerPicks.filter(x => x.playerPosition === '647faf277bb2ccc06e8bb00d').length
    let midfieldersSelected = playerPicks.filter(x => x.playerPosition === '647faf357bb2ccc06e8bb010').length
    let forwardsSelected = playerPicks.filter(x => x.playerPosition === '64807d367bb2ccc06e8bb051').length

    const disableButton = (picks, player) => {
        if (picks === 15) {
            return true
        }
        if (picks < 15 && playersFound === 3) return true
        if (picks < 15 && player.playerPosition === '648a4408ae0e41bee2304c9a' &&
            goalkeepersSelected === 2) return true
        if (picks < 15 && player.playerPosition === '647faf277bb2ccc06e8bb00d' &&
            defendersSelected === 5) return true

        if (picks < 15 && player.playerPosition === '647faf357bb2ccc06e8bb010' &&
            midfieldersSelected === 5) return true

        if (picks < 15 && player.playerPosition === '64807d367bb2ccc06e8bb051' &&
            forwardsSelected === 3) return true
    }
    const getMessage = () => {
        let message
        if (playerPicks.length < 15 && playersFound === 3) {
            if (playerPos.playerPosition === '648a4408ae0e41bee2304c9a' &&
                goalkeepersSelected < 2) {
                message = <div className='message'>
                <span className='danger-span-msg'>You've already selected 3 players from {teamName}</span></div>
            }
            if (playerPos.playerPosition === '647faf277bb2ccc06e8bb00d' &&
                defendersSelected < 5) {
                message = <div className='message'>
                <span className='danger-span-msg'>You've already selected 3 players from {teamName}</span></div>
            }
            if (playerPos.playerPosition === '647faf357bb2ccc06e8bb010' &&
                midfieldersSelected < 5) {
                message = <div className='message'>
                <span className='danger-span-msg'>You've already selected 3 players from {teamName}</span></div>
            }
            if (playerPos.playerPosition === '64807d367bb2ccc06e8bb051' &&
                forwardsSelected < 3) {
                message = <div className='message'>
                <span className='danger-span-msg'>You've already selected 3 players from {teamName}</span></div>
            }
        }
        if (playerPicks.length === 15) {
            message = <div className='message'>
            <span className='danger-span-msg'>You already have the maximum number of Players in your squad</span></div>
        }
        if (playerPicks.length < 15 &&
            playerPos.playerPosition === '648a4408ae0e41bee2304c9a' &&
            goalkeepersSelected === 2) {
            message = <div className='message'>
            <span className='danger-span-msg'>You already have the maximum number of Goalkeepers in your squad</span></div>

        }
        if (playerPicks.length < 15 &&
            playerPos.playerPosition === '647faf277bb2ccc06e8bb00d' &&
            defendersSelected === 5) {
            message = <div className='message'>
            <span className='danger-span-msg'>You already have the maximum number of Defenders in your squad</span></div>

        }
        if (playerPicks.length < 15 &&
            playerPos.playerPosition === '647faf357bb2ccc06e8bb010' &&
            midfieldersSelected === 5) {
            message = <div className='message'>
                <span className='danger-span-msg'>You already have the maximum number of Midfielders in your squad</span></div>

        }
        if (playerPicks.length < 15 &&
            playerPos.playerPosition === '64807d367bb2ccc06e8bb051' &&
            forwardsSelected === 3) {
            message = <div className='message'>
                <span className='danger-span-msg'>You already have the maximum number of Forwards in your squad</span>
            </div>


        }
        console.log(message)
        return message
    }
    return (
        <>
            <div className="player-tbh">
                <div className="info">
                    <button className="player-info-button-table">
                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="13" viewBox="0 0 6 13"><path d="M2.22454008,4.81004082 C2.04454008,5.29122857 1.86734808,5.7178898 1.72391208,6.156 C1.26547608,7.55608163 0.79016808,8.95126531 0.37907208,10.3661633 C0.14141208,11.1840857 0.47704128,11.7369796 1.18250808,11.838 C1.43938008,11.8748302 1.71688008,11.8733951 1.96813608,11.8150408 C3.51877608,11.4548694 4.20733608,10.1739796 4.91521608,8.91887755 C4.76334408,9.03175959 4.64147208,9.17573878 4.51255608,9.31301633 C4.11552408,9.7358449 3.67396008,10.0969714 3.12319608,10.2887878 C3.03319608,10.3198788 2.89960008,10.305529 2.82272808,10.2548278 C2.78194728,10.228042 2.80397808,10.0725869 2.8269468,9.98313796 C2.8569468,9.86451551 2.9160096,9.75306857 2.9624148,9.63827265 C3.5652228,8.14782367 4.1759748,6.66080327 4.7638548,5.16410939 C4.865574,4.90486041 4.9325988,4.59873796 4.9058868,4.32609306 C4.8566676,3.82768898 4.3424508,3.47564816 3.7124508,3.48904408 C2.0769708,3.52348286 0.8985708,4.35097469 0.0595308,5.74002367 C0.0285936,5.79120367 0.0285936,5.86151633 0,5.98253388 C0.698436,5.45686041 1.27548,4.82070122 2.22468,4.81018286 L2.22454008,4.81004082 Z M5.82634008,1.5717551 C5.82634008,2.43941633 5.13680808,3.14302041 4.28602008,3.14302041 C3.43571208,3.14302041 2.74618008,2.43941633 2.74618008,1.5717551 C2.74618008,0.703616327 3.43571208,0 4.28602008,0 C5.13679608,0 5.82634008,0.703604082 5.82634008,1.5717551" transform="translate(0 .5)"></path></svg>
                    </button>
                </div>
                <div className="position-table">
                    <button disabled={disabled} onClick={showPop} className="player-cell btn-table">
                        <div className="images">
                            <img src={require(`../static/shirt_${forwardImage}.webp`)} alt={forwardImage} />
                        </div>
                        <div className="player-cell-info small">
                            <span className="name">{playerPos.appName}</span>
                            <div className="player-cell-details">
                                <span className="team-name">{shortName}</span>
                                <span className="position">{shortPos}</span>
                            </div>
                        </div>
                    </button>
                </div>
                <div className="price money">{playerPos.nowCost.toFixed(1)}</div>
                <div className="points others">{playerPos.totalPoints}</div>
            </div>
            {showTransfer && <div className="playerpop">
                <div className="namesection">
                    <span>{playerPos.firstName}&nbsp;{playerPos.secondName}</span>
                    <button onClick={handleCloseTransfer} className="ns-btn btn-close btn-danger"><svg style={{ color: 'white' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16"> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" fill="white"></path> </svg></button>
                </div>
                {getMessage()}
                <div className="infobuttons">
                    <button disabled=
                        {disableButton(playerPicks.length, playerPos)}
                        onClick={showPlayer} className='btn-info btn-info-block btn-green'>Add Player</button>
                </div>
            </div>}
        </>
    )
}

export default PlayerCard