import { updatePicks } from "../features/picks/picksSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

function TransferComp({ picksId, transfers, teams, players, playerPicks, changeTransfers }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getTeam = (id) => {
        let playerTeam = players.find(player => player._id === id).playerTeam
        let team = teams.find(team => team._id === playerTeam).name
        return team
    }

    const getImage = (id) => {
        let playerTeam = players.find(player => player._id === id).playerTeam
        let playerPosition = players.find(player => player._id === id).playerPosition
        let team = teams.find(team => team._id === playerTeam).code
        let forwardImage =
            playerPosition === '648a4408ae0e41bee2304c9a'
                ? `${team}_1-66`
                : `${team}-66`;
        return forwardImage

    }

    const getName = (id) => {
        let name = players.find(player => player._id === id).appName
        return name
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(updatePicks({picksId, picks:playerPicks}))
        navigate('/pickteam')
        //dispatch(updateTransfers(transfers))
    }

    const disableButton = () => { }

    return (
        <div>
            <div className="transfer-rows">
                <div className='trans-in-out'>
                    <h4>Transfer Out</h4>
                    <h4>Transfer In</h4>
                </div>
                {transfers.map(transfer =>
                    <div className='main-wrapper' key={transfer.position}>
                        <div className='transfer-out'>
                            <div className="trans-wrapper">
                                <div className="trans">
                                    <span className="name">{getName(transfer.playerOut)}</span>
                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkred" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"></path></svg></span>
                                </div>
                                <div className="trans-team">
                                    <span className="name">{getTeam(transfer.playerOut)}</span>
                                    <img src={require(`../static/shirt_${getImage(transfer.playerOut)}.webp`)} alt={getName(transfer.playerOut)} />
                                </div>
                            </div>
                        </div>
                        <div className="transfer-in">
                            <div className="trans-wrapper">
                                <div className="trans">
                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkGreen" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"></path></svg></span>
                                    <span className="name">{getName(transfer.playerIn)}</span>
                                </div>
                                <div className="trans-team">
                                    <img src={require(`../static/shirt_${getImage(transfer.playerIn)}.webp`)} alt={getName(transfer.playerIn)} />
                                    <span className="name">{getTeam(transfer.playerIn)}</span>
                                </div>
                            </div>
                        </div>
                    </div>)}
            </div>
            <section className="form">
                <div className="form-group">
                    <button onClick={changeTransfers} className="btn btn-block btn-green m-auto">Change Transfers</button>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <button disabled={disableButton()} className="btn btn-block btn-green m-auto">Confirm Transfers</button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default TransferComp