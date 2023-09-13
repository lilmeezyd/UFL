
import { useState, useEffect, useContext } from 'react'
import { ModalContext } from '../modalContext'
import { getPlayers, reset } from '../features/players/playerSlice'
import { getTeams } from '../features/teams/teamSlice'
import { useDispatch, useSelector } from 'react-redux'

function PickCard({ playerPicks, index, type, handleShow, handleClose, removePick, toggleList }) {
    const modalOver = useContext(ModalContext)
    const [removePlayer, setRemovePlayer] = useState(false)
    const dispatch = useDispatch()
    const { players } = useSelector((state) => state.players)
    const { teams } = useSelector(state => state.teams)

    useEffect(() => {
        dispatch(getPlayers)
        dispatch(getTeams)

        return () => {
            dispatch(reset())
        }
    }, [dispatch])

    const showRemove = () => {
        setRemovePlayer(true)
        handleShow()
    }

    const closeRemove = () => {
        setRemovePlayer(false)
        handleClose()
    }

    const deletePick = (id, playerPosition) => {
        removePick(id, playerPosition)
        closeRemove()
    }

    /*
    if (!modalOver && removePlayer) {
      closeRemove()
    } */

    const returnPicks = () => {
        const returnDefault = () => {
            let forwardImage = '0-66'
            return (
                <div className='pitch_unit'>
                    <button onClick={() => toggleList()} type='button' className='btn-details'>
                        <img className='image_pic' src={require(`../static/shirt_${forwardImage}.webp`)} alt={forwardImage} />
                        <div className='details-cont'>
                            <div className='default_name'></div>
                            <div className='default_price'></div>
                        </div>
                    </button>
                </div>
            )
        }
        const returnMap = pick => {
            const player = players.find(x => x._id === pick._id)
            const teamCode = teams.find(x => x._id === pick.playerTeam).code
            let forwardImage =
                player.playerPosition === '648a4408ae0e41bee2304c9a'
                    ? `${teamCode}_1-66`
                    : `${teamCode}-66`;
            const appName = player.appName
            return (
                <div className='pitch_unit' key={pick._id}>
                    <button onClick={showRemove} type='button' className='btn-details'>
                        <img className='image_pic' src={require(`../static/shirt_${forwardImage}.webp`)} alt={forwardImage} />
                        <div className='details-cont'>
                            <div className='data_name'>{appName}</div>
                            <div className='data_price'>{pick.nowCost.toFixed(1)}</div>
                        </div>
                    </button>
                    {removePlayer && <div className="playerpop">
                        <div className="namesection">
                            <span>{player.firstName}&nbsp;{player.secondName}</span>
                            <button onClick={closeRemove} className="ns-btn btn-close btn-danger"><svg style={{ color: 'white' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16"> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" fill="white"></path> </svg></button>
                        </div>
                        <div className="infobuttons">
                            <button onClick={() => deletePick(pick._id, pick.playerPosition)} className='btn-info btn-info-block btn-danger'>
                                Remove
                            </button>
                        </div>
                    </div>}
                </div>
            )
        }
        const goalies = playerPicks?.filter(x => x.playerPosition === '648a4408ae0e41bee2304c9a').map(returnMap)
        const defenders = playerPicks?.filter(x => x.playerPosition === '647faf277bb2ccc06e8bb00d').map(returnMap)
        const midfielders = playerPicks?.filter(x => x.playerPosition === '647faf357bb2ccc06e8bb010').map(returnMap)
        const forwards = playerPicks?.filter(x => x.playerPosition === '64807d367bb2ccc06e8bb051').map(returnMap)

        return { goalies, defenders, midfielders, forwards, returnDefault }

    }

    return (
        <>
            {returnPicks()[type][index] || returnPicks().returnDefault()}
        </>
    )
}

export default PickCard